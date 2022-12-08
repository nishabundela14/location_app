import React, {useState, useEffect} from 'react';
import {Badge, Button, Container, Row, Col, ButtonGroup, Dropdown} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const List = ({setLocation,setMode, setId, setSelectedLocation}) => {
  const navigate = useNavigate();
  const [list, setList]=useState([]);
  

  useEffect(() => {
    if (localStorage && localStorage.getItem("list") ) {
      const lists = JSON.parse(localStorage.getItem("list"))
      setList(lists)
    }
    setSelectedLocation({})
    setLocation({})
  },[]);

  const handleAdd = () => {
    setMode('add')
    navigate('/location')
  }

  const handleDelete = (item,id) => {
    const filtered = list.filter((item) => item.id !== id);
    setList(filtered)
    localStorage.setItem("list", JSON.stringify(filtered));
  }

  const handleEdit = (item) => {
    setMode('edit')
    setSelectedLocation({})
    setId(item.id);
    setLocation({lat: item.latitude, lng: item.longitude})
    navigate('/location')
  }

  return (
    <>
     {
                    list.map((item) => {
                        return <Container key={item.id}>
                                <Row sm={12}>
                                    <Col sm={2} lg={1}> <Badge className='badge-color'><span>{item.currently?.temperature}'C</span></Badge></Col>
                                    <Col sm={6} lg={7}>
                                    <div>
                                        <h2 className="heading">{item.timezone} - {item.latitude}, {item.longitude}</h2>
                                        <h5 className='subheading'>{item.currently?.summary}</h5>
                                        <h5 className='subheading'>{item.daily?.summary}</h5>
                                    </div>
                                    </Col>
                                    <Col sm={4} lg={4} className="btnGrp">
                                        <Dropdown as={ButtonGroup} >
                                        <Button variant="success" className="grp"  onClick={() => handleEdit(item)}>Edit</Button>

                                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                        <Dropdown.Menu>
                                            <Dropdown.Item  onClick={() => handleDelete(item, item.id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                    <div className='gray-bar'>
                                    <span>Wind Speed </span><img className='img' src="icons/arrow.png" alt="arrow" /> <span>{item.currently?.windSpeed}</span> <span className='img'>KM/H</span>
                                    <span className='img'>Humidity {item.currently?.humidity}</span>
                                    </div>
                                    </Col>
                                </Row>
                                </Container>
                                
                    })
                }
                <Container fluid>
     
     <Row>
       <Col className='text-center'>
       <Button  variant="outline-primary" className='btn-add'  onClick={handleAdd}>Add new location</Button>
       </Col>
     </Row>
   </Container>
    </>
    
  )
}

export default List