import { useEffect, useState } from "react";
import {
  CaretLeft,
  CaretRight,
  ArrowClockwise,
  Pencil,
  Trash,
} from "react-bootstrap-icons";

import { getUsersPaginated } from "../../../../../../lib/backend";
import { usePagination, useFetchPocketbase } from "../../../../../../hooks";

const CrudTable = () => {
  const [tblConfItemsPerSettings, setTblConfItemsPerSettings] = useState(20);

  const {
    currentPage,
    nextPage,
    previousPage,
    resetPage,
    maxPage,
    setMaxPage,
  } = usePagination(1, 1, 1);
  const {
    data: students,
    loading,
    error,
  } = useFetchPocketbase(
    getUsersPaginated,
    currentPage,
    tblConfItemsPerSettings,
    false
  );

  useEffect(() => {
    if (students?.totalPages) {
      setMaxPage(students.totalPages);
    }
  }, [students, setMaxPage]);

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
              {loading ? (
                <tr>
                  <td colSpan="8" className="h-[40vh] text-center">
                    <div className="flex justify-center items-center h-full text-lg font-medium">
                      <span className="loading loading-ball loading-xs"></span>
                      <span className="loading loading-ball loading-sm"></span>
                      <span className="loading loading-ball loading-md"></span>
                      <span className="loading loading-ball loading-lg"></span>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {error ? (
                    <tr>
                      <td colSpan="8" className="h-[40vh] text-center">
                        <div className="flex justify-center items-center h-full text-lg font-medium">
                          <p>An error occured: {error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {students?.items?.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <button className="btn btn-sm">
                              <Pencil className="text-md" />
                            </button>
                            <button className="btn btn-sm ml-1">
                              <Trash className="text-md" />
                            </button>
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.subject}</td>
                          <td>{item.examSeries}</td>
                          <td>{new Date(item.created).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              )}
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
                  <a onClick={() => setTblConfItemsPerSettings(20)}>20</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(40)}>40</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(50)}>50</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(75)}>75</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(100)}>100</a>
                </li>
                <li>
                  <a onClick={() => setTblConfItemsPerSettings(150)}>150</a>
                </li>
              </ul>
            </div>
          </div>
          {students && <div className="">{students?.totalItems} items.</div>}
          <div>
            <div className="join">
              <button className="join-item btn btn-sm" onClick={previousPage}>
                <CaretLeft className="text-md" />
              </button>
              <button className="join-item btn btn-sm">
                Page {currentPage} of {maxPage}
              </button>
              <button className="join-item btn btn-sm" onClick={nextPage}>
                <CaretRight className="text-md" />
              </button>
            </div>
            <button className="btn btn-sm ml-2">
              <ArrowClockwise className="text-md" onClick={resetPage} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { CrudTable };
