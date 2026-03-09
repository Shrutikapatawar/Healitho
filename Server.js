const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose.connect("mongodb://127.0.0.1:27017/healithoDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

/* ---------------- CONTACT MODEL ---------------- */

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String,
});

/* ---------------- TEST API ---------------- */

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

/* ---------------- CONTACT API ---------------- */

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Incoming data:", req.body); // helps debugging

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});