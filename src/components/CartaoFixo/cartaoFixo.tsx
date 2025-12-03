import { useEffect, useState } from "react";
import { Filme } from "../../types/Filme";
import Estrela from "../Estrela";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../appConfig";

export default function CartaoFilmeFixo() {
    const navigate = useNavigate();

    // FILME FIXO (ID real do TMDB)
    const FILME_FIXO_ID = 872585; // Oppenheimer — TROQUE AQUI SE QUISER OUTRO

    const [filme, setFilme] = useState<Filme | null>(null);

    useEffect(() => {
        const buscarFilme = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${FILME_FIXO_ID}?api_key=396a9240a4ab4e099cdcded28f677dd0&language=pt-BR`
            );
            const data = await res.json();
            setFilme(data);
        };

        buscarFilme();
    }, []);

    if (!filme) return null;

    const handleVerMaisClick = () => {
        navigate(`${APP_ROUTES.ROUTE_COMPRA}/${filme.id}`);
    };

    return (
        <li className="filme-card destaque-filme-fixo">
            <div className="poster-filme">
                <img
                    src={`https://image.tmdb.org/t/p/original${filme.poster_path}`}
                    alt={filme.title}
                />
            </div>

            <div className="infos-filme">
                <p className="filme-titulo">{filme.title}</p>

                {filme.vote_average > 0 && (
                    <Estrela avaliação={filme.vote_average} />
                )}

                <div className="hidden-content">
                    {filme.overview && (
                        <p className="descrição">
                            {filme.overview.length > 27
                                ? `${filme.overview.substring(0, 27)}...`
                                : filme.overview}
                        </p>
                    )}

                    <button className="btn-default" onClick={handleVerMaisClick}>
                        Ver mais
                    </button>
                </div>
            </div>
        </li>
    );
}
