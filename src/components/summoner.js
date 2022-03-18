import '../assets/css/style.css'
import React, { useEffect, useState } from "react";
import { getJsonSummonerPSells } from '../api/riot';
import Spell from './Spell';

function SummonerSpell(props) {

    const [spell1, setSpell1] = useState("");
    const [spell2, setSpell2] = useState("");
    
    const [timerSpell1, setTimerSpell1] = useState(0);
    const [timerSpell2, setTimerSpell2] = useState(0);
    


    useEffect(() => {
        async function fetchData() {
            const jsonSummonerSpells = await getJsonSummonerPSells().then((res) =>{
                const spellTemp1 = res.filter(spell => spell.id === props.spell1);
                const spellTemp2 = res.filter(spell => spell.id === props.spell2);
                
                const timer1 = getTimerSpell(spellTemp1[0].cooldown)
                const timer2 = getTimerSpell(spellTemp2[0].cooldown)
                // setTimerSpell1(timer1)
                // setTimerSpell2(timer2)
                
                setSpell1(spellTemp1)
                setSpell2(spellTemp2)

            });
        }
        fetchData();


      }, [props]); // Or [] if effect doesn't need props or state


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
        return Math.floor(time / 60) + ':'+ Math.round((time % 60 ? time % 60 : '00'));
      }

  return (
        <div className='wrapper-spell'>
            {spell1 && <Spell {...props} spell={spell1} />}
            {spell2 && <Spell {...props} spell={spell2} />}
        </div>
  );
}
export default SummonerSpell;
