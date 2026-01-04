import Home from './element/Home';
import { BrowserRouter as Router,Route,Routes,useLocation } from 'react-router-dom';
import Navbar  from '../src/element/Navbar';
import Footer from '../src/element/Footer';
import About  from './element/About';
import Student from './element/Student';
import Contect from './element/Contect';
import Admin from './element/Admin';
import Admission from './element/Admission';
import NotFound from './element/Notfound';
function App(){

    return (
        <>
            {/* <Router>
                <Navbar/> 
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/About" element={<About/>} />
                    <Route path="/Contect" element={<Contect/>} />
                    <Route path="/Admin" element={<Admin/>}/>
                    <Route path="/Admission" element={<Admission/>} />
                </Routes>
                <Footer/>
            </Router> */}
            <Router>
                <MainLayout/>
            </Router>
        </>
)}

const MainLayout = ()=>{

    const location = useLocation();
    return(
        <>
            { (location.pathname !== '/admin'  && location.pathname !== '/Admin'  && location.pathname !== '/Student' ) && <Navbar/>}
            <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/About" element={<About/>} />
                    <Route path="/Contect" element={<Contect/>} />
                    <Route path="/Admin" element={<Admin/>}/>
                    <Route path="/Admission" element={<Admission/>} />
                    <Route path="/Student" element={<Student/>} />
                    <Route path="*" element={<NotFound/>} />
            </Routes>
            {  (location.pathname !== '/admin'  && location.pathname !== '/Admin'  && location.pathname !== '/Student' ) && <Footer/>}
        </>
    )

}

export default App;
