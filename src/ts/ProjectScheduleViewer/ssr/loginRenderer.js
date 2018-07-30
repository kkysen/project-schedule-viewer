"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginClient_1 = require("../client/loginClient");
const SsrRenderer_1 = require("./SsrRenderer");
exports.login = SsrRenderer_1.SsrRenderer.new({
    name: "login",
    getData: () => ({}),
    serialize: () => ({}),
    loader: loginClient_1.loginLoader,
});
//# sourceMappingURL=loginRenderer.js.map