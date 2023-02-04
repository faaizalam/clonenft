import { useState, useRef } from "react";
import FormInput from "../../../component/Project/FormInput";

import clientAxios, { CLIETNURL, serverAxios } from "../../../config/config";
import { useRouter } from "next/router";
import Backdrop from "../../../app/basic-ui/Backdrop/Backdrop";

import MultiDropdown from "../../../component/Project/Multidropdown";
import useUserData from "../../../hook/useUserdata";
import userRoles from "./roles.json";

const PROPERTIES = [
  { text: "Username", key: "username", type: "text" },
  { text: "Password", key: "password", type: "password" },
  { text: "OxAddress", key: "oxaddress", type: "text" },
  { text: "Twitter", key: "twitter", type: "text" },
  { text: "Discord", key: "discord", type: "text" },
];

const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const bodyFormData = {};

    for (let element of formRef.current.elements) {
      if ((element.value || element.checked) && element.name) {
        bodyFormData[element.name] = element.value;
      }
    }

    bodyFormData.roles = roles;

    clientAxios
      .post("/users/contributors", bodyFormData)
      .then((res) => {
        router.push("/admin/users");
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
        {/* Heading */}
        <div>
          <h2 className="text-2xl leading-normal text-white-800">Create User</h2>
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
              {/* <button type="submit" className="btn btn-info btn-fw">Create user</button> */}
              <button onClickHandler={""} type="submit" className="btn btn-info btn-fw">Create Project</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Index;
