"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = require("../ssr/components/login/Login");
const ClientLoader_1 = require("../../util/ssr/ClientLoader");
exports.loginLoader = ClientLoader_1.ClientLoader.new({
    deserialize: () => ({}),
    create: Login_1.createLogin,
});
//# sourceMappingURL=loginClient.js.map