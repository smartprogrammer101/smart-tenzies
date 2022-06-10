import React from "react";
import "./App.css";
import Button from "./Button";
import DiceContainer from "./components/DiceContainer";

export default function App() {
  const [selectedButtons, setSelectedButtons] = React.useState([]);
  const [animation, setAnimation] = React.useState(false);
  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(0);
  const [end, setEnd] = React.useState(false);

  let time;
  React.useEffect(() => {

    time = setInterval(() => {
      setSeconds(prevSeconds => {
        prevSeconds = prevSeconds == 0 ? 59 : prevSeconds - 1
        return prevSeconds;
      })
    }, 1000)
    
    const allDice = document.querySelectorAll(".dice");
    const isInSelectedButtons = (button) => selectedButtons.length == 10 && selectedButtons.includes(allDice[button].id);
    const isTrue = selectedButtons.every(isInSelectedButtons);
    console.log(isTrue);
        console.log("Ended? ", end);

    return () => clearInterval(time);
  }, [end]);

  React.useEffect(() => {
    if (end) {
      console.log("Ended");
      stopTime();
    } else {
      console.log("Not Ended");
    }
        // console.log("minutes: ", minutes);
        // console.log("seconds: ", seconds);
        if (minutes < 0) setEnd(true)
      setMinutes(prevMinute => {
        prevMinute = seconds == 59 ? prevMinute - 1 : prevMinute
        return prevMinute
      });
  }, [seconds]);

  function stopTime() {
      clearInterval(time);
  }
  const handleClick = (key) => {
    setSelectedButtons(prevSelectedButtons => {
      const buttons = [...prevSelectedButtons];
      if (buttons.includes(key)) return buttons.filter(button => button !== key)
      else buttons.push(key);
      return buttons;
    })
  } 
  
  const handleSubmit = () => {
    // console.log(selectedButtons);
    setAnimation(prev => !prev);
  }

  return (
    <div className="main">
      <h2>Timer: {end ? "00: 00" : `0${minutes}: ${seconds}`}</h2>
      <div className="container">
        
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        
        <DiceContainer animate={animation} selectedButtonsKeys={selectedButtons} handleClick={handleClick} />
        <Button handleSubmit={handleSubmit} />
      
      </div>
    </div>
  )
}