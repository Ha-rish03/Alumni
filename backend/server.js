import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "alumni_dev_secret_key";

// 📌 MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harish",
  database: "alumni_db"
});

db.connect((err) => {
  if (err) console.log("DB Connection Error:", err);
  else console.log("Connected to MySQL");
});

// Generate Token
const generateToken = (user) =>
  jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    SECRET,
    { expiresIn: "8h" }
  );

// 📌 API Routes

// Login --------------------------------------------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.json({ message: err });
      if (result.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

      const user = result[0];
      const token = generateToken(user);

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    }
  );
});

// Admin Create User -------------------------------------
app.post("/api/admin/create-user", (req, res) => {
  const { token, name, email, password, role } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role],
      (err) => {
        if (err) return res.json({ message: err });
        res.json({ message: "User created successfully!" });
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Alumni Post Job ---------------------------------------
app.post("/api/alumni/post-job", (req, res) => {
  const { token, title, company, description } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== "alumni")
      return res.status(403).json({ message: "Access denied" });

    db.query(
      "INSERT INTO jobs (title, company, description, postedBy) VALUES (?, ?, ?, ?)",
      [title, company, description, decoded.id],
      (err) => {
        if (err) return res.json({ message: err });
        res.json({ message: "Job posted successfully!" });
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Student fetch jobs ------------------------------------
app.get("/api/student/jobs", (req, res) => {
  db.query(
    "SELECT jobs.id, title, company, description, users.name AS postedBy FROM jobs JOIN users ON jobs.postedBy = users.id",
    (err, result) => {
      if (err) return res.json({ message: err });
      res.json(result);
    }
  );
});

// Student request connection ----------------------------
app.post("/api/student/request-connection", (req, res) => {
  const { token, alumniId } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    if (decoded.role !== "student")
      return res.status(403).json({ message: "Access denied" });

    db.query(
      "INSERT INTO connections (studentId, alumniId) VALUES (?, ?)",
      [decoded.id, alumniId],
      (err) => {
        if (err) return res.json({ message: err });
        res.json({ message: "Connection request sent!" });
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Get Alumni List ---------------------------------------
app.get("/api/alumni/list", (req, res) => {
  db.query(
    "SELECT id, name, email FROM users WHERE role = 'alumni'",
    (err, result) => {
      if (err) return res.json({ message: err });
      res.json(result);
    }
  );
});

// Chat - Store & Retrieve -------------------------------
app.post("/api/chat/send", (req, res) => {
  const { token, to, message } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);

    db.query(
      "INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)",
      [decoded.id, to, message],
      (err) => {
        if (err) return res.json({ message: err });
        res.json({ message: "Message Sent!" });
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/api/chat/messages/:userId", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const otherId = req.params.userId;

    db.query(
      "SELECT * FROM messages WHERE (senderId=? AND receiverId=?) OR (senderId=? AND receiverId=?)",
      [decoded.id, otherId, otherId, decoded.id],
      (err, result) => {
        if (err) return res.json({ message: err });
        res.json(result);
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
