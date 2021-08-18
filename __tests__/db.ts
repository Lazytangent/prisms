import bcrypt from 'bcryptjs';
import db, { User, Tweet } from '../db';

describe('db', () => {
  describe('should export', () => {
    test('the Prisma db object', () => {
      expect(db).toBeTruthy();
    });

    test('the User object', () => {
      expect(User).toBeTruthy();
    });

    test('the Tweet object', () => {
      expect(Tweet).toBeTruthy();
    });
  });
});

describe("the User class should have", () => {
  describe('a hashPassword static method that', () => {
    test('exists', () => {
      expect(User.hashPassword).toBeInstanceOf(Function);
    });

    test('returns a hashed password', async () => {
      const password = 'password';
      const hashedPassword = await User.hashPassword(password);
      const result = await bcrypt.compare(password, hashedPassword);

      expect(password === hashedPassword).toEqual(false);
      expect(result).toEqual(true);
    });
  });

  describe('a signup static method that', () => {
    test('exists', () => {
      expect(User.signup).toBeInstanceOf(Function);
    });
  });

  describe('a login static method that', () => {
    test('exists', () => {
      expect(User.login).toBeInstanceOf(Function);
    });
  });

  describe('a validatePassword instance method that', () => {
    let user: User;

    beforeAll(async () => {
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ id: 0, email: 'email', username: 'username', hashedPassword });
    });

    test('exists', async () => {
      expect(user.validatePassword).toBeInstanceOf(Function);
    });

    test('returns a boolean value of true if the password is correct', async () => {
      const password1 = 'password';
      const password2 = 'password2';
      const result1 = await user.validatePassword(password1);
      const result2 = await user.validatePassword(password2);

      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });
});
