import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Layout from '../components/Layout/Layout';
import ReactHookFormPage from '../pages/ReactHookFormPage/ReactHookFormPage';
import UncontrolledFormPage from '../pages/UncontrolledFormPage/UncontrolledFormPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="uncontrolled-form" element={<UncontrolledFormPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRouter;
