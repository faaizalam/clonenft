import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());
import useSWR from "swr";
import { BASEURL } from "../../../config/config";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Index() {
  const { data: tableData } = useSWR(`${BASEURL}/status`, fetcher);
  const router = useRouter();
  const { token, setLoading } = useContext(AuthContext);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
                    router.push("/admin/status/create");
                  }}
                  type="button"
                  className="btn btn-info btn-fw"
                >
                  Status Create
                </button>
              </div>
              <h4 className="card-title">
                <span>Status</span>
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

                    {filteredData?.map((item, index) => {
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
                                    `/admin/status/${item._id}/editstatus`
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
// export default index
