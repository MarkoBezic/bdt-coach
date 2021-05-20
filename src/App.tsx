import React from 'react';

import './App.css';
import WorkoutPage from "./WorkoutPage";
import {Switch, Route} from "react-router-dom";
import ExercisesPage from "./pages/ExercisesPage";

import { enableAutoTTS } from 'enable-auto-tts';
import AdminPage from "./pages/AdminPage";

enableAutoTTS();

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/admin">
                    <AdminPage/>
                </Route>

                <Route path="/exercises">
                    <ExercisesPage/>
                </Route>

                {/* Important: A route with path="/" will *always* match
            the URL because all URLs begin with a /. So that's
            why we put this one last of all */}
                <Route path="/">
                    <WorkoutPage/>
                </Route>
            </Switch>
        </React.Fragment>
    );
}

export default App;
