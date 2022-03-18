import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'




import React, { useEffect, useState } from "react";
import { getInfoSummoner, getCurrentGame } from './api/riot';

import Player from './components/Player';

function App() {

  const [name, setName] = useState("");

  const [game, setGame] = useState(null);
  const [participants, setParticipants] = useState(null);

  const [bottes, setBottes] = useState();

  const [timerGame , setTimerGame] = useState(null);

  useEffect( () =>{

    // setInterval(() => {
    //   if (game){
    //     calcTimeGame()
    //   }
    // }, 1000);

  });
  
  const handleSubmit = async (evt) => {
      evt.preventDefault();

      const infoSumm = await getInfoSummoner(name)

      console.log('inf', infoSumm);
      const currentGame = await getCurrentGame(infoSumm.id)
      console.log('current game', currentGame)

      const CurrentPlayer = currentGame.participants.find( (e) => e.summonerName === name)
      const saveArrayPlayers =  currentGame.participants.filter(player => player.teamId === 200)

      setParticipants(saveArrayPlayers);
      setGame(currentGame)
  }

  const calcTimeGame = () =>{
      const timerStartGame = game.gameStartTime;

      var now = new Date().getTime();
      var distance =  now -timerStartGame;
      
      // Time calculations for days, hours, minutes and seconds
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimerGame(minutes + "m " + seconds + "s ");
  }

  const activeBotte = (bottes) =>{
    setBottes(bottes)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Game start : { timerGame} </p>
        <form onSubmit={handleSubmit}>
          <label>
            Nom d'invocateur :
            <input type="text" name="name"  value={name} onChange={e => setName(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h2>Liste des joueurs :</h2>
          <div className="container-summoner">

            { participants &&
              participants.map((player, index) => 
              <Player player={player} key={index} />
              )
            }
          </div>
         
        </div>
      </header>
    </div>
  );
}

export default App;
