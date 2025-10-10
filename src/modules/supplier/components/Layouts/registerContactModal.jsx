import { useEffect, useState } from "react";
import { Modal } from "@/components/Layouts/modal.jsx";
import { motion } from "framer-motion";
import { SweetAlert } from "@/utils/sweetalert.jsx";
import {
  SubmitEditContact,
  SubmitNewContact,
} from "@/modules/supplier/api/ContactApi.jsx";
import { validationField } from "@/utils/validation.jsx";
import { UserPen, UserSearch, Phone, Mail, ListRestart } from "lucide-react";
import { Input } from "@/components/ui/Input.jsx";
export default function ContactModal({
  isOpen,
  onClosed,
  Contact,
  FetchContact,
}) {
  const [contactEdit, setContactEdit] = useState(null); //selected contac object
  const [OpenAdd, setOpenAdd] = useState(false);
  const [onSubmit, setOnsubmit] = useState(false);
  const [ContactInputValue, setContactInput] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
  });
  const [validated, setValidated] = useState({
    firstname: true,
    lastname: true,
    phonenumber: true,
    email: true,
  });

  //Input
  const ContactInput = [
    {
      name: "firstname",
      placeholder: "Enter firstname",
      value: ContactInputValue.firstname,
      icon: UserSearch,
      validatedState: validated.firstname,
    },
    {
      name: "lastname",
      placeholder: "Enter lastname",
      value: ContactInputValue.lastname,
      icon: UserSearch,
      validatedState: validated.lastname,
    },
    {
      name: "phonenumber",
      placeholder: "Enter phonenumber",
      value: ContactInputValue.phonenumber,
      icon: Phone,
      validatedState: validated.phonenumber,
    },
    {
      name: "email",
      placeholder: "Enter email",
      value: ContactInputValue.email,
      icon: Mail,
      validatedState: validated.email,
    },
  ];

  const HandleValidationState = (field, value) => {
    setValidated((state) => {
      const update = { ...state };
      switch (field) {
        case "firstname":
        case "lastname":
          update[field] = validationField.name.test(value);
          break;
        case "phonenumber":
          update[field] = validationField.phone.test(value);
        case "email":
          update[field] = validationField.email.test(value);
      }
      return update;
    });
  };

  const HandleResetInput = () => {
    setContactInput({
      firstname: "",
      lastname: "",
      phonenumer: "",
      email: "",
    });
    setContactEdit(null);
  };

  const HandleModalClose = () => {
    onClosed();
    HandleResetInput();
  };

  const HandleChange = (value, name) => {
    setContactInput((cont) => ({
      ...cont,
      [name]: value,
    }));
  };

  //Input Setter for Edit
  const HandleSetEdit = () => {
    setContactInput({
      firstname: contactEdit.firstname ?? "",
      lastname: contactEdit.lastname ?? "",
      phonenumber: contactEdit.phonenumber ?? "",
      email: contactEdit.email ?? "",
    });
  };

  //Trigger Edit Input set
  useEffect(() => {
    if (contactEdit) {
      HandleSetEdit();
    }
  }, [contactEdit]);

  //Submit Edit input
  const HandleEditSubmit = async () => {
    if (onSubmit) return;

    // Check if the input is unchanged
    if (
      ContactInputValue.firstname === contactEdit.firstname &&
      ContactInputValue.lastname === contactEdit.lastname &&
      ContactInputValue.phonenumber === contactEdit.phonenumber &&
      ContactInputValue.email === contactEdit.email
    ) {
      SweetAlert.error(
        "No Changes Detected",
        "You have not made any changes to the contact."
      );
      setOnsubmit(false);
      return;
    }

    setOnsubmit(true);
    const contactData = {
      id: contactEdit.id,
      firstname: ContactInputValue.firstname,
      lastname: ContactInputValue.lastname,
      phonenumber: ContactInputValue.phonenumber,
      email: ContactInputValue.email,
    };
    try {
      await SubmitEditContact(contactData, HandleResetInput);
    } finally {
      setOnsubmit(false);
      FetchContact();
    }
  };

  //Submit new
  const HandleRegisterContact = async () => {
    if (onSubmit) return;
    setOnsubmit(true);
    const contactData = {
      firstname: ContactInputValue.firstname,
      lastname: ContactInputValue.lastname,
      phonenumber: ContactInputValue.phonenumber,
      email: ContactInputValue.email,
    };
    try {
      await SubmitNewContact(contactData, HandleResetInput);
    } finally {
      setOnsubmit(false);
      FetchContact();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={HandleModalClose}
      margin="mt-5 sm:mt-20"
      ModalTitle="Supplier Contact"
    >
      <div className="h-[calc(100vh-200px)] min-h-50 sm:h-[calc(100vh-200px)] 2xl:h-[calc(100vh-350px)] w-full overflow-auto">
        {contactEdit === null && !OpenAdd ? (
          <section className="flex flex-col w-full h-full ">
            <header className="flex items-center justify-between px-5 py-4 border-b-2 border-violet-300">
              <h4 className="text-lg font-bold text-violet-600">All Contact</h4>
              <motion.button
                onClick={() => {
                  setOpenAdd(true);
                  setContactEdit(null);
                  HandleResetInput();
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-5 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer bg-violet-500 rounded-2xl shadow-gray-300 hover:bg-violet-800"
              >
                Add
              </motion.button>
            </header>
            <div className="flex flex-col justify-between h-full py-5">
              <div className="flex flex-col gap-3 px-4 py-2 ">
                {Contact.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-row items-center justify-between w-full p-4 overflow-y-auto transition bg-white border border-gray-200 shadow sm:items-center sm:justify-between rounded-2xl hover:shadow-lg"
                  >
                    <div className="flex flex-col gap-2 ">
                      <span className="text-base font-semibold text-gray-800">
                        {contact.firstname} {contact.lastname}
                      </span>
                      <span className="text-sm text-gray-500">
                        {contact.email}
                      </span>
                      <span className="text-xs text-gray-500 font-sm">
                        {contact.phonenumber}
                      </span>
                    </div>

                    <div className="mt-1 text-sm text-gray-600 sm:mt-0">
                      <button
                        type="button"
                        onClick={() => setContactEdit(contact)}
                        className="p-2 transition duration-200 rounded-full cursor-pointer text-violet-600 hover:bg-violet-100 active:bg-violet-200"
                        title="Edit Contact"
                      >
                        <UserPen size={25} className="stroke-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 py-2 ">
                <button className="px-3 py-1 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300">
                  Prev
                </button>

                <button className="px-3 py-1 text-white transition rounded-md shadow-lg bg-violet-600">
                  1
                </button>
                <button className="hidden px-3 py-1 text-gray-700 transition bg-gray-100 rounded-md hover:bg-gray-200 sm:inline">
                  2
                </button>
                <button className="hidden px-3 py-1 text-gray-700 transition bg-gray-100 rounded-md hover:bg-gray-200 sm:inline">
                  3
                </button>
                <button className="hidden px-3 py-1 text-gray-700 transition bg-gray-100 rounded-md hover:bg-gray-200 md:inline">
                  4
                </button>
                <button className="hidden px-3 py-1 text-gray-700 transition bg-gray-100 rounded-md hover:bg-gray-200 md:inline">
                  5
                </button>

                <button className="px-3 py-1 text-gray-700 transition bg-gray-200 rounded-md hover:bg-gray-300">
                  Next
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------- Edit Contact ---------- */}
        {contactEdit !== null && !OpenAdd ? (
          <section className="flex flex-col w-full h-full ">
            <header className="flex items-center justify-between px-5 py-4 border-b-2 border-violet-300">
              <h4 className="text-lg font-bold text-violet-600">Edit</h4>
              <motion.button
                whileHover={{ scale: 1.04 }}
                type="button"
                onClick={() => {
                  setContactEdit(null);
                  setOpenAdd(false);
                  HandleResetInput();
                }}
                disabled={onSubmit}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-5 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer bg-violet-500 rounded-2xl shadow-gray-300 hover:bg-violet-800"
              >
                Show All
              </motion.button>
            </header>
            <div className="flex flex-col items-center justify-between h-full px-4 py-1 sm:py-4 sm:px-10 ">
              <div className="flex flex-col w-full gap-3 ">
                {ContactInput.map((input, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <Input
                      disabled={onSubmit}
                      name={input.name}
                      icons={input.icon}
                      value={input.value}
                      onChange={(e) => {
                        HandleChange(e, input.name);
                        HandleValidationState(input.name, e);
                      }}
                      validated={input.validatedState}
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="flex w-full gap-2 py-6 mt-5">
                <motion.button
                  disabled={onSubmit}
                  onClick={() => HandleSetEdit()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`${
                    onSubmit
                      ? "bg-gray-400"
                      : "cursor-pointer hover:bg-violet-800 bg-violet-600"
                  } flex items-center justify-center py-3 font-semibold text-white  w-13 rounded-2xl `}
                >
                  <ListRestart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={onSubmit}
                  onClick={() => HandleEditSubmit()}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={`${
                    onSubmit
                      ? "bg-gray-400"
                      : "cursor-pointer hover:bg-violet-800 bg-violet-600"
                  } w-full py-3 font-semibold text-white  rounded-2xl flex justify-center items-center gap-1`}
                >
                  {onSubmit && (
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {onSubmit ? "Editing Contact..." : "Edit Contact"}
                </motion.button>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------- Regitser Contact ---------- */}
        {contactEdit === null && OpenAdd ? (
          <section className="flex flex-col w-full h-full">
            <header className="flex items-center justify-between px-5 py-4 border-b-2 border-violet-300">
              <h4 className="text-lg font-bold text-violet-600">Add Contact</h4>
              <motion.button
                disabled={onSubmit}
                onClick={() => {
                  setOpenAdd(false);
                  setContactEdit(null);
                  HandleResetInput();
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-5 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer bg-violet-500 rounded-2xl shadow-gray-300 hover:bg-violet-800"
              >
                Show All
              </motion.button>
            </header>
            <div className="flex flex-col items-center justify-between h-full px-10 ">
              <div className="flex flex-col w-full h-full gap-4 mt-5">
                {ContactInput.map((input, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <Input
                      disabled={onSubmit}
                      onClick={() => HandleSetEdit()}
                      name={input.name}
                      icons={input.icon}
                      value={input.value}
                      placeholder={input.placeholder}
                      onChange={(e) => HandleChange(e, input.name)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full py-5">
                <motion.button
                  disabled={onSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={() => HandleRegisterContact()}
                  className={`${
                    onSubmit
                      ? "bg-gray-400"
                      : "cursor-pointer hover:bg-violet-800 bg-violet-600"
                  } py-3 w-[85%] text-white   rounded-2xl font-semibold flex justify-center items-center gap-1 `}
                >
                  {onSubmit && (
                    <svg
                      className="w-5 h-5 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {onSubmit ? "Adding Contact..." : "Register Contact"}
                </motion.button>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </Modal>
  );
}
