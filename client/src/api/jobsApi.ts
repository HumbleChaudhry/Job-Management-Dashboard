import axios from 'axios';

const API_URL = 'http://localhost:5000/jobs';

export const getJobs = () => axios.get(API_URL);
export const getJobById = (id: number) => axios.get(`${API_URL}/${id}`);
export const addJob = (job: any) => axios.post(API_URL, job);
export const updateJob = (id: number, job: any) =>
  axios.put(`${API_URL}/${id}`, job);
export const deleteJob = (id: number) => axios.delete(`${API_URL}/${id}`);
