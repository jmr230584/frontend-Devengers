import { JSX, useEffect, useState } from 'react';
import estilo from './Cabecalho.module.css';
import logotipo from '../../assets/logotipo.png';
import ingressos from '../../assets/icon-ingressos.png';
import programacao from '../../assets/icon-programacao.png';
import salas from '../../assets/icon-nossas-salas.png';
import sobre from '../../assets/icon-sobre-nos.png';
import cadastro from '../../assets/icon-cadastro.png';
import { APP_ROUTES } from '../../appConfig';
import AuthRequests from '../../fetch/AuthRequests';

function Cabecalho(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');

        if (isAuth && token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false); // atualiza estado local
    };


    return (
        <header className={estilo.cabecalho}>
            <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                <img src={logotipo} alt="logotipo" />
            </a>
            <div className={estilo.direita}>
                <nav className={estilo.navLinks}>
                    <ul>
                        {isAuthenticated && (
                            <li>
                                <img src={ingressos} alt="ingressos" />
                                <a href={APP_ROUTES.ROUTE_INGRESSOS}>INGRESSOS</a>
                            </li>
                        )}
                        <li>
                            <img src={programacao} alt="programacao" />
                            <a href={APP_ROUTES.ROUTE_PROGRAMACAO}>PROGRAMAÇÃO</a>
                        </li>
                        <li>
                            <img src={salas} alt="salas" />
                            <a href={APP_ROUTES.ROUTE_NOSSAS_SALAS}>NOSSAS SALAS</a>
                        </li>
                        <li>
                            <img src={sobre} alt="sobre" />
                            <a href={APP_ROUTES.ROUTE_SOBRE_NOS}>SOBRE NÓS</a>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <img src={cadastro} alt="cadastro" />
                                <a href={APP_ROUTES.ROUTE_CADASTRO}>CADASTRO</a>
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Botão de logout separado */}
                {isAuthenticated && (
                    <button onClick={logout} className={estilo.botaoLogout}>
                        Logout
                    </button>
                )}
            </div>

        </header>
    )
}

export default Cabecalho;