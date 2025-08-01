import { JSX } from "react";
import estilo from "./CadastroForm.module.css"
import { APP_ROUTES } from "../../../appConfig";

function Cadastro(): JSX.Element {
    return (
        <main className={estilo.cadastro}>
            <div>
                <a className={estilo.button} href={APP_ROUTES.ROUTE_LOGIN}>LOGIN</a>
            </div>
        </main>
    )
}

export default Cadastro;