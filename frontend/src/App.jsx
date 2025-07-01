import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import axios from 'axios'
import Formatter from './pages/Formatter/Formatter'
import EncoderDecoder from './pages/EncoderDecoder/EncoderDecoder'
import JsonHistory from './pages/JsonHistory/JsonHistory'




const App = () => {

  useEffect(()=>{
    axios.get('/api/')
    .then ((response) => {
      console.log('API Response:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching API:', error);
    })
  },[]);

  return (
    <div className='app'>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formatter" element={<Formatter />} />
        <Route path="/encoder-decoder" element={<EncoderDecoder/>} />
        <Route path="/json-history" element={<JsonHistory />} />
      </Routes>
    </div>
  )
}

export default App