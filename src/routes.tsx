import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';
import PCadastro from './pages/PCadastro/PCadastro';
import PIngressos from './pages/PIngressos/PIngressos';
import PNossasSalas from './pages/PNossasSalas/PNossasSalas';
import PProgramacao from './pages/PProgramacao/PProgramacao';
import PSobreNos from './pages/PSobreNos/PSobreNos';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={APP_ROUTES.ROUTE_HOME} element={<PHome />}></Route>
                <Route path={APP_ROUTES.ROUTE_INGRESSOS} element={<PIngressos />}></Route>
                <Route path={APP_ROUTES.ROUTE_PROGRAMACAO} element={<PProgramacao />}></Route>
                <Route path={APP_ROUTES.ROUTE_NOSSAS_SALAS} element={<PNossasSalas />}></Route>
                <Route path={APP_ROUTES.ROUTE_SOBRE_NOS} element={<PSobreNos />}></Route>
                <Route path={APP_ROUTES.ROUTE_CADASTRO} element={<PCadastro/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;