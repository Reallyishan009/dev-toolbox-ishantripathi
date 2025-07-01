import React ,{useState,useEffect} from 'react'
import './JsonHistory.css'
import axios from 'axios'


const JsonHistory = () => {

  const [history,setHistory] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    axios.get('api/json-history')
    .then(response=>{
      setHistory(response.data);
      setLoading(false);
    })
    .catch(error=>{
      console.error("Error fetching JSON History:", error);
      setLoading(false);
    })
  },[]);

  const handleDelete = (id) => {
    axios.delete(`/api/json-history/${id}`)
      .then(() => {
        setHistory(prev => prev.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error('Delete error:', error);
      });
  };

  return (
    <div className="json-history-page">
      <h2>JSON History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item._id} className="history-item">
              <pre>{item.json}</pre>
              <div className="history-actions">
                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JsonHistory;