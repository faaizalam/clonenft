import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../app/shared/Footer";
import Navbar from "../app/shared/Navbar";
import Sidebar from "../app/shared/Sidebar";
import "../styles/globals.css";
import "../app/App.scss";
import { SSRProvider } from "react-bootstrap";
import "react-datetime/css/react-datetime.css";
import AuthContextProvider from "../contexts/AuthContext";
import { store } from "../redux/store";
import { Provider } from "react-redux";
// import { fetchProjects } from "../redux/projects";
import { useDispatch } from "react-redux";
import Head from "next/head";
import ReactGA from "react-ga4";
import { WalletProvider } from "../contexts/wallets-context";
import NextNProgress from "nextjs-progressbar";

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_KEY);
export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isFullPageLayout, setFullPageLayout] = useState(false);
  const onRouteChanged = () => {
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/user-pages/login-1",
      "/login",
      "/user-pages/login-2",
      "/user-pages/register-1",
      "/user-pages/register-2",
      "/user-pages/lockscreen",
      "/error-pages/error-404",
      "/error-pages/error-500",
      "/general-pages/landing-page",
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (router.pathname === fullPageLayoutRoutes[i]) {
        setFullPageLayout(true);
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        setFullPageLayout(false);
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  };
  // useEffect(() => {
  //   dispatch(fetchProjects());
  // }, [dispatch]);

  useEffect(() => {
    onRouteChanged();
    ReactGA.send("pageview");
  }, [router.pathname]);

  let navbarComponent = !isFullPageLayout ? <Navbar {...{ router }} /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar {...{ router }} /> : "";
  let footerComponent = !isFullPageLayout ? <Footer {...{ router }} /> : "";

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <SSRProvider>
          <WalletProvider>
            <NextNProgress color="#29D" height={2} />

            <Head>
              <title>CroSader</title>
              <link rel="shortcut icon" href="/assets/images/favicon.ico" />
            </Head>
            <div className="container-scroller">
              {sidebarComponent}
              <div className="container-fluid page-body-wrapper">
                {navbarComponent}
                <div className="main-panel">
                  <div className="content-wrapper">
                    {" "}
                    <Component {...pageProps} />{" "}
                  </div>
                  {footerComponent}
                </div>
              </div>
            </div>
          </WalletProvider>
        </SSRProvider>
      </AuthContextProvider>
    </Provider>
  );
}
