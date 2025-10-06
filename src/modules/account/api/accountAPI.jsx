import api from "@/api/axiosInstance.js";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/modules/account/utils/validation.jsx";

export async function AccountAPIFetch(setAccount) {
  try {
    const response = await api.get("/account");
    const AccountData = response.map((res) => ({
      id: data.id,
      FirstName: firstname,
      lastname: lastname,
      username: username,
      phonenumber: phonenumber,
      email: email,
      status: status,
    }));
    setAccount(res);
  } catch (err) {
    console.log(`error:  ${err}`);
  }
}

export async function AccountSubmit(
  User,
  resetInput,
  emailExist,
  usernameExist
) {
  //  Duplicate checks first
  if (emailExist) return SweetAlert.error("Email already taken");
  if (usernameExist) return SweetAlert.error("Username already taken");

  //  Validate all fields
  const isFirstNameValid = validationField.name.test(User.firstname);
  const isLastNameValid = validationField.name.test(User.lastname);
  const isUsernameValid = validationField.username.test(User.username);
  const isRoleValid = validationField.roleSelected.test(User.role_id);
  const isEmailValid = validationField.email.test(User.email);
  const isPasswordValid = validationField.password.test(User.password);
  const isConfirmPasswordValid = User.password === User.confirmPass;
  const isPhoneValid = validationField.phone.test(User.phonenumber);

  if (!isFirstNameValid) return SweetAlert.error("Invalid First Name");

  if (!isLastNameValid) return SweetAlert.error("Invalid Last Name");

  if (!isUsernameValid)
    return SweetAlert.error(
      "Invalid Username",
      "Username must be at least 4 characters and contain only letters, numbers, or underscore."
    );

  if (!isRoleValid)
    return SweetAlert.error("No selected role", "Please select a valid role");

  if (!isEmailValid) return SweetAlert.error("Invalid Email Address");

  if (!isPasswordValid)
    return SweetAlert.error(
      "Invalid Password",
      "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
    );

  if (!isConfirmPasswordValid)
    return SweetAlert.error(
      "Password Mismatch",
      "Password and Confirm Password do not match."
    );

  if (!isPhoneValid)
    return SweetAlert.error(
      "Invalid Phone Number",
      "(Format: 09xxxxxxxxx or +639xxxxxxxxx)"
    );

  //  submit to API
  try {
    await api.post("/account", User);
    SweetAlert.success("Successfully Registered Account");
    resetInput();
  } catch (err) {
    console.error("There was an error during account submission:", err);
    SweetAlert.error("An error occurred while registering the account");
  }
}

// Flag Api
//Handle Check email --------------
export async function CheckEmailExist(value, setEmailExist) {
  try {
    const response = await api.post(`account/check-email?email=${value}`);
    setEmailExist(response.data.exists);
  } catch (err) {
    console.log(`There is an error: ${err}`);
  }
}

//Handle Check username --------------
export async function CheckUsernameExist(value, setUserNameExist) {
  try {
    const response = await api.post(`account/check-username?username=${value}`);
    setUserNameExist(response.data.exists);
  } catch (err) {
    console.log(`There is error: ${err}`);
  }
}
