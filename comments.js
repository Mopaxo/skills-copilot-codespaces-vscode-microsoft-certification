// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let comments = [
  {
    id: uuidv4(),
    username: 'Alice',
    comment: 'Hello World',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    username: 'Bob',
    comment: 'Hi',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({
    id: uuidv4(),
    username,
    comment,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).json({ success: true });
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((comment) => comment.id !== id);
  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});