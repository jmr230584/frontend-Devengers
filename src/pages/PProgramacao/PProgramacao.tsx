import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Paginas from "../../components/Programacao/Paginas";
import Navbar from "../../components/Navbar";
import Listafilmes from "../../components/ListaFilmes";
import CartaoFilmeFixo from "../../components/CartaoFixo/cartaoFixo";

function PProgramacao(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Paginas />
            <Navbar />
            <Listafilmes/>
            <CartaoFilmeFixo />
        </>
    );
}

export default PProgramacao;