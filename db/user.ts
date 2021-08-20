import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

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

  static emailExists = async (email: string): Promise<boolean> => {
    const user = await User.emailLookup(email);
    return !!user;
  }

  static usernameExists = async (username: string): Promise<boolean> => {
    const user = await User.usernameLookup(username);
    return !!user;
  }

  static signup = async ({ email, username, password, confirmPassword }: SignupUser) => {
    const errors = [];

    if (password !== confirmPassword) {
      errors.push('Passwords must match.');
    }

    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long.');
    }

    if (!isEmail(email)) errors.push('Invalid email.');
    if (!username.length) errors.push('Username must have length.');

    const emailExists = await User.emailExists(email);
    const usernameExists = await User.usernameExists(username);

    const lookupResult = !emailExists && !usernameExists;
    if (!lookupResult) {
      if (emailExists) errors.push('Email already exists.');
      if (usernameExists) errors.push('Username already exists.');
    }

    if (errors.length) return errors;

    const hashedPassword = await User.hashPassword(password);
    return await user.create({ data: { email, username, hashedPassword } });
  }

  static login = ({ credential, password }: LoginUser) => {

  }

  static hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
  }

  validatePassword = (password: string) => {
    return bcrypt.compare(password, this.hashedPassword);
  }
}

export default User;
