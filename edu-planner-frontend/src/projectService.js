import api from './api';

export const getProjects = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post('/', project);
  return response.data;
};

export const updateProject = async (id, project) => {
  const response = await api.put(`/${id}`, project);
  return response.data;
};

export const deleteProject = async (id) => {
  await api.delete(`/${id}`);
};