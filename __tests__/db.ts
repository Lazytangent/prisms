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
    test('exists', async () => {
      // expect(User.validatePassword).toBeInstanceOf(Function);
    });

    test('returns a boolean value of true if the password is correct', () => {
    });
  });
});
