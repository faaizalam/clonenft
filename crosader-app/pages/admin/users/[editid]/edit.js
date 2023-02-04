import { useState, useRef } from "react";
// import { useRouter } from "next/router";
// import {}

import FormInput from "../../../../component/Project/FormInput";
import clientAxios, { CLIETNURL, serverAxios } from "../../../../config/config";
import Backdrop from "../../../../app/basic-ui/Backdrop/Backdrop";
import ErrorPage from "../../../../component/ErrorPage/ErrorPage";
// import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import MultiDropdown from "../../../../component/Project/Multidropdown";
import userRoles from "../roles.json";
import { useRouter } from "next/router";

const PROPERTIES = [
  { text: "Username", key: "username", type: "text" },
  { text: "Password", key: "password", type: "password" },
  { text: "OxAddress", key: "oxaddress", type: "text" },
  { text: "Twitter", key: "twitter", type: "text" },
  { text: "Discord", key: "discord", type: "text" },
];

// Server Side props
export async function getServerSideProps(context) {
  // const router= useRouter ()
  // const {slug}=router;

  const userId = context.params.editid;

  let user = {};
  let errorCode = "";

  try {
    const response = await serverAxios.get(`/users/${userId}`);
    user = response.data;
  } catch (error) {
    errorCode = error.response?.status;
    console.log(error);
  }

  user.roles = user.roles.map((role) => role.toLowerCase());

  return {
    props: {
      user,
      errorCode,
    },
  };
}

const Index = ({ user, errorCode }) => {
  const router = useRouter();
  const [roles, setRoles] = useState(user.roles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {};

    for (let element of formRef.current.elements) {
      if ((element.value || element.checked) && element.name) {
        data[element.name] = element.value;
      }
    }

    data.roles = roles;

    clientAxios
      .patch(`/users/contributors/${user._id}`, data)
      .then((res) => {
        router.push("/users");
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
          <h2 className="text-2xl leading-normal text-white-800">
            Update User
          </h2>
        </div>
        {/* Form for create user */}
        <div className="w-full rounded-md bg-black px-8 mt-8">
          <form onSubmit={submitHandler} ref={formRef}>
            {PROPERTIES.map((property) => {
              return (
                <div
                  key={property.key}
                  className="py-6 w-full border-b border-[#F3F4F6]"
                >
                  <FormInput
                    defaultValue={user[property.key]}
                    name={property.key}
                    type={property.type}
                    label={property.text}
                    placeholder={property.text}
                  />
                </div>
              );
            })}

            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <MultiDropdown
                setSelectedValue={setRoles}
                options={userRoles}
                name="roles"
                label="Roles"
                selectedStatus={roles}
              />
            </div>

            {error && (
              <p className="mx-auto text-red-500 font-bold my-4">{error}</p>
            )}
            <div className="w-full pt-14 pb-4 mb-4 flex items-center gap-8 justify-end">
              <button
                onClick={() => router.push("/admin/users")}
                className="text-gray-600 font-bold"
                type="button"
              >
                Cancel
              </button>
              <button
                onClickHandler={""}
                type="button"
                className="btn btn-info btn-fw"
              >
                Update user
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
