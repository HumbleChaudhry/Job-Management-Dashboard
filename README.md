# Job Management Dashboard

A simple job management dashboard allowing users to view existing jobs, add new ones, edit jobs or delete them.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Job-Management-Dashboard
   ```

2. Install dependencies for the client and server:

   ```bash
   npm install
   cd client
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

4. Start the client:
   ```bash
   cd ../client
   npm start
   ```

## API Endpoints

1. **GET /jobs** - Retrieves all jobs.
2. **GET /jobs/:id** - Retrieves a specific job by ID.
3. **POST /jobs** - Adds a new job record.
4. **PUT /jobs/:id** - Updates an existing job record.
5. **DELETE /jobs/:id** - Deletes a job record.

## Architecture and Libraries

- **Frontend**: Used React with TypeScript, Axios for HTTP requests, and CSS for styling and architecture and libraries.
- **Backend**: Express.js with Node.js, Middleware such as CORS and body-parser.

### Features

- **Job Dashboard**: Displays a list of jobs with options to add, update, and delete jobs.
- **Add Job Form**: Allows adding a new job with customer name, job type, status, appointment date, and technician.
- **Update/Delete Options**: Manageability of updating or deleting jobs directly from the UI.
- **Interactivity**: Hover effects, animations, and refined styles for a user-friendly experience.
