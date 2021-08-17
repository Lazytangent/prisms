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

  static login = () => {}
  static signup = () => {}
  static hashPassword = () => {}
  validatePassword = (password: string) => {}
}

export default User;
