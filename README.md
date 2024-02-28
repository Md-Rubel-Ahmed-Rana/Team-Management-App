# Team Management App

## Overview

The Team Management App is a web-based application designed to facilitate team collaboration and project management. It provides a platform for users to create teams, manage projects, assign tasks, share files, and communicate with team members. The app is hosted on Vercel for the frontend and Render for the backend.

## Live Links

###### Socket.io and Redis will not work on Free hosting

- [Frontend](https://team-management-app-client.vercel.app/)
- [Backend](https://team-management-app-server.onrender.com/)

###### Login to website

1. email: mdrubelahmedrana521@gmail.com
2. password: 1234567

## Local Setup

### Prerequisites

- Node.js
- Docker Desktop (for Docker setup)

### Steps

1. Clone the repository:

git clone https://github.com/Md-Rubel-Ahmed-Rana/Team-Management-App

2. Install dependencies:

npm install && cd frontend && npm install && cd backend && npm install

3. Update `.env.example` with accurate credentials and rename it to `.env`.

4. Run frontend and backend locally:
   run: npm run dev
5. Open your favorite browser and navigate to [http://localhost:3000](http://localhost:3000).

## Docker Setup

### Prerequisites

- Docker Desktop

### Steps

1. Build Docker image:
   run: npm run docker-build

2. Run the container:
   run: npm run docker-start
3. Open your favorite browser and navigate to [http://localhost:8080](http://localhost:8080). It will redirect you to [http://localhost:3000](http://localhost:3000) with a reverse proxy, or you can directly visit [http://localhost:3000](http://localhost:3000).

## Key Features

1. **Team Creation:** Users can create a team at any time, allowing for easy collaboration among members.
2. **Project Management:** Projects must be created under a team, ensuring organization and accountability.
3. **Task Assignment:** Users can create tasks under a project, ensuring that all tasks are associated with a specific project.
4. **Member Assignment:** To assign a task to a member, that member must be part of the project, ensuring that tasks are assigned to relevant team members.
5. **User Invitation:** Users can invite any other user of the website to join their team, facilitating collaboration with external parties.
6. **Invitation Response:** Invited users can either accept or reject the invitation, giving them control over their participation in the team.
7. **Task Tracking:** Users can track the progress of tasks, ensuring that projects stay on schedule.
8. **File Sharing:** Users can share files within the team, making it easy to collaborate on documents and resources.
9. **Notification System:** Users receive notifications for new tasks, comments, and other updates, ensuring that they stay informed about project developments.
10. **Group Messaging:** Users can create group chats for team-wide discussions, ensuring that all team members are kept in the loop.
11. **Message Editing and Deleting:** Users can edit or delete their own messages, allowing them to correct mistakes or remove outdated information.

## Contributors

- [Md Rubel Ahmed Rana](https://github.com/Md-Rubel-Ahmed-Rana)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
