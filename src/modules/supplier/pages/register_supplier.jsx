import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// Page Layout component
import { Layout } from "@/components/Layouts/Layout";
import { Input } from "@/components/ui/Input.jsx";
import { RadioGroup } from "@/components/ui/radioGroup.jsx";
import { useMediaQuery } from "react-responsive";
import { DefaultDropDown } from "@/components/ui/dropdown.jsx";
import { SweetAlert } from "@/utils/sweetalert.jsx";
//Animation
import { motion } from "framer-motion";

//icons
import {
  Truck,
  MapPinned,
  TruckElectric,
  HandCoins,
  ThumbsUp,
  PackageOpen,
  Contact,
  ListFilterPlus,
  ListRestart,
} from "lucide-react";

//api
import { FetchContact } from "@/modules/supplier/api/ContactApi.jsx";
import {
  SubmitSupplier,
  SubmitEditSupplier,
  CheckSupplier,
  FetchSupplierById,
} from "@/modules/supplier/api/SupplierApi.jsx";
import { validationField } from "@/utils/validation.jsx";
import ContactModal from "@/modules/supplier/components/Layouts/registerContactModal.jsx";
export default function RegisterSupplier() {
  const isMobile = useMediaQuery({ maxWidth: 568 });
  const [isContactOpen, setIsContactOpen] = useState(false); //Add new contact modal

  //supplier input value
  const [supplier, setSupplier] = useState({
    suppliername: "",
    supplierAdress: "",
    shippingFee: null,
    isVatRegistered: null,
    SelectedContact: null,
    status: "",
  });

  //supplier Validation
  const [validInputs, setValidInputs] = useState({
    suppliername: true,
    supplierAdress: true,
    shippingFee: true,
    isVatRegistered: true,
    SelectedContact: true,
    status: true,
  });

  //api
  const [onSubmit, setOnSubmit] = useState(false); //Submit state, boolean
  const [fetchedContact, setFetchedContact] = useState([]); //populating dropdown, object
  const [supplierExist, setSupplierExist] = useState(null); //check if supplier already exist, boolean
  const [fetchedSupplier, setFetchedSupplier] = useState(null); //fetched supplier to edit, object array
  const [Found, setFound] = useState(null); //checking id if found, boolean
  const { id } = useParams(); //Page indicator for edit or register

  //Url Functionlity
  const navigate = useNavigate();
  const supplierId = Number(id); //Convert url id param

  //fetching contact
  const HandleContactFetch = () => {
    FetchContact(setFetchedContact); //api
  };

  //fetching functionality Supplier to be edit
  const HandleFetchSupplier = async () => {
    if (id === "register") return; //register state page

    if (isNaN(supplierId)) {
      navigate("/suppliers");
      return;
    }
    await FetchSupplierById(
      supplierId,
      setFetchedSupplier,
      setFound,
      HandleAssignInput
    ); //fetch supplier to be edit, api
  };

  //functionality assign input edit
  const HandleAssignInput = (data = fetchedSupplier) => {
    setSupplier({
      suppliername: data.suppliername,
      supplierAdress: data.supplier_address,
      shippingFee: data.shipping_fee,
      isVatRegistered: data.vat_registered,
      SelectedContact: data.supplier_contact_id,
      status: data.status,
    });
  };

  //fetching contact trigger
  useEffect(() => {
    HandleContactFetch(); //api
  }, []);

  //fetching supplier
  useEffect(() => {
    HandleFetchSupplier();
  }, [id]);

  //checking if id found
  useEffect(() => {
    if (Found === null) return;
    if (!Found) {
      navigate("/suppliers");
    }
  }, [Found]);

  //checking supplier availability
  useEffect(() => {
    const TimerCheck = setTimeout(() => {
      CheckSupplier(supplier.suppliername, setSupplierExist); //Checking contact availability, api , return false or true
    }, 300);
    return () => clearTimeout(TimerCheck);
  }, [supplier.suppliername]);

  //Input Onchange for supplier input
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
  const StatusOption = ["Active", "Inactive", "Archieved"];

  //Sync Selected Contact
  const HandleSyncContact = () => {
    const contact = fetchedContact.find(
      (cont) => supplier.SelectedContact === cont.id
    );
    if (!contact) return "";

    return `${contact.firstname} ${contact.lastname}`;
  };

  //Option contact names dropdown
  const ContactOption = fetchedContact.map(
    (contact) => `${contact.firstname} ${contact.lastname}`
  );

  //contact selected assign to input
  const HandleSelectContact = (value, name) => {
    const selectedContact = fetchedContact.find(
      (person) => value === `${person.firstname} ${person.lastname}`
    );

    HandleInputChange(selectedContact.id, name);
  };

  //Validation Change ddynamically input-------
  const HandleValidationChange = (value, field) => {
    setValidInputs((prev) => {
      const updated = { ...prev };

      switch (field) {
        case "suppliername":
          updated[field] = validationField.suppliername.test(value);
          break;
        case "status":
          updated[field] = validationField.name.test(value);
          break;
        case "supplierAdress":
          updated[field] = validationField.address.test(value);
          break;
        case "SelectedContact":
          updated[field] = validationField.SelectedId.test(value);
          break;
        case "shippingFee":
          updated[field] = validationField.shippingFee.test(value);
          break;
        case "isVatRegistered":
          updated[field] = validationField.boolean.test(value);
          break;
        default:
          break;
      }

      return updated;
    });
  };

  // Submit Edited --------
  const HandleEditSubmit = async () => {
    if (onSubmit) return;
    setOnSubmit(true);
    if (
      fetchedSupplier.suppliername === supplier.suppliername &&
      fetchedSupplier.supplier_address === supplier.supplierAdress &&
      fetchedSupplier.shipping_fee === supplier.shippingFee &&
      fetchedSupplier.vat_registered === supplier.isVatRegistered &&
      fetchedSupplier.supplier_contact_id === supplier.SelectedContact &&
      fetchedSupplier.status === supplier.status
    ) {
      SweetAlert.info(
        "No Changes Detected",
        "You haven't made any updates yet."
      );
      setOnSubmit(false);
      return;
    }

    const request = {
      id: fetchedSupplier.id,
      suppliername: supplier.suppliername,
      supplier_address: supplier.supplierAdress,
      shipping_fee: supplier.shippingFee,
      vat_registered: supplier.isVatRegistered,
      supplier_contact_id: supplier.SelectedContact,
      status: supplier.status,
      supplierExist:
        fetchedSupplier.suppliername !== supplier.suppliername && supplierExist,
    };
    try {
      await SubmitEditSupplier(request, HandleFetchSupplier);
    } finally {
      setOnSubmit(false);
    }
  };

  //Submit New ---------
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
      await SubmitSupplier(supplierSubmit, setSupplier, supplierExist); //api
    } finally {
      setOnSubmit(false);
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
                <Truck className="stroke-3" />{" "}
                {id === "register"
                  ? "Supplier Info"
                  : `Edit ${fetchedSupplier?.suppliername ?? ""}`}
              </p>

              <div className="flex flex-col w-full h-full gap-5 px-5 lg:px-15 2xl:18 text-violet-500 md:w-full 2xl:gap-5">
                <div className="flex flex-col">
                  <label className="font-semibold">Supplier Name</label>
                  <Input
                    value={supplier.suppliername}
                    placeholder={"Enter supplier"}
                    icons={TruckElectric}
                    validated={
                      (validInputs.suppliername && !supplierExist) ||
                      supplier.suppliername === fetchedSupplier?.suppliername
                    }
                    onChange={(e) => {
                      HandleInputChange(e, "suppliername");
                      HandleValidationChange(e, "suppliername");
                    }}
                    disabled={onSubmit}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Address</label>
                  <Input
                    value={supplier.supplierAdress}
                    name={"supplierAdress"}
                    validated={validInputs.supplierAdress}
                    onChange={(e) => {
                      HandleInputChange(e, "supplierAdress");
                      HandleValidationChange(e, "supplierAdress");
                    }}
                    placeholder={"Enter Supplier Address"}
                    icons={MapPinned}
                    disabled={onSubmit}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Supplier Default Shipping fee</label>
                  <Input
                    value={supplier.shippingFee}
                    validated={validInputs.shippingFee}
                    name={"shippingFee"}
                    onChange={(e) => {
                      HandleInputChange(e, "shippingFee");
                      HandleValidationChange(e, "shippingFee");
                    }}
                    placeholder={"Enter Shipping Fee"}
                    icons={PackageOpen}
                    disabled={onSubmit}
                  />
                </div>

                <div className="flex flex-col w-full gap-2 ">
                  <label className="flex items-center font-semibold text-gray-800 gap-2text-sm">
                    <Contact className="ml-2 text-violet-600" />
                    Contact
                  </label>
                  <DefaultDropDown
                    placeholder={"select Contact"}
                    icons={Contact}
                    BtnIcons={ListFilterPlus}
                    items={ContactOption}
                    validated={validInputs.SelectedContact}
                    SetSelected={(e) => {
                      HandleSelectContact(e, "SelectedContact");
                    }}
                    disabled={onSubmit}
                    selectedValue={HandleSyncContact}
                    OnClick={() => setIsContactOpen(true)}
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
                        selectedValue={supplier.status}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center items-center mt-5 gap-2   w-[90%] sm:w-[60%] lg:w-[80%]">
                {id !== "register" ? (
                  <motion.button
                    onClick={() => HandleAssignInput()}
                    disabled={onSubmit}
                    className="bg-violet-500 flex text-white rounded-2xl justify-center w-15 py-[0.85rem] items-center"
                  >
                    <ListRestart size={21} />
                  </motion.button>
                ) : null}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={onSubmit}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  onClick={
                    id === "register" ? HandleSubmitSupplier : HandleEditSubmit
                  }
                  className={` ${
                    onSubmit
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-violet-500 hover:from-violet-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  } w-full flex justify-center items-center py-3 font-semibold tracking-wide text-white transition-all duration-200 ease-in-out shadow-md cursor-pointer rounded-xl 2xl:h-12   `}
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
                  {onSubmit
                    ? "Submitting..."
                    : id === "register"
                    ? "Register Supplier"
                    : "Edit Supplier"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        isOpen={isContactOpen}
        onClosed={() => setIsContactOpen(false)}
        FetchContact={HandleContactFetch}
        Contact={fetchedContact}
      />
    </Layout>
  );
}
