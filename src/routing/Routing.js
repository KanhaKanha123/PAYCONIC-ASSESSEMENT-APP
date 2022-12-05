import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import { RoutesConfig } from '../constants/constant';
import History from '../components/history/History';
import ErrorBoundary from '../error-boundries/ErrorBoundry';

const Routing = () => (<Routes>
    <Route path={RoutesConfig.dashboard} element={<ErrorBoundary><Dashboard /></ErrorBoundary>}>
    </Route>
    <Route path={RoutesConfig.history} element={<ErrorBoundary><History /></ErrorBoundary>}>
    </Route>
    <Route path="*" element={<ErrorBoundary><Dashboard /></ErrorBoundary>}>
    </Route>
</Routes>);

export default Routing;
