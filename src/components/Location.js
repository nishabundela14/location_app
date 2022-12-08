import React,{useEffect, useState, memo} from 'react';
import { GoogleMap, Marker} from '@react-google-maps/api';
import { Container, Alert, Spinner } from 'react-bootstrap';

const Location = ({location, setSelectedLocation, mode}) => {
    const [ currentPosition, setCurrentPosition ] = useState('');
    const [err, setErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    //map
    const mapStyles = {        
        height: "100vh",
        width: "100%"
    };
    const changePosition = (position) => {
        let currentPosition;
        if (position) {
            if (mode === 'add') {
                currentPosition = {
                    lat: parseFloat(position.coords.latitude),
                    lng: parseFloat(position.coords.longitude)
                }
            }
            if (mode === 'edit') {
                currentPosition = {
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lng)
                }
            }
            setCurrentPosition(currentPosition);
        }
        
    };
    
    useEffect(() => {
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(changePosition);
    },[])

    const onMarkerDragEnd = (e) => {
        const lat = parseFloat(e.latLng.lat());
        const lng = parseFloat(e.latLng.lng());
        setCurrentPosition({ lat, lng})
    };
    useEffect(() => {
        if (currentPosition) {
            handleGetLocation()
        }
    }, [currentPosition]);
    //map

    const handleGetLocation = async() => {
        const URL = process.env.REACT_APP_API_KEY;
        try {
          const res = await fetch(`http://prometheus-api.zkx.fi/${URL}/${currentPosition.lat},${currentPosition.lng}`);
          const result = await res.json();
          result.id = `location-item-${result.latitude}-${result.longitude}`;
          setSelectedLocation(result)
          setIsLoading(false)
        } catch(e) {
           console.log(e)
           setErr(true)
           setIsLoading(false)
        } 
    }


    return (
            <Container className='loc-map' fluid>
            {
            err && <Alert variant="danger" onClose={() => setErr(false)} dismissible>
            <p>Something went wrong. Please try again.</p>
          </Alert>
          }
          { isLoading &&
            <Spinner animation="border" role="status" className='spinner'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          }
          <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
                {
                    currentPosition.lat ? 
                    <Marker
                    position={currentPosition}
                    onDragEnd={(e) => onMarkerDragEnd(e)}
                    draggable={true} /> :
                    null
                }
          </GoogleMap>
          </Container>
      )
}

export default memo(Location)