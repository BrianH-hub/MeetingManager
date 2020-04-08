import React, { Fragment } from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { useContext } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
    const rootStore = useContext(RootStoreContext);
    const {predicate, setPredicate } = rootStore.activityStore;
    return (
        <Fragment>
            <Menu
                vertical
                size={"large"}
                style={{ width: "100%", marginTop: 50 }}
            >
                <Header
                    icon={"filter"}
                    attached
                    color={"blue"}
                    content={"Filters"}
                />
                <Menu.Item
                    color={"blue"}
                    name={"all"}
                    content={"All Meetings"}
                    active={predicate.size === 0}
                    onClick={()=>setPredicate('all','true')}
                />
                <Menu.Item
                    color={"blue"}
                    name={"username"}
                    content={"I'm Going"}
                    active={predicate.has('isGoing')}
                    onClick={()=>setPredicate('isGoing','true')}
                />
                <Menu.Item
                    color={"blue"}
                    name={"host"}
                    content={"I'm hosting"}
                    active={predicate.has('isHost')}
                    onClick={()=>setPredicate('isHost','true')}
                />
            </Menu>
            <Header
                icon={"calendar"}
                attached
                color={"blue"}
                content={"Select Date"}
            />
            <Calendar
                onChange={(date) => setPredicate('startDate', date!)}
                value={predicate.get('startDate'||new Date())}
            />
        </Fragment>
    );
};

export default observer(ActivityFilters);
