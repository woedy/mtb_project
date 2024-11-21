import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';

import DefaultLayout from './layout/DefaultLayout';
import PageTitle from './components/PageTitle';
import LoginPage from './pages/UserData/LoginPage';
import LoginPageRepeat from './pages/UserData/LoginPageRepeat';
import BasicInfoPage from './pages/UserData/BasicInfoPage';

import TermsPage from './pages/UserData/TermsPage';
import AccountInfo from './pages/UserData/AccountInfo';
import AccountInfoPage from './pages/UserData/AccountInfo';
import AccountInfoPageRepeat from './pages/UserData/AccountInfoRepeat';

const hiddenOnRoutes = ['/', '/login', '/account-info','/account-info-confirm', '/basic-info', '/home-address', '/social-security', '/social-security-error', "/terms-conditions"];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout pathname={pathname} hiddenOnRoutes={hiddenOnRoutes}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Log in - Personal Banking  | M&T Bank" />
              <LoginPage />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Log in - Personal Banking  | M&T Bank" />
              <LoginPageRepeat />
            </>
          }
        />


<Route
          path="/account-info"
          element={
            <>
              <PageTitle title="Log in - Personal Banking  | M&T Bank" />
              <AccountInfoPage />
            </>
          }
        />

<Route
          path="/account-info-confirm"
          element={
            <>
              <PageTitle title="Log in - Personal Banking  | M&T Bank" />
              <AccountInfoPageRepeat />
            </>
          }
        />

        <Route
          path="/basic-info"
          element={
            <>
              <PageTitle title="Baisc info - Personal Banking  | M&T Bank" />
              <BasicInfoPage />
            </>
          }
        />






<Route
          path="/terms-conditions"
          element={
            <>
              <PageTitle title="Terms & Conditions - Personal Banking  | M&T Bank" />
              <TermsPage />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
