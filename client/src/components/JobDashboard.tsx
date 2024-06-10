import React, { useEffect, useState } from 'react';
import { getJobs } from '../api/jobsApi';

const JobDashboard: React.FC = () => {
  console.log('JobDashboard component rendering');
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    console.log('useEffect called');
    getJobs().then((response) => {
      console.log('Jobs fetched', response.data);
      setJobs(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Job Management Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Appointment Date</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.customerName}</td>
              <td>{job.jobType}</td>
              <td>{job.status}</td>
              <td>{job.appointmentDate}</td>
              <td>{job.technician}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobDashboard;
