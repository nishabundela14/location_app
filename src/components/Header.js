import React,{useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import LocationContext from '../Context/LocationContext';

const Header = ({locationheader, mode, id}) => {
  const selectedLocation = useContext(LocationContext);
  const navigate = useNavigate();

  const handleClick = () => {
      let data = [];
      if (localStorage && localStorage.getItem("list")) {
            data = JSON.parse(localStorage.getItem("list"));
      }
      if (mode === 'add') {
        data.push(selectedLocation);
        localStorage.setItem("list", JSON.stringify(data));
      } 
      if (mode === 'edit') {
          const newState = data.map((item) => {
            if (item.id === id) {
              item = selectedLocation;
            }
            return item
          });
          localStorage.setItem("list", JSON.stringify(newState));
      }
      navigate('/')
  }

  return (
    <header>
        <Navbar bg="primary" variant="dark" className="mb-3 navHeight">
        { locationheader === false && <Container>
          <Navbar.Brand>Prometheus <br/>
            <span>You can add, edit and delete locations</span>
          </Navbar.Brand>
          <Nav className="nav-menu">
          <img src='/icons/search.png' className='search' alt="search" />
          <Navbar.Toggle />
          </Nav>
        </Container>
        }
        { locationheader === true && <Container>
          <Navbar.Brand>Add Location<br/>
            <span>{selectedLocation?.timezone}{selectedLocation?.latitude ? '-':''}{selectedLocation?.latitude}{selectedLocation?.latitude ? ',':''}{selectedLocation?.longitude}</span>
          </Navbar.Brand>
          <Nav>
          {selectedLocation?.latitude && <Button variant="secondary" className='btn-space' onClick={handleClick}>Add to list</Button>}
          {selectedLocation?.latitude && <Button variant="secondary" onClick={() => navigate('/')}>Cancel</Button>}
          <Navbar.Toggle />
          </Nav>
        </Container>
        }
      </Navbar>
    </header>
  )
}

export default Header