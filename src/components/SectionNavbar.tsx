import React from "react";
import {NavLink} from "react-router-dom";
import {URL_EXERCISES, URL_HOME, URL_WORKOUT} from "../AppDefaults";

export default function SectionNavbar(props: any) {
    return <React.Fragment>
        <div>
            <NavLink exact to={URL_HOME}>How It Works</NavLink>
            &nbsp; | &nbsp;
            <NavLink exact to={URL_WORKOUT}>Work Out</NavLink>
            &nbsp; | &nbsp;
            <NavLink exact to={URL_EXERCISES}>Exercises</NavLink>
        </div>
    </React.Fragment>
}
