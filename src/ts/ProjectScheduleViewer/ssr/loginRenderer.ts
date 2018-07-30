import {loginLoader} from "../client/loginClient";
import {SsrRenderer} from "./SsrRenderer";

export const login = SsrRenderer.new({
    name: "login",
    getData: () => ({}),
    serialize: () => ({}),
    loader: loginLoader,
});