import React, { useEffect, useState } from "react";
import { Badge, ListGroup, ProgressBar } from "react-bootstrap";
import {
  convertDate,
  groupByState,
  roundToThousand,
} from "../../Utility/helper";
import axios from "axios";
import Link from "next/link";
import Image from "../../component/Image";

export const Spaces = () => {
  const [Allusers, SetAlluser] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // fetching data
  useEffect(() => {
    const Alldata = async () => {
      try {
        const { data } = await axios.get("https://api.crosader.com/spaces");
        if (data) {
          SetAlluser(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    Alldata();
  }, []);

  let groupedArray = groupByState(Allusers);
  // if (groupedArray.length>0) {
  //   groupedArray=[...groupedArray[0].key!=="live"?{key:"live"}:groupedArray]

  // }

  const [filterKey, setFilter] = useState("");
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div style={{ width: "100%" }}>
            <div className="row">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div
                  className="Main"
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <h3 style={{ textAlign: "center" }}>CroSader Spaces Scout</h3>
                  <p
                    className="text-muted"
                    id="para"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    AutoMagic Twitter Space Aggregator for the #CroFam
                  </p>
                  <ListGroup
                    className="justify-content-space-around mb-4 alltabs"
                    variant=""
                    horizontal
                    style={{ padding: "6px" }}
                  >
                    <ListGroup.Item
                      onClick={() => setFilter("")}
                      // active={!filterKey?"activetab":""}
                      // variant="dark"
                      className={`text-capitalize cursor-pointer ${
                        !filterKey ? "activetab" : ""
                      }`}
                    >
                      live
                    </ListGroup.Item>

                    {groupedArray
                      .filter((x) => x.key !== "live")
                      .map((key, index) => (
                        <ListGroup.Item
                          className={`text-capitalize  cursor-pointer ${
                            key.key === filterKey ? "activetab" : ""
                          }`}
                          key={key.key}
                          onClick={() => setFilter(key.key)}
                          // variant="dark"
                          // className="text-capitalize cursor-pointer"
                          active={key.key === filterKey}
                        >
                          {key.key}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </div>
              </div>
            </div>
          </div>
          {isLoading && <div className="circle-loader"></div>}

          {groupedArray
            .filter((status) => (filterKey ? filterKey === status.key : true))
            .map((key, index) => {
              return (
                <div key={index}>
                  <Badge
                    className="text-capitalize cursor-pointer font-weight-medium mb-2 mt-4"
                    bg="#232222"
                    style={{
                      display: "flex",
                      fontSize: "1rem",
                      color: "#FFF",
                      width: "200px",
                      borderRadius: "7px",
                      border: " white 1px solid",
                    }}
                    as={"h1"}
                  >
                    {key.key}
                  </Badge>
                  {key.data.map((data, index) => {
                    return (
                      <div key={index} className="col-md-12   mb-2">
                        <div className="card rounded shadow-none border">
                          <div className="card-body">
                            <div className="row smallscreenrow">
                              <div className="col-xl-3 d-sm-flex dataOfSpaces ">
                                <div className="user-avatar mb-auto">
                                  <Image
                                    src={
                                      data?.profile_photo ||
                                      "/images/download.png"
                                    }
                                    alt="profile"
                                    classString="profile img-sm rounded-circle"
                                  />
                                </div>
                                <div className="wrapper ps-4">
                                  <div className="wrapper d-flex align-items-center">
                                    <h4 className="mb-0 font-weight-medium">
                                      <Link
                                        style={{
                                          textDecoration: "none",
                                          color: "white",
                                        }}
                                        target={"_blank"}
                                        href={`https://twitter.com/${data.username}`}
                                      >
                                        {data.username}
                                      </Link>
                                    </h4>
                                  </div>
                                  {!!data.followers_count && (
                                    <div className="wrapper d-flex align-items-center font-weight-medium text-muted">
                                      <p className="mb-0">
                                        <i className="mdi mdi-twitter me-2"></i>
                                        {roundToThousand(
                                          data.followers_count
                                        )}{" "}
                                        Followers
                                      </p>
                                    </div>
                                  )}
                                  {data.website && (
                                    <div className="wrapper d-flex align-items-center font-weight-medium text-muted">
                                      <p className="mb-0">
                                        <i className="mdi mdi-earth me-2"></i>
                                        <a
                                          className="text-muted"
                                          style={{
                                            textDecoration: "none",
                                          }}
                                          href={data.website}
                                        >
                                          {data.website}
                                        </a>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-sm-8 col-xl-6">
                                <h4 className="font-weight-bolder space-title">
                                  {data.title}
                                </h4>
                                {(data.scheduled_start || data.created_at) && (
                                  <p
                                    className="d-flex align-items-center gap-2"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    <i
                                      className="mdi mdi-clock-fast"
                                      style={{
                                        color: "#1DA1F2",
                                        fontSize: "22px",
                                      }}
                                    ></i>{" "}
                                    Scheduled:{" "}
                                    {convertDate(
                                      data.scheduled_start || data.created_at
                                    )}
                                  </p>
                                )}
                                {data.ended_at && (
                                  <p
                                    className=""
                                    style={{ marginBottom: "0px" }}
                                  >
                                    Ended at: {convertDate(data.ended_at)}
                                  </p>
                                )}
                              </div>

                              <div className="col-sm-4 col-xl-2  d-flex flex-column justify-content-center align-items-center text-center">
                                <div className="wrapper d-flex align-items-center ">
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-inverse-primary me-2 text-capitalize"
                                    style={{ height: "30px" }}
                                  >
                                    {data.state}
                                  </button>
                                  {/* <span> */}

                                  <Link
                                    target={"_blank"}
                                    href={`https://twitter.com/i/spaces/${data.id}`}
                                  >
                                    <span className="menu-icon">
                                      <i
                                        style={{
                                          color: "#0090e7",
                                          fontSize: "40px",
                                        }}
                                        className="mdi mdi-twitter cursor-pointer"
                                      ></i>
                                    </span>
                                  </Link>
                                  {/* </span> */}
                                </div>
                                <div className="wrapper d-flex justify-content-end align-items-end pt-1">
                                  <div
                                    className="wrapper pr-3"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h6 className="mt-n1 mb-0 font-weight-medium">
                                      {data.participant_count}
                                    </h6>
                                    <p style={{ margin: "0px" }}>Listeners</p>
                                  </div>
                                  <div
                                    className="wrapper ps-3"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h6 className="mt-n1 mb-0 font-weight-medium">
                                      {data.speaker_ids?.length}
                                    </h6>
                                    <p style={{ margin: "0px" }}>Speakers</p>
                                  </div>
                                  <div
                                    className="wrapper ps-3"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <h6 className="mt-n1 mb-0 font-weight-medium">
                                      {data.host_ids?.length}
                                    </h6>
                                    <p style={{ margin: "0px" }}>Hosts</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Spaces;
