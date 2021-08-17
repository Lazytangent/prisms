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

  describe("the User object's", () => {
    describe('validatePassword method should', () => {
      test('exist', () => {
        expect(User.validatePassword).toBeInstanceOf(Function);
      });
    });
  });
});
