import axios from 'axios';

const API_URL = 'http://localhost:9000/api/competences';

export const getCompetences = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCompetence = async (competenceData) => {
  const response = await axios.post(API_URL, competenceData);
  return response.data;
};

export const updateEvaluation = async (id, sousCompetences) => {
  const response = await axios.put(`${API_URL}/${id}/evaluation`, { sousCompetences });
  return response.data;
};

export const deleteCompetence = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateCompetence = async (id, competenceData) => {
  const response = await axios.put(`${API_URL}/${id}`, competenceData);
  return response.data;
};

export const resolveTie = async (competenceId, subCompetenceId) => {
  const response = await axios.post('http://localhost:9000/api/competences/resolve-tie', {
    competenceId,
    subCompetenceId
  });
  return response.data;
};