import { useState, useContext } from "react";
import FormInput from "../../../../component/Project/FormInput";
import ErrorPage from "../../../../component/ErrorPage/ErrorPage";
import clientAxios, { CLIETNURL, serverAxios } from "../../../../config/config";
import { useRouter } from "next/router";
import Backdrop from "../../../../app/basic-ui/Backdrop/Backdrop";

export async function getServerSideProps(context) {
  const statusId = context.params.statusId;
  let statusData = {};
  let errorCode = "";

  try {
    const response = await serverAxios.get(`/status/${statusId}`);
    statusData = response.data;
  } catch (error) {
    errorCode = error.response?.status;
  }

  return {
    props: {
      statusData,
      errorCode,
    },
  };
}

const Editstatus = ({ statusData, errorCode }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    clientAxios
      .patch(`/status/${statusData._id}`, {
        name: status,
      })
      .then((res) => {
        router.push("/admin/status");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error || err.message || JSON.stringify(err));
      });
  };

  if (errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }

  return (
    <>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        <div>
          <h2 className="text-2xl leading-normal text-white-800">Gem Status</h2>
        </div>
        <div className="w-full rounded-md bg-white">
          <form
            onSubmit={submitHandler}
            className="flex items-center pb-8"
            style={{ background: "black" }}
          >
            <div className="py-4 w-full">
              <FormInput
                name={"status"}
                label="Name"
                required={true}
                defaultValue={statusData.name ? statusData.name : ""}
                onChangeHandler={(e) => setStatus(e.target.value)}
                placeholder={"Status"}
              />
            </div>
            {/* <Button type="submit" text={"Update"} /> */}
            <div className="md:mt-[95px]">

            <button 
              onClickHandler={""}
              type="submit"
              className="btn btn-info btn-fw "
            >
              submit
            </button>
            </div>
          </form>
        </div>
        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
      </section>
    </>
  );
};

export default Editstatus;
