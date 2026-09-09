import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';



function App() {

 

return(
  <BrowserRouter>
  <Routes>
    <Route path= '/' element={<LandingPage />} />
    <Route path='/home' element={<HomePage />} />
  </Routes>
  </BrowserRouter>
)
}


export default App;