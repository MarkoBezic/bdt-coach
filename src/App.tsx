import React from 'react';
import './App.css';
import TextToSpeech from "./TextToSpeech";

function App() {
    const exercises: string[] = ["Blitz", "Hard Show", "Soft Show",]
    const secondsBetweenReps: number = 5 - 1

    return (
        <div className="App">
            <header className="App-header">
                <TextToSpeech exercises={exercises}
                              secondsBetweenRepsSetting={secondsBetweenReps}/>
            </header>
        </div>
    );
}

export default App;
