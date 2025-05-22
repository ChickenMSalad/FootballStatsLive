import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Team from './pages/Team/Team';
import About from './pages/About/About';
import Documentation from './pages/Documentation/Documentation';
import Footer from './components/Footer/Footer';

function App() {

    return (
        <div className='app'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/team/:teamId' element={<Team />} />
                <Route path='/documentation' element={<Documentation />} />
                <Route path='/about' element={<About />} />
            </Routes>
            <Footer />
        </div>
    );

}

export default App;