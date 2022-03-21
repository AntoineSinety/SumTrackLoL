import '../assets/css/style.css'
import React, { useEffect, useState } from "react";
import { getJsonSummonerPSells } from '../api/riot';

function Spell(props) {


    const [timerSpell, setTimerSpell] = useState(0);

    const [CDBackTime, setCDBackTime] = useState(0);



    useEffect(() => {

        async function fetchData() {
            
            const timer = getTimerSpell(props.spell[0].cooldown)
            setTimerSpell(timer)
        }
        fetchData();


      }, [props.botte]); // Or [] if effect doesn't need props or state


    const getTimerSpell = (time) =>{
        if (props.rune && props.botte){
            time = time * (100/(30+100))
        }else if (props.rune){
            time = time * (100/(18+100))
            // time = time - 
        }else if (props.botte){
            time = time * (100/ (12+100))
        }
        // return time/60;
        return [time, Math.floor(time / 60) + ':'+ Math.round((time % 60 ? time % 60 : '00'))];
    }

    const launchTimer = (time) =>{
        
        let timeFormat;
        setInterval(() => {
            if(time <= 0){
                setTimerSpell(getTimerSpell(props.spell[0].cooldown))
                clearTimeout();
            }else{
                time-=1;
                let hours = Math.floor(time / 60);
                let minutes = Math.round(time % 60 ? time % 60 : '00');
                timeFormat = hours + ':'+ (minutes < 10 ? "0"+ minutes : minutes);
                setTimerSpell([time, timeFormat])
            }
            
        }, 1000);

        let hours = Math.floor(time / 60);
        let minutes = Math.round(time % 60 ? time % 60 : '00');
        console.log('min', minutes);
        const tempTime = hours + ':'+ (minutes < 10 ? "0"+ minutes : minutes);
        const CDSplit = tempTime.split(':');
        const gameSplit = props.timerGame.split(':');

        const CDBack = (parseInt(gameSplit[0]) + parseInt(CDSplit[0])) +':' + (parseInt(gameSplit[1]) + parseInt(CDSplit[1]))
        setCDBackTime(CDBack)
    }

    const printTimerGetBack = (time) =>{

    }

  return (
    <div>
        <p className='one-spell'>
            <img src={props.spell[0] && "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/"+props.spell[0].iconPath.substring(props.spell[0].iconPath.lastIndexOf('/') + 1).toLowerCase()}  alt={props.spell[0].name}/>
            <span className='timer' onClick={() => launchTimer(timerSpell[0])}><span>{timerSpell[1]}</span></span>
        </p>
        <span>{CDBackTime}</span>
    </div>
        
  );
}
export default Spell;
