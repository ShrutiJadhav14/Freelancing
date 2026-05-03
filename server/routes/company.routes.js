const express = require("express");
const router = express.Router();
const {
  getCompanyProfile,
  upsertCompanyProfile,
} = require("../controllers/company.controller");

const auth = require("../middleware/auth.middleware");

router.get("/profile", auth, getCompanyProfile);
router.post("/profile", auth, upsertCompanyProfile);

module.exports = router;