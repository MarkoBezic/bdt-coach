import React from "react";
import {NavLink} from "react-router-dom";

export default function SectionNavbar(props: any) {
    return <React.Fragment>
        <div>
            <NavLink exact to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink exact to="/exercises">Exercises</NavLink>
        </div>
    </React.Fragment>
}
