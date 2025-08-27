import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import './index.scss'
export interface Props {
    avaliação:number,
}
export default function Estrela(Props:Props){
    const numEstrela = Math.round(Props.avaliação/2);
    
    const fullEstrelas=[4];
    const emptyEstrelas=[];

for (let i = 0; i < 4; i++){
    if(i < numEstrela){
        fullEstrelas.push(i);
    }else{
        emptyEstrelas.push(i);
    }
}

    return(
    <div className="movie-rate">
        {fullEstrelas.map(index=>
            <FaStar key={index} />
        )}
        {emptyEstrelas.map(index=>
            <FaRegStar key={index} />
        )}
      
    </div>
    );
}