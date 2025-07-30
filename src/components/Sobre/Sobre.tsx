import { JSX } from "react";
import estilo from './Sobre.module.css';
import foto from '../../assets/sobre-nos.png';

function Sobre(): JSX.Element {
    return (
        <main className={estilo.sobre}>
            <div className={estilo.esquerda}>
                <h2 className={estilo.titulo}>CINEPOP</h2>
                <h2>SOBRE NÓS</h2>
                <p>No CinePop, acreditamos que o cinema vai muito além de uma tela: ele é uma experiência
                    que conecta pessoas, desperta emoções e cria memórias. Pensando nisso, desenvolvemos
                    uma plataforma prática e acessível para que você possa conferir os filmes em cartaz,
                    agendar sessões e garantir seus ingressos com facilidade e segurança.  Nosso objetivo
                    é tornar cada etapa mais simples — do planejamento à poltrona escolhida — oferecendo
                    uma navegação intuitiva, informações atualizadas e um espaço onde cada cliente tem
                    controle total sobre suas sessões.  Aqui no CinePop, a magia do cinema começa no
                    clique. Seja bem-vindo(a)! <br />
                    Ah, e não se preocupe: aqui ninguém vai te julgar por assistir o mesmo filme três
                    vezes (a gente também já fez isso). Se quiser garantir aquela poltrona do fundo — a
                    clássica “assento premium para sonecas acidentais” — é só agendar com antecedência!
                    No CinePop, o único drama que você vai encontrar... é o do gênero cinematográfico
                    mesmo.</p>
            </div>
            <img className={estilo.direita} src={foto} alt="foto" />
        </main>
    )
}

export default Sobre;