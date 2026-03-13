import express from "express";
const routerAdmin = express.Router();
import adminController from "./controllers/admin.controller";

routerAdmin.get("/", adminController.goHome);

export default routerAdmin;
