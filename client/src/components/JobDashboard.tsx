import React, { useEffect, useState } from 'react';
import { getJobs, addJob, updateJob, deleteJob } from '../api/jobsApi';
import './JobDashboard.css'; // Importing the CSS file for styling

const JobDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [newJob, setNewJob] = useState({
    customerName: '',
    jobType: '',
    status: '',
    appointmentDate: '',
    technician: '',
  });
  const [editingJob, setEditingJob] = useState<any | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await getJobs();
    setJobs(response.data);
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    await addJob(newJob);
    fetchJobs();
    setNewJob({
      customerName: '',
      jobType: '',
      status: '',
      appointmentDate: '',
      technician: '',
    });
  };

  const handleUpdateJob = async (id: number) => {
    await updateJob(id, editingJob);
    fetchJobs();
    setEditingJob(null);
  };

  const handleDeleteJob = async (id: number) => {
    await deleteJob(id);
    fetchJobs();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editingJob) {
      setEditingJob({ ...editingJob, [name]: value });
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  return (
    <div className="job-dashboard-container">
      <h1>Job Management Dashboard</h1>
      <form className="job-form" onSubmit={handleAddJob}>
        <input
          type="text"
          name="customerName"
          value={newJob.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          required
        />
        <input
          type="text"
          name="jobType"
          value={newJob.jobType}
          onChange={handleChange}
          placeholder="Job Type"
          required
        />
        <select
          name="status"
          value={newJob.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="datetime-local"
          name="appointmentDate"
          value={newJob.appointmentDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="technician"
          value={newJob.technician}
          onChange={handleChange}
          placeholder="Technician"
          required
        />
        <button type="submit">Add Job</button>
      </form>
      <table className="job-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Appointment Date</th>
            <th>Technician</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>
                {editingJob?.id === job.id ? (
                  <input
                    type="text"
                    name="customerName"
                    value={editingJob.customerName}
                    onChange={handleChange}
                  />
                ) : (
                  job.customerName
                )}
              </td>
              <td>
                {editingJob?.id === job.id ? (
                  <input
                    type="text"
                    name="jobType"
                    value={editingJob.jobType}
                    onChange={handleChange}
                  />
                ) : (
                  job.jobType
                )}
              </td>
              <td>
                {editingJob?.id === job.id ? (
                  <select
                    name="status"
                    value={editingJob.status}
                    onChange={handleChange}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  job.status
                )}
              </td>
              <td>
                {editingJob?.id === job.id ? (
                  <input
                    type="datetime-local"
                    name="appointmentDate"
                    value={editingJob.appointmentDate}
                    onChange={handleChange}
                  />
                ) : (
                  new Date(job.appointmentDate).toLocaleString()
                )}
              </td>
              <td>
                {editingJob?.id === job.id ? (
                  <input
                    type="text"
                    name="technician"
                    value={editingJob.technician}
                    onChange={handleChange}
                  />
                ) : (
                  job.technician
                )}
              </td>
              <td>
                {editingJob?.id === job.id ? (
                  <>
                    <button onClick={() => handleUpdateJob(job.id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingJob(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingJob(job)}>Edit</button>
                    <button onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobDashboard;
