import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());
import useSWR from "swr";
import { BASEURL } from "../../../config/config";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Projecttype() {
  const { data: tableData } = useSWR(`${BASEURL}/project-types`, fetcher);
  const router = useRouter();
  const { token, setLoading } = useContext(AuthContext);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createStatus = () => {
    router.push("/status/create");
  };

  return (
    <>
      {showDeleteModal && (
        <div onClicked={() => setShowDeleteModal(false)}>
          <div
            header="Delete?"
            body="Delete this project?"
            onCanceled={() => setShowDeleteModal(false)}
            onConfirmed={deleteProject}
          />
        </div>
      )}
      {isLoading && (
        <div>
          <div className="loader relative top-56 z-50"></div>
        </div>
      )}
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/admin/protype/create");
                  }}
                  type="button"
                  className="btn btn-info btn-fw"
                >
                  ProjectType Create
                </button>
              </div>
              <h4 className="card-title">
                <span className="text-white">Project type</span>
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
                        <span>Name</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Added</span>{" "}
                      </th>
                      <th>
                        {" "}
                        <span>Action</span>{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tableData && (
                      <tr className="hover:bg-indigo-50 cursor-pointer ">
                        <td
                          colSpan={8}
                          align="center"
                          className={` text-gray-600  text-[18px] py-6 pr-10 px-2`}
                        >
                          Loading data...
                        </td>
                      </tr>
                    )}

                    {tableData?.map((item, index) => {
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
                            className={` text-gray-600  text-[18px] py-6 pr-10 px-2`}
                          >
                            {item.name}
                          </td>
                          <td className=" text-[18px] px-2  text-gray-600 font-normal">
                            {new Date(item.createdAt).toDateString()}
                          </td>
                          <td
                            className={`text-[18px] px-2     text-gray-800 font-normal`}
                          >
                            <div className="flex gap-4 mt-1 w-fit">
                              <i
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(
                                    `/admin/protype/${item._id}/editproType`
                                  );
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
}
// export default projecttype
