import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Hospitales from './components/hospitales/Hospitales';
import Reporte from './components/reporte/Reporte';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="">
        <Route path="/" exact component={Home} />
        <Route path="/hospitales" component={Hospitales} />
        <Route path="/reporte" component={Reporte} />
      </div>

    </Router>
  );
}

export default App;
