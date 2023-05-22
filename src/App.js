import './App.css';
import Hero from "./hero.jsx"
import Login from './login/login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes> 
    </BrowserRouter>

  );
}


export default App;
