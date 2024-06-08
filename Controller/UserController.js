"use strict";

import UserModels from "../Model/UserModel.js";

const signUpUser = async (req, res) => {
  const body = req.body;
  const response = await UserModels.signUpUser(body);
  res.json(response);
};

const logInUser = async (req, res) => {
  const body = req.body;
  const response = await UserModels.logInUser(body);
  res.json(response);
};

const profileDetails = async (req, res) => {
  const token = req.token;
  const email = req.email;

  const response = await UserModels.profileDetails(token, email);
  res.json(response);
};

const GetallDetails = async (req, res) => {
  // const body = req.body;
  const response = await UserModels.Details();
  res.json(response);
};

const Details = async (req, res) => {
  // const body = req.body;
  const response = await UserModels.Details();
  res.json(response);
};

const SendRequest = async (req, res) => {
  const body = req.body;
  const response = await UserModels.signUpUser(body);
  res.json(response);
};

const ResetPassword = async (req, res) => {
  const query = req.query;
  const body = req.body;
  const response = await UserModels.ResetPassword(query, body);
  res.json(response);
};

const logout = async (req, res) => {
  const body = req.body;
  const response = await UserModels.logout(body);
  res.json(response);
};

const userController = {
  signUpUser,
  logInUser,
  profileDetails,
  GetallDetails,
  SendRequest,
  Details,
  ResetPassword,
  logout,
};
export default userController;
