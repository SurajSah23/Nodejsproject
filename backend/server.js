import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user data
const user = {
  name: "John Weak",
  email: "workforeign@gmail.com",
  phone: "+44 (0) XXXX XXX XXX",
  profilePic: "https://images.unsplash.com/photo-1738762388661-f09b9b9b5df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"
};

// Dummy About Us data
const aboutUs = {
  title: "About Us",
  description:
    "We are a team of dedicated professionals driven by creativity, innovation, and a passion for exceptional design...",
  image: "https://images.unsplash.com/photo-1738762388661-f09b9b9b5df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"
};

// API routes
app.get("/api/user", (req, res) => {
  res.json(user);
});

app.get("/api/about", (req, res) => {
  res.json(aboutUs);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("New contact request:", { name, email, message });
  res.json({ success: true, message: "Your message has been received!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
