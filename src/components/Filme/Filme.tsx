import { JSX } from "react";
import estilo from './Filme.module.css';
import poster from '../../assets/branca-de-neve.png';

function Filme(): JSX.Element {
    const filme = {
        titulo: 'Branca de Neve',
        duracao: '110min',
        genero: 'Infantil/Fantasia',
        descricao: 'Uma recriação do clássico animado de Walt Disney de 1937 sobre uma bela jovem princesa que, enquanto é perseguida por uma rainha ciumenta, busca refúgio em uma cabana em uma floresta.',
        classificacao: 'L',
        datas: ["29/05", "30/05", "31/05", "01/06", "02/06", "03/06"],
        sessoes: [
            { tipo: "VIP - Dublado", preco: "R$ 35.00", horarios: ["8:00", "19:30"] },
            { tipo: "3D - Dublado", preco: "R$ 25.00", horarios: ["13:45", "10:15", "16:00"] },
            { tipo: "IMAX - Dublado", preco: "R$ 30.00", horarios: ["20:00"] },
            { tipo: "2D - Dublado", preco: "R$ 20.00", horarios: ["18:00"] }
        ]
    };

    const dataSelecionada = "31/05"; // simulação de data selecionada

    return (
        <main className={estilo.filme}>
            <div className={estilo.esquerda}>
                <img className={estilo.poster} src={poster} alt={`Poster do filme ${filme.titulo}`} />
                <p className={estilo.classificacao}><span>{filme.classificacao}</span> {filme.genero}</p>
            </div>

            <div className={estilo.direita}>
                <h2 className={estilo.titulo}>{filme.titulo}</h2>
                <p className={estilo.duracao}>Duração do filme: {filme.duracao}</p>
                <p className={estilo.descricao}>{filme.descricao}</p>

                <div className={estilo.datas}>
                    <h3 className={estilo.subtitulo}>ESCOLHA UMA DATA</h3>
                    <div className={estilo.listaDatas}>
                        {filme.datas.map((data, index) => (
                            <button
                                key={index}
                                className={`${estilo.data} ${data === dataSelecionada ? estilo.selecionada : ""}`}
                            >
                                {data}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={estilo.sessoes}>
                    {filme.sessoes.map((sessao, index) => (
                        <div key={index} className={estilo.sessao}>
                            <h4>{sessao.tipo}</h4>
                            <p>{sessao.preco}</p>
                            <div className={estilo.horarios}>
                                {sessao.horarios.map((hora, i) => (
                                    <button key={i} className={estilo.horario}>{hora}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Filme;
