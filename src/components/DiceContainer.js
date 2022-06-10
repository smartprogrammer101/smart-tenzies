import React, { useEffect } from "react";

const initialNumbers = [4,6,2,3,6,4,2,6,4,3];

export default function DiceContainer(props) {
    // const [animate, setAnimate] = React.useState(false);
    useEffect(() => {
        const numbers = [1,2,3,4,5,6];
        const allDice = document.querySelectorAll(".dice");
        allDice.forEach(dice => {
            const time = setInterval(() => {
                if (!props.selectedButtonsKeys.includes(dice.id)) {
                    const number = numbers[Math.floor(Math.random() * numbers.length)];
                    dice.textContent = number
                }
            }, 50);

            setTimeout(() => {
                return clearInterval(time);
            }, 1000)
        })

    }, [props.animate]);

    return (
        <div className="dice-container">
            {
                initialNumbers.map((number, i) => {
                    return <Dice 
                                handleClick={props.handleClick} 
                                key={i} 
                                id={i} 
                                number={number} 
                                buttonsKeys={props.selectedButtonsKeys} />
                })                
            }
        </div>
        )
}

function Dice(props) {
    return <div 
                className = {`dice ${props.buttonsKeys.includes(props.id.toString()) ? 'selected' : '' }`} 
                id = {props.id} 
                onClick = {(e) => props.handleClick(e.target.id)}
            >
                {props.number}
            </div>
}