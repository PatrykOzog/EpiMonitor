import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate } from "./authenticate";
import { AuthenticatedRequest } from "./types";
import { insertFakeUsers } from "./generateFakeData";

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
  const { email, password, guest } = req.body;
  // insertFakeUsers(1000).catch(console.error);
  try {
    let user;

    if (guest) {
      const guestEmail = "guest@demo.com";
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [guestEmail]
      );
      user = result.rows[0];

      if (!user) {
        res.status(404).json({ error: "Guest account not found." });
      }
    } else {
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      user = result.rows[0];

      const dummyHash =
        "$2b$10$u/8F3sA6v9xROhC4pHqA3Or4sEz93fbD8lP4E07Az5VGsUcUDK8jq";
      const match = user
        ? await bcrypt.compare(password, user.password)
        : await bcrypt.compare(password, dummyHash);

      if (!match) {
        res.status(401).json({ error: "Invalid login details." });
      }
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post(
  "/api/submit-survey",
  authenticate,
  async (req: AuthenticatedRequest, res) => {
    const {
      name,
      surname,
      city,
      country,
      age,
      gender,
      contact,
      symptoms,
      vaccination,
      additionalInfo,
    } = req.body;

    try {
      await client.query(
        `INSERT INTO survey
          (user_id, name, surname, city, country, age, gender, contact, symptoms, vaccination, additional_info)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          req.userId,
          name,
          surname,
          city,
          country,
          age,
          gender,
          contact,
          symptoms,
          vaccination,
          additionalInfo,
        ]
      );

      res.status(201).json({ message: "Survey submitted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save survey." });
    }
  }
);

app.get("/api/get-surveys", async (req, res) => {
  try {
    const result = await client.query(
      `SELECT 
     name, 
     surname, 
     city, 
     country, 
     age, 
     gender, 
     contact, 
     symptoms, 
     vaccination, 
     additional_info, 
     created_at
   FROM survey`
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
