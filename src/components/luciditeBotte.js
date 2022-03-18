import '../assets/css/style.css'
import Switch from "react-switch";
import botteLucidite from '../assets/images/Bottes_de_Lucidi.webp';
import noBotteLucidite from '../assets/images/no_Bottes_de_Lucidi.png';


import React, { useState } from "react";

function Bottes({parentCallback}) {


    const [bottes, setBottes] = useState(false);

    // const clickBottes = () =>{
    //     setBottes(!bottes)

    // }
  
  return (
        <button onClick={() => {
            setBottes(!bottes)
            parentCallback(!bottes)
        }} className="bottes">
            {bottes ? <img src={botteLucidite} alt="Cosmic Insight"/> : <img src={noBotteLucidite} alt="Pas de Cosmic Insight"/>}
        </button>
  );
}

export default Bottes;
