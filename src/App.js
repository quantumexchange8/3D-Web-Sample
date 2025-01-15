import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Version1 from './Pages/Version1';
import Version2 from './Pages/Version2';
import Topbar from './Pages/Topbar';
import Version3 from './Pages/Version3';
import Version4 from './Pages/Version4';
import Version5 from './Pages/Version5';
import Version6 from './Pages/Version6';
import Version7 from './Pages/Version7';
import Version8 from './Pages/Version8';




function App() {
  return (
    <Router>
      
      <div className='App'>
        <Topbar />
          <Routes>
            <Route path='/' element={<Version1 />} />
            <Route path='/version2' element={<Version2 />} />
            <Route path='/version3' element={<Version3 />} />
            <Route path='/version4' element={<Version4 />} />
            <Route path='/version5' element={<Version5 />} />
            <Route path='/version6' element={<Version6   />} />
            <Route path='/version7' element={<Version7 />} />
            <Route path='/version8' element={<Version8 />} />

          </Routes>
      </div>
    </Router>
  );
}

export default App;