import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../../../components/Layouts/Layout";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { useMediaQuery } from "react-responsive";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
//Animation
import { motion } from "framer-motion";

//icons
import {
  User,
  UserRoundSearch,
  Truck,
  MapPinned,
  TruckElectric,
  HandCoins,
  ThumbsUp,
  Phone,
  Mail,
  PackageOpen,
  Check,
  Contact,
  ListFilterPlus,
} from "lucide-react";

//api
import { FetchContact } from "@/modules/supplier/api/ContactApi.jsx";
import { SubmitSupplier } from "@/modules/supplier/api/SupplierApi.jsx";

export default function RegisterSupplier() {
  const isMobile = useMediaQuery({ maxWidth: 568 });

  const [supplier, setSupplier] = useState({
    suppliername: "",
    supplierAdress: "",
    shippingFee: "",
    isVatRegistered: null,
    SelectedContact: null,
    status: "",
  });

  const [selectedContact, setSelectedContact] = useState(null);
  //api
  const [onSubmit, setOnSubmit] = useState(false); //boolean
  const [fetchedContact, setFetchedContact] = useState([]); //object

  const HandleContactFetch = () => {
    FetchContact(setFetchedContact);
  };

  useEffect(() => {
    HandleContactFetch();
  }, []);

  const HandleInputChange = (value, name) => {
    setSupplier((sup) => ({
      ...sup,
      [name]: value,
    }));
  };

  //Vat Option
  const VatOption = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  //Status Option
  const StatusOption = ["Active", "Inactive"];

  const ContactOption = fetchedContact.map(
    (contact) => `${contact.firstname} ${contact.lastname}`
  );

  const HandleSelectContact = (value, name) => {
    const selectedContact = fetchedContact.find(
      (person) => value === `${person.firstname} ${person.lastname}`
    );

    HandleInputChange(selectedContact.id, name);
  };

  //Submit ---------
  const HandleSubmitSupplier = async () => {
    if (onSubmit) return;
    setOnSubmit(true);
    const supplierSubmit = {
      suppliername: supplier.suppliername,
      supplier_address: supplier.supplierAdress,
      shipping_fee: supplier.shippingFee,
      vat_registered: supplier.isVatRegistered,
      supplier_contact_id: supplier.SelectedContact,
      status: supplier.status,
    };

    try {
      await SubmitSupplier(supplierSubmit);
    } finally {
      setOnSubmit(false);
      setSupplier({
        suppliername: "",
        supplierAdress: "",
        shippingFee: "",
        isVatRegistered: null,
        SelectedContact: null,
        status: "",
      });
    }
  };

  return (
    <Layout currentWebPage={"Register Supplier"}>
      <div className="w-full h-auto px-2 pt-20 overflow-auto bg-white py-0s 2xl:px-10 ">
        <div className="relative flex flex-col items-start justify-start w-full h-auto gap-5 md:justify-center md:flex-row">
          {/* Back button */}

          <Link to={"/suppliers"}>
            <motion.button
              whileHover={{
                backgroundColor: "#4E1CA6",
                color: "#fff",
                scale: 1.05,
              }}
              disabled={onSubmit}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="relative z-10 px-5 py-2 ml-3 text-sm font-semibold border border-gray-200 shadow-md cursor-pointer md:absolute top-1 mt-7 text-violet-600 rounded-xl hover:shadow-lg"
            >
              Back
            </motion.button>
          </Link>
          <div className="flex flex-col items-center justify-center w-full h-full px-0 pt-2 pb-6 rounded-lg lg:py-10 md:flex-row 2xl:px-20">
            {/* First Column */}
            <div className="flex flex-col items-center justify-center w-full h-full gap-5 text-violet-500 md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
              <p className="flex gap-1 text-lg font-bold">
                <Truck className="stroke-3" /> Supplier Info
              </p>

              <div className="flex flex-col w-full h-full gap-5 px-5 lg:px-15 2xl:18 text-violet-500 md:w-full 2xl:gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Supplier Name</label>
                  <Input
                    value={supplier.suppliername}
                    placeholder={"Enter supplier"}
                    icons={TruckElectric}
                    onChange={(e) => HandleInputChange(e, "suppliername")}
                    disabled={onSubmit}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Address</label>
                  <Input
                    value={supplier.supplierAdress}
                    name={"supplierAdress"}
                    onChange={(e) => HandleInputChange(e, "supplierAdress")}
                    placeholder={"Enter Supplier Address"}
                    icons={MapPinned}
                    disabled={onSubmit}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Default Shipping fee</label>
                  <Input
                    value={supplier.shippingFee}
                    name={"shippingFee"}
                    onChange={(e) => HandleInputChange(e, "shippingFee")}
                    placeholder={"Enter Shipping Fee"}
                    icons={PackageOpen}
                    disabled={onSubmit}
                  />
                </div>

                <div className="flex flex-col w-full gap-2 ">
                  <label className="flex items-center font-semibold text-gray-800 gap-2text-sm">
                    <Contact className="ml-2 text-violet-600" />
                    Status
                  </label>
                  <DefaultDropDown
                    placeholder={"select supplier"}
                    icons={Contact}
                    BtnIcons={ListFilterPlus}
                    items={ContactOption}
                    SetSelected={(e) =>
                      HandleSelectContact(e, "SelectedContact")
                    }
                    disabled={onSubmit}
                  />
                </div>
                <div
                  className={`flex ${
                    isMobile ? "flex-col gap-4" : "flex-row gap-6"
                  } w-full font-medium text-[1rem]`}
                >
                  {/* ---------------- VAT Registered ---------------- */}
                  <div className="flex flex-col w-full space-y-2 sm:w-1/2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <HandCoins className="w-4 h-4 text-violet-600" />
                      <span>VAT Registered</span>
                    </label>
                    <div className="px-3 py-2 transition-all duration-200 bg-white border shadow-sm border-violet-200 rounded-xl hover:border-violet-400">
                      <RadioGroup
                        options={VatOption}
                        name="isVatRegistered"
                        value={supplier.isVatRegistered}
                        disabled={onSubmit}
                        onChange={(e) =>
                          HandleInputChange(e, "isVatRegistered")
                        }
                      />
                    </div>
                  </div>

                  {/* ---------------- Status Select ---------------- */}
                  <div className="flex flex-col w-full space-y-2 sm:w-1/2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <ThumbsUp className="w-4 h-4 text-violet-600" />
                      <span>Status</span>
                    </label>
                    <div className="flex items-center justify-center h-full px-3 py-2 transition-all duration-200 bg-white border shadow-sm border-violet-200 rounded-xl hover:border-violet-400">
                      <DefaultDropDown
                        placeholder={"select supplier"}
                        icons={Contact}
                        items={StatusOption}
                        SetSelected={(e) => HandleInputChange(e, "status")}
                        disabled={onSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center items-center mt-5   w-[90%] sm:w-[60%] lg:w-[80%]">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={onSubmit}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={HandleSubmitSupplier}
                  className={` ${
                    onSubmit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-violet-500 hover:from-violet-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  } w-full flex justify-center items-center py-3 font-semibold tracking-wide text-white transition-all duration-200 ease-in-out shadow-md cursor-pointer rounded-xl 2xl:h-12   `}
                >
                  {onSubmit && (
                    <svg
                      className="w-5 h-5 animate-spin text-white"
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
                  {onSubmit ? "Submitting..." : "Register Supplier"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
