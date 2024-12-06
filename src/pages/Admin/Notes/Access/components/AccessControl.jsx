import {
  getSubject,
  getUserByEmail,
  getNotesIdAndResourceNames,
} from "../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../hooks";

const AccessControl = () => {
  const {
    data: user,
    loading: userIsLoading,
    error: userError,
  } = useFetchPocketbase(getUserByEmail, "all");

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

  console.log(notes);
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-2"></div>
      <h1>AccessControl</h1>
    </div>
  );
};

export { AccessControl };
