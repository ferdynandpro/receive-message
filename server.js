// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());


app.use(express.json());
app.use(express.static('public')); // Untuk menyajikan file statis seperti HTML

let messages = []; // Menyimpan pesan dalam memori

// Endpoint untuk menerima pesan dari frontend
app.post('/send-message', (req, res) => {
  const { message } = req.body;
  console.log(`Received message: ${message}`);
  
  // Menyimpan pesan
  messages.push(message);
  
  // Mengirimkan balasan
  res.json({ reply: `Message received: ${message}` });
});

// Endpoint untuk menampilkan pesan
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Halaman HTML untuk menampilkan pesan
app.get('/', (req, res) => {
  const messageList = messages.map(msg => `<li>${msg}</li>`).join('');
  res.send(`
    <html>
      <head>
        <title>Messages</title>
      </head>
      <body>
        <h1>Messages</h1>
        <ul>${messageList}</ul>
        <a href="/messages">View Messages in JSON</a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
