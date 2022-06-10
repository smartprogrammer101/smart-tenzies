import React from "react";
import "./App.css";
import Button from "./Button";
import DiceContainer from "./components/DiceContainer";
import Timer from "./components/Timer";
import Confetti from "react-confetti";

export default function App() {
  const [selectedButtons, setSelectedButtons] = React.useState([]);
  const [animation, setAnimation] = React.useState(false);
  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(0);
  const [end, setEnd] = React.useState(false);
  const [win, setWin] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(false);
  React.useEffect(() => {
    let highestScore = localStorage.getItem("score");
    if (win && seconds > highestScore) {
      localStorage.setItem("score", 60 - seconds);
      setScore(60 - seconds);
      setHighScore(true);
    } else {
      setScore(highestScore);
    }
    // console.log(2  null);
  }, [win]);

  function handleSecondsChange() {
    setSeconds(prevSeconds => {
      prevSeconds = prevSeconds == 0 ? 59 : prevSeconds - 1
      return prevSeconds;
    })
  }
  function handleMinutesChange() {
    if (minutes < 0) setEnd(true)
      setMinutes(prevMinute => {
        prevMinute = seconds == 59 ? prevMinute - 1 : prevMinute
        return prevMinute
      });
  }
  function minutesChange() {
    setMinutes(prevMinute => {
      
      prevMinute = seconds == 59 ? prevMinute - 1 : prevMinute
      return prevMinute
    })
  }
  function handleSetEnd() {
    setEnd(prev => true)
  }

  const handleClick = (key) => {
    if (win || end) return;
    setSelectedButtons(prevSelectedButtons => {
      const buttons = [...prevSelectedButtons];
      if (buttons.includes(key)) return buttons.filter(button => button !== key)
      else buttons.push(key);
      return buttons;
    })
  } 
  
  const handleSubmit = () => {
    // console.log(selectedButtons);
    if (win || end) {
      setWin(false);
      setEnd(false);
      setSelectedButtons([]);
      setMinutes(1);
      setSeconds(0);
      setAnimation(prev => !prev);
      setHighScore(false);

    } else {
      setAnimation(prev => !prev);
      const allDice = document.querySelectorAll(".dice");
      const arr = [...allDice];
      if (selectedButtons.length === allDice.length) {
        const out = arr.map(button => button.textContent);
        const first = out[0]
        const allButtonIsSame = out.every((val) => val==first)
        if (allButtonIsSame) setWin(true);
        console.log("finished");
        
      }
    }
    
  }

  // Returning the ckomponent
  return (
    
    <div className="main">
      <h6>Highest score: {score} secs</h6>
      {highScore && <Confetti />}
      {
        end ? 
        <div>
          <h2 className="time-up">You Loose</h2><h4 className="time-up">Time Up</h4>
        </div> : 
        win ? 
        <div>
          {/* <h2 className="you-won">Timer: {`0${minutes}: ${seconds < 10 ? '0'+seconds : seconds}`}</h2> */}
          {highScore ? 
            <>
              <h2 className="you-won high-score">NEW HIGH SCORE</h2>
              <h4 className="you-won">Time: {60 - seconds} seconds</h4>
            </> :
            <>
              <h2 className="you-won">YOU WON</h2>
              <h4 className="you-won">Time: {60 - seconds} seconds</h4>
            </>
          }
        </div> :
        <Timer 
              minutesChange={minutesChange}
              changeSeconds={handleSecondsChange} 
              changeMinutes={handleMinutesChange} 
              setEnd={handleSetEnd} 
              minutes={minutes} 
              seconds={seconds} 
              end={end}
              won={win}
        />
      }
      <div className="container">
        
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <DiceContainer animate={animation} selectedButtonsKeys={selectedButtons} handleClick={handleClick} />
        <Button selectedButtons={selectedButtons} ended={end} won={win} handleSubmit={handleSubmit} />
      
      </div>
    </div>
  )
}