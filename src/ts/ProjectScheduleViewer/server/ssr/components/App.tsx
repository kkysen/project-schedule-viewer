import * as React from "react";
import {Component, ReactNode} from "react";
import {Employees, employees} from "../../Employees";
import {Teams, teams} from "../../Teams";
import {appData} from "../ssr";
import {AppWithData} from "./AppWithData";

export interface AppData {
    readonly employees: Employees;
    readonly teams: Teams;
}

interface AppProps {
    readonly data?: AppData;
    readonly dataPromise?: Promise<AppData>;
}

interface AppState {
    readonly data: AppData;
}

export const appId = "app";

export class App extends Component<AppProps, AppState> {
    
    public constructor(props: AppProps) {
        super(props);
        const {data, dataPromise} = props;
        this.state = {data: data || appData};
        if (dataPromise) {
            (async () => {
                const data = await dataPromise; // must be on separate line b/c of async context
                this.setState({data});
            })();
        }
    }
    
    public render(): ReactNode {
        return <div id={appId}>
            <AppWithData data={this.state.data}/>
        </div>;
    }
    
}