import {
  getSubject,
  getUserByEmail,
  getUserByPhone,
  getNotesIdAndResourceNames,
  getAccessAllByUserResourceNames,
  createAccess,
  deleteAccess,
} from "../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../hooks";
import { useState, useCallback } from "react";
import { Search, XLg } from "react-bootstrap-icons";
import { Book, LightningCharge } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccessControl = () => {
  const toastConfig = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const [filterUserType, setFilterUserType] = useState("email");
  const [filterUserValueFix, setFilterUserValueFix] = useState("");
  const [filterUserValue, setFilterUserValue] = useState("");
  const [filterNotesType, setFilterNotesType] = useState("th");
  const [notesAccessReload, setNotesAccessReload] = useState(false);

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
    // loading: notesIsLoading,
    // error: notesError,
  } = useFetchPocketbase(
    getNotesIdAndResourceNames,
    user?.subject,
    filterNotesType
  );

  const {
    data: notesAccess,
    // loading: notesAccessIsLoading,
    // error: notesAccessError,
  } = useFetchPocketbase(
    getAccessAllByUserResourceNames,
    user?.id,
    user?.subject,
    filterNotesType,
    notesAccessReload
  );

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setFilterUserValue(filterUserValueFix);
  };

  const clearUserForm = () => {
    toast.info("Cleared the form!", toastConfig);
    setFilterUserType("email");
    setFilterUserValue("");
    setFilterUserValueFix("");
  };

  const groupedNotes = notes?.reduce((acc, item) => {
    const chapter = item.resourceName.split("_").slice(3, 5).join("_");
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    acc[chapter].push(item);
    return acc;
  }, {});

  const isNoteAccessed = (note) => {
    return notesAccess?.some(
      (access) => access.resourceName === note.resourceName
    );
  };

  const handleCheckboxChange = useCallback(
    async (note) => {
      const noteAccessed = isNoteAccessed(note);

      try {
        if (noteAccessed) {
          // If already accessed, delete the access
          await deleteAccess(user?.id, note.resourceName);
          toast.success(
            `Access removed for: ${note.resourceName}`,
            toastConfig
          );
        } else {
          // Otherwise, create the access
          await createAccess(user?.id, note.resourceName);
          toast.success(
            `Access granted for: ${note.resourceName}`,
            toastConfig
          );
        }
        setNotesAccessReload((prev) => !prev);
      } catch (err) {
        console.error("Error toggling access:", err);
        toast.error(`Access granted for: ${note.resourceName}`, toastConfig);
      }
    },
    [user?.id, createAccess, deleteAccess, notesAccess, setNotesAccessReload]
  );

  // console.log(notes);
  // console.log(notesAccess);
  // console.log(subjects);

  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-2 mb-14">
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
        <div className="flex justify-center items-center py-5 border-b">
          <div className="text-center">
            {userIsLoading || subjectsIsLoading ? (
              <>Please select a user!</>
            ) : userError || subjectsError ? (
              <>No results for current query</>
            ) : user && subjects ? (
              <>
                User: {user?.name} ({user?.email} / {user?.phone}) will take{" "}
                <div className="inline-block font-bold underline">
                  {user?.subject}
                </div>{" "}
                ({subjects?.host} - {subjects?.name} - {subjects?.code}) on{" "}
                {user?.examSeries}
              </>
            ) : (
              <>Please select a user!</>
            )}
          </div>
        </div>
        {subjects && (
          <div className="flex justify-center items-center py-5 border-b">
            <div className="join">
              <div
                className={`btn join-item ${
                  filterNotesType == "th" ? "active" : ""
                }`}
                onClick={() => setFilterNotesType("th")}
              >
                <Book className="text-lg " /> Theory Notes
              </div>
              <div
                className={`btn join-item ${
                  filterNotesType == "re" ? "active" : ""
                }`}
                onClick={() => setFilterNotesType("re")}
              >
                <LightningCharge className="text-lg" /> Revision Notes
              </div>
            </div>
          </div>
        )}
        {notes && (
          <>
            <div className="py-5 h-[55vh] overflow-y-scroll border-b">
              {Object.keys(groupedNotes).map((chapter) => (
                <div key={chapter}>
                  <div className="font-semibold text-xl pt-3 pb-5">
                    Chapter {chapter.substring(3)}
                  </div>
                  <div className="space-y-4">
                    {groupedNotes[chapter].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={isNoteAccessed(item)}
                          onChange={() => handleCheckboxChange(item)}
                          className="checkbox checkbox-primary"
                        />
                        <label htmlFor={item.id} className="text-lg">
                          {item.resourceName} ({item.id})
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Add a separator line after each chapter except the last one */}
                  <div className="border-t mt-4 mx-5"></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export { AccessControl };
