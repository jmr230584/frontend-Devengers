import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={APP_ROUTES.ROUTE_HOME} element={<PHome />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;