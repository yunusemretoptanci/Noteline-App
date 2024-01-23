const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);



const db = new sqlite3.Database('database.db');


db.run(`
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY,
    userId INTEGER,
    code TEXT,
    pin TEXT,
    started BOOLEAN,
    startedAt DATETIME,
    onlineParticipants INTEGER DEFAULT 0,
    disconnectedParticipants INTEGER DEFAULT 0,
    isFinished BOOLEAN DEFAULT false,
    questionButton BOOLEAN,
    ahaButton BOOLEAN,
    lostButton BOOLEAN,
    referanceButton BOOLEAN,
    commentButton BOOLEAN
  )`
);


db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY,
    lessonId INTEGER,
    buttonName TEXT,
    clickTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    additionalText TEXT
  )`
  );


app.use(express.json());




server.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
