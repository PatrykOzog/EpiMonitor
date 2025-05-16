import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(409).json({ error: "User with this email already exists." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
      );
      res.status(201).json({ message: "Register successful." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const dummyHash =
      "$2b$10$u/8F3sA6v9xROhC4pHqA3Or4sEz93fbD8lP4E07Az5VGsUcUDK8jq";
    const user = result.rows[0];

    const match = user
      ? await bcrypt.compare(password, user.password)
      : await bcrypt.compare(password, dummyHash);

    if (!match) {
      res.status(401).json({ error: "Invalid login details." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
