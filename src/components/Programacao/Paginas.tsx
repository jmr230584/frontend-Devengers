import { JSX } from "react";
import { APP_ROUTES } from "../../appConfig";
import estilo from '../Programacao/Paginas.module.css';

function Paginas(): JSX.Element {
    return(
        <main className={estilo.Paginas}>
            <a className={estilo.textPag} href={APP_ROUTES.ROUTE_PROGRAMACAO}>Em Cartaz</a>
            <a className={estilo.textPag} href={APP_ROUTES.ROUTE_EM_BREVE}>Em Breve</a>
            <a className={estilo.textPag}href={APP_ROUTES.ROUTE_PRE_VENDA}>Pré-Vendas</a>
        </main>
    )
}
export default Paginas;