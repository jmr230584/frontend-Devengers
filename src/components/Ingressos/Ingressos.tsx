import { JSX } from "react";
import estilo from './Ingressos.module.css';
import poster from '../../assets/the-wild-robot.png'; 

function Ingressos(): JSX.Element {
    const hasIngressos = true; // Simula se o usuário comprou ingressos

    const ingresso = {
        titulo: 'The Wild Robot',
        duracao: '100min',
        genero: 'Animação',
        descricao: 'A robô ROZZUM 7134 naufraga em uma ilha desabitada e aprende a viver em harmonia com os animais locais, enquanto cuida de um filhote de ganso.',
        sala: 'SALA 1 - 3D',
        fileira: '80',
        assento: '9',
        data: '29/05',
        horario: '16:30'
    };

    return (
        <main className={estilo.ingressos}>
            <h2 className={estilo.titulo}>SEUS INGRESSOS</h2>

            {hasIngressos ? (
                <>
                    {[1, 2].map((_, index) => (
                        <div key={index} className={estilo.cartao}>
                            <img className={estilo.poster} src={poster} alt="Poster do filme The Wild Robot" />
                            <div className={estilo.info}>
                                <h3 className={estilo.nome}>
                                    {ingresso.titulo} <span className={estilo.classificacao}>L</span>
                                </h3>
                                <p className={estilo.duracaoGenero}>{ingresso.duracao} - {ingresso.genero}</p>
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
                        </div>
                    ))}
                </>
            ) : (
                <p className={estilo.semIngresso}>Você ainda não comprou ingressos.</p>
            )}

            <div className={estilo.rodape}>
                <p>Compre seu ingresso agora e evite filas!</p>
                <button className={estilo.botao}>Ver programação</button>
            </div>
        </main>
    );
}

export default Ingressos;
