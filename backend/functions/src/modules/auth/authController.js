const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userRepo = require("../../repositories/userRepository");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { name, email, password, role, bloodType } = req.body;
  if (await userRepo.findByEmail(email))
    return res.status(400).json({ success: false, message: "El correo ya está registrado." });

  const user = await userRepo.create({ name, email, password, role, bloodType });
  return res.status(201).json({ success: true, message: "Registrado.", data: userRepo.sanitize(user) });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  const { email, password } = req.body;
  const user = await userRepo.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ success: false, message: "Credenciales incorrectas." });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return res.status(200).json({ success: true, token, user: userRepo.sanitize(user) });
};

module.exports = { register, login };
