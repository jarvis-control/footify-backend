import { Request, Response } from "express";
import { T } from "../libs/types/common";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

export default memberController;
