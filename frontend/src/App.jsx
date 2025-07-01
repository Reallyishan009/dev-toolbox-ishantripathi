import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import axios from 'axios'



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
          <Route path='/' element={<Home/>} />
        {/* <Route path='/formatter' element={<Formatter/>} />
        <Route path='/encoder-decoder' element={<Encoder-Decoder/>} />
        <Route path='/json-history' element={<Jason-History/>} /> */}
        </Routes>
    </div>
  )
}

export default App