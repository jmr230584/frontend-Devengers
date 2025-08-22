import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Paginas from "../../components/Programacao/Paginas";
import Navbar2 from "../../components/Navbar/Embreve";

function PEmbreve(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Paginas />
            <Navbar2/>
        </>
    );
}

export default PEmbreve;