import Home from './Home';
import LandingPage from './LandingPage';
import Signup from './signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight:'100vh'}}>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path = '/' Component={Signup}> </Route>
        <Route path = '/Home' Component={Home}> </Route>
        <Route path = '/LandingPage' Component={LandingPage}> </Route>
      </Routes>
      </div>
   
    </BrowserRouter>
    </Container>
   
    </>
   
  );
}

export default App;
