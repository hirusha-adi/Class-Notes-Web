import {
  getSubject,
  getUserByEmail,
  getUserByPhone,
  getNotesIdAndResourceNames,
} from "../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../hooks";
import { useState } from "react";

const AccessControl = () => {
  const [filterUserType, setFilterUserType] = useState("email");
  const [filterUserValue, setFilterUserValue] = useState("");

  const {
    data: user,
    loading: userIsLoading,
    error: userError,
  } = useFetchPocketbase(
    filterUserType == "email" ? getUserByEmail : getUserByPhone,
    "all"
  );

  const {
    data: subjects,
    loading: subjectsIsLoading,
    error: subjectsError,
  } = useFetchPocketbase(getSubject, "cie_ol_cs");

  const {
    data: notes,
    loading: notesIsLoading,
    error: notesError,
  } = useFetchPocketbase(getNotesIdAndResourceNames);

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  console.log(notes);
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="flex justify-center h-[5vh]">
          <form
            onSubmit={handleSubmitUser}
            className="flex flex-row gap-4 items-center"
          >
            <label className="font-medium text">Search for</label>
            <div>
              <input
                type="text"
                placeholder={filterUserType == "email" ? "Email" : "Phone"}
                value={filterUserValue}
                onChange={(e) => setFilterUserValue(e.target.value)}
                className="input input-bordered max-w-xs w-96"
              />
            </div>
            <label className="font-medium text">by</label>
            <div>
              <div className="text flex items-center">
                <select
                  name="tblFilterSubject"
                  id="tblFilterSubject"
                  value={filterUserType}
                  onChange={(event) => setFilterUserType(event.target.value)}
                  className="select select-bordered text focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="email">Email Address</option>
                  <option value="phone">Phone Number</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AccessControl };
