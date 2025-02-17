require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load MongoDB URI from .env file
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Freelancer Schema

const freelancerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true }, 
    location: { type: String, required: true },
    bio: { type: String, required: true },
    skills: { type: [String], required: true },
    rating: { type: Number, required: true },
    totalEarnings: { type: String, required: true },
    hoursWorked: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  });
  

const Freelancer = mongoose.model("Freelancer", freelancerSchema);

// Define Recruiter Schema
const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  totalListings: { type: Number, required: true },
  successfulHires: { type: Number, required: true },
  experience: { type: String, required: true },
  bio: { type: String, required: true }
});

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

// GET API: Fetch all freelancers
app.get("/freelancers", async (req, res) => {
  try {
    const freelancers = await Freelancer.find();
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching freelancers" });
  }
});

// GET API: Fetch all recruiters
app.get("/recruiters", async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recruiters" });
  }
});

// POST API: Insert freelancers into the database
app.post("/add-freelancers", async (req, res) => {
  try {
    const freelancersData = [
      {
        "name": "Sai Vignesh",
        "role": "Full Stack Developer",
        "location": "Guntur, India",
        "bio": "Passionate MERN Stack developer with 3+ years of experience in building scalable web applications.",
        "skills": ["React", "Node.js", "MongoDB", "Tailwind CSS", "Blockchain"],
        "rating": 4.9,
        "totalEarnings": "₹57,430",
        "hoursWorked": 58,
        "latitude": 16.3067,
        "longitude": 80.4365
      },
      {
        "name": "Alice Johnson",
        "role": "UI/UX Designer",
        "location": "Hyderabad, India",
        "bio": "Creative UI/UX designer with expertise in Figma and Adobe XD, crafting engaging user experiences.",
        "skills": ["Figma", "Adobe XD", "CSS", "JavaScript"],
        "rating": 4.8,
        "totalEarnings": "₹75,200",
        "hoursWorked": 102,
        "latitude": 17.3850,
        "longitude": 78.4867
      },
      {
        "name": "Rohan Mehta",
        "role": "Blockchain Developer",
        "location": "Bangalore, India",
        "bio": "Experienced blockchain developer with a strong background in Solidity and smart contracts.",
        "skills": ["Solidity", "Ethereum", "Web3.js", "Hyperledger"],
        "rating": 4.7,
        "totalEarnings": "₹90,500",
        "hoursWorked": 120,
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      {
        "name": "Emily Carter",
        "role": "Graphic Designer",
        "location": "New Delhi, India",
        "bio": "Expert in Adobe Photoshop, Illustrator, and After Effects, specializing in branding and animation.",
        "skills": ["Photoshop", "Illustrator", "After Effects", "Canva"],
        "rating": 4.6,
        "totalEarnings": "₹42,300",
        "hoursWorked": 85,
        "latitude": 28.6139,
        "longitude": 77.2090
      },
      {
        "name": "David Smith",
        "role": "Cybersecurity Expert",
        "location": "Mumbai, India",
        "bio": "Ethical hacker with a focus on penetration testing and network security.",
        "skills": ["Penetration Testing", "Network Security", "Cryptography", "Linux"],
        "rating": 4.9,
        "totalEarnings": "₹1,05,000",
        "hoursWorked": 130,
        "latitude": 19.0760,
        "longitude": 72.8777
      }
    ];

    const insertedFreelancers = await Freelancer.insertMany(freelancersData);
    res.status(201).json({ message: "Freelancers added successfully", data: insertedFreelancers });
  } catch (error) {
    res.status(500).json({ error: "Error inserting freelancers" });
  }
});

// POST API: Insert recruiters into the database
app.post("/add-recruiters", async (req, res) => {
  try {
    const recruitersData = [
      {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1 234 567 890",
        "company": "Tech Innovations Ltd.",
        "location": "San Francisco, CA",
        "totalListings": 18,
        "successfulHires": 24,
        "experience": "8 years",
        "bio": "Passionate about connecting top talent with the best opportunities. Experienced in tech recruitment and scaling teams efficiently."
      },
      {
        "name": "Priya Sharma",
        "email": "priya.sharma@example.com",
        "phone": "+91 98765 43210",
        "company": "Startup Hub",
        "location": "Bangalore, India",
        "totalListings": 12,
        "successfulHires": 15,
        "experience": "5 years",
        "bio": "Helping startups find the right tech talent to scale their business. Passionate about the Indian startup ecosystem."
      },
      {
        "name": "Michael Brown",
        "email": "michael.brown@example.com",
        "phone": "+44 7890 123456",
        "company": "Enterprise Solutions Inc.",
        "location": "London, UK",
        "totalListings": 25,
        "successfulHires": 30,
        "experience": "10 years",
        "bio": "Specialist in hiring IT professionals for enterprise applications and cloud computing projects."
      },
      {
        "name": "Sophia Lee",
        "email": "sophia.lee@example.com",
        "phone": "+65 9123 4567",
        "company": "AI Talent Solutions",
        "location": "Singapore",
        "totalListings": 8,
        "successfulHires": 10,
        "experience": "6 years",
        "bio": "Recruiting top AI and data science talent for global tech companies."
      },
      {
        "name": "Carlos Martinez",
        "email": "carlos.martinez@example.com",
        "phone": "+34 6123 9876",
        "company": "CloudHire",
        "location": "Madrid, Spain",
        "totalListings": 20,
        "successfulHires": 28,
        "experience": "9 years",
        "bio": "Connecting cloud engineers and DevOps professionals with leading European firms."
      }
    ];

    const insertedRecruiters = await Recruiter.insertMany(recruitersData);
    res.status(201).json({ message: "Recruiters added successfully", data: insertedRecruiters });
  } catch (error) {
    res.status(500).json({ error: "Error inserting recruiters" });
  }
});

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
