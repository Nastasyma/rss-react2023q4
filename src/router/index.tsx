import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import { RoutesName } from '../utils/types';
import Root from '../components/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={RoutesName.home} element={<Root />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

export default router;
