import React from 'react';
import './App.css';
import TextToSpeech from "./TextToSpeech";
import WorkoutPage from "./WorkoutPage";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <WorkoutPage/>
            </header>
        </div>
    );
}

export default App;
