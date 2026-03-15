import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import { LoginInput, MemberInput } from "../libs/types/member";

// BSSR

const memberService = new MemberService();
const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home Page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.send("Signup Page");
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login Page");
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;

    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("Error, processSignup", err);
  }
};

adminController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);

    res.send(result);
  } catch (err) {
    console.log("Error, processLogin", err);
  }
};

export default adminController;
