import '../assets/css/style.css'
import cosmicInsight from '../assets/images/Cosmic_Insight_rune.webp';
import noCosmicInsight from '../assets/images/no_cosmic.webp';
import Bottes from './luciditeBotte';
import SummonerSpell from './summoner';

import React, { useCallback, useState } from "react";


function Player(props) {


    const [bottes, setBottes] = useState(false);

    const clickBottes = useCallback((res) =>{
        setBottes(res)
    }, [])
  
  return (
    <div className={'wrapper-summoner ' + (props.player.teamId === 100 ? "blue" : "red")} key={props.index}>
        <p>{props.player.summonerName}</p>
        <img src={props.player.championId && "https://cdn.communitydragon.org/latest/champion/"+props.player.championId+"/square"}  alt={props.player.summonerName}/>
        <SummonerSpell spell1={props.player.spell1Id} spell2={props.player.spell2Id} rune={props.player.perks.perkIds.includes(8347) ? true : false} botte={bottes} timerGame={props.timerGame} player={props.player} />
        <p>
        {
        props.player.perks.perkIds.includes(8347) ? <img src={cosmicInsight} alt="Cosmic Insight"/> : <img src={noCosmicInsight} alt="Pas de Cosmic Insight"/>
        }
        </p>
        <Bottes parentCallback={clickBottes} />
    </div>
  );
}

export default Player;
