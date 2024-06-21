
import React, { useState, useEffect } from 'react';
import { updateProject, createProject, deleteProject, getProjects } from '../projectService';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState({ id: '', name: '' });
  
    useEffect(() => {
      loadProjects();
    }, []);
  
    const loadProjects = async () => {
      const loadedProjects = await getProjects();
      setProjects(loadedProjects);
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (currentProject.id) {
        await updateProject(currentProject.id, { name: currentProject.name });
      } else {
        await createProject({ name: currentProject.name });
      }
      setCurrentProject({ id: '', name: '' });
      loadProjects();
    };
  
    const handleDelete = async (id) => {
      await deleteProject(id);
      loadProjects();
    };
  
    const handleChange = (e) => {
      setCurrentProject({ ...currentProject, name: e.target.value });
    };
  
    return (
        <div>
          <h1>Projekty</h1>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                {project.name}
                <button onClick={() => console.log('Usuwanie projektu', project.id)}>Usuń</button>
              </li>
            ))}
          </ul>
          <h2>{currentProject.id ? 'Edytuj' : 'Dodaj'} projekt</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={currentProject.name}
              onChange={handleChange}
              placeholder="Nazwa projektu"
              required
            />
            <textarea
              name="description"
              value={currentProject.description}
              onChange={handleChange}
              placeholder="Opis projektu"
            />
            <input
              type="date"
              name="startDate"
              value={currentProject.startDate}
              onChange={handleChange}
              placeholder="Data rozpoczęcia"
            />
            <input
              type="date"
              name="endDate"
              value={currentProject.endDate}
              onChange={handleChange}
              placeholder="Data zakończenia"
            />
            <button type="submit">Zapisz projekt</button>
          </form>
        </div>
      );
    };
  

export default ProjectList;