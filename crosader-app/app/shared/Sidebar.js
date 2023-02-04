import Link from "next/link";
import React, { Component } from "react";
import { Collapse, Dropdown } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import Image from "next/image";
import Icons from "../../pages/icons/icon";
 
console.log(AuthContext.token,"yahhhh")
class Sidebar extends Component {
  state = {};
  static token = AuthContext;
  
  

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.pathname !== prevProps.router.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/admin", state: "adminMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/charts", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/error-pages", state: "errorPagesMenuOpen" },
      { path: "/general-pages", state: "generalPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
      { path: "/editors", state: "editorsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    });
  }
  // console.log(static)

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <Link
            className="sidebar-brand brand-logo flex justify-center align-items-center"
            href="/spaces"
          >
            <img
              id="logos"
              src="/Images/logo.png"
              alt="Logo"
              style={{ width: "60px", height: "auto", margin: "0px 3px" }}
            ></img>
            <h2
              className="no-underline text-white"
              style={{ width: "fit-content", margin: "0px" }}
            >
              CroSader
            </h2>
          </Link>
          <a className="sidebar-brand brand-logo-mini" href="spaces">
            <img src="/Images/logo.png" alt="logo" />
            <h1>CroSader</h1>
          </a>
        </div>
        <ul className="nav">
         
          {true && (
            <li
              className={
                this.isPathActive("/admin")
                  ? "nav-item menu-items active"
                  : "nav-item menu-items"
              }
            >
              <div
                className={
                  this.state.adminMenuOpen
                    ? "nav-link menu-expanded"
                    : "nav-link"
                }
                onClick={() => this.toggleMenuState("adminMenuOpen")}
                data-toggle="collapse"
              >
                <span style={{ color: "#8f5fe8" }} className="menu-icon">
                  <i className="mdi mdi-cart-arrow-down"></i>
                </span>
                <span className="menu-title">
                  <span>Admin</span>
                </span>
                <i className="menu-arrow"></i>
              </div>
              <Collapse in={this.state.adminMenuOpen}>
                <div>
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/project")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/project"
                      >
                        <span>Projects</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/user")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/users"
                      >
                        <span>Users</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/protype")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/protype"
                      >
                        <span>Project Type</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/status")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/status"
                      >
                        <span>Status</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/mintstatus")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/mintstatus"
                      >
                        <span>Mint Status</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/leftPanel")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/leftPanel"
                      >
                        <span>Left Panel</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/rightPanel")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/rightPanel"
                      >
                        <span>Right Panel</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {" "}
                      <Link
                        className={
                          this.isPathActive("/admin/about")
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href="/admin/about"
                      >
                        <span>About</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
          )}
          <li
            className={
              this.isPathActive("/spaces")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/spaces">
              <span className="menu-icon">
                <i className="mdi mdi-twitter" style={{ color: "#1DA1F2" }}></i>
              </span>
              <span className="menu-title">Spaces Scout</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/collection")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/collection">
              <span className="menu-icon">
                <img
                  style={{ borderRadius: "20px" }}
                  src="/Images/Nft.webp"
                  alt="Nftlogo"
                ></img>
              </span>
              <span className="menu-title">NFT</span>
            </Link>
          </li>

          {/* Home All nft */}

          <li
            className={
              this.isPathActive("/home")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/home">
              <span className="menu-icon">
                <i
                  className="mdi mdi-playlist-play"
                  style={{ color: "#ffab00" }}
                ></i>
              </span>
              <span className="menu-title">List</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/stats")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/stats">
              <span className="menu-icon">
                <i
                  className="mdi mdi-chart-bar"
                  style={{ color: "#00d25b" }}
                ></i>
              </span>
              <span className="menu-title">Stats</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/calender")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/calender">
              <span className="menu-icon">
                <i
                  className="mdi mdi-calendar"
                  style={{ color: "#8f5fe8" }}
                ></i>
              </span>
              <span className="menu-title">Calender</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/info")
                ? "nav-item menu-items active"
                : "nav-item menu-items"
            }
          >
            <Link className="nav-link" href="/info">
              <span className="menu-icon">
                <i
                  className="mdi mdi-file-document-box"
                  style={{ color: "#00d25b" }}
                ></i>
              </span>
              <span className="menu-title">About</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.router.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default Sidebar;
