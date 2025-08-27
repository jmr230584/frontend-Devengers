import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Paginas from "../../components/Programacao/Paginas";
import Navbar2 from "../../components/Navbar/Embreve";
import Listafilmes from "../../components/ListaFilmes";

function PEmbreve(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Paginas />
            <Navbar2/>
            <Listafilmes/>
            
        </>
    );
}

export default PEmbreve;