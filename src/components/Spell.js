import '../assets/css/style.css'
import React, { useEffect, useState } from "react";
import { getChampName, getJsonSummonerPSells } from '../api/riot';

function Spell(props) {


    const [timerSpell, setTimerSpell] = useState(0);

    const [CDBackTime, setCDBackTime] = useState("UP");

    const [CopyText, setCopyText] =useState('');


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
        let hours = Math.floor(time / 60);
        let minutes = Math.round(time % 60 ? time % 60 : '00');
        minutes = minutes < 10 ? "0"+ minutes : minutes;
        return [time, hours + ':'+ minutes];
    }

    const launchTimer = async(time, name) =>{
        
        let timeFormat;
        let decompteTimer = setInterval(() => {
            if(time < 0){
                clearTimeout(decompteTimer);
                setTimerSpell(getTimerSpell(props.spell[0].cooldown))
                setCDBackTime("UP")
            }else{
                time-=1;
                let hours = Math.floor(time / 60);
                let minutes = Math.round(time % 60 ? time % 60 : '00');
                
                minutes = minutes < 10 ? "0"+ minutes : minutes;
                timeFormat = hours + ':'+ minutes;
                setTimerSpell([time, timeFormat])
            }
            
        }, 1000);

        let hours = Math.floor(time / 60);
        let minutes = Math.round(time % 60 ? time % 60 : '00');

        minutes = minutes < 10 ? "0"+ minutes : minutes;
        timeFormat = hours + ':'+ minutes;

        const tempTime = hours + ':'+ minutes;
        const CDSplit = tempTime.split(':');
        const gameSplit = props.timerGame.split(':');

        let  minuteTotal =  parseInt(gameSplit[1]) + parseInt(CDSplit[1]);
        minuteTotal = Math.round(minuteTotal % 60 ? minuteTotal % 60 : '00');
        minuteTotal = minuteTotal < 10 ? "0"+ minuteTotal : minuteTotal;

        const CDBack = (parseInt(gameSplit[0]) + parseInt(CDSplit[0])) +':' + minuteTotal
        setCDBackTime(CDBack)

        const nameChamp = getChampName(props.player.championId).then((res) => {
            setCopyText(res  + ' ' +  name + ": " + CDBack + ' / ')
        });

    }


  return (
    <div>
        <p className={'one-spell ' + (CDBackTime === 'UP' ? "up" : "cd")}>
            <img src={props.spell[0] && "https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/"+props.spell[0].iconPath.substring(props.spell[0].iconPath.lastIndexOf('/') + 1).toLowerCase()}  alt={props.spell[0].name}/>
            <span className='timer' onClick={() => launchTimer(timerSpell[0], props.spell[0].name)}><span>{timerSpell[1]}</span></span>
        </p>
        <span className={'cdback ' + (CDBackTime === 'UP' ? "up" : "cd")}>{CDBackTime}</span>
        {/* <p onClick={() => navigator.clipboard.writeText("LoL")}>{CopyText}</p> */}
    </div>
        
  );
}
export default Spell;
