import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/loginPage/LoginPage';
import AllQuotes from './pages/quoteApp/allQuotes/AllQuotes';
import MyProfile from './pages/quoteApp/myProfile/MyProfile';
import QuoteApp from './pages/quoteApp/QuoteApp';
import Top5MostVotes from './pages/quoteApp/top5/Top5MostVotes';
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
          <Route path='/gigaQuote/allQuotes' element={<AllQuotes />} />
          <Route path='/gigaQuote/profile' element={<MyProfile />} />
          <Route path='/gigaQuote/top5' element={<Top5MostVotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
