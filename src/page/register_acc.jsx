import { useState, useEffect } from "react";
import Input from "../components/Input";
import api from "../js/axiosInstance.js";
import Status from "../components/Status.jsx";
import { Row, Col, Card, Layout, MainWrapper } from "../components/Layout.jsx";

export default function RegisterAccount() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    is_admin: false,
    can_edit_item: false,
    can_edit_stock: false,
    can_order: false,
  });

  // state for feedback messages
  const [status, setStatus] = useState({ type: "info", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", formData);
      console.log("Registered successfully:", response.data);

      setStatus({
        type: "success",
        message: "Registration successful!",
      });
    } catch (error) {
      console.error("Error registering:", error);

      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "info", message: "" });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status.message]);

  return (
    <Layout currentWebPage="Account Registration">
      <MainWrapper mainStyle="p-10">
        <Card>
          {status.message && (
            <Status type={status.type} message={status.message} />
          )}

          <Row>
            <Col>
              <label className="w-32 text-sm font-medium text-slate-700">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Enter first name"
                value={formData.firstname}
                onChange={handleChange}
                className="flex-1"
              />
            </Col>

            <Col>
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Enter last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </Col>

            <Col>
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter email"
                value={formData.password}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Card style="my-7">
            <h4 className="font-semibold mb-4">User role and permissions</h4>
            <Row>
              <Col>
                <div className="inline-flex rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
                  <input
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 me-3"
                  />
                  <span className="text-sm text-slate-700">
                    Register user as Admin
                  </span>
                </div>
              </Col>

              <Col className="inline-flex items-center space-x-2">
                <div className="inline-flex rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
                  <input
                    type="checkbox"
                    name="can_edit_item"
                    checked={formData.can_edit_item}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 me-3"
                  />
                  <span className="text-sm text-slate-700">
                    Can edit item details
                  </span>
                </div>
              </Col>

              <Col className="inline-flex items-center space-x-2">
                <div className="inline-flex rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
                  <input
                    type="checkbox"
                    name="can_edit_stock"
                    checked={formData.can_edit_stock}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 me-3"
                  />
                  <span className="text-sm text-slate-700">
                    Can edit item stocks
                  </span>
                </div>
              </Col>

              <Col className="inline-flex items-center space-x-2">
                <div className="inline-flex rounded-2xl border border-slate-200 bg-white shadow-sm p-3">
                  <input
                    type="checkbox"
                    name="can_order"
                    checked={formData.can_order}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 me-3"
                  />
                  <span className="text-sm text-slate-700">Can order item</span>
                </div>
              </Col>
            </Row>
          </Card>

          <Row>
            <Col>
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </Col>

            <Col>
              <label className="mb-1 text-sm font-medium text-slate-700 ms-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Retype password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <button
              onClick={handleRegister}
              className="bg-emerald-600 w-50 text-white py-2 px-4 
             rounded-md hover:bg-emerald-700 transition mt-6"
            >
              Register User
            </button>
          </Row>
        </Card>
      </MainWrapper>
    </Layout>
  );
}
