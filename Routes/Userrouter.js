"use strict";
import express from "express";

import userController from "../Controller/UserController.js";
import auth from "../middleWare/UserAuth.js";
import authAdmin from "../middleWare/Adminauth.js";
// const authAdmin = require("../middleWare/auth");

const router = express.Router();

router.post("/signup", userController.signUpUser);
router.post("/login", userController.logInUser);
// router.post("/sendLockerRequest", auth, SendRequest);
router.post("/logout", userController.logout);

router.put("/reset-password", userController.ResetPassword);

router.get("/profile", auth, userController.profileDetails);
router.get("/admin-details", authAdmin, userController.GetallDetails);
router.get("/testing", userController.Details);

export default router;
