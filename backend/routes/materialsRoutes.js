const express = require("express");
const { addMaterial, getMaterials } = require("../controllers/studyMaterialController");

const router = express.Router();

router.post("/add", addMaterial);
router.get("/", getMaterials);

module.exports = router;
