import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'
import Switch from "react-switch";

import React, { useState } from "react";
import { getInfoSummoner, getCurrentGame } from './api/riot';

function App() {

  const [name, setName] = useState("");

  const [participants, setParticipants] = useState(null);

  const [bottes, setBottes] = useState(false);
  
  const handleSubmit = async (evt) => {
      evt.preventDefault();

      const infoSumm = await getInfoSummoner(name)

      console.log('inf', infoSumm);
      const currentGame = await getCurrentGame(infoSumm.id)
      console.log('current game', currentGame)

      setParticipants(currentGame.participants);


  }


  return (
    <div className="App">
      <header className="App-header">
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
              participants.map((player) => 
              <div className={'wrapper-summoner ' + (player.teamId === 100 ? "blue" : "red")}>
                  <p>{player.summonerName}</p>
                  <p>Runes Cosmic insight : <br/>
                  {
                    player.perks.perkIds.includes(8347) ? "oui" : "non"
                  }
                  </p>
                <div>Bottes de lucidité:<br/>
                <Switch onChange={(bottes) => setBottes(bottes)} checked={bottes} />
                </div>
              </div>
              )
            }
          </div>
         
        </div>
      </header>
    </div>
  );
}

export default App;
