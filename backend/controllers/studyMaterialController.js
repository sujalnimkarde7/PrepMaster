const StudyMaterial = require("../models/StudyMaterial");

// ✅ Add material
exports.addMaterial = async (req, res) => {
  try {
    const { title, subject, topic, type, link } = req.body;

    if (!title || !subject || !topic || !link) {
      return res.status(400).json({ message: "All fields required" });
    }

    const material = await StudyMaterial.create({
      title,
      subject,
      topic,
      type,
      link
    });

    res.status(201).json({
      message: "Study material added ✅",
      material
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get materials (filters)
exports.getMaterials = async (req, res) => {
  try {
    const { subject, topic, type } = req.query;

    let filter = {};
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (type) filter.type = type;

    const materials = await StudyMaterial.find(filter).sort({ createdAt: -1 });

    res.json({
      total: materials.length,
      materials
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
