import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextToSpeech from "./TextToSpeech";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <TextToSpeech/>
            </header>
        </div>
    );
}

export default App;
