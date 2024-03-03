
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);

  useEffect(() =>{
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customerdata`, {
          params: { page, sortBy, search },
        });
        const data = await response.data;
        setRecords(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecords();
  }, [page, sortBy, search]);

  return (
    <div style={{ margin: '50px' }}>
      <h2>Customer Details</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search bar"
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginBottom: '20px', padding: '5px' }}
      >
        <option value="date">Sort by Date</option>
        <option value="time">Sort by Time</option>
      </select>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>S.No.</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Customer Name</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Age</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Phone</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Location</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Date</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.sno}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.customer_name}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.age}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.phone}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.location}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.date.split("T")[0]}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{record.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          style={{ padding: '5px 10px', marginRight: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}
        >
          Previous Page
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none' }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default App;