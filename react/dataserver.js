const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 5000;

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "customer",
  password: "Umesh"
});
client.connect();
app.use(cors());

app.get('/api/customerdata', async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'date', search = '' } = req.query;
    const offset = (page - 1) * limit;
    const query = `SELECT sno, customer_name, age, phone, location,created_at::date AS date, created_at::time AS time FROM customerdata
      WHERE LOWER(customer_name) LIKE LOWER('%${search}%') OR LOWER(location) LIKE LOWER('%${search}%')
      ORDER BY ${sortBy === 'time' ? 'time' : 'date'} ASC
      LIMIT ${limit} OFFSET ${offset}`;
    const { rows } = await client.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});