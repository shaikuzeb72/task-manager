const { getDb } = require('../db');

exports.getTasks = async (req, res) => {
  try {
    const db = await getDb();
    const tasks = await db.all('SELECT * FROM tasks WHERE userId = ? ORDER BY createdAt DESC', [req.user.id]);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Task title is required' });
  }

  try {
    const db = await getDb();
    const taskStatus = status || 'Todo';
    
    const result = await db.run(
      'INSERT INTO tasks (title, description, status, userId) VALUES (?, ?, ?, ?)',
      [title, description, taskStatus, req.user.id]
    );

    const newTask = await db.get('SELECT * FROM tasks WHERE id = ?', [result.lastID]);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const db = await getDb();
    
    const task = await db.get('SELECT * FROM tasks WHERE id = ? AND userId = ?', [id, req.user.id]);
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updatedTitle = title || task.title;
    const updatedDescription = description !== undefined ? description : task.description;
    const updatedStatus = status || task.status;

    await db.run(
      'UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [updatedTitle, updatedDescription, updatedStatus, id]
    );

    const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await getDb();
    
    const task = await db.get('SELECT * FROM tasks WHERE id = ? AND userId = ?', [id, req.user.id]);
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
