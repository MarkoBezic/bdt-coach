import React from 'react'

import {DEFAULT_EXERCISES_ARR, URL_EXERCISES, URL_WORKOUT} from "../AppDefaults";

import SectionNavbar from "../components/SectionNavbar";
import {Link} from 'react-router-dom';
import useLocalStorage, {LOCAL_STORAGE_KEY_EXERCISES} from "../hooks/useLocalStorage";

function HowItWorksPage() {

    const [exercises,] = useLocalStorage(LOCAL_STORAGE_KEY_EXERCISES, DEFAULT_EXERCISES_ARR)

    return <React.Fragment>
        <SectionNavbar/>
        <div>
            <h1>Basketball Decision Trainer</h1>
            <h2>Practice Your Decision Making When You're Working Out Alone</h2>
            <hr/>
            <div className="text-center w-400px m-auto"><h3>How It Works</h3>
                <ol style={{textAlign: 'left'}}>
                    <li>Turn up your audio OR put your device where you can see it.</li><br/>
                    <li>Start you workout and begin performing a repetitive dribble-move as your timer counts down (ie. <a
                        target="_blank" rel="nofollow noreferrer noopener"
                        href="https://www.youtube.com/watch?v=D2hhRG2Hda4?t=30">scissor dribble</a>).</li><br/>
                    <li>When the timer ends, it will announce the exercise and flash a specific color for you. Execute the exercise and then prepare for you next rep.</li><br/>
                    <li>Get ready for your next rep.</li>
                </ol>
                </div>
        </div>
        <br/>
        <p>
            <button><Link className="button" to={URL_WORKOUT}>Start Your First Workout</Link></button>
        </p>
        <p>
            <button><Link to={URL_EXERCISES}>Load Up Your Own Exercises</Link></button>
        </p>
        <div>
            <p>If you have any questions, contact me: kamil@coachkamilhoops.com</p>
        </div>
    </React.Fragment>
}

export default HowItWorksPage
