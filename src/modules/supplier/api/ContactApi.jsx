import api from "@/api/axiosInstance.js";
import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import { useEffect, useState } from "react";
export async function FetchContact(setFetchedContact) {
  try {
    const response = await api.get("/contact");
    const contactData = response.data.map((res) => ({
      id: res.id,
      firstname: res.firstname,
      lastname: res.lastname,
      phonenumber: res.phonenumber,
      email: res.email,
    }));
    setFetchedContact(contactData);
  } catch (err) {
    console.log(`There is error: ${err}`);
  }
}

// Handle validation for both edit and add
const HandleValidation = (value) => {
  if (!validationField.name.test(value.firstname)) {
    SweetAlert.error("Invalid First Name", "Please enter a valid first name.");
    return false;
  }

  if (!validationField.name.test(value.lastname)) {
    SweetAlert.error("Invalid Last Name", "Please enter a valid last name.");
    return false;
  }

  if (!validationField.phone.test(value.phonenumber)) {
    SweetAlert.error(
      "Invalid Phone Number",
      "Please enter a valid phone number (e.g., 09XXXXXXXXX or +639XXXXXXXXX)."
    );
    return false;
  }

  if (!validationField.email.test(value.email)) {
    SweetAlert.error(
      "Invalid Email Address",
      "Please enter a valid email address (e.g., example@email.com)."
    );
    return false;
  }

  return true;
};

//Submit new Contact
export async function SubmitNewContact(Request, restInput) {
  const contact = {
    firstname: Request.firstname,
    lastname: Request.lastname,
    phonenumber: Request.phonenumber,
    email: Request.email,
  };

  if (!HandleValidation(contact)) return;
  try {
    await api.post("/contact", contact);
    SweetAlert.success(
      `successfully Added`,
      `Contact ${contact.firstname} ${contact.lastname} has been successfully edited`
    );
    restInput();
  } catch (err) {
    console.log(`There is error: ${err}`);
    SweetAlert.error(
      "Failed to register",
      "There is a problem in a server or network"
    );
  }
}

//Submit Edited Contact
export async function SubmitEditContact(Request, resetInput) {
  const contact = {
    firstname: Request.firstname,
    lastname: Request.lastname,
    phonenumber: Request.phonenumber,
    email: Request.email,
  };
  if (!HandleValidation(contact)) return;

  try {
    await api.patch(`/contact/${Request.id}`, contact);
    SweetAlert.success(
      `successfully edited`,
      `Contact ${contact.firstname} ${contact.lastname} has been successfully edited`
    );
    resetInput();
  } catch (err) {
    console.log(`There is error: ${err}`);
    SweetAlert.error(
      "Unable to edit",
      "There is a problem in a server or network"
    );
  }
}
