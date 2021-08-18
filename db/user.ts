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

// const User = {
//   login: async ({ username, password }: loginUser) => {

//   },
//   signup: async ({ username, email, password, confirmPassword }: signupUser) => {
//     if (confirmPassword !== password) {
//       throw Error('Confirm Password field must match Password field.');
//     }

//     const query = await user.findFirst({
//       where: {
//         OR: [
//           {
//             username,
//           },
//           {
//             email,
//           },
//         ],
//       },
//     });
//     console.log(query);
//   },
//   validatePassword: () => true,
// };

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

  static login = ({ credential, password }: LoginUser) => {}
  static signup = ({ email, username, password }: SignupUser) => {}

  static hashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
  }

  validatePassword = (password: string) => {
    return bcrypt.compare(password, this.hashedPassword);
  }
}

export default User;
