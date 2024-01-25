const express = require("express");
const http = require("http");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const db = new sqlite3.Database("database.db");
// create lessons table
db.run(`
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY,
    userId INTEGER,
    name TEXT,
    description TEXT,
    code TEXT,
    pin TEXT,
    started BOOLEAN,
    startedAt DATETIME,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    onlineParticipants INTEGER DEFAULT 0,
    disconnectedParticipants INTEGER DEFAULT 0,
    isFinished BOOLEAN DEFAULT false,
    questionButton BOOLEAN,
    ahaButton BOOLEAN,
    lostButton BOOLEAN,
    referanceButton BOOLEAN,
    commentButton BOOLEAN
  )`);

//create clicks table
db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY,
    lessonId INTEGER,
    buttonName TEXT,
    clickTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    additionalText TEXT,
    clickCount INTEGER DEFAULT 1
  )`);

app.use(express.json());

app.post("/create-lesson", (req, res) => {
  const { userId, buttonList, name, description } = req.body;

  // Yeni buton listesi için gerekli değişiklikler
  const buttons = {
    ahaButton: false,
    lostButton: false,
    referanceButton: false,
    commentButton: false,
    questionButton: false,
  };

  // Gelen buton listesinde bulunan butonları işaretle
  buttonList.forEach((button) => {
    if (buttons.hasOwnProperty(button)) {
      buttons[button] = true;
    }
  });

  const newLesson = {
    userId,
    code: generateCode(),
    pin: generatePin(),
    started: false,
    isFinished: false,
    startedAt: null,
    name,
    description,
    ...buttons,
  };

  // Buton sütunları için gerekli değişiklikler
  const buttonColumns = Object.keys(buttons).join(", ");
  const buttonValues = Object.values(buttons);

  // Yeni lesson'ı veritabanına ekle
  db.run(
    `INSERT INTO lessons (userId, code, pin, started, isFinished, startedAt, name, description, ${buttonColumns}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ${buttonValues
      .map(() => "?")
      .join(", ")})`,
    [
      newLesson.userId,
      newLesson.code,
      newLesson.pin,
      newLesson.started,
      newLesson.isFinished,
      newLesson.startedAt,
      newLesson.name,
      newLesson.description,
      ...buttonValues,
    ]
  );

  io.emit("lesson-created", newLesson);
  res.json({
    code: newLesson.code,
    pin: newLesson.pin,
    userId: newLesson.userId,
    name: newLesson.name,
    description: newLesson.description,
  });
});

app.get("/get-lessons/:userId", (req, res) => {
  const userId = req.params.userId;
  // filter lessons by userId
  db.all("SELECT * FROM lessons WHERE userId = ?", [userId], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.json(rows);
  });
});

//start lesson
app.post("/start-lesson", (req, res) => {
  const { code, pin } = req.body;

  // check code and pin
  db.get(
    "SELECT * FROM lessons WHERE code = ? AND pin = ? AND started = false AND isFinished = false",
    [code, pin],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!row) {
        res
          .status(404)
          .json({
            error: "Invalid code/pin or lesson already started or finished",
          });
        return;
      }

      // update started and startedAt fields of lesson
      db.run(
        "UPDATE lessons SET started = true, startedAt = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
        [row.id]
      );

      io.emit("lesson-started", { lessonId: row.id });

      res.json({ success: true, lessonId: row.id, lessonCode: row.code });
    }
  );
});

app.get("/get-lesson/:lessonCode", (req, res) => {
  const { lessonCode } = req.params;

  // filter lessons by code
  db.get("SELECT * FROM lessons WHERE code = ?", [lessonCode], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.json(row);
  });
});

//finish lesson

app.post("/finish-lesson", (req, res) => {
  const { code, pin } = req.body;

  // check code and pin
  db.get(
    "SELECT * FROM lessons WHERE code = ? AND pin = ? AND started = true AND isFinished = false",
    [code, pin],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!row) {
        res
          .status(404)
          .json({
            error: "Invalid code/pin or lesson not started or already finished",
          });
        return;
      }

      // update isFinished field of lesson
      db.run(
        "UPDATE lessons SET isFinished = true, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
        [row.id]
      );

      io.emit("lesson-finished", { lessonId: row.id });

      res.json({ success: true });
    }
  );
});

// button click
app.post("/click-button/:lessonCode/:buttonName", (req, res) => {
  const { lessonCode, buttonName } = req.params;
  const { clickTime, additionalText } = req.body;

  // get lesson id
  db.get("SELECT id FROM lessons WHERE code = ?", [lessonCode], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const lessonId = row.id;
    const validButtons = ["Aha", "Lost"];
    // check if a button with the same name exists in the same lesson and minute
    if (validButtons.includes(buttonName)) {
      console.log(buttonName)
      db.get(
        "SELECT id, clickCount FROM clicks WHERE lessonId = ? AND buttonName = ? AND clickTime = ?",
        [lessonId, buttonName, clickTime],
        (err, row) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          if (row) {
            // If the button with the same name exists, update clickCount and additionalText
            const clickId = row.id;
            const clickCount = row.clickCount + 1;

            db.run(
              "UPDATE clicks SET clickCount = ?, additionalText = ? WHERE id = ?",
              [clickCount, `clicked ${clickCount} times`, clickId]
            );

            io.emit("button-clicked", {
              lessonId,
              buttonName,
              clickTime,
              additionalText,
            });
            res.json({ success: true });
          } else {
            // If the button doesn't exist, insert a new record
            db.run(
              "INSERT INTO clicks (lessonId, buttonName, clickTime, additionalText) VALUES (?, ?, ?, ?)",
              [lessonId, buttonName, clickTime, additionalText]
            );

            io.emit("button-clicked", {
              lessonId,
              buttonName,
              clickTime,
              additionalText,
            });
            res.json({ success: true });
          }
        }
      );
    } else {
      db.run(
        "INSERT INTO clicks (lessonId, buttonName, clickTime, additionalText) VALUES (?, ?, ?, ?)",
        [lessonId, buttonName, clickTime, additionalText]
      );

      io.emit("button-clicked", {
        lessonId,
        buttonName,
        clickTime,
        additionalText,
      });

      res.json({ success: true });
    }
  });
});

// get clicks
// get lesson clicks
app.get("/get-clicks/:lessonCode", (req, res) => {
  const { lessonCode } = req.params;

  // get lesson id
  db.get("SELECT id FROM lessons WHERE code = ?", [lessonCode], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (!row) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const lessonId = row.id;

    // get clicks
    db.all(
      "SELECT * FROM clicks WHERE lessonId = ?",
      [lessonId],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json(rows);
      }
    );
  });
});

// join lesson
app.post("/join-lesson/:lessonCode", (req, res) => {
  const { lessonCode } = req.params;

  // check code
  db.get(
    "SELECT * FROM lessons WHERE code = ? AND started = true AND isFinished = false",
    [lessonCode],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!row) {
        res
          .status(404)
          .json({
            error: "Invalid code or lesson not started or already finished",
          });
        return;
      }
      db.run(
        "UPDATE lessons SET onlineParticipants = onlineParticipants + 1 WHERE id = ?",
        [row.id]
      );

      io.emit("lesson-joined", { lessonId: row.id });
      res.json({ success: true, lessonId: row.id, lessonCode: row.code });
    }
  );
});

//disconnect lesson
app.post("/disconnect-lesson/:lessonCode", (req, res) => {
  const { lessonCode } = req.params;

  // check code
  db.get(
    "SELECT * FROM lessons WHERE code = ? AND started = true AND isFinished = false",
    [lessonCode],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (!row) {
        res
          .status(404)
          .json({
            error: "Invalid code or lesson not started or already finished",
          });
        return;
      }
      db.run(
        "UPDATE lessons SET onlineParticipants = onlineParticipants - 1, disconnectedParticipants = disconnectedParticipants + 1 WHERE id = ?",
        [row.id]
      );

      io.emit("lesson-disconnected", { lessonId: row.id });
      res.json({ success: true, lessonId: row.id, lessonCode: row.code });
    }
  );
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
