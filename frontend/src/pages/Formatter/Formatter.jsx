import React, {useState} from 'react'
import './Formatter.css'; 

const Formatter = () => {

  const [input,setInput] = useState('');
  const [output,setOutput] = useState('');

  // Function to handle JSON formatting
  // It parses the input JSON string and formats it with indentation
  const handleFormat =()=>{
    try{
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    }
    catch (error) {
      setOutput('Invalid JSON input');
    }
  }

  const handleLoadSample = () => {
    const sampleJSON = `{"name":"Ishan","age":27,"skills":["JavaScript","React","Node.js"],"education":{"degree":"M.Tech","university":"IIT Delhi"},"projects":[{"title":"Dev Toolbox","year":2025},{"title":"Online Store","year":2024}]}`;
    setInput(sampleJSON);
  };




  return (
    <div className='formatter-page'>
  <h2 className='formatter-heading'>JSON Formatter</h2>

  <div className='formatter-controls'>
    <button onClick={handleLoadSample}>Load Sample JSON</button>
    <button onClick={handleFormat}>Format</button>
  </div>

  {/* 🔄 Side-by-side boxes */}
  <div className="formatter-side-by-side">
    {/* Input Box */}
    <div className="formatter-box">
      <h4>Input</h4>
      <textarea
        className='formatter-textarea'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste or load JSON here"
      />
    </div>

    {/* Output Box */}
    <div className="formatter-box">
      <h4>Output</h4>
      <textarea
        className='formatter-textarea'
        value={output}
        readOnly
        placeholder="Formatted JSON will appear here"
      />
    </div>
  </div>
</div>
  );
}

export default Formatter;