import {
  getSubject,
  getUserByEmail,
  getUserByPhone,
  getNotesIdAndResourceNames,
} from "../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../hooks";
import { useState } from "react";
import { Search, XLg } from "react-bootstrap-icons";

const AccessControl = () => {
  const [filterUserType, setFilterUserType] = useState("email");
  const [filterUserValueFix, setFilterUserValueFix] = useState("");
  const [filterUserValue, setFilterUserValue] = useState("");

  const {
    data: user,
    loading: userIsLoading,
    error: userError,
  } = useFetchPocketbase(
    filterUserType == "email" ? getUserByEmail : getUserByPhone,
    filterUserValue
  );

  const {
    data: subjects,
    loading: subjectsIsLoading,
    error: subjectsError,
  } = useFetchPocketbase(getSubject, user?.subject);

  const {
    data: notes,
    loading: notesIsLoading,
    error: notesError,
  } = useFetchPocketbase(getNotesIdAndResourceNames);

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setFilterUserValue(filterUserValueFix);
    console.log(filterUserValue, filterUserValueFix);
  };

  const clearUserForm = () => {
    setFilterUserType("email");
    setFilterUserValue("");
    setFilterUserValueFix("");
  };

  console.log(user);
  console.log(subjects);

  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="flex justify-center items-center pt-2 pb-5 border-b">
          <form
            onSubmit={handleSubmitUser}
            className="flex flex-row gap-4 items-center"
          >
            <label className="font-medium text">Search for</label>
            <div>
              <input
                type="text"
                id="filterUserValueFix"
                name="filterUserValueFix"
                value={filterUserValueFix}
                onChange={(e) => setFilterUserValueFix(e.target.value)}
                placeholder={filterUserType == "email" ? "Email" : "Phone"}
                className="input input-bordered max-w-xs w-96"
              />
            </div>
            <label className="font-medium text">by</label>
            <div>
              <div className="text flex items-center">
                <select
                  name="filterUserType"
                  id="filterUserType"
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
            <div>
              <button
                className="btn btn-success text-white mr-2 rounded-full"
                type="submit"
              >
                <Search className="font-xl" />
              </button>
              <div
                className="btn btn-error text-white rounded-full"
                onClick={clearUserForm}
              >
                <XLg className="font-xl" />
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center h-[5vh]">
          <div className="text-center">
            {`User: ${user?.name} (${user?.email} / ${user?.phone}) will take ${user?.subject} (${subjects?.host} - ${subjects?.name} - ${subjects?.code}) on ${user?.examSeries}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AccessControl };
