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
            <div className="text-center w-400px m-auto"><h3>Directions</h3>
                <ol>
                    <li>Put your headphones on or put your mobile device where you can see it.</li><br/>
                    <li>Start you workout and begin performing a repetitive dribble-move as your timer counts down (ie. <a
                        target="_blank" rel="nofollow noreferrer noopener"
                        href="https://www.youtube.com/watch?v=D2hhRG2Hda4?t=30">scissor dribble</a>).</li><br/>
                    <li>When the timer hits 0 it will announce the exercise and flash a specific color for you. Execute the decision and then prepare for you next rep.</li><br/>
                    <li>Get ready for your next rep.</li>
                </ol>
                </div>
        </div>
        <br/>
        <br/>
        <p>
            <Link to={URL_WORKOUT}>Start Your First Workout</Link>
        </p>
        <p>
            <Link to={URL_EXERCISES}>Load Up Your Own Exercises</Link>
        </p>
        <div>
            <p>If you have any questions, contact me: kamil@coachkamilhoops.com</p>
        </div>
    </React.Fragment>
}

export default HowItWorksPage
