import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Input from "../components/Input";
import api from "../js/axiosInstance.js";
import Status from "../components/Status.jsx";
import { Row, Col, Card, Layout, MainWrapper} from "../components/Layout.jsx";

export default function RegisterAccount() {
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await api.post("/register", formData);
      console.log("Registered successfully:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed!");
    }
  };


  return (
    <Layout 
      currentWebPage="Account Registration"
    >
        <MainWrapper>
          <Status />
          <Status type="error" />
          <Status type="warning" />
          <Status type="success" />

          <Card>
            <Row>
              <Col>
                <label className="mb-1 text-sm font-medium text-slate-700 ms-2">First Name</label>
                <Input type="text" placeholder="Enter first name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Col>

              <Col>
                <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Last Name</label>
                <Input type="text" placeholder="Enter last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Email</label>
                <Input type="email" placeholder="Enter last name"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Col>

              <Col>
                <label className="mb-1 text-sm font-medium text-slate-700 ms-2">Password</label>
                <Input type="password" placeholder="Enter last name"
                  value={formData.password}
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
                Register
              </button>
            </Row>
          </Card>
      </ MainWrapper>
    </ Layout>
  );
}
