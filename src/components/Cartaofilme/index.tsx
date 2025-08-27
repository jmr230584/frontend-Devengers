import { Filme } from "../../types/Filme"
import Estrela from "../Estrela"
import './index.scss'
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
                {filme.vote_average>0 &&
                 <Estrela
                        avaliação={filme.vote_average}
                     />
                     
                     }
                
                     
                 <div className="hidden-content">
                    {filme.overview &&
                    <p className="descrição">
                          {filme.overview.length > 100
                          ?`${filme.overview.substring(0,100)}...`
                          : filme.overview
                        }
                     </p>
                    }

                        <button className="btn-default">
                            ver mais
                        </button>
                     </div>
                </div>
      </li>
    )
}