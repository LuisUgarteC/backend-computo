class IUser {
  static async createUser (email, password, nombre, apellido, telefono, cumple) {}
  static async findByEmail (email) {}
  async verifyPassword(password) {}
}

module.exports = IUser