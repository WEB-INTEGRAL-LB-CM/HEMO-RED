/**
 * MIDDLEWARE: Bitácora de auditoría (sin datos personales - LGPDPPSO)
 */
const auditLog = (req, res, next) => {
  console.log(`[AUDIT] ${new Date().toISOString()} | user=${req.user?.id || "anon"} | role=${req.user?.role || "-"} | ${req.method} ${req.path}`);
  next();
};

module.exports = { auditLog };
