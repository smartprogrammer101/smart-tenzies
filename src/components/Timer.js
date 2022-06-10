import React from "react";

export default function Timer(props) {
    let time;
    React.useEffect(() => {
      time = setInterval(() => {
        props.changeSeconds()
      }, 1000)
      return () => clearInterval(time);
    }, [props.end])

    React.useEffect(() => {
      if (props.end) {
        // console.log("Ended");
        stopTime();
      } else if (props.won) {
        console.log("Won");
        clearTimeout(time);
      }
      if (props.minutes == 0 && props.seconds == 0) props.setEnd()
      props.minutesChange();

      // return () => clearInterval(time)
    }, [props.seconds]);
    function stopTime() {
        clearInterval(time);
    }
    const timeStringLength = props.seconds.toString().length;
    
    return <h2 className={props.seconds <= 15 ? "hurry-up" : ""}>Timer: 0{`${props.minutes}: ${timeStringLength == 1 ? '0'+props.seconds : props.seconds}`}</h2>
}