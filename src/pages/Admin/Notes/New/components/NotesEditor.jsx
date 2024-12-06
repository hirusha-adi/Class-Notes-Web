import { useState } from "react";

const NotesEditor = () => {
  const [resourceName, setResourceName] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resourceName, url, note);
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

          {/* URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Url</span>
            </label>
            <input
              type="url"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the URL"
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { NotesEditor };
