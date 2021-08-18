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

describe("The User class should have", () => {
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

    test.todo('creates a new User if the information provided validates');
    test.todo('returns errors about the fields that failed validation');
    test.todo('does not create a new User if information is missing');
    test.todo('does not create a new User if the email has been used');
    test.todo('does not create a new User if the username has been used');
    test.todo("does not create a new User if the passwords don't match");
  });

  describe('a login static method that', () => {
    test('exists', () => {
      expect(User.login).toBeInstanceOf(Function);
    });

    test.todo('logs a user in if the information provided validates');
    test.todo('returns an error if either the credential or password fails validation');
    test.todo('does not log a user in if the password does not validate');
    test.todo('does not log a user in if the credential does not match an email nor a username');
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

  describe('a findMany static method that', () => {
    test.todo('exists');
    test.todo('returns an array of User instances that match the options given');
    test.todo('uses the prisma.user.findMany method');
  });

  describe('a findUnique static method that', () => {
    test.todo('exists');
    test.todo('returns the one User instance that matches the criteria given');
    test.todo('returns undefined if no User instances match the criteria given');
    test.todo('uses the prisma.user.findUnique method');
  });

  describe('an update static method that', () => {
    test.todo('exists');
    test.todo('returns the updated User instances');
    test.todo('updates the User instances that matche the criteria given');
  });

  describe('a destroy static method that', () => {

  });

  describe('an update instance method that', () => {

  });

  describe('a destroy instance method that', () => {

  });
});
