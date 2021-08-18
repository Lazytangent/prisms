import bcrypt from 'bcryptjs';
import { user } from "../db";

interface LoginUser {
  credential: string;
  password: string;
}

interface SignupUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserInterface {
  id: number;
  email: string;
  username: string;
  hashedPassword: string;
}

class User {
  id: number;
  email: string;
  username: string;
  hashedPassword: string;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.hashedPassword = user.hashedPassword;
  }

  static emailLookup = (email: string) => {
    return user.findUnique({ where: { email } });
  }

  static usernameLookup = (username: string) => {
    return user.findUnique({ where: { username } });
  }

  static login = ({ credential, password }: LoginUser) => {}
  static signup = ({ email, username, password, confirmPassword }: SignupUser) => {
    if (password !== confirmPassword) {
      throw Error('Passwords must match.');
    }
  }

  static hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
  }

  validatePassword = (password: string) => {
    return bcrypt.compare(password, this.hashedPassword);
  }
}

export default User;
