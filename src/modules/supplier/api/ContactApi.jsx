import api from "@/api/axiosInstance.js";
import { validationField } from "@/utils/validation.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";

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
