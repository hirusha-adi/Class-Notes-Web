import { getNotesIdAndResourceNames } from "../../../../../lib/backend";
import { useFetchPocketbase } from "../../../../../hooks";

const AccessControl = () => {
  const { data: notes } = useFetchPocketbase(getNotesIdAndResourceNames);

  console.log(notes);
  return (
    <div>
      <div className="bg-gray-50 rounded-xl p-2"></div>
      <h1>AccessControl</h1>
    </div>
  );
};

export { AccessControl };
