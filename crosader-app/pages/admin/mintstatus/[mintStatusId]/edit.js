import { useState, useContext } from "react";
import FormInput from "../../../../component/Project/FormInput";
import clientAxios, { CLIETNURL, serverAxios } from "../../../../config/config";
import Backdrop from "../../../../app/basic-ui/Backdrop/Backdrop";


import { useRouter } from "next/router";
// import ErrorPage from "../../../components/ErrorPage/ErrorPage";


// Server Side props
export async function getServerSideProps(context) {
  const mintStatusId = context.params.mintStatusId;
  let mintStatusData = {};
  let errorCode = "";

  try {
    const response = await serverAxios.get(`/mint-status/${mintStatusId}`);
    mintStatusData = response.data;
  } catch (error) {
    errorCode = error.response?.status;
  }

  return {
    props: {
      mintStatusData,
      errorCode,
    },
  };
}

const Index = ({ mintStatusData, errorCode }) => {
  const router = useRouter();

  const [projectType, setProjectType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    clientAxios
      .patch(`/mint-status/${mintStatusData._id}`, {
        name: projectType,
      })
      .then((res) => {
        router.push("/admin/mintstatus");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error || err.message || JSON.stringify(err));
      });
  };

//   if (errorCode) {
//     return <ErrorPage statusCode={errorCode} />;
//   }

  return (
  <>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        <div>
          <h2 className="text-2xl leading-normal text-white-800">Mint Status</h2>
        </div>
        <div className="w-full rounded-md bg-white">
          <form onSubmit={submitHandler} className="flex items-center pb-8" style={{background:"black"}}>
            <div className="py-4 w-full">
              <FormInput
                name={"mint-status"}
                label="Name"
                required={true}
                defaultValue={mintStatusData.name}
                onChangeHandler={(e) => setProjectType(e.target.value)}
                placeholder={"Mint Status"}
              />
            </div>
            <div className="md:mt-[95px]">

            <button
                onClickHandler={""}
                type="submit"
                className="btn btn-info btn-fw"
                style={{color:"white"}}
                >
                Update
              </button>
                </div>
          </form>
        </div>
        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
      </section>
   </>
  );
};

export default Index;
