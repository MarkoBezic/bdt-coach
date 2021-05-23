import React from 'react'

import {URL_EXERCISES, URL_WORKOUT} from "../AppDefaults";

import SectionNavbar from "../components/SectionNavbar";
import {Link} from 'react-router-dom';

function HowItWorksPage() {
    return <React.Fragment>
        <SectionNavbar/>
        <div>
            <h1>Basketball Decision Trainer</h1>
            <h2>Practice Your Decision Making When You're Working Out Alone (1v0)</h2>
            <hr/>
            <h4 className="text-center w-400px m-auto">Directions: Put your headphones on and perform a repetitive dribble move while the timer counts down (ie. <a target="_blank" rel="nofollow noreferrer noopener" href="https://www.youtube.com/watch?v=D2hhRG2Hda4?t=30">scissor dribble</a>). When the timer hits 0 it will announce the decision and flash a specific color for you. Execute the decision and then prepare for you next rep.</h4>
        </div>
        <br/>
        <br/>
        <div>
            <Link to={URL_WORKOUT}>Start Your First Workout</Link>
        </div>
        <div>
            <Link to={URL_EXERCISES}>Manage Your Exercises</Link>
        </div>
        <div>
            <p>If you have any questions, contact me: kamil@coachkamilhoops.com</p>
        </div>
    </React.Fragment>
}

export default HowItWorksPage
