const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

console.log("✅ Material seed script started");
console.log("MONGO_URI:", process.env.MONGO_URI ? "FOUND ✅" : "NOT FOUND ❌");

const StudyMaterial = require("../models/StudyMaterial");

const materials = [
  {
    title: "DBMS Complete Notes",
    subject: "DBMS",
    topic: "Normalization",
    type: "PDF",
    link: "https://drive.google.com/drive/u/0/folders/1k9kChRuZ5i7qqD0S_W9rjd7kpEV8CNP7",
  },
  {
    title: "Operating System Playlist",
    subject: "OS",
    topic: "Process Scheduling",
    type: "Video",
    link: "https://www.youtube.com/watch?v=_TpOHMCODXo&list=PLDzeHZWIZsTr3nwuTegHLa2qlI81QweYG",
  },
  {
    title: "Computer Networks Notes",
    subject: "CN",
    topic: "TCP/IP Model",
    type: "Notes",
    link: "https://drive.google.com/drive/u/0/folders/1k9kChRuZ5i7qqD0S_W9rjd7kpEV8CNP7",
  },
  {
    title: "OOP Concepts Notes",
    subject: "OOP",
    topic: "Encapsulation + Inheritance",
    type: "PDF",
    link: "https://drive.google.com/drive/u/0/folders/1k9kChRuZ5i7qqD0S_W9rjd7kpEV8CNP7",
  },
  {
    title: "Striver DSA Sheet",
    subject: "DSA",
    topic: "Sheet",
    type: "Link",
    link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
  },
  {
    title: "AMCAT Preparation",
    subject:"AMCAT fix",
    topic: "Aptitute,DSA,English",
    type:"Link",
    link: "https://docs.google.com/spreadsheets/d/1fG_ktfP8dOEDujImt7umNhs2Umm8EVRkPiTkoJueCFc/edit?usp=drivesdk"
  }
];

async function seedMaterials() {
  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected ✅");

    await StudyMaterial.deleteMany();
    console.log("Old materials cleared ✅");

    await StudyMaterial.insertMany(materials);
    console.log("Materials Seeded Successfully ✅");

    await mongoose.connection.close();
    console.log("MongoDB connection closed ✅");

    process.exit(0);
  } catch (err) {
    console.log("Error ❌", err.message);
    process.exit(1);
  }
}

seedMaterials();
