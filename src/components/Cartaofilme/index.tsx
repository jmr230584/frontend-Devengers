import { Filme } from "../../types/Filme"
import Estrela from "../Estrela"
export interface Props {
    filme: Filme
}

export default function CartaoFilme(props: Props){
    const filme = props.filme
    return(
        <li className="filme-card">
            <div className="poster-filme">
                <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                </div>
                
                <div className="infos-filme">
                   <p className="filme-titulo">
                       {filme.title}
                 </p>

                 <Estrela>
                        avaliação={filme.vote_average}
                     </Estrela>
                     
                 <div className="hidden-content">

                     <p className="descrição">
                          {filme.overview}
                     </p>

                     </div>
                </div>
      </li>
    )
}