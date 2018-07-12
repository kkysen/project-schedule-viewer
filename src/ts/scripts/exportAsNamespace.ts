import * as fs from "fs-extra";
import {identity} from "../util/functional/utils";
import {path} from "../util/polyfills/path";
import {matchAll} from "../util/utils";

type CoercedExportType = "const" | "type";
type ExportType = CoercedExportType | "function" | "interface";

interface Export {
    
    type: CoercedExportType;
    name: string;
    
}

const coerceExportType = function(type: ExportType): CoercedExportType {
    switch (type) {
        case "const":
        case "function":
            return "const";
        case "type":
        case "interface":
            return "type";
    }
};

type Aliases = {[key: string]: string};

type ExportAsNamespaceStringArgs = {
    namespace: string
    importPath: string;
    code: string;
    aliases: Aliases;
};

const exportAsNamespaceString = function({namespace, importPath, code, aliases}: ExportAsNamespaceStringArgs): string {
    const namespaceBody = [
        ...matchAll(/export\s+(const|function|interface|type)\s+([a-zA-Z$_][a-zA-Z$_0-9]*)/g, code)
            .map((e, i) => (console.log([...e]), e))
            .map(([_, type, name]) => ({
                type: coerceExportType(type as ExportType),
                name,
            })),
        ...matchAll(/export\s*{([^}]*)}/g, code)
            .map((e, i) => (console.log([...e]), e))
            .map(([_, exports]) => exports.trim().split(/\s*,\s*/))
            .flatten()
            .map(name => ({type: "const", name}))
    ]
        .map(({type, name}) => `    export ${type} ${aliases[name] || name} = _.${name};`)
        .join("\n");
    return `import * as _ from "${importPath}";

export namespace ${namespace} {

${namespaceBody}

}
`;
};

type ExportAsNamespaceArgs = {
    namespace: string
    importPath: string;
    typeDeclarationsPath: string;
    nodeModule?: boolean;
    outDirectory?: string;
    aliases?: Aliases;
};

export const exportAsNamespace = async function(
    {namespace, importPath, typeDeclarationsPath, nodeModule = true, outDirectory = "../lib", aliases = {}}: ExportAsNamespaceArgs): Promise<void> {
    const _path = nodeModule ? fromNodeModule(importPath, typeDeclarationsPath): typeDeclarationsPath;
    const buffer = await fs.readFile(_path);
    const code = buffer.toString("utf8");
    await fs.writeFile(
        path.join(outDirectory, `${namespace}.ts`),
        exportAsNamespaceString({namespace, importPath, code, aliases}),
    );
};

export const fromNodeModule = function(nodeModule: string, _path: string): string {
    return path.join("../../../node_modules", nodeModule, _path);
};

const dir = "C:/Users/Khyber/workspace/ProjectScheduleViewer/";

(async () => {
    await exportAsNamespace({
        namespace: "xlsx",
        importPath: "xlsx",
        typeDeclarationsPath: `types/index.d.ts`,
        outDirectory: "../lib",
        aliases: {
            XLSX$Utils: "Utils",
            XLSX$Consts: "Consts",
        },
    });
    console.log("done");
})();