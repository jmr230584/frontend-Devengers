import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Paginas from "../../components/Programacao/Paginas";

function PEmbreve(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Paginas />
        </>
    );
}

export default PEmbreve;