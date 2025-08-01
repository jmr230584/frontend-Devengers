import { JSX } from "react";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import LoginForm from "../../components/Formularios/LoginForm/Login";

function PLogin(): JSX.Element {
    return (
        <>
            <Cabecalho />
            <LoginForm />
        </>
    );
}

export default PLogin;