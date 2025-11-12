import { JSX, useEffect, useState } from 'react';
import estilo from './Cabecalho.module.css';
import logotipo from '../../assets/logotipo.png';
import ingressos from '../../assets/icon-ingressos.png';
import programacao from '../../assets/icon-programacao.png';
import salas from '../../assets/icon-nossas-salas.png';
import sobre from '../../assets/icon-sobre-nos.png';
import cadastro from '../../assets/icon-cadastro.png';
import { APP_ROUTES, SERVER_CFG } from '../../appConfig';
import AuthRequests from '../../fetch/AuthRequests';

function Cabecalho(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
    const [imagemPerfil, setImagemPerfil] = useState('');

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');
        const imagem: string | null = localStorage.getItem('imagemPerfil');

        if (isAuth && token && AuthRequests.checkTokenExpiry()) {
            setIsAuthenticated(true);
            setNomeUsuario(nome);
            setImagemPerfil(imagem ? imagem : '');
            console.log("Imagem de perfil no cabeçalho:", imagemPerfil);
        } else {
            setIsAuthenticated(false);
            setNomeUsuario(null);
        }
    }, []);

    const logout = () => {
        AuthRequests.removeToken();
        setIsAuthenticated(false);
        setNomeUsuario(null);
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

                {isAuthenticated && (
                    <div className={estilo.usuarioArea}>
                        <img
                            src={
                                imagemPerfil && imagemPerfil.trim() !== ""
                                    ? imagemPerfil
                                    : `https://api.dicebear.com/9.x/avataaars-neutral/png?seed=${encodeURIComponent(
                                        (nomeUsuario || "usuario")
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .replace(/[^a-zA-Z0-9]/g, "")
                                    )}&size=40`
                            }
                            onError={(e) =>
                            (e.currentTarget.src =
                                "https://api.dicebear.com/9.x/identicon/png?seed=backup&size=40")
                            }
                            alt="Avatar do usuário"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />




                        <span className={estilo.boasVindas}>
                            Olá{nomeUsuario ? `, ${nomeUsuario.split(' ')[0]}!` : '!'}
                        </span>
                        <button onClick={logout} className={estilo.botaoLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

        </header>
    );
}

export default Cabecalho;
