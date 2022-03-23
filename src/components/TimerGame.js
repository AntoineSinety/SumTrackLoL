import "../assets/css/style.css";

import React, { useCallback, useState, useEffect } from "react";

import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux'
import { incrementSeconds, incrementMinutes, resetSeconds } from '../redux/R-timeGame'

function TimerGame(props) {
    const time = useSelector((state) => state.timeGame.value)
    const dispatch = useDispatch()


    useEffect(()=>{
    let myInterval = setInterval(() => {
        if (time.seconds >= 0) {
            // setSeconds(seconds + 1);
            dispatch(incrementSeconds())
        }
        if (time.seconds >= 59) {
            // setMinutes(minutes + 1);
            // setSeconds(0);
            dispatch(incrementMinutes())
            dispatch(resetSeconds())
        } 
    }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div className="timer-game">
        { time.minutes === 0 && time.seconds === -1
            ? <Button variant="contained" className="start-button" onClick={() => dispatch(resetSeconds())}>Start</Button>
            : <h3 className="time">{time.minutes < 10 ?  `0${time.minutes}` : time.minutes}:{time.seconds < 10 ?  `0${time.seconds}` : time.seconds}</h3> 
        }
        </div>
    )
}

export default TimerGame;
