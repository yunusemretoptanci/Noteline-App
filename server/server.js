const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const db = new sqlite3.Database('database.db');

// create lessons table
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

//create clicks table
db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY,
    lessonId INTEGER,
    buttonName TEXT,
    clickTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    additionalText TEXT
  )`
  );


app.use(express.json());

app.post('/create-lesson', (req, res) => {
    const { userId, buttons } = req.body;
    const newLesson = {
      userId,
      code: generateCode(),
      pin: generatePin(),
      started: false,
      isFinished: false,
      startedAt: null,
      ...buttons,
    };
  
    const buttonColumns = Object.keys(buttons).map(button => `${button}Button`).join(', ');
    const buttonValues = Object.keys(buttons).map(button => buttons[button]);
  
    // add new lesson to database
    db.run(`INSERT INTO lessons (userId, code, pin, started, ${buttonColumns}) VALUES (?, ?, ?, ?, ${Array(buttons.length).fill('?').join(', ')})`,
      [newLesson.userId, newLesson.code, newLesson.pin, newLesson.started, ...buttonValues]);
  
    io.emit('lesson-created', newLesson);
    res.json({ code: newLesson.code, pin: newLesson.pin, userId: newLesson.userId });
  });

  app.get('/get-lessons/:userId', (req, res) => {
    const userId = req.params.userId;
    // filter lessons by userId
    db.all('SELECT * FROM lessons WHERE userId = ?', [userId], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.json(rows);
    });
  });

  //start lesson
  app.post('/start-lesson', (req, res) => {
    const { code, pin } = req.body;
  
    // check code and pin
    db.get('SELECT * FROM lessons WHERE code = ? AND pin = ? AND started = false AND isFinished = false',
      [code, pin], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (!row) {
          res.status(404).json({ error: 'Invalid code/pin or lesson already started or finished' });
          return;
        }
  
        // update started and startedAt fields of lesson
        db.run('UPDATE lessons SET started = true, startedAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
          [row.id]);
  
        io.emit('lesson-started', { lessonId: row.id });
  
        res.json({ success: true });
      });
  });

  //finish lesson

  app.post('/finish-lesson', (req, res) => {
    const { code, pin } = req.body;
  
    // check code and pin
    db.get('SELECT * FROM lessons WHERE code = ? AND pin = ? AND started = true AND isFinished = false',
      [code, pin], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (!row) {
          res.status(404).json({ error: 'Invalid code/pin or lesson not started or already finished' });
          return;
        }
  
        // update isFinished field of lesson
        db.run('UPDATE lessons SET isFinished = true, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
          [row.id]);
  
        io.emit('lesson-finished', { lessonId: row.id });
  
        res.json({ success: true });
      });
  });

  // button click
  app.post('/click-button/:lessonCode/:buttonName', (req, res) => {
    const { lessonCode, buttonName } = req.params;
    const { clickTime, additionalText } = req.body;
  
    //get lesson id
    db.get('SELECT id FROM lessons WHERE code = ?',
      [lessonCode], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (!row) {
          res.status(404).json({ error: 'Lesson not found' });
          return;
        }
  
        const lessonId = row.id;
  
        // add click to database
        db.run('INSERT INTO clicks (lessonId, buttonName, clickTime, additionalText) VALUES (?, ?, ?, ?)',
          [lessonId, buttonName, clickTime, additionalText]);
  
        io.emit('button-clicked', { lessonId, buttonName, clickTime, additionalText });
  
        res.json({ success: true });
      });
  });
  
  // get clicks
  // get lesson clicks
app.get('/get-clicks/:lessonCode', (req, res) => {
  const { lessonCode } = req.params;

 
  db.get('SELECT clicks FROM lessons WHERE code = ?',
    [lessonCode], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (!row) {
        res.status(404).json({ error: 'Lesson not found' });
        return;
      }

      const clicks = JSON.parse(row.clicks || '[]'); // clicks alanını diziye çevir

      res.json({ clicks });
    });
});


  // join lesson
  app.post('/join-lesson/:lessonCode', (req, res) => {
    const { lessonCode } = req.params;
  
    // check code
    db.get('SELECT * FROM lessons WHERE code = ? AND started = true AND isFinished = false',
      [lessonCode], (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        if (!row) {
          res.status(404).json({ error: 'Invalid code or lesson not started or already finished' });
          return;
        }
  
      
  
        res.json({ success: true });
      });
  });




function generateCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function generatePin() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

server.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
