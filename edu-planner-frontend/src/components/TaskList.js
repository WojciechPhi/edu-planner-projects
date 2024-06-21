import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getTaskById } from '../taskService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = async (id) => {
    const task = await getTaskById(id);
    setCurrentTask(task);
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateTask(currentTask.id, currentTask);
      setEditing(false);
    } else {
      await createTask(currentTask);
    }
    setCurrentTask({ title: '', description: '' });
    fetchTasks();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Lista Zadań</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={currentTask.title}
          onChange={handleChange}
          placeholder="Tytuł"
          required
        />
        <input
          name="description"
          value={currentTask.description}
          onChange={handleChange}
          placeholder="Opis"
          required
        />
        <button type="submit">{editing ? 'Aktualizuj' : 'Dodaj'}</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => handleEdit(task.id)}>Edytuj</button>
            <button onClick={() => handleDelete(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;