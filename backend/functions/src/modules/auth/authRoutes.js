const express = require("express");
const { body } = require("express-validator");
const { register, login } = require("./authController");

const router = express.Router();

router.post("/register", [
  body("name").trim().notEmpty().escape(),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }).matches(/[A-Z]/).matches(/[0-9]/),
  body("role").optional().isIn(["donor", "hospital", "admin"]),
  body("bloodType").optional().isIn(["A+","A-","B+","B-","AB+","AB-","O+","O-"]),
], register);

router.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
], login);

module.exports = router;
