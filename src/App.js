import React, {useState} from 'react';
import { Route, Routes, Outlet } from 'react-router-dom' ;
import './App.css';
import LocationContext from './Context/LocationContext';
import Location from './components/Location';
import Header from './components/Header';
import List from './components/List';



const ListLayout = () => {
  return (
    <>
      <Header locationheader={false} />
      <Outlet />
    </>
  )
}

const LocationLayout = ({selectedLocation, mode, id}) => {
  return (
    <>
      <LocationContext.Provider value={selectedLocation}>
          <Header locationheader={true} mode={mode} id={id}/>
          <Outlet />
        </LocationContext.Provider>
    </>
  )
}

function App() {
  const [ selectedLocation, setSelectedLocation] = useState('');
  const [mode, setMode] = useState('');
  const [id, setId] = useState('');
  const [location, setLocation] = useState({});
  return (
    <>
      <Routes>
      <Route exact path="/" element={<ListLayout/>}>  
          <Route index element={<List
          setLocation={setLocation}
          setMode={setMode} 
          setId={setId}
          setSelectedLocation={setSelectedLocation} />} /> 
      </Route>
        <Route path="/location" element={<LocationLayout
        selectedLocation={selectedLocation} 
        mode={mode}
        id={id}/>}>
          <Route index element={<Location
          location={location}
          setSelectedLocation={setSelectedLocation}
          mode={mode}/>}/>
      </Route>
     </Routes>
    </>
  );
}

export default App;
