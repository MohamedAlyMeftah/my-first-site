import { Request, Response } from "express";

const Register = (req: Request, res: Response): void => {
  res.send("register page");
};

export default Register;
