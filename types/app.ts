export class CustomError extends Error {
  name: string;
  title: string;
  errors: string[];
  status: number;

  constructor(name: string) {
    super(name);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
