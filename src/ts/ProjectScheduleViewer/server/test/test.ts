import {addExtensions} from "../../../util/extensions/allExtensions";
import {positions} from "../Positions";
import {teams} from "../Teams";

addExtensions();

(async () => {
    await teams.refresh();
    const allTeams = teams.all();
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
    const team = teams.all()[0];
    console.log(positions.all());
})();

