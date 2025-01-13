import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Version1 from './Pages/Version1';
import Version2 from './Pages/Version2';
import Topbar from './Pages/Topbar';
import Version3 from './Pages/Version3';


function App() {
  return (
    <Router>
      
      <div className='App'>
        <Topbar />
          <Routes>
            <Route path='/' element={<Version1 />} />
            <Route path='/version2' element={<Version2 />} />
            <Route path='/version3' element={<Version3 />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;