// backend/index.js
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['authorization'];
  if (!apiKey || apiKey !== 'abc123**') {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

let tasks = [];
let goals = [];

app.get('/getTasks', apiKeyMiddleware, (req, res) => {
    res.json(tasks);
});

app.get('/getGoals', apiKeyMiddleware, (req, res) => {
    res.json(goals);
});

app.delete('/removeTask', apiKeyMiddleware, (req, res) => {
    const { taskId } = req.body;
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Tarea eliminada correctamente' });
});

app.delete('/removeGoal', apiKeyMiddleware, (req, res) => {
    const { goalId } = req.body;
    goals = goals.filter(goal => goal.id !== goalId);
    res.json({ message: 'Meta eliminada correctamente' });
});

app.post('/addTask', apiKeyMiddleware, (req, res) => {
    const { task } = req.body;
    tasks.push(task);
    res.json({ message: 'Tarea agregada correctamente' });
});

app.post('/addGoal', apiKeyMiddleware, (req, res) => {
    const { goal } = req.body;
    goals.push(goal);
    res.json({ message: 'Meta agregada correctamente' });
});


app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
