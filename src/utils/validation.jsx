import React from "react";

// Account validation
export const validationField = {
  name: /^[A-Za-zÀ-ÿ\s'-]{2,}$/, // Allows names with accents, spaces, apostrophes, hyphens
  suppliername: /^[A-Za-z0-9À-ÿ\s&.'-]{3,}$/,
  username: /^[A-Za-z0-9_]{4,}$/, // Min 4 chars, letters/numbers/underscore only
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email structure
  password:
    /^(?=.{8,})(?:(?=(?:.*[A-Z].*[0-9]|.*[0-9].*[A-Z]))|(?=(?:.*[A-Z].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[A-Z]))|(?=(?:.*[0-9].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*[0-9]))).*$/,
  // Strong password
  phone: /^(?:\+63|0)9\d{9}$/, // PH number format: +639xxxxxxxxx or 09xxxxxxxxx
  SelectedId: /^[1-9]\d*$/, // Role ID must be a positive number
  rolename: /^(?=.{3,30}$)[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
  address: /^[A-Za-z0-9][A-Za-z0-9\s.,#'\-\/]{2,}$/,
  shippingFee: /^[₱$]?\d{1,20}(,\d{3})*(\.\d{1,2})?$/,
  price: /^(?!0(\.0{1,2})?$)\d+(\.\d{1,2})?$/,
  boolean: /^(true|false)$/,
};
