import { JSX } from "react";
import estilo from './Welcome.module.css';
import poltronas from '../../assets/poltronas.jpg';
import pessoas from '../../assets/pessoas.jpg';
import pipoca from '../../assets/pipoca.jpg';
import { APP_ROUTES } from "../../appConfig";

function Welcome(): JSX.Element {
    return (
        <main className={estilo.welcome}>
            <h1>DESCUBRA O CINEPOP</h1>
            <p>Bem vindo ao nosso cinema, onde a diversão está garantida. <br />
                Adquira seus ingressos online hoj e prepare-se para uma <br />
                experiência única!</p>
            <a className={estilo.explorar} href={APP_ROUTES.ROUTE_PROGRAMACAO}>Explorar</a>
            <div className={estilo.imagens}>
                <img className={estilo.img1} src={pipoca} alt="pipoca" />
                <img className={estilo.img2} src={pessoas} alt="pessoas" />
                <img className={estilo.img3} src={poltronas} alt="poltronas" />
            </div>
        </main>

    )
}

export default Welcome;