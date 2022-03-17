import logo from './logo.svg';
import './App.css';
import './assets/css/style.css'
import Switch from "react-switch";
import cosmicInsight from './assets/images/Cosmic_Insight_rune.webp';
import noCosmicInsight from './assets/images/no_cosmic.webp';
import botteLucidite from './assets/images/Bottes_de_Lucidi.webp';
import noBotteLucidite from './assets/images/no_Bottes_de_Lucidi.png';


import React, { useState } from "react";
import { getInfoSummoner, getCurrentGame } from './api/riot';

function App() {

  const [name, setName] = useState("");

  const [participants, setParticipants] = useState(null);

  const [bottes, setBottes] = useState([false, false, false, false, false]);
  
  const handleSubmit = async (evt) => {
      evt.preventDefault();

      const infoSumm = await getInfoSummoner(name)

      console.log('inf', infoSumm);
      const currentGame = await getCurrentGame(infoSumm.id)
      console.log('current game', currentGame)

      const CurrentPlayer = currentGame.participants.find( (e) => e.summonerName === name)
      const saveArrayPlayers =  currentGame.participants.filter(player => player.teamId === 200)

      setParticipants(saveArrayPlayers);




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
              participants.map((player, key) => 
              <div className={'wrapper-summoner ' + (player.teamId === 100 ? "blue" : "red")}>
                  <p>{player.summonerName}</p>
                  <p>
                  {
                    player.perks.perkIds.includes(8347) ? <img src={cosmicInsight} alt="Cosmic Insight"/> : <img src={noCosmicInsight} alt="Pas de Cosmic Insight"/>
                  }
                  </p>
                <div onClick={() => setBottes(!bottes)}>
                    {bottes ? <img src={botteLucidite} alt="Cosmic Insight"/> : <img src={noBotteLucidite} alt="Pas de Cosmic Insight"/>}
                {/* <Switch onChange={(bottes) => setBottes(bottes)} checked={bottes} /> */}
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
