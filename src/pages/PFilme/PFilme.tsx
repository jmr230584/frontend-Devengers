import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Filme from "../../components/Filme/Filme";

function PFilme(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Filme />
        </>
    );
}

export default PFilme;