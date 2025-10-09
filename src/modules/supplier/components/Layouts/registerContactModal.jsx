import { useEffect, useState } from "react";
import { Modal } from "@/components/Layouts/modal.jsx";
import { motion, scale } from "framer-motion";
import {
  FetchContact,
  SubmitContact,
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
  const [contactEdit, setContactEdit] = useState(null);
  const [OpenAdd, setOpenAdd] = useState(false);

  const [ContactInputValue, setContactInput] = useState({
    firstname: "",
    lastname: "",
    phonenumer: "",
    email: "",
  });

  //Input
  const ContactInput = [
    {
      name: "firstname",
      placeholder: "Enter firstname",
      value: ContactInputValue.firstname,
      icon: UserSearch,
    },
    {
      name: "lastname",
      placeholder: "Enter lastname",
      value: ContactInputValue.lastname,
      icon: UserSearch,
    },
    {
      name: "phonenumer",
      placeholder: "Enter phonenumber",
      value: ContactInputValue.phonenumer,
      icon: Phone,
    },
    {
      name: "email",
      placeholder: "Enter email",
      value: ContactInputValue.email,
      icon: Mail,
    },
  ];

  const HandleChange = (value, name) => {
    setContactInput((cont) => ({
      ...cont,
      [name]: value,
    }));
  };

  const HandleSetEdit = () => {
    setContactInput({
      firstname: contactEdit.firstname ?? "",
      lastname: contactEdit.lastname ?? "",
      phonenumer: contactEdit.phonenumber ?? "",
      email: contactEdit.email ?? "",
    });
  };

  useEffect(() => {
    if (contactEdit) {
      HandleSetEdit();
    }
  }, [contactEdit]);

  const HandleResetInput = () => {
    setContactInput({
      firstname: "",
      lastname: "",
      phonenumer: "",
      email: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={onClosed}
      margin="mt-5 sm:mt-20"
      ModalTitle="Supplier Contact"
    >
      <div className="h-[calc(100vh-200px)] min-h-50 sm:h-[calc(100vh-200px)] w-full overflow-auto">
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
              <div className="  flex flex-wrap justify-center items-center gap-2  ">
                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                  Prev
                </button>

                <button className="px-3 py-1 rounded-md bg-violet-600 text-white shadow-lg transition">
                  1
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition hidden sm:inline">
                  2
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition hidden sm:inline">
                  3
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition hidden md:inline">
                  4
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition hidden md:inline">
                  5
                </button>

                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                  Next
                </button>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------- Edit Contact ---------- */}
        {contactEdit !== null && !OpenAdd ? (
          <section className="flex flex-col w-full  h-full ">
            <header className="flex items-center justify-between px-5 py-4 border-b-2 border-violet-300">
              <h4 className="text-lg font-bold text-violet-600">Edit</h4>
              <motion.button
                whileHover={{ scale: 1.04 }}
                onClick={() => {
                  setContactEdit(null);
                  setOpenAdd(false);
                  HandleResetInput();
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="px-5 py-2 text-sm font-semibold text-white shadow-lg cursor-pointer bg-violet-500 rounded-2xl shadow-gray-300 hover:bg-violet-800"
              >
                Show All
              </motion.button>
            </header>
            <div className="flex flex-col items-center  justify-between  h-full  px-10 py-4 ">
              <div className="flex flex-col gap-3 w-full ">
                {ContactInput.map((input, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <Input
                      name={input.name}
                      icons={input.icon}
                      value={input.value}
                      onChange={(e) => HandleChange(e, input.name)}
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="w-full flex gap-2 py-6 mt-5">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="py-3 w-13 flex justify-center items-center text-white rounded-2xl cursor-pointer hover:bg-violet-800 bg-violet-600 font-semibold"
                >
                  <ListRestart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="py-3 w-full text-white rounded-2xl cursor-pointer hover:bg-violet-800 bg-violet-600 font-semibold"
                >
                  Edit Contact
                </motion.button>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------- Regitser Contact ---------- */}
        {contactEdit === null && OpenAdd ? (
          <section className="flex flex-col w-full ">
            <header className="flex items-center justify-between px-5 py-4 border-b-2 border-violet-300">
              <h4 className="text-lg font-bold text-violet-600">Add Contact</h4>
              <motion.button
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
            <div className="flex flex-col items-center justify-center gap-4 px-10 py-4 ">
              {ContactInput.map((input, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <Input
                    name={input.name}
                    icons={input.icon}
                    value={input.value}
                    placeholder={input.placeholder}
                    onChange={(e) => HandleChange(e, input.name)}
                  />
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="py-3 w-[85%] text-white cursor-pointer hover:bg-violet-800 rounded-2xl bg-violet-600 font-semibold"
              >
                Register Contact
              </motion.button>
            </div>
          </section>
        ) : null}
      </div>
    </Modal>
  );
}
