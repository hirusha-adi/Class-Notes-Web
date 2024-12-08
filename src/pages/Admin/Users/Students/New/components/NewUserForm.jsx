import { useState } from "react";
import Swal from "sweetalert2";
import { CloudUpload, XCircle } from "react-bootstrap-icons";

import { createUser } from "../../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../../hooks";
import { getSubjectsAll } from "../../../../../../lib/backend";

const NewUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    subject: "",
    examSeries: "",
    verified: false,
  });

  const { data: subjects } = useFetchPocketbase(getSubjectsAll);

  const clearFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      age: "",
      subject: "",
      examSeries: "",
      verified: false,
    });
  };

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
        formData.phone,
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
        Create new student
      </h2>

      <div className="grid grid-cols-2 gap-4">
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

        {/* Phone */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            name="phone"
            className="input input-bordered"
            value={formData.phone}
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
          <select
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="select select-bordered text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            <option value="" disabled>
              Select a subject
            </option>
            {subjects?.map((subject) => (
              <option key={subject.id} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
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
        <div className="form-control pt-9">
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

      <div className="grid grid-cols-4 gap-2 mt-6">
        <button type="submit" className="btn btn-primary w-full col-span-3">
          <CloudUpload className="text-md mr-2" /> Submit
        </button>
        <div
          className="btn btn-error w-full text-white col-span-1"
          onClick={clearFormData}
        >
          <XCircle className="text-md mr-2" /> Clear
        </div>
      </div>
    </form>
  );
};

export { NewUserForm };
