import { randomBytes, pbkdf2 } from 'crypto';
import { user } from "../db";

interface loginUser {
  username: string;
  password: string;
}

interface signupUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const User = {
  login: async ({ username, password }: loginUser) => {

  },
  signup: async ({ username, email, password, confirmPassword }: signupUser) => {
    if (confirmPassword !== password) {
      throw Error('Confirm Password field must match Password field.');
    }

    const query = await user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
    console.log(query);
  },
  validatePassword: () => true,
};

export default User;
