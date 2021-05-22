import React from 'react';

import './App.css';
import WorkoutPage from "./pages/WorkoutPage";
import {Switch, Route} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage";

import { enableAutoTTS } from 'enable-auto-tts';
import AdminPage from "./pages/AdminPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import {URL_EXERCISES, URL_HOME, URL_WORKOUT} from "./AppDefaults";

enableAutoTTS();

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/admin">
                    <AdminPage/>
                </Route>

                <Route path={URL_EXERCISES}>
                    <ExercisesPage/>
                </Route>

                <Route path={URL_WORKOUT}>
                    <WorkoutPage/>
                </Route>

                {/* Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
                <Route path={URL_HOME}>
                    <HowItWorksPage/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default App;
