import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
  updateNote,
  deleteNote,
  getSubjectsAll,
} from "../../../../../lib/backend";
import { usePagination, useFetchPocketbase } from "../../../../../hooks";
import { tblNoOfItemsPerPage } from "../../../../../lib/consts";
import { FilterOrderArrows } from "../../../components/FilterOrderArrows";

const CrudTable = () => {
  const [viewCurrentNoteId, setViewCurrentNoteId] = useState("");
  const [viewIsMarkdown, setViewIsMarkdown] = useState(false);
  const [tblConfItemsPerSettings, setTblConfItemsPerSettings] = useState(20);
  const [tblFilterName, setTblFilterName] = useState("created");
  const [tblFilterOrder, setTblFilterOrder] = useState("asc");
  const [tblFilterSubjectName, setTblFilterSubjectName] = useState("all");
  const [tblFilterSubjectType, setTblFilterSubjectType] = useState("all");

  const { data: subjects } = useFetchPocketbase(getSubjectsAll);

  const {
    data: viewCurrentNote,
    loading: viewCurrentNoteIsLoading,
    error: viewCurrentNoteError,
  } = useFetchPocketbase(getNoteById, viewCurrentNoteId);

  const handleView = async (nodeId, isMarkdown = false) => {
    console.log(nodeId, isMarkdown);
    setViewIsMarkdown(isMarkdown);
    setViewCurrentNoteId(nodeId);
    document.getElementById("modal_view_note").showModal();
  };

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

  const handleEdit = async (noteId) => {
    try {
      const currentNote = await getNoteById(noteId);

      if (!currentNote) {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch note details.",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "Close",
          customClass: {
            popup: "custom-swal-popup",
          },
        });
        return;
      }

      // Display the SweetAlert2 form
      const { value: formValues } = await Swal.fire({
        title: "Edit Note",
        html: `
        <div class="form-control">
          <label class="label"><span class="label-text">Resource Name</span></label>
          <input id="resourceName" type="text" class="input input-bordered w-full" value="${currentNote.resourceName}" />
        </div>
        <div class="form-control mt-4">
          <label class="label"><span class="label-text">URL</span></label>
          <input id="url" type="text" class="input input-bordered w-full" value="${currentNote.url}" />
        </div>
        <div class="form-control mt-4">
          <label class="label"><span class="label-text">Note</span></label>
          <textarea id="note" class="textarea textarea-bordered w-full h-[40vh]">${currentNote.note}</textarea>
        </div>
      `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "custom-swal-popup-wide",
        },
        preConfirm: () => {
          const resourceName = document
            .getElementById("resourceName")
            .value.trim();
          const url = document.getElementById("url").value.trim();
          const note = document.getElementById("note").value.trim();

          if (!resourceName || !url || !note) {
            Swal.showValidationMessage("All fields are required!");
            return null;
          }
          return { resourceName, url, note };
        },
      });

      // If form was submitted
      if (formValues) {
        const { resourceName, url, note } = formValues;

        const success = await updateNote(noteId, resourceName, url, note);

        if (success) {
          Swal.fire({
            title: "Success!",
            text: "Note updated successfully.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Close",
            customClass: {
              popup: "custom-swal-popup",
            },
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update note.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Close",
            customClass: {
              popup: "custom-swal-popup",
            },
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred.",
        icon: "error",
        showCancelButton: false,
        confirmButtonText: "Close",
        customClass: {
          popup: "custom-swal-popup",
        },
      });
      console.error("Error updating note:", error);
    }
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
        <div className="mx-5 mt-2 h-[5vh]">
          <div className="flex justify-between items-center">
            <div className="text-sm flex items-center">
              <label htmlFor="tblFilterSubject" className="mr-2 font-medium">
                Syllabus name:
              </label>
              <select
                name="tblFilterSubject"
                id="tblFilterSubject"
                value={tblFilterSubjectName}
                onChange={(event) =>
                  setTblFilterSubjectName(event.target.value)
                }
                className="select select-bordered text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md select-sm"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                <option value="all">All</option>
                {subjects?.map((subject) => (
                  <option key={subject.id} value={subject.subject}>
                    {subject.subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm flex items-center">
              <label htmlFor="tblFilterSubject" className="mr-2 font-medium">
                Notes type:
              </label>
              <select
                name="tblFilterSubject"
                id="tblFilterSubject"
                value={tblFilterSubjectType}
                onChange={(event) =>
                  setTblFilterSubjectType(event.target.value)
                }
                className="select select-bordered text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md select-sm"
              >
                <option value="all">All</option>
                <option value="TH">Theory</option>
                <option value="RE">Revision</option>
              </select>
            </div>
          </div>
        </div>
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
      <dialog id="modal_view_note" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="w-full">
            <h3 className="font-bold text-lg inline">Title: </h3>
            <div className="inline">{viewCurrentNote?.resourceName}</div>
            <br />
            <h3 className="font-bold text-lg inline">URL: </h3>
            <div className="inline">{viewCurrentNote?.url}</div>
          </div>
          <div className="py-4 h-[60vh] overflow-x-scroll overflow-y-scroll mt-5">
            {viewIsMarkdown ? (
              <>
                <div className="prose w-full min-w-full max-w-full">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {viewCurrentNote?.note}
                  </Markdown>
                </div>
              </>
            ) : (
              <pre>{viewCurrentNote?.note}</pre>
            )}
            {(viewCurrentNoteIsLoading, viewCurrentNoteError)}
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export { CrudTable };
