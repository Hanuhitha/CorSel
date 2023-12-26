import Home from './Home';
import LandingPage from './LandingPage';
import Signup from './signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import ClassSearch from './ClassSearch';
import Credits from './Credits';
import Forms from './Forms';

function App() {
  return (
    <AuthProvider>
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight:'100vh'}}>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path = '/' Component={Signup}> </Route>
        <Route path = '/Home' Component={Home}> </Route>
        <Route path = '/LandingPage' Component={LandingPage}> </Route>
        <Route path = '/login' Component={Login}> </Route>
        <Route path = '/ClassSearch' Component={ClassSearch}> </Route>
        <Route path = '/Forms' Component={Forms}> </Route>
        <Route path = '/Credits' Component={Credits}> </Route>
      </Routes>
      </div>
   
    </BrowserRouter>
    </Container>
    </AuthProvider>
   
  );
}

export default App;
