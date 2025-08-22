import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import Paginas from "../../components/Programacao/Paginas";
import Navbar3 from "../../components/Navbar/Prevenda";

function PPreVenda(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <Paginas />
            <Navbar3/>
        </>
    );
}

export default PPreVenda;