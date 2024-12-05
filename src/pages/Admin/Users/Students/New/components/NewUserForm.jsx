import { useState } from "react";
import Swal from "sweetalert2";

import { createUser } from "../../../../../../lib/backend";

const NewUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    subject: "",
    examSeries: "",
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", formData);
      const success = await createUser(
        formData.name,
        formData.email,
        formData.password,
        formData.age,
        formData.subject,
        formData.examSeries,
        formData.verified,
        false
      );
      if (success) {
        Swal.fire({
          title: "Success!",
          text: "User created successfully.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
        }).then(() => {
          window.location.href = "/admin/users/students/all";
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to create user.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
        console.error(success);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An unexpected error occurred. ${error}`,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
      console.error("Error creating user:", error);
    }
  };

  return (
    <form
      className="w-full mx-auto p-6 bg-gray-100 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Create New Student
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            name="age"
            className="input input-bordered"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        {/* Subject */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject</span>
          </label>
          <input
            type="text"
            name="subject"
            className="input input-bordered"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        {/* Exam Series */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Exam Series</span>
          </label>
          <input
            type="text"
            name="examSeries"
            className="input input-bordered"
            value={formData.examSeries}
            onChange={handleChange}
            required
          />
        </div>

        {/* Verified */}
        <div className="form-control col-span-2">
          <label className="label cursor-pointer flex justify-between items-center">
            <span className="label-text">Verified</span>
            <input
              type="checkbox"
              name="verified"
              className="toggle toggle-primary"
              checked={formData.verified}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full mt-6">
        Submit
      </button>
    </form>
  );
};

export { NewUserForm };
