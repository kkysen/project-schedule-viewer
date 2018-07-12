"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allExtensions_1 = require("../../../util/extensions/allExtensions");
const Positions_1 = require("../Positions");
const Teams_1 = require("../Teams");
allExtensions_1.addExtensions();
(async () => {
    await Teams_1.teams.refresh();
    const allTeams = Teams_1.teams.all();
    // console.log(JSON.stringify(allTeams, null, 2));
    // console.log(HashSet.new({
    //     elements: [
    //         {
    //             id: 1,
    //             name: "Hello",
    //         },
    //         {
    //             id: 2,
    //             name: "World",
    //         },
    //         {
    //             id: 1,
    //             name: "Khyber",
    //         },
    //         {
    //             id: 1,
    //             name: "Hello",
    //             check: true,
    //         },
    //     ],
    //     hashEquals: {
    //         hash: t => t.id,
    //         equals: (t1, t2) => t1.name === t2.name,
    //     },
    // }).toArray());
    // console.log(Equals.fastEquals((a, b) => a === b).toString());
    // console.log(positions.all());
    const team = Teams_1.teams.all()[0];
    console.log(Positions_1.positions.all());
})();
//# sourceMappingURL=test.js.map