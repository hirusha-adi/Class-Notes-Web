import { useEffect, useState } from "react";
import { getUsersPaginated } from "../../../../../../lib/backend";

const CrudTable = () => {
  const [students, setStudents] = useState([]);
  const [tblConfItemsPerSettings, setTblConfItemsPerSettings] = useState(20);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getUsersPaginated(
        1,
        tblConfItemsPerSettings,
        false
      );
      setStudents(response);
    };
    fetchStudents();
  }, [tblConfItemsPerSettings]);

  console.log(students);

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="overflow-x-scroll overflow-y-scroll h-[50vh]">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Actions</th>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Age</th>
                <th>Subject</th>
                <th>Exam Series</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mx-5 h-[5vh]">
          <div className="flex items-center">
            <div className="text-sm">Rows per page: </div>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm m-1">
                {tblConfItemsPerSettings}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>10</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>20</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>40</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>50</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>75</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>100</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(10)}>150</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn-group">
            <button className="btn btn-sm">Previous</button>
            <button className="btn btn-sm">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CrudTable };
