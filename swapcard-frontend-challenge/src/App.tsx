import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="App">
      <Home />
    </div>
  </BrowserRouter>
);

export default App;
