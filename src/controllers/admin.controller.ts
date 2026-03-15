import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberType } from "../libs/enums/member.enum";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { Message } from "../libs/Errors";

// BSSR

const memberService = new MemberService();
const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home"); // home.ejs
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup"); // signup.ejs
  } catch (err) {
    console.log("Error, getSignup", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login"); // login.ejs
  } catch (err) {
    console.log("Error, getLogin", err);
  }
};

adminController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.ADMIN;

    const result = await memberService.processSignup(newMember);

    // SESSION AUTHENTICATION
    req.session.member = result; // 1: cookies + sid | 2: sessions collection + result
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processSignup", err);
  }
};

adminController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;

    const result = await memberService.processLogin(input);

    // SESSION AUTHENTICATION
    req.session.member = result; // 1: cookies + sid | 2: sessions collection + result
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("Error, processLogin", err);
  }
};

adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script> alert("${req.session.member.memberNick}")</script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
  } catch (err) {
    console.log("Error, checkAuthSession", err);
    res.send(err);
  }
};

export default adminController;
