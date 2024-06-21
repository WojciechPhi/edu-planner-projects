import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList'; // Poprawiona ścieżka (usunięto dodatkowy slash)
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Edu Planner</h1>
        </header>
        <main>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/" element={<ProjectList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
