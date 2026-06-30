const express = require("express");
const { authenticate, authorize } = require("../../middlewares/auth");
const { auditLog } = require("../../middlewares/audit");
const { getDonors, getDonorById, cancelDonor } = require("./donorController");

const router = express.Router();
router.use(authenticate, auditLog);

router.get("/",          authorize("admin", "hospital"), getDonors);
router.get("/:id",       authorize("admin", "donor", "hospital"), getDonorById);
router.delete("/:id/cancel", authorize("admin", "donor"), cancelDonor);

module.exports = router;