import './App.css';
import {HashRouter, Routes, Route, NavLink} from 'react-router-dom';
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Dashboard></Dashboard>
        <Button variant='primary'></Button>
      </header>
      
    </div>
  );
}

export default App;
