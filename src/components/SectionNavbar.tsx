import React from "react";
import {NavLink} from "react-router-dom";

export default function SectionNavbar(props: any) {
    return <React.Fragment>
        <div>
            <NavLink to="/">Home</NavLink>
            &nbsp; | &nbsp;
            <NavLink to="/exercises">Exercises</NavLink>
        </div>
    </React.Fragment>
}
