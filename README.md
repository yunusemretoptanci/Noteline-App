# Noteline-App


This application is an interactive lesson session platform designed for real-time student engagement and feedback during online or in-person classes. It allows teachers to create lesson sessions with customizable feedback buttons, and students can join these sessions using a code. Throughout the lesson, students can send real-time feedback via predefined buttons (e.g., "Aha", "Lost", "Reference", etc.), and the teacher can see these reactions live on a timeline.

## 📘 Features Overview

### 👨‍🏫 For Teachers:
- Create and manage custom lesson sessions  
- Define titles, content, and interactive feedback buttons  
- Preview sessions before starting  
- View real-time student reactions on a chronological timeline  
- Track connected and disconnected users  
- Get a summary of the session once it ends  

### 🙋‍♀️ For Students:
- Join lessons using a unique code  
- Send reactions through predefined buttons (e.g., "Aha!", "Lost", "Reference")  
- Add optional comments with feedback  
- Stay engaged during the session  

### ⚙️ Architecture Summary:
The app follows a client-server architecture with the following components:

- **WebSocket Technology**: Real-time interaction between the teacher and students is achieved using **Socket.IO** with WebSocket connections.
  
- **Backend**:
  - **Node.js** and **Express** are used for building the API endpoints that handle session creation, joining, and managing lesson data.
  - **SQLite** serves as the database for storing session data, button interactions, user participation status, and session progress.

- **Frontend**:
  - The client is built using **React** , with real-time updates handled by Socket.IO on the client side.
  - The user interface is split into teacher and student views. The teacher can manage the session, configure buttons, and monitor student feedback, while the student interface focuses on interacting with the feedback buttons.

---

## Client Installation

To run the client side, follow the steps below:

1. Navigate to the client folder:

   ```bash
   cd client
   
2. Install the necessary dependencies:

    ```bash
    yarn install
    ```
3. Start the client:
    ```bash
    yarn dev
    ```

After following these steps, the client side will run successfully.
---
Server Installation
To run the server side, follow the steps below:

1. Navigate to the server folder:

    ```bash
    cd server
    ```

2. Install the necessary dependencies:
    ```bash
    yarn install
    ```

3. Start the server:
    ```bash
    yarn start
    ```
After following these steps, the server side will run successfully.
