const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/healithoDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

/* ---------------- CONTACT MODEL ---------------- */

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String,
});

/* ---------------- ROOT ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("Healitho Backend is Running 🚀");
});

/* ---------------- TEST API ---------------- */

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

/* ---------------- CONTACT API ---------------- */

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    console.log("Saved to MongoDB ✅");

    res.json({
      success: true,
      message: "Message saved successfully ✅",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});