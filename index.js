import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',  // or your MySQL password
  database: 'classicmodels',
});

// question1 - כמה לקוחות יש מצרפת
app.get('/question1', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS total FROM customers WHERE country = 'France'"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// question2 - שם ומספר הלקוח עם מספר 1143
app.get('/question2', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT customerName, customerNumber FROM customers WHERE customerNumber = 1143"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// question3 - כמה מוצרים בקטגוריית Classic Cars
app.get('/question3', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS total FROM products WHERE productLine = 'Classic Cars'"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});