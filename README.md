<div align="center">
<h1 align="center">:boom: Service Agent SAP Frontend :boom:</h1>
</div>

This React application provides a user interface for creating, viewing, updating, and deleting jobs in the Service Agent backend. It also allows marking jobs as favorites and filtering them.


## Table of Contents
- [Requirements](#requirements)
- [Installation and Build the Project,Running the Backend](#installation-and-build-the-project-running-the-backend)
- [Run the Frontend](#run-the-frontend)
- [Testing](#testing)
- [Usage](#usage)


## Requirements

- Node.js v18 or higher
- npmv9 or higher
- A running instance of Service Agent backend (Spring Boot)  


## Installation and Build the Project, Running the Backend

1. **Clone the Repository**:

   git clone https://github.com/thanigaiveldinesh/frontend-sap-serviceagent.git
   
   cd frontend-sap-serviceagent
   
2. **Install the Dependencies**:

   Navigate to the <path-of-your-local>\frontend-sap-serviceagent
   
    npm install

4. **Run the Frontend**:

   npm start

   Front should be started with localhost:3000 port.

   
## Testing

Open your browser and navigate to:
http://localhost:3000

## Usage

**Job Request Page**:

        1.Create Job: Fill in Name, Method, Endpoint, Headers, and Body.

        2.Update Job: Select PUT method and enter Job ID to update an existing job.

        3.Delete Job: Select DELETE method and enter Job ID to delete a job.

        4.Execute Now or Schedule jobs using the execution options.

**List of All Jobs**:

        1.Displays all jobs fetched from the backend.

        2.Mark a job as favorite using the ★ button.

        3.Filter jobs by favorites using the “Show Favorites Only” checkbox.

        4.Click “Details” to see the full job JSON.



