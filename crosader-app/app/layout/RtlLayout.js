import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListRtlComponent } from "../apps/TodoListRtl";
import { VectorMap } from "react-jvectormap";
import { Trans } from "react-i18next";

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboard extends Component {
  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card corona-gradient-card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center">
                  <div className="col-4 col-sm-3 col-xl-2">
                    <img
                      src={"/assets/images/dashboard/Group126@2x.png"}
                      className="gradient-corona-img img-fluid"
                      alt="banner"
                    />
                  </div>
                  <div className="col-5 col-sm-7 col-xl-8 p-0">
                    <h4 className="mb-1 mb-sm-0">
                      <span>New refreshing look</span>
                    </h4>
                    <p className="mb-0 font-weight-normal d-none d-sm-block">
                      <span>
                        Corona admin template now with a new facelift for
                        enhanced legibility and aesthetics
                      </span>
                      !
                    </p>
                  </div>
                  <div className="col-3 col-sm-2 col-xl-2 ps-0 text-center">
                    <button className="btn btn-outline-light btn-rounded get-started-btn">
                      <span>Get Started</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$12.34</h3>
                      <p className="text-success me-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  <span>Potential growth</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$17.34</h3>
                      <p className="text-success me-2 mb-0 font-weight-medium">
                        +11%
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  <span>Revenue current</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$12.34</h3>
                      <p className="text-danger me-2 mb-0 font-weight-medium">
                        -2.4%
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-danger">
                      <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  <span>Daily Income</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">$31.53</h3>
                      <p className="text-success me-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  <span>Expense current</span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span>Transaction History</span>
                </h4>
                <div className="aligner-wrapper">
                  <Doughnut
                    data={this.transactionHistoryData}
                    options={this.transactionHistoryOptions}
                  />
                  <div className="absolute center-content">
                    <h5 className="font-weight-normal text-whiite text-center mb-2 text-white">
                      1200
                    </h5>
                    <p className="text-small text-muted text-center mb-0">
                      <span>Total</span>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-right">
                    <h6 className="mb-1">
                      <span>Transfer to Paypal</span>
                    </h6>
                    <p className="text-muted mb-0">
                      07 <span>Jan</span> 2019, 09:12AM
                    </p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-left py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">$236</h6>
                  </div>
                </div>
                <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                  <div className="text-md-center text-xl-right">
                    <h6 className="mb-1">
                      <span>Tranfer to Stripe</span>
                    </h6>
                    <p className="text-muted mb-0">
                      07 <span>Jan</span> 2019, 09:12AM
                    </p>
                  </div>
                  <div className="align-self-center flex-grow text-right text-md-center text-xl-left py-md-2 py-xl-0">
                    <h6 className="font-weight-bold mb-0">$593</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">
                    <span>Open Projects</span>
                  </h4>
                  <p className="text-muted mb-1">
                    <span>Your data status</span>
                  </p>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-primary">
                            <i className="mdi mdi-file-document"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">
                              <span>Admin dashboard design</span>
                            </h6>
                            <p className="text-muted mb-0">
                              <span>Broadcast web app mockup</span>
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                              15 <span>minutes ago</span>
                            </p>
                            <p className="text-muted mb-0">
                              30 <span>tasks</span>, 5 <span>issues</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-success">
                            <i className="mdi mdi-cloud-download"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">
                              <span>Wordpress Development</span>
                            </h6>
                            <p className="text-muted mb-0">
                              <span>Upload new design</span>
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                              1 <span>hour ago</span>
                            </p>
                            <p className="text-muted mb-0">
                              23 <span>tasks</span>, 5 <span>issues</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-info">
                            <i className="mdi mdi-clock"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">
                              <span>Project meeting</span>
                            </h6>
                            <p className="text-muted mb-0">
                              <span>New project discussion</span>
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                              35 <span>minutes ago</span>
                            </p>
                            <p className="text-muted mb-0">
                              15 <span>tasks</span>, 2 <span>issues</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-danger">
                            <i className="mdi mdi-email-open"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">
                              <span>Broadcast Mail</span>
                            </h6>
                            <p className="text-muted mb-0">
                              <span>Sent release details to team</span>
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                              55 <span>minutes ago</span>
                            </p>
                            <p className="text-muted mb-0">
                              35 <span>tasks</span>, 7 <span>issues</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="preview-item">
                        <div className="preview-thumbnail">
                          <div className="preview-icon bg-warning">
                            <i className="mdi mdi-chart-pie"></i>
                          </div>
                        </div>
                        <div className="preview-item-content d-sm-flex flex-grow">
                          <div className="flex-grow">
                            <h6 className="preview-subject">
                              <span>UI Design</span>
                            </h6>
                            <p className="text-muted mb-0">
                              <span>New application planning</span>
                            </p>
                          </div>
                          <div className="me-auto text-sm-right pt-2 pt-sm-0">
                            <p className="text-muted">
                              50 <span>minutes ago</span>
                            </p>
                            <p className="text-muted mb-0">
                              27 <span>tasks</span>, 4 <span>issues</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>
                  <span>Revenue</span>
                </h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$32123</h2>
                      <p className="text-success me-2 mb-0 font-weight-medium">
                        +3.5%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      11.38% <span>Since last month</span>
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ms-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>
                  <span>Sales</span>
                </h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$45850</h2>
                      <p className="text-success me-2 mb-0 font-weight-medium">
                        +8.3%
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      {" "}
                      9.61% <span>Since last month</span>
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-wallet-travel text-danger ms-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>
                  <span>Purchase</span>
                </h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-auto">
                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                      <h2 className="mb-0">$2039</h2>
                      <p className="text-danger me-2 mb-0 font-weight-medium">
                        -2.1%{" "}
                      </p>
                    </div>
                    <h6 className="text-muted font-weight-normal">
                      2.27% <span>Since last month</span>
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-monitor text-success ms-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span>Order Status</span>
                </h4>
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
                          <span>Client Name</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Order No</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Product Cost</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Project</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Payment Mode</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Start Date</span>{" "}
                        </th>
                        <th>
                          {" "}
                          <span>Payment Status</span>{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                        <td>
                          <img
                            src={"/assets/images/faces/face1.jpg"}
                            alt="face"
                          />
                          <span className="pe-2">
                            <span>Henry Klein</span>
                          </span>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td>
                          {" "}
                          <span>Dashboard</span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>Credit card</span>{" "}
                        </td>
                        <td>
                          {" "}
                          04 <span>Dec</span> 2019{" "}
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            <span>Approved</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
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
                        <td>
                          <img
                            src={"/assets/images/faces/face2.jpg"}
                            alt="face"
                          />
                          <span className="pe-2">
                            <span>Estella Bryan</span>
                          </span>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td>
                          {" "}
                          <span>Website</span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>Cash on delivered</span>{" "}
                        </td>
                        <td>
                          {" "}
                          04 <span>Dec</span> 2019{" "}
                        </td>
                        <td>
                          <div className="badge badge-outline-warning">
                            <span>Pending</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
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
                        <td>
                          <img
                            src={"/assets/images/faces/face5.jpg"}
                            alt="face"
                          />
                          <span className="pe-2">
                            <span>Lucy Abbott</span>
                          </span>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td>
                          {" "}
                          <span>App design</span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>Credit card</span>{" "}
                        </td>
                        <td>
                          {" "}
                          04 <span>Dec</span> 2019{" "}
                        </td>
                        <td>
                          <div className="badge badge-outline-danger">
                            <span>Rejected</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
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
                        <td>
                          <img
                            src={"/assets/images/faces/face3.jpg"}
                            alt="face"
                          />
                          <span className="pe-2">
                            <span>Peter Gill</span>
                          </span>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td>
                          {" "}
                          <span>Development</span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>Online Payment</span>{" "}
                        </td>
                        <td>
                          {" "}
                          04 <span>Dec</span> 2019{" "}
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            <span>Approved</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
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
                        <td>
                          <img
                            src={"/assets/images/faces/face4.jpg"}
                            alt="face"
                          />
                          <span className="pe-2">
                            <span>Sallie Reyes</span>
                          </span>
                        </td>
                        <td> 02312 </td>
                        <td> $14,500 </td>
                        <td>
                          {" "}
                          <span>Website</span>{" "}
                        </td>
                        <td>
                          {" "}
                          <span>Credit card</span>{" "}
                        </td>
                        <td>
                          {" "}
                          04 <span>Dec</span> 2019{" "}
                        </td>
                        <td>
                          <div className="badge badge-outline-success">
                            <span>Approved</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title">
                    <span>Messages</span>
                  </h4>
                  <p className="text-muted mb-1 small">
                    <span>View all</span>
                  </p>
                </div>
                <div className="preview-list">
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={"/assets/images/faces/face6.jpg"}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">
                            <span>Leonard</span>
                          </h6>
                          <p className="text-muted text-small">
                            5 <span>minutes ago</span>
                          </p>
                        </div>
                        <p className="text-muted">
                          <span>Well</span>,{" "}
                          <span>it seems to be working now</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={"/assets/images/faces/face8.jpg"}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">
                            <span>Luella Mills</span>
                          </h6>
                          <p className="text-muted text-small">
                            10 <span>Minutes Ago</span>
                          </p>
                        </div>
                        <p className="text-muted">
                          <span>Well</span>,{" "}
                          <span>it seems to be working now</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={"/assets/images/faces/face9.jpg"}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">
                            <span>Ethel Kelly</span>
                          </h6>
                          <p className="text-muted text-small">
                            2 <span>Hours Ago</span>
                          </p>
                        </div>
                        <p className="text-muted">
                          <span>Please review the tickets</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="preview-item border-bottom">
                    <div className="preview-thumbnail">
                      <img
                        src={"/assets/images/faces/face11.jpg"}
                        alt="face"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="preview-item-content d-flex flex-grow">
                      <div className="flex-grow">
                        <div className="d-flex d-md-block d-xl-flex justify-content-between">
                          <h6 className="preview-subject">
                            <span>Herman May</span>
                          </h6>
                          <p className="text-muted text-small">
                            4 <span>Hours Ago</span>
                          </p>
                        </div>
                        <p className="text-muted">
                          <span>Thanks a lot</span>.{" "}
                          <span>It was easy to fix it</span> .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span>Portfolio Slide</span>
                </h4>
                <Slider className="portfolio-slider" {...this.sliderSettings}>
                  <div className="item">
                    <img
                      src={"/assets/images/dashboard/Rectangle.jpg"}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={"/assets/images/dashboard/Img_5.jpg"}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={"/assets/images/dashboard/img_6.jpg"}
                      alt="carousel-item"
                    />
                  </div>
                </Slider>
                <div className="d-flex py-4">
                  <div className="preview-list w-100">
                    <div className="preview-item p-0">
                      <div className="preview-thumbnail">
                        <img
                          src={"/assets/images/faces/face12.jpg"}
                          className="rounded-circle"
                          alt="face"
                        />
                      </div>
                      <div className="preview-item-content d-flex flex-grow">
                        <div className="flex-grow">
                          <div className="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 className="preview-subject">
                              <span>CeeCee Bass</span>
                            </h6>
                            <p className="text-muted text-small">
                              4 <span>Hours Ago</span>
                            </p>
                          </div>
                          <p className="text-muted">
                            <span>Well</span>,{" "}
                            <span>it seems to be working now</span>.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted">
                  <span>Well</span>, <span>it seems to be working now</span>.{" "}
                </p>
                <div className="progress progress-md portfolio-progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span>To do list</span>
                </h4>
                <TodoListRtlComponent />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <span>Visitors by Countries</span>
                </h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>
                              <span>USA</span>
                            </td>
                            <td className="text-right"> 1500 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              56.35%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>
                              <span>Germany</span>
                            </td>
                            <td className="text-right"> 800 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              33.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>
                              <span>Australia</span>
                            </td>
                            <td className="text-right"> 760 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              15.45%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>
                              <span>United Kingdom</span>
                            </td>
                            <td className="text-right"> 450 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              25.00%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>
                              <span>Romania</span>
                            </td>
                            <td className="text-right"> 620 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              10.25%{" "}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>
                              <span>Brasil</span>
                            </td>
                            <td className="text-right"> 230 </td>
                            <td className="text-right font-weight-medium">
                              {" "}
                              75.00%{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div id="audience-map" className="vector-map"></div>
                    <VectorMap
                      map={"world_mill"}
                      backgroundColor="transparent" //change it to ocean blue: #0077be
                      panOnDrag={true}
                      containerClassName="dashboard-vector-map"
                      focusOn={{
                        x: 0.5,
                        y: 0.5,
                        scale: 1,
                        animate: true,
                      }}
                      series={{
                        regions: [
                          {
                            scale: ["#3d3c3c", "#f2f2f2"],
                            normalizeFunction: "polynomial",
                            values: mapData,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
