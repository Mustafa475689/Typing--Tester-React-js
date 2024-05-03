import React, { useEffect, useReducer } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css"

function App() {

  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState('30');
  const [started, setStarted] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [characterTyped, setCharacterTyped] = useState(0);
  const [errors, setErrors] = useState(0);
 
const textToType = "A quick brown fox jump over the lazy dog. I have a pencil, and I have a pen. I Lost the game "




useEffect(() => {
  if (timeLeft > 0 && started) {
    setTimeout(() => {
      setTimeLeft(prevTime => prevTime -1);
    }, 1000);
  }else{
    setStarted(false);
    calStats()
  }
}, [timeLeft, started])

useEffect (() => {
  let errorCount = 0;
  for(let i=0; i<userInput.length; i++){
    if (userInput[i] !== textToType[i]) {
      errorCount++;
    }
  }
  setErrors(errorCount > textToType.length ? textToType.length: errorCount)
}, [userInput, textToType])

// Define the onClick funnction named handleStart
const handleStart = () => {
  setTimeLeft(30);
  setStarted(true);
  setWordsTyped(0);
  setCharacterTyped(0);
  setErrors(0);
  setText(textToType);
  setUserInput('');
}

const calStats = () => {
  const typeWords = userInput.trim().split(' ').filter(Boolean).length;
  const typeCharacters = userInput.length;
  setWordsTyped(typeWords)
  setCharacterTyped(typeCharacters)
}

const handleChange = (event) => {
  const {value} = event.target
  setUserInput(value)
}

const calCPM = () => {
  const minutes = 60/ (60 - timeLeft);
  const CPM = Math.round(characterTyped/minutes)
  return CPM;
}

const calWPM = () => {
  const minutes = 60/ (60 - timeLeft);
  const WPM = Math.round(wordsTyped/minutes)
  return WPM;
}

const calAccuracy = () => {
  const accuracy = ((characterTyped - errors) / characterTyped) * 100;
  return isNaN(accuracy) ? 0 : accuracy.toFixed(2)
}


  return (
    <>

    <div className="app">

     <div className="inside-app">
      
      <h1>Typing Test</h1>
      <div className='start-typing'>
        <marquee>{text}</marquee>
        <input type="text" className='input' value={userInput} onChange={handleChange}
        disabled={!started || timeLeft === 0} />
      </div>

      <button onClick={handleStart} disabled={started && timeLeft !== 0}>{ started ? 'restart': 'start'}</button>

      <div className='stats'>
    <p>Time Left: {timeLeft}s</p>
    {timeLeft === 0 &&(

    <div className='result'>
      <p>WPM: {calWPM()} </p>
      <p>CPM: {calCPM()}</p>
      <p>Accuray: {calAccuracy()}</p>
      <p>Error: {errors}</p>
    </div>
    )}
      </div>

     </div>

     </div>

    </>
  )
}

export default App
