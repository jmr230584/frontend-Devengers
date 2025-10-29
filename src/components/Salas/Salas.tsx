import { JSX } from "react";
import estilo from "./Salas.module.css";

// Imagens das salas
import img2d from "../../assets/sala-2d.png";
import img3d from "../../assets/sala-3d.png";
import imgVip from "../../assets/sala-vip.png";
import imgImax from "../../assets/sala-imax.png";
import imgConv from "../../assets/sala-convencional.png";

function Salas(): JSX.Element {
    return (
        <main className={estilo.salas}>
            <h1 className={estilo.titulo}>NOSSAS SALAS</h1>
            <section className={estilo.sala}>
                <img src={img2d} alt="Sala 2D" />
                <div className={estilo.conteudo}>
                    <h2>SALAS 2D</h2>
                    <p>
                        Oferece uma experiência visual nítida, com som de alta qualidade e poltronas
                        confortáveis, proporcionando uma atmosfera imersiva para o espectador.
                    </p>
                </div>
            </section>

            <section className={estilo.sala}>
                <img src={img3d} alt="Sala 3D" />
                <div className={estilo.conteudo}>
                    <h2>SALAS 3D</h2>
                    <p>
                        As salas de cinema 3D proporcionam uma experiência mais imersiva, utilizando
                        óculos especiais para criar uma sensação de profundidade nas imagens.
                    </p>
                </div>
            </section>

            <section className={estilo.sala}>
                <img src={imgVip} alt="Sala VIP" />
                <div className={estilo.conteudo}>
                    <h2>SALAS VIP</h2>
                    <p>
                        Oferecem uma experiência mais personalizada e confortável, com poltronas
                        maiores e mais confortáveis, com apoio para pernas e inclinação automática.
                    </p>
                </div>
            </section>

            <section className={estilo.sala}>
                <img src={imgImax} alt="Sala IMAX" />
                <div className={estilo.conteudo}>
                    <h2>SALAS IMAX</h2>
                    <p>
                        Uma sala equipada com tecnologia que oferece uma experiência de visualização de
                        filmes superior, com telas maiores, mais nítidas e sistemas de som imersivos.
                    </p>
                </div>
            </section>

            <section className={estilo.sala}>
                <img src={imgConv} alt="Sala Convencional" />
                <div className={estilo.conteudo}>
                    <h2>SALAS CONVENCIONAIS</h2>
                    <p>
                        Contêm uma tela reta e simples, com cadeiras dispostas em fileiras retas, geralmente
                        em um piso inclinado para garantir a visão para todos. Os alto-falantes estão
                        geralmente atrás da tela.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Salas;
