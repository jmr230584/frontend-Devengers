import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Filme } from "../../types/Filme";
import CartaoFilme from "../Cartaofilme/index";



export default function Listafilmes(){
    const [filmes , setFilmes] = useState<Filme[]>([]);

    useEffect(() => {
       getFilmes();
    }, [])

    const getFilmes = () =>
        axios({
            method: 'get',
            url:'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key:'396a9240a4ab4e099cdcded28f677dd0',
                language:'pt-BR'
            }
        }).then(response => {
            setFilmes(response.data.results);
        })

        

    return (
        <ul className="lista-filmes">
            {filmes.map((filme)=> 
            
            <CartaoFilme
             key={filme.id}          
             filme={filme}
            />
            
            )}
          
        </ul>

    );
}