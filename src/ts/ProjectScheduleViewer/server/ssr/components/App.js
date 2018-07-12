"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const ssr_1 = require("../ssr");
const AppWithData_1 = require("./AppWithData");
exports.appId = "app";
class App extends react_1.Component {
    constructor(props) {
        super(props);
        const { data, dataPromise } = props;
        this.state = { data: data || ssr_1.appData };
        if (dataPromise) {
            (async () => {
                const data = await dataPromise; // must be on separate line b/c of async context
                this.setState({ data });
            })();
        }
    }
    render() {
        return React.createElement("div", { id: exports.appId },
            React.createElement(AppWithData_1.AppWithData, { data: this.state.data }));
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map