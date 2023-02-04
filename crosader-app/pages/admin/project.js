// import Projects from "../../app/user-pages/Login";

import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Backdrop from "../../app/basic-ui/Backdrop/Backdrop";
const fetcher = (url) => fetch(url).then((res) => res.json());
import useSWR from "swr";
import { AuthContext } from "../../contexts/AuthContext";
import { BASEURL } from "../../config/config";
import Image from "next/image";

const ProjectComponent = () => {
  const { data: tableData } = useSWR(`${BASEURL}/projects`, fetcher);

  const router = useRouter();
  const { token, setLoading } = useContext(AuthContext);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create project Buttom handler
  const createProject = () => {
    router.push("/projects/create");
  };

  // Delete project handler
  const deleteProject = () => {
    setLoading(true);
    setIsLoading(true);
    setError(null);
    customAxios
      .delete(`/projects/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setLoading(false);
        const temData = [
          ...filteredData.filter((item) => item._id !== deletingId),
        ];
        setFilteredData(temData);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
  };

  // Search Input handler
  const searchFilterHandler = useCallback(
    (e) => {
      if (!tableData) return;
      setSearchInputValue(e.target.value);
      const filtered = tableData.filter((item) => {
        return item.name
          .trim()
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase());
      });
      setFilteredData(filtered);
    },
    [tableData]
  );

  useEffect(() => {
    const e = {
      target: {
        value: SearchInputValue,
      },
    };
    searchFilterHandler(e);
  }, [SearchInputValue, searchFilterHandler]);

  return (
    <>
      {showDeleteModal && (
        <Backdrop onClicked={() => setShowDeleteModal(false)}>
          <Modal
            header="Delete?"
            body="Delete this project?"
            onCanceled={() => setShowDeleteModal(false)}
            onConfirmed={deleteProject}
          />
        </Backdrop>
      )}
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div style={{display:"flex",justifyContent:"flex-end"}}>
            <button
                onClick={(e)=>{
                  e.stopPropagation();
                  router.push("/admin/create")}
                }
                type="button"
                className="btn btn-info btn-fw"
              >
                Project Create
              </button>

              </div>
              <h4 className="card-title">

                <span>Projects</span>
              </h4>
              {error && (
                <p className="mx-auto text-red-500 font-bold my-4">{error}</p>
              )}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="form-check form-check-muted m-0">
                          <label className="form-check-label">
                            <input
                              type="checkbox"
                              className="form-check-input"
                            />
                            <i className="input-helper"></i>
                          </label>
                        </div>
                      </th>
                      <th>
                        {" "}
                        <span>Project Name</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Mint Status</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Status</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Project Type</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Added</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Actions</span>{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tableData && (
                      <tr className="hover:bg-indigo-50 cursor-pointer ">
                        <td
                          colSpan={8}
                          align="center"
                          className={` text-white-600  text-[18px] py-6 pr-10 px-2`}
                        >
                          Loading data...
                        </td>
                      </tr>
                    )}
                    {filteredData.map((item, index) => {
                      return (
                        <tr
                          key={index + 30}
                          onClick={() => {
                            router.push(`/projects/${item._id}`);
                          }}
                          className="hover:bg-indigo-50 cursor-pointer"
                        >
                          <td>
                            <div className="form-check form-check-muted m-0">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                />
                                <i className="input-helper"></i>
                              </label>
                            </div>
                          </td>
                          <td
                            className={` text-white-600  text-[18px] py-6 pr-10 px-2`}
                          >
                            {item.name}
                          </td>
                          <td className=" text-[18px] px-2  text-white-600 font-normal">
                            {item.mintStatus ? item.mintStatus.name : "-"}
                          </td>
                          <td className=" text-[18px] px-2  text-white-600 font-normal">
                            {item.status ? item.status.name : "-"}
                          </td>
                          <td
                         
                            align="center"
                            className=" text-[18px] px-2  text-white-600 font-normal text-white"
                          >
                            {item.projectType.name}
                          </td>
                          <td className=" text-[18px] px-2  text-white-600 font-normal">
                            {new Date(item.createdAt).toDateString()}
                          </td>
                          <td
                            className={`text-[18px] px-2     text-white-800 font-normal`}
                          >
                            <div className="flex gap-4 mt-1 w-fit">
                              <i
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/admin/${item._id}/edit`);
                                }}
                                className="mdi mdi-table-edit icon-md"
                              ></i>
                              <i
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeletingId(item._id);
                                  setShowDeleteModal(true);
                                }}
                                className="mdi mdi-delete icon-md"
                              ></i>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectComponent;
