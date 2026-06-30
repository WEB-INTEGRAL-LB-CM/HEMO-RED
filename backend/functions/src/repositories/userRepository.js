/**
 * PATRÓN: Repository + Singleton
 * Abstrae el acceso a datos. Reemplazar el array por Firestore en producción.
 */
const bcrypt = require("bcryptjs");

const users = [
  { id: 1, name: "Admin HemoRed",   email: "admin@hemored.mx",    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "admin",    bloodType: "O+", available: true },
  { id: 2, name: "Carlos Palma",    email: "carlos@hemored.mx",   password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "donor",    bloodType: "A+", available: true },
  { id: 3, name: "Hospital General",email: "hospital@hemored.mx", password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", role: "hospital", bloodType: null, available: true },
];
let nextId = 4;

class UserRepository {
  async findByEmail(email) { return users.find(u => u.email === email.toLowerCase()) || null; }
  async findById(id)       { return users.find(u => u.id === parseInt(id)) || null; }

  async create({ name, email, password, role, bloodType }) {
    const hashed = await bcrypt.hash(password, 10);
    const user = { id: nextId++, name, email: email.toLowerCase(), password: hashed, role: role || "donor", bloodType: bloodType || null, available: true, createdAt: new Date().toISOString() };
    users.push(user);
    return user;
  }

  async findAvailableDonors(bloodType = null) {
    return users
      .filter(u => u.role === "donor" && u.available)
      .filter(u => bloodType ? u.bloodType === bloodType : true)
      // eslint-disable-next-line no-unused-vars
      .map(({ password, ...safe }) => safe);
  }

  async anonymize(id) {
    const i = users.findIndex(u => u.id === parseInt(id));
    if (i === -1) return null;
    users[i] = { ...users[i], name: "Usuario Eliminado", email: `anon_${id}@eliminado.mx`, bloodType: null, available: false };
    return users[i];
  }

  sanitize(user) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...safe } = user;
    return safe;
  }
}

module.exports = new UserRepository(); // Singleton