import {addExtensions} from "../../util/extensions/allExtensions";
import {loadApp} from "./loadApp";

const main = function(): void {
    addExtensions();
    (async () => {
        await loadApp();
    })();
};

main();