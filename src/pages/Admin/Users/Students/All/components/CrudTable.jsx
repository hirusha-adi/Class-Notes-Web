import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  CaretLeft,
  CaretRight,
  ArrowClockwise,
  Pencil,
  Trash,
  XLg,
  CheckLg,
} from "react-bootstrap-icons";

import {
  getUsersPaginated,
  getUser,
  updateUser,
  deleteUser,
  getSubjectsAll,
} from "../../../../../../lib/backend";
import { usePagination, useFetchPocketbase } from "../../../../../../hooks";
import { tblNoOfItemsPerPage } from "../../../../../../lib/consts";
import { FilterOrderArrows } from "../../../../components/FilterOrderArrows";

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
    data: students,
    loading,
    error,
  } = useFetchPocketbase(
    getUsersPaginated,
    currentPage,
    tblConfItemsPerSettings,
    false,
    tblFilterName,
    tblFilterOrder
  );

  useEffect(() => {
    if (students?.totalPages) {
      setMaxPage(students.totalPages);
    }
  }, [students, setMaxPage]);

  const handleEdit = async (userId) => {
    try {
      const user = await getUser(userId);
      const { value: formData } = await Swal.fire({
        title: "Edit User",
        html: `
          <div class="flex flex-col gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Name</span></label>
              <input id="name" type="text" class="input input-bordered w-full" value="${
                user.name
              }" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Email</span></label>
              <input id="email" type="email" class="input input-bordered w-full" value="${
                user.email
              }" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Age</span></label>
              <input id="age" type="number" class="input input-bordered w-full" value="${
                user.age
              }" />
            </div>
            <div class="form-control">
              ${
                subjectsError
                  ? `<p class="text-red-500">Failed to load subjects. Please try again later.</p>`
                  : subjectsLoading
                  ? `<div class="flex justify-center items-center">
                    <span class="loading loading-bars loading-md"></span>
                  </div>`
                  : `<label class="label"><span class="label-text">Subject</span></label>
                  <select id="subject" class="select select-bordered w-full">
                    ${subjects
                      .map(
                        (subject) =>
                          `<option value="${subject.subject}" ${
                            user.subject === subject.subject ? "selected" : ""
                          }>
                        ${subject.subject}
                      </option>`
                      )
                      .join("")}
                  </select>`
              }
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Exam Series</span></label>
              <input id="examSeries" type="text" class="input input-bordered w-full" value="${
                user.examSeries
              }" />
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Verified</span>
                <input id="verified" type="checkbox" class="checkbox checkbox-primary" ${
                  user.verified ? "checked" : ""
                } />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Is Teacher?</span>
                <input id="isTeacher" type="checkbox" class="checkbox checkbox-primary" ${
                  user.isTeacher ? "checked" : ""
                } />
              </label>
            </div>
          </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const age = document.getElementById("age").value;
          const subject = document.getElementById("subject").value;
          const examSeries = document.getElementById("examSeries").value;
          const verified = document.getElementById("verified").checked;
          const isTeacher = document.getElementById("isTeacher").checked;

          return { name, email, age, subject, examSeries, verified, isTeacher };
        },
        customClass: {
          popup: "custom-swal-popup",
          cancelButton: "custom-swal-cancel-button",
        },
      });

      if (formData) {
        const success = await updateUser(
          userId,
          formData.name,
          formData.email,
          formData.age,
          formData.subject,
          formData.examSeries,
          formData.verified,
          formData.isTeacher
        );
        if (success) {
          Swal.fire({
            title: "Success!",
            text: "User updated successfully.",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: "Close",
            customClass: {
              popup: "custom-swal-popup",
              confirmButton: "custom-swal-cancel-button",
            },
            didClose: () => {
              window.location.reload();
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to update user.",
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "Close",
            customClass: {
              popup: "custom-swal-popup",
              confirmButton: "custom-swal-cancel-button",
            },
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong! ${error}`,
        customClass: {
          popup: "custom-swal-popup",
          confirmButton: "custom-swal-cancel-button",
        },
      });
    }
  };

  const handleDelete = async (
    userId,
    userEmail,
    userName,
    userSubject,
    userExamSeries
  ) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! You are going to delete: ${userName} (${userEmail}) [${userSubject} - ${userExamSeries}]`,
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
      const success = await deleteUser(userId);

      if (success) {
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
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
          text: "Failed to delete user.",
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
                <th onClick={() => handleFilter("email")}>
                  Email
                  {tblFilterName === "email" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th onClick={() => handleFilter("name")}>
                  Name{" "}
                  {tblFilterName === "name" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th>Age</th>
                <th>Subject</th>
                <th onClick={() => handleFilter("examSeries")}>
                  Exam Series{" "}
                  {tblFilterName === "examSeries" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th onClick={() => handleFilter("verified")}>
                  is Verified?{" "}
                  {tblFilterName === "verified" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
                <th onClick={() => handleFilter("created")}>
                  Created On{" "}
                  {tblFilterName === "created" && (
                    <FilterOrderArrows order={tblFilterOrder} />
                  )}
                </th>
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
                            <button
                              className="btn btn-sm text-blue-700"
                              onClick={() => handleEdit(item.id)}
                            >
                              <Pencil className="text-md" />
                            </button>
                            <button
                              className="btn btn-sm ml-1 text-red-700"
                              onClick={() =>
                                handleDelete(
                                  item.id,
                                  item.email,
                                  item.name,
                                  item.subject,
                                  item.examSeries
                                )
                              } // Handle Delete
                            >
                              <Trash className="text-md" />
                            </button>
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.subject}</td>
                          <td>{item.examSeries}</td>
                          <td>
                            {item.verified ? (
                              <div className="text-green-600">
                                <CheckLg className="text-lg" />
                              </div>
                            ) : (
                              <div className="text-red-600">
                                <XLg className="text-lg" />
                              </div>
                            )}
                          </td>
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
                {tblNoOfItemsPerPage.map((num) => (
                  <li key={num}>
                    <a onClick={() => setTblConfItemsPerSettings(num)}>{num}</a>
                  </li>
                ))}
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
