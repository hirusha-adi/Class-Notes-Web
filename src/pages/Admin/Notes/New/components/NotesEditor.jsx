import { useState } from "react";
import Swal from "sweetalert2";
import { CloudUpload, XCircle } from "react-bootstrap-icons";

import { createNote } from "../../../../../lib/backend";

const NotesEditor = () => {
  const [resourceName, setResourceName] = useState("");
  const [note, setNote] = useState("");

  const clearFields = () => {
    setResourceName("");
    setNote("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form submitted:", { resourceName, note });

      const success = await createNote(resourceName, note);

      if (success) {
        Swal.fire({
          title: "Success!",
          text: `Note created successfully (${success?.id})`,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
        }).then(() => {
          // window.location.reload();
          clearFields();
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to create note.",
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
        text: `An unexpected error occurred. ${error.message || error}`,
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
      console.error("Error creating note:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto p-6 bg-gray-100 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create new note
          </h2>

          {/* Resource Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Resource name</span>
            </label>
            <input
              type="text"
              name="resourceName"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Enter the resource name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Note */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Note</span>
            </label>
            <textarea
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your note"
              className="textarea textarea-bordered w-full h-[35vh]"
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mt-6">
            <button type="submit" className="btn btn-primary w-full col-span-3">
              <CloudUpload className="text-md mr-2" /> Submit
            </button>
            <button
              className="btn btn-error w-full text-white col-span-1"
              onClick={clearFields}
            >
              <XCircle className="text-md mr-2" /> Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { NotesEditor };
