import { JSX, useState } from "react";
import estilo from './Ingressos.module.css'
import poster1 from '../../assets/zootopia2.jpg';
import poster2 from '../../assets/mulherdejardim.jpg';
import poster3 from '../../assets/Oppenheimer.jpg';
import { APP_ROUTES } from "../../appConfig";

function Ingressos(): JSX.Element {

   const [ingressos, setIngressos] = useState([
     {
        id: 3,
        titulo: 'Oppenheimer',
        duracao: '180min',
        genero: 'Drama / Biografia',
        descricao: 'A história de J. Robert Oppenheimer e o desenvolvimento da bomba atômica.',
        sala: 'SALA 1 - IMAX',
        fileira: 'A',
        assento: '5',
        data: '12/12',
        horario: '22:00',
        poster: poster3 
    },
    
    {
        id: 2,
        titulo: 'A Mulher no Jardim',
        duracao: '125min',
        genero: 'Suspense / Drama',
        descricao: 'Uma mulher descobre segredos sombrios escondidos no jardim de sua nova casa.',
        sala: 'SALA 3 - XD',
        fileira: 'B',
        assento: '4',
        data: '13/12',
        horario: '19:20',
        poster: poster2 
    },
    {
        id: 1,
        titulo: 'Zootopia 2',
        duracao: '105min',
        genero: 'Animação / Comédia',
        descricao: 'Judy Hopps e Nick Wilde enfrentam um novo mistério que ameaça toda a cidade.',
        sala: 'SALA 4 - 2D',
        fileira: 'A',
        assento: '2',
        data: '10/12',
        horario: '16:00',
        poster: poster1 
    }
     
    
]);

 
    const deletarIngresso = (id: number) => {
        setIngressos(prev => prev.filter(i => i.id !== id));
    };

    const hasIngressos = ingressos.length > 0;

    return (
        <main className={estilo.ingressos}>
            <h2 className={estilo.titulo}>SEUS INGRESSOS</h2>

            {hasIngressos ? (
                <>
                    {ingressos.map((ingresso) => (
                        <div key={ingresso.id} className={estilo.cartao}>

                            <img
                                className={estilo.poster}
                                src={ingresso.poster}
                                alt={`Poster do filme ${ingresso.titulo}`}
                            />

                            <div className={estilo.info}>
                                <h3 className={estilo.nome}>
                                    {ingresso.titulo} <span className={estilo.classificacao}>L</span>
                                </h3>

                                <p className={estilo.duracaoGenero}>
                                    {ingresso.duracao} - {ingresso.genero}
                                </p>

                                <p className={estilo.descricao}>{ingresso.descricao}</p>
                            </div>

                            <div className={estilo.detalhes}>
                                <div className={estilo.blocoPreto}>
                                    {ingresso.sala}<br />
                                    FILEIRA {ingresso.fileira}<br />
                                    ASSENTO {ingresso.assento}
                                </div>

                                <div className={estilo.blocoPreto}>
                                    {ingresso.data}<br />
                                    {ingresso.horario}
                                </div>
                            </div>

                            {/* Botão deletar */}
                            <button
                                className={estilo.botaoDeletar}
                                onClick={() => deletarIngresso(ingresso.id)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </>
            ) : (
                <p className={estilo.semIngresso}>Você ainda não comprou ingressos.</p>
            )}

            <div className={estilo.rodape}>
                <p>Compre seu ingresso agora e evite filas!</p>
                <a href={APP_ROUTES.ROUTE_PROGRAMACAO} className={estilo.botao}>Ver programação</a>
            </div>
        </main>
    );
}

export default Ingressos;
