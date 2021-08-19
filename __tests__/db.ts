import bcrypt from 'bcryptjs';
import db, { User, Tweet } from '../db';

describe('db', () => {
  describe('should export', () => {
    it('the Prisma db object', () => {
      expect(db).toBeTruthy();
    });

    it('the User object', () => {
      expect(User).toBeTruthy();
    });

    it('the Tweet object', () => {
      expect(Tweet).toBeTruthy();
    });
  });
});

describe("The User class should have", () => {
  let email: string;
  let username: string;

  beforeAll(async () => {
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    email = 'test@email.com';
    username = 'testuser';

    const userInfo = { email, username, hashedPassword };
    await db.user.create({ data: userInfo });
  });

  afterAll(async () => {
    await db.user.delete({ where: { email } });
    await db.$disconnect();
  });

  describe('a hashPassword static method that', () => {
    it('exists', () => {
      expect(User.hashPassword).toBeInstanceOf(Function);
    });

    it('returns a hashed password', async () => {
      const password = 'password';
      const hashedPassword = await User.hashPassword(password);
      const result = await bcrypt.compare(password, hashedPassword);

      expect(password === hashedPassword).toEqual(false);
      expect(result).toEqual(true);
    });
  });

  describe('an emailLookup static method that', () => {
    it('returns a User object if a user matches the email provided', async () => {
      const user = await User.emailLookup(email);

      expect(user).toBeTruthy();
      expect(user?.email).toEqual(email);
    });

    it('returns null if no user matches the email provided', async () => {
      const user = await User.emailLookup('bad@email.io');

      expect(user).toBeNull();
    });
  });

  describe('a usernameLookup static method that', () => {
    it('returns a User object if a user matches the username provided', async () => {
      const user = await User.usernameLookup(username);

      expect(user).toBeTruthy();
      expect(user?.username).toEqual(username);
    });

    it('returns null if no user matches the username provided', async () => {
      const user = await User.usernameLookup('badusername');

      expect(user).toBeNull();
    });
  });

  describe('an emailExists static method that', () => {
    it('returns a boolean value of true if a user with the provided email exists', async () => {
      const result = await User.emailExists(email);

      expect(result).toEqual(true);
    });
    it('returns a boolean value of false if no user with the provided email exists', async () => {
      const result = await User.emailExists('bad@email.com');

      expect(result).toEqual(false);
    });
  });

  describe('a usernameExists static method that', () => {
    it('returns a boolean value of true if a user with the provided username exists', async () => {
      const result = await User.usernameExists(username);

      expect(result).toEqual(true);
    });
    it('returns a boolean value of false if no user with the provided username exists', async () => {
      const result = await User.usernameExists('badusername');

      expect(result).toEqual(false);
    });
  });

  describe('a signup static method that', () => {
    let username: string;
    let email: string;

    beforeEach(async () => {
      username = 'valid_username';
      email = 'valid@email.com';
      const userInfoSignup = { email, username, password: 'password', confirmPassword: 'password' };

      await User.signup(userInfoSignup);
    });

    afterEach(async () => {
      try {
        await db.user.delete({ where: { email, username } });
      } catch (e) {}
    });

    it('exists', () => {
      expect(User.signup).toBeInstanceOf(Function);
    });

    it('creates a new User if the information provided validates', async () => {
      const user = await db.user.findUnique({ where: { email } });

      expect(user).toMatchObject({ email, username });
    });

    it('returns errors about the fields that failed validation', async () => {
      const badUserInfo = { email: 'test', username: '', password: 'asdf', confirmPassword: 'zxcv' };
      const user = await User.signup(badUserInfo);

      expect(user).toHaveLength(4);
    });

    it('does not create a new User if the email has been used', async () => {
      const badUserInfo = { email, username: 'asdf', password: 'asdfzxcv', confirmPassword: 'asdfzxcv' };
      const user = await User.signup(badUserInfo);

      expect(user).toHaveLength(1);
      expect(user).toContain('Email already exists.');
    });

    it('does not create a new User if the username has been used', async () => {
      const badUserInfo = { email: 'another@email.io', username, password: 'zxcvasdf', confirmPassword: 'zxcvasdf' };
      const user = await User.signup(badUserInfo);

      expect(user).toHaveLength(1);
      expect(user).toContain('Username already exists.');
    });

    it("does not create a new User if the passwords don't match", async () => {
      const badUserInfo = { email: 'another@email2.io', username: 'another_valid_username', password: 'asdfzxcv', confirmPassword: 'zxcvasdf' };
      const user = await User.signup(badUserInfo);

      expect(user).toHaveLength(1);
      expect(user).toContain('Passwords must match.');
    });
  });

  describe('a login static method that', () => {
    it('exists', () => {
      expect(User.login).toBeInstanceOf(Function);
    });

    it.todo('logs a user in if the information provided validates');
    it.todo('returns an error if either the credential or password fails validation');
    it.todo('does not log a user in if the password does not validate');
    it.todo('does not log a user in if the credential does not match an email nor a username');
  });

  describe('a validatePassword instance method that', () => {
    let user: User;

    beforeAll(async () => {
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ id: 0, email: 'email', username: 'username', hashedPassword });
    });

    it('exists', async () => {
      expect(user.validatePassword).toBeInstanceOf(Function);
    });

    it('returns a boolean value of true if the password is correct', async () => {
      const password1 = 'password';
      const password2 = 'password2';
      const result1 = await user.validatePassword(password1);
      const result2 = await user.validatePassword(password2);

      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
    });
  });

  describe('a findMany static method that', () => {
    it.todo('exists');
    it.todo('returns an array of User instances that match the options given');
    it.todo('uses the prisma.user.findMany method');
  });

  describe('a findUnique static method that', () => {
    it.todo('exists');
    it.todo('returns the one User instance that matches the criteria given');
    it.todo('returns undefined if no User instances match the criteria given');
    it.todo('uses the prisma.user.findUnique method');
  });

  describe('an update static method that', () => {
    it.todo('exists');
    it.todo('returns the updated User instances');
    it.todo('updates the User instances that match the criteria given');
  });

  describe('a destroy static method that', () => {
    it.todo('exists');
    it.todo('returns the IDs of the Users that were destroyed');
    it.todo('removes those users from the database');
  });

  describe('an update instance method that', () => {
    it.todo('exists');
    it.todo('returns the IDs of the Users that were updated');
    it.todo('updates the user in the database');
  });

  describe('a destroy instance method that', () => {
    it.todo('exists');
    it.todo('returns nothing');
    it.todo('destroys the user instance that it was called on');
  });
});
