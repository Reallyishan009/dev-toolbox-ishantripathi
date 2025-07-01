import React, { use } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  
  const navigate = useNavigate();
  
  // Function to handle button click for JSON Formatter
  const handleFormatterClick = () => {
    navigate('/formatter');
  };  
  // Function to handle button click for Base64 Encoder/Decoder
  const handleEncoderDecoderClick = () => {
    navigate('/encoder-decoder');
  };
  // Function to handle button click for JSON History
  const handleJsonHistoryClick = () => {
    navigate('/json-history');
  };



  // This is the home page component for the dev-toolbox application.
  return (
    <div >
      <div className='home-header'>
        <h2>hello, this is dev-toolbox</h2>
        <p>
          Boost your productivity with a suite of powerful developer utilities — instantly format JSON, seamlessly encode and decode Base64, use intuitive copy features, and switch between light and dark modes to match your style and comfort.
        </p>
      </div>
      <br/>
      <div className='home-content'>
        <div className='home-card'>
          <ul>
            <li>
            <h3>JSON Formatter</h3>
            <p>Format your JSON data with ease. Just paste your JSON and get a well formatted output.</p>
            <button onClick={handleFormatterClick}   className='formatter-button'>Go to Formatter</button>
            </li>
            <li>
            <h3>Base64 Encoder/Decoder</h3>
            <p>Encode and decode Base64 data effortlessly. Just paste your data and get the output.</p>
            <button onClick={handleEncoderDecoderClick} className='encode/decode-button'>Go to Encoder/Decoder</button>
            </li>
            <li>
            <h3>JSON History</h3>
            <p>Keep track of your JSON data with our history feature. View, edit, and delete your JSON data.</p>
            <button onClick={handleJsonHistoryClick} className='jsonhistory-button'>Go to JSON History</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;