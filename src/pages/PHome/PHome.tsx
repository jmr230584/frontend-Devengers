import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Welcome from "../../components/Welcome/Welcome";

function PHome(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Welcome />
        </>
    );
}

export default PHome;