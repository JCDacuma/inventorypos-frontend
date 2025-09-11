import { useState } from "react";
import { Link } from "react-router-dom";

// Page Layout component
import {
  Layout,
  MainWrapper,
  ButtonLayout,
  ControlLayout,
} from "../components/Layout";
import { useMediaQuery } from "react-responsive";
import ExportButton from "../components/export_buttons";
import Searchbar from "../components/Searchbar.jsx";
import BatchControl from "../components/ModalContol.jsx";

//Table Layout component
import Table from "../components/Table";
import MobileTable from "../components/MobileTable";

//Animation
import { motion, AnimatePresence } from "framer-motion";

//Icons
import { SquarePen, Trash2, Megaphone } from "lucide-react";

export default function PromoManagement() {
  return (
    <div>
      <p>This is Promo management</p>
    </div>
  );
}
