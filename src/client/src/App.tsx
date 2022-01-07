import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/loginPage/LoginPage';
import QuoteApp from './pages/quoteApp/QuoteApp';
import RegisterPage from './pages/registerPage/RegisterPage';
import WelcomePage from './pages/welcomePage/WelcomePage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuoteApp />} />
          {/* <Route path='/' element={<WelcomePage />} /> */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
