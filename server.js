const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let jobs = [
  {
    id: 1,
    customerName: 'John Doe',
    jobType: 'Plumbing',
    status: 'Scheduled',
    appointmentDate: '2024-06-15T09:00:00Z',
    technician: 'Jane Smith',
  },
  {
    id: 2,
    customerName: 'Alice Johnson',
    jobType: 'Electrical',
    status: 'Completed',
    appointmentDate: '2024-05-20T14:00:00Z',
    technician: 'Bob Brown',
  },
];

// GET /jobs - Retrieves all jobs
app.get('/jobs', (req, res) => {
  res.json(jobs);
});

// GET /jobs/:id - Retrieves a specific job by ID
app.get('/jobs/:id', (req, res) => {
  const job = jobs.find((j) => j.id === parseInt(req.params.id));
  if (job) {
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

// POST /jobs - Adds a new job record
app.post('/jobs', (req, res) => {
  const newJob = { id: jobs.length + 1, ...req.body };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// PUT /jobs/:id - Updates an existing job record
app.put('/jobs/:id', (req, res) => {
  const job = jobs.find((j) => j.id === parseInt(req.params.id));
  if (job) {
    Object.assign(job, req.body);
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

// DELETE /jobs/:id - Deletes a job record
app.delete('/jobs/:id', (req, res) => {
  const jobIndex = jobs.findIndex((j) => j.id === parseInt(req.params.id));
  if (jobIndex > -1) {
    jobs.splice(jobIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Job not found');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
