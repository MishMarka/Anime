/**
 * User model representing a MishMarka user account
 * This is a placeholder model with no database integration
 */
class User {
  /**
   * Create a new User instance
   * @param {string} id - Unique identifier for the user
   * @param {string} email - User's email address
   * @param {string} password - User's password (hashed)
   */
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

module.exports = User;