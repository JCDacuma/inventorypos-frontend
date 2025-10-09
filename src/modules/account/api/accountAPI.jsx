import api from "@/api/axiosInstance.js";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { validationField } from "@/utils/validation.jsx";

export async function AccountAPIFetch(setAccount) {
  try {
    const response = await api.get("/account");
    const AccountData = response.data.map((res) => ({
      id: res.id,
      firstName: res.firstname,
      lastname: res.lastname,
      username: res.username,
      phonenumber: res.phonenumber,
      email: res.email,
      status: res.account_status,
      role: res.role_id,
      rolename: res.role_name,
    }));
    setAccount(AccountData);
  } catch (err) {
    console.log(`error:  ${err}`);
  }
}

//-------------------- Account Creation --------------------------
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
  const isRoleValid = validationField.SelectedId.test(User.role_id);
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

//-------------------- Edit Account --------------------------
export async function EditAccount(request, userID) {
  const form = {};
  if (request.roleId) form.role_id = request.roleId;
  if (request.firstname) form.firstname = request.firstname;
  if (request.lastname) form.lastname = request.lastname;
  if (request.email) form.email = request.email;
  if (request.phonenumber) form.phonenumber = request.phonenumber;
  if (request.password) form.password = request.password;
  if (request.account_status) form.account_status = request.account_status;

  if (Object.keys(form).length === 0) {
    SweetAlert.error("Invalid Input", "There is no submitted input");
    return;
  }

  // Validate first name
  if (form.firstname && !validationField.name.test(form.firstname)) {
    SweetAlert.error(
      "Invalid First Name",
      "First name must be at least 2 characters and can include letters, spaces, apostrophes, or hyphens."
    );
    return;
  }

  // Validate last name
  if (form.lastname && !validationField.name.test(form.lastname)) {
    SweetAlert.error(
      "Invalid Last Name",
      "Last name must be at least 2 characters and can include letters, spaces, apostrophes, or hyphens."
    );
    return;
  }

  // Validate username
  if (form.username && !validationField.username.test(form.username)) {
    SweetAlert.error(
      "Invalid Username",
      "Username must be at least 4 characters and contain only letters, numbers, or underscores."
    );
    return;
  }

  // Validate Role (if provided)
  if (form.role_id && !validationField.SelectedId.test(form.role_id)) {
    SweetAlert.error("Invalid Role Selected", "Invalid roleSelected");
    return;
  }

  // Validate password (if provided)
  if (form.password && !validationField.password.test(form.password)) {
    SweetAlert.error(
      "Invalid password",
      "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
    );
    return;
  }

  // Validate Phone Number (if provided)
  if (form.phonenumber && !validationField.phonenumber.test(form.phonenumber)) {
    SweetAlert.error(
      "Invalid Phone Number",
      "Please enter a valid phone number"
    );
    return;
  }

  // Validate Email (if provided)
  if (form.email && !validationField.email.test(form.email)) {
    SweetAlert.error("Invalid Email", "Please enter a valid email address");
    return;
  }

  try {
    // API PATCH request user
    await api.patch(`/account/${userID}`, form);

    SweetAlert.success("Updated Successfully", "Account has been updated.");
  } catch (err) {
    console.error("Error updating account:", err);
    SweetAlert.error(
      "Update Failed",
      "Something went wrong while updating the account."
    );
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
