"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allExtensions_1 = require("../../util/extensions/allExtensions");
const ssr_1 = require("./ssr/ssr");
const e = require("express");
allExtensions_1.addExtensions();
const app = e();
app.get("/", async (request, response) => {
    const html = await ssr_1.getRenderedApp();
    response.send(html);
});
//# sourceMappingURL=server.js.map