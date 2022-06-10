import React from "react";

export default function Button(props) {
    const length = props.selectedButtons.length == 10;
    return <button 
                    className={length ? "check-out" : ""} 
                    // disabled={props.ended || props.won} 
                    // disabled={props.ended} 
                    onClick={props.handleSubmit}
            >
        {props.won || props.ended ? "New Game" : length ? "Check" : "Roll"}
        </button>
}