import React, { useState } from 'react'
import './EncoderDecoder.css'; 

const EncoderDecoder = () => {

  const [input,setInput] = useState('');
  const [output,setOutput] =useState('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input); // Encode to Base64
      setOutput(encoded);
    } catch (error) {
      setOutput('Encoding error: Invalid input');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input); // Decode from Base64
      setOutput(decoded);
    } catch (error) {
      setOutput('Decoding error: Invalid Base64 string');
    }
  };

  const handleLoadSample = () => {
    const sampleText = "Hello, Ishan! Welcome to Dev Toolbox.";
    setInput(sampleText);
    setOutput('');
  };


  return (
    <div className="encoder-decoder-page">
      <h2>Base64 Encoder / Decoder</h2>

      <div className="encoder-controls">
         <button onClick={handleLoadSample}>Load Sample</button>
        <button onClick={handleEncode}>Encode</button>
        <button onClick={handleDecode}>Decode</button>

      </div>
      

      <div className="encoder-boxes">
        {/* Input */}
        <div className="encoder-box">
          <h4>Input</h4>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Base64 string here"
          />
        </div>

        {/* Output */}
        <div className="encoder-box">
          <h4>Output</h4>
          <textarea
            value={output}
            readOnly
            placeholder="Encoded or decoded result"
          />
        </div>

        

      </div>
    </div>
  );
};

export default EncoderDecoder;