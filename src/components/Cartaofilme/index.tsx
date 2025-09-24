import { Filme } from "../../types/Filme"
import Estrela from "../Estrela"
import './index.scss'
import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../appConfig"

export interface Props {
    filme: Filme
}

export default function CartaoFilme(props: Props) {
    const filme = props.filme
    const navigate = useNavigate()

    // Função para lidar com o clique no botão "ver mais"
const handleVerMaisClick = () => {
    navigate(`${APP_ROUTES.ROUTE_COMPRA}/${filme.id}`)
}


    return (
        <li className="filme-card">
            <div className="poster-filme">
                <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
            </div>

            <div className="infos-filme">
                <p className="filme-titulo">
                    {filme.title}
                </p>
                {filme.vote_average > 0 &&
                    <Estrela avaliação={filme.vote_average} />
                }

                <div className="hidden-content">
                    {filme.overview &&
                        <p className="descrição">
                            {filme.overview.length > 27
                                ? `${filme.overview.substring(0, 27)}...`
                                : filme.overview
                            }
                        </p>
                    }

                    <button className="btn-default" onClick={handleVerMaisClick}>
                        Ver mais
                    </button>
                </div>
            </div>
        </li>
    )
}