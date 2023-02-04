import { useState, useContext } from "react";
import FormInput from "../../../component/Project/FormInput";
import clientAxios, { CLIETNURL, serverAxios } from "../../../config/config";


import Backdrop from "../../../app/basic-ui/Backdrop/Backdrop";


import { useRouter } from "next/router";


const Index = () => {
  const router = useRouter();

  const [projectType, setProjectType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    clientAxios
      .post("/project-types", {
        name: projectType,
      })
      .then((res) => {
        router.push("/admin/protype");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error || err.message || JSON.stringify(err));
      });
  };

  return (
    <>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        <div>
          <h2 className="text-2xl leading-normal text-gray-800">
            Project Type
          </h2>
        </div>
        <div className="w-full rounded-md bg-white">
          <form onSubmit={submitHandler} className="flex items-center pb-8" style={{background:"black"}}>
            <div className="py-4 w-full">
              <FormInput
                name={"project-type"}
                label="Name"
                value={projectType}
                required={true}
                type={"text"}
                onChangeHandler={(e) => setProjectType(e.target.value)}
                placeholder={"Project Type"}
              />
            </div>
            <div className="md:mt-[95px]">

            <button
                onClickHandler={""}
                type="submit"
                className="btn btn-info btn-fw"
                style={{color:"white"}}
                >
                Create
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
