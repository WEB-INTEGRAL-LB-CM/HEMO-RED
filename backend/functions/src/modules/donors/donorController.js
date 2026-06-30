const userRepo = require("../../repositories/userRepository");

const getDonors = async (req, res) => {
  const donors = await userRepo.findAvailableDonors(req.query.bloodType || null);
  return res.status(200).json({ success: true, count: donors.length, data: donors });
};

const getDonorById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.role !== "admin" && req.user.id !== id)
    return res.status(403).json({ success: false, message: "Sin permiso." });

  const user = await userRepo.findById(id);
  if (!user) return res.status(404).json({ success: false, message: "No encontrado." });
  return res.status(200).json({ success: true, data: userRepo.sanitize(user) });
};

const cancelDonor = async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.role !== "admin" && req.user.id !== id)
    return res.status(403).json({ success: false, message: "Sin permiso." });

  const result = await userRepo.anonymize(id);
  if (!result) return res.status(404).json({ success: false, message: "No encontrado." });
  return res.status(200).json({ success: true, message: "Datos anonimizados (ARCO - Cancelación)." });
};

module.exports = { getDonors, getDonorById, cancelDonor };