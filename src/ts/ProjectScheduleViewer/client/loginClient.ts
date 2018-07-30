import {createLogin} from "../ssr/components/login/Login";
import {ClientLoader} from "../../util/ssr/ClientLoader";

export const loginLoader = ClientLoader.new({
    deserialize: () => ({}),
    create: createLogin,
});