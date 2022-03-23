import logo from "./logo.svg";
import "./App.css";
import "./assets/css/style.css";

import { Draggable } from "react-drag-reorder";

import React, { useEffect, useState } from "react";
import { getInfoSummoner, getCurrentGame } from "./api/riot";

import Player from "./components/Player";
import TimerGame from "./components/TimerGame";

import { useSelector, useDispatch } from 'react-redux'

function App() {
    const recapSpell = useSelector((state) => state.recapSpell)
    const [name, setName] = useState("");

    const [game, setGame] = useState(null);
    const [participants, setParticipants] = useState(null);

    const [bottes, setBottes] = useState();

    const [timerGame, setTimerGame] = useState(null);

    useEffect(() => {
        // if (game){
        //   setInterval(() => {
        //     calcTimeGame()
        //   }, 1000);
        // }

    }, [game]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const infoSumm = await getInfoSummoner(name);

        console.log("inf", infoSumm);
        const currentGame = await getCurrentGame(infoSumm.id);

        console.log("current game", currentGame);

        const CurrentPlayer = currentGame.participants.find(
            (e) => e.summonerName === name
        );
        const saveArrayPlayers = currentGame.participants.filter(
            (player) => player.teamId === 200
        );

        setParticipants(saveArrayPlayers);
        setGame(currentGame);
    };

    // const calcTimeGame = () =>{
    //     const timerStartGame = game.gameStartTime;

    //     let now = new Date().getTime();
    //     let distance =  now -timerStartGame;

    //     // Time calculations for days, hours, minutes and seconds
    //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //     minutes = minutes < 10 ? "0"+ minutes : minutes;
    //     seconds = seconds < 10 ? "0"+ seconds : seconds;
    //     setTimerGame(minutes + ":" + seconds);
    // }

    const activeBotte = (bottes) => {
        setBottes(bottes);
    };

    const handler = value => console.log('val', value);
    return (
        <div className="App">
            <header className="App-header">
                {/* <p>Game start : { timerGame} </p> */}
                <form onSubmit={handleSubmit} className="type-summoner">
                    <label className="field-summoner-name">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nom d'invocateur"
                        />
                    </label>
                    <input type="submit" value="GO" />
                </form>
                {participants && (
                    <div>
                        <h2 className="list-n-time">Liste des joueurs : <TimerGame onChange={handler} /></h2>
                        <div className="container-summoner">
                            {participants.map((player, index) => (
                                <Player
                                    player={player}
                                    key={index}
                                    timerGame={timerGame}
                                />
                            ))}
                        </div>

        
                        <div onClick={() =>{console.log("rreeee", recapSpell) }}>Summoner recap :
                            <p style={{maxWidth: '800px'}}>{ recapSpell  && 
                                    Object.keys(recapSpell).map((recap, index)=>{
                                        console.log(recap)
                                        console.log(index)
                                        return 'oui'
                                        return  recap.spell + ' ' + recap.cd +' '
                                    }) 
                                    
                                }
                             </p>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
