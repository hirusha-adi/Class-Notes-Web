import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  CaretLeft,
  CaretRight,
  ArrowClockwise,
  Pencil,
  Trash,
  Eye,
  BoxArrowInUpRight,
  Markdown as MarkdownIcon,
} from "react-bootstrap-icons";

import {
  getNotesPaginated,
  getNoteById,
  updateUser,
  deleteNote,
  getSubjectsAll,
} from "../../../../../lib/backend";
import { usePagination, useFetchPocketbase } from "../../../../../hooks";
import { tblNoOfItemsPerPage } from "../../../../../lib/consts";
import { FilterOrderArrows } from "../../../components/FilterOrderArrows";
import { Navigate } from "react-router-dom";

const CrudTable = () => {
  const [tblConfItemsPerSettings, setTblConfItemsPerSettings] = useState(20);

  const {
    data: subjects,
    loading: subjectsLoading,
    error: subjectsError,
  } = useFetchPocketbase(getSubjectsAll);

  const [tblFilterName, setTblFilterName] = useState("created");
  const [tblFilterOrder, setTblFilterOrder] = useState("asc");

  const {
    currentPage,
    nextPage,
    previousPage,
    resetPage,
    maxPage,
    setMaxPage,
  } = usePagination(1, 1, 1);

  const {
    data: notes,
    loading,
    error,
  } = useFetchPocketbase(
    getNotesPaginated,
    currentPage,
    tblConfItemsPerSettings,
    tblFilterName,
    tblFilterOrder
  );

  useEffect(() => {
    if (notes?.totalPages) {
      setMaxPage(notes.totalPages);
    }
  }, [notes, setMaxPage]);

  const handleEdit = async (resourceName) => {
    <Navigate to={`/admin/notes/edit/${resourceName}`} />;
  };

  const handleView = async (nodeId, isMarkdown = false) => {
    console.log(nodeId, isMarkdown);
  };

  const handleDelete = async (nodeId, resourceName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! You are going to delete: ${resourceName} (${nodeId})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-cancel-button",
      },
    });

    if (result.isConfirmed) {
      const success = await deleteNote(nodeId);

      if (success) {
        Swal.fire({
          title: "Deleted!",
          text: "The note has been deleted.",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
          didClose: () => {
            window.location.reload();
          },
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete note.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
      }
    }
  };

  const handleFilter = async (field) => {
    if (field === tblFilterName) {
      setTblFilterOrder(tblFilterOrder === "asc" ? "desc" : "asc");
    } else {
      setTblFilterName(field);
      setTblFilterOrder("asc");
    }
  };

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
                <th onClick={() => handleFilter("resourceName")}>
                  Resource Name
                  {tblFilterName === "resourceName" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th>Url</th>
                <th>View</th>
                <th onClick={() => handleFilter("created")}>
                  Created On{" "}
                  {tblFilterName === "created" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th onClick={() => handleFilter("updated")}>
                  Updated On{" "}
                  {tblFilterName === "updated" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="h-[40vh] text-center">
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
                      <td colSpan="7" className="h-[40vh] text-center">
                        <div className="flex justify-center items-center h-full text-lg font-medium">
                          <p>An error occured: {error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {notes?.items?.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <button
                              className="btn btn-sm text-blue-700"
                              onClick={() => handleEdit(item.id)}
                            >
                              <Pencil className="text-md" />
                            </button>
                            <button
                              className="btn btn-sm ml-1 text-red-700"
                              onClick={() =>
                                handleDelete(item.id, item.resourceName)
                              } // Handle Delete
                            >
                              <Trash className="text-md" />
                            </button>
                          </td>
                          <td>{item.id}</td>
                          <td>{item.resourceName}</td>
                          <td>
                            <div className="tooltip" data-tip={item.url}>
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Click here{" "}
                                <BoxArrowInUpRight className="text-md inline" />
                              </a>
                            </div>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm inline"
                              onClick={() => handleView(item.id, false)}
                            >
                              <Eye className="text-md" />
                            </button>
                            <button
                              className="btn btn-sm inline ml-2"
                              onClick={() => handleView(item.id, true)}
                            >
                              <MarkdownIcon className="text-md" />
                            </button>
                          </td>
                          <td>{new Date(item.created).toLocaleDateString()}</td>
                          <td>{new Date(item.updated).toLocaleDateString()}</td>
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
                {tblNoOfItemsPerPage.map((num) => (
                  <li key={num}>
                    <a onClick={() => setTblConfItemsPerSettings(num)}>{num}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {notes && <div className="">{notes?.totalItems} items.</div>}
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
