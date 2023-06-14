import React, { useState } from "react";
import { post } from "../../utils/axiosUtil";
import { toast } from "react-toastify";

const Contact = () => {
  const [formStatus, setFormStatus] = useState("Send");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    setFormStatus("Submitting...");
    try {
      const response = await post("/main/contact", form).then(() => {
        toast.success("Message sent");
      });
      console.log("response", response);
      setFormStatus("Sent");
      setTimeout(() => setFormStatus("Send"), 1000);
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.log("error", err);
      setFormStatus("Failed");
      setTimeout(() => setFormStatus("Send"), 1000);
    }
  };

  return (
    <div style={{ marginBottom: "12rem" }} className="w-50 container mt-5">
      <p className="h1 d-flex justify-content-center">Contact Us</p>
      <form onSubmit={onSubmitHandle}>
        <div className="mb-3">
          <label className="h4 form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            type="text"
            required
          />
        </div>
        <div className="mb-3">
          <label className="h4 form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            type="email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="h4 form-label" htmlFor="message">
            Message
          </label>
          <textarea
            className="form-control"
            value={form.message}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="--btn --btn-danger --btn-large mt-3" type="submit">
            {formStatus}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
