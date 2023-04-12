import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import logo from './img/Oytie.png';
import Feeinfo from "./Feesinfo";
import Home from "./Home"
import Admissioninfo from "./Admissioninfo"
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
       
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  
  return (
    <Router>
    <div>
    <Navbar bg="dark" expand="lg" className={scrolled ? "scrolled" : ""}> 
      <Container>
      <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
        <Navbar.Brand as={ Link } to={ "/Home" } >Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Report" id="basic-nav-dropdown">
              <NavDropdown.Item as={ Link } to={ "/feeinfo" } >Fee Information</NavDropdown.Item>
              <NavDropdown.Item as={ Link } to={ "/Admissioninfo" } >
                Admission Information
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
    <Routes>
    <Route path="/Home" element={<Home/>}/>
    <Route path="/feeinfo" element={<Feeinfo/>}/>
    <Route path="/Admissioninfo" element={<Admissioninfo/>}/>
    </Routes>
    </div>
    </Router>
  );
}

export default NavBar;