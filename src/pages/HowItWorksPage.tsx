import React from 'react'

import {URL_WORKOUT} from "../AppDefaults";

import SectionNavbar from "../components/SectionNavbar";
import {Link} from 'react-router-dom';

function HowItWorksPage() {
    return <React.Fragment>
        <SectionNavbar/>
        <div>
            <h1>Basketball Decision Trainer</h1>
            <h2>Practice Your Decision Making When You're Working Out Alone (1v0)</h2>
            <hr/>
            <h4 className="text-center w-400px m-auto">Directions: Put your headphones on and perform a repetitive dribble move (ie. scissor dribble) while the timer counts down. Once the timer runs out, execute the decision given to you as quickly as you can. Then perform a different dribble awaiting for your next rep.</h4>
        </div>
        <br/>
        <br/>
        <div>
            <Link to={URL_WORKOUT}>Start Your First Workout</Link>
        </div>
    </React.Fragment>
}

export default HowItWorksPage
