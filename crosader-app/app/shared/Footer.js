import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            <span>Copyright</span> © 2020{" "}
            {/* <a
              href="https://www.bootstrapdash.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BootstrapDash
            </a> */}
            . <span>All rights reserved</span>.
          </span>
          <span className="text-muted float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            {/* <span>Hand-crafted</span> & <span>made with</span>{" "} */}
            <i className="mdi mdi-heart text-danger"></i>
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
