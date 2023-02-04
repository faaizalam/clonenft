
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
// import Dropdown from "../../../component/Project/dropdown";
// import FormInput from "../../../component/Project/FormInput";
import Dropdown from "../../component/Project/dropdown";
import FormInput from "../../component/Project/FormInput";
import clientAxios, { CLIETNURL, serverAxios } from "../../config/config";
import Backdrop from "../../app/basic-ui/Backdrop/Backdrop";
import moment from "moment";
import MultiDropdown from "../../component/Project/Multidropdown";
import useUserData from "../../hook/useUserdata";
import Image from "next/image";

const PROPERTIES = [
    { text: "Project Name", key: "name", type: "text" },
    { text: "Project Email", key: "projectEmail", type: "email" },
    { text: "Description", key: "description", type: "editor" },
    { text: "Partner", key: "partner", type: "text" },
    { text: "Mint Quantity", key: "mintQuantity", type: "text" },
    { text: "Quantity Details", key: "quantityDetails", type: "text" },
    { text: "Whitelist Methods", key: "whitelistMethods", type: "text" },
    { text: "Whitelist Mint Price", key: "whitelistMintPrice", type: "number" },
    { text: "Whitelist Details", key: "whitelistDetails", type: "text" },
    { text: "Public Mint Price", key: "publicMintPrice", type: "number" },
    { text: "Ebisu’s Bay Mint Price", key: "ebPrice", type: "number" },
    { text: "Whitelist Mint Date", key: "whitelistMintDate", type: "date" },
    {
      text: "TBA Whitelist Mint Date",
      key: "whitelistMintAnnouncement",
      type: "checkbox",
    },
    // {
    //   text: "Whitelist Mint Time UTC",
    //   key: "whitelistMintTimeUTC",
    //   type: "date",
    // },
    { text: "Public Mint Date", key: "publicMintDate", type: "date" },
    {
      text: "TBA Public Mint Date",
      key: "publicMintAnnouncement",
      type: "checkbox",
    },
    { text: "Mint Close Date", key: "mintCloseDate", type: "date" },
    { text: "Rarity", key: "rarity", type: "text" },
    { text: "Utility", key: "utility", type: "text" },
    { text: "Utility Details", key: "utilityDetails", type: "text" },
    { text: "Tokenomics", key: "tokenomics", type: "text" },
    { text: "Staking", key: "staking", type: "text" },
    { text: "Staking Details", key: "stakingDetails", type: "text" },
    { text: "Token", key: "token", type: "text" },
    { text: "Token Contract", key: "tokenContract", type: "text" },
    { text: "DAO", key: "dao", type: "text" },
    { text: "DAO Details", key: "daoDetails", type: "text" },
    { text: "Twitter Followers", key: "twitterFollowers", type: "number" },
    { text: "Discord Members", key: "discordMembers", type: "number" },
    { text: "Contract Address", key: "contractAddress", type: "text" },
    { text: "Discord", key: "discordLink", type: "text" },
    { text: "Website", key: "websiteLink", type: "text" },
    { text: "White Paper", key: "whitePaperLink", type: "text" },
    { text: "Twitter", key: "twitterLink", type: "text" },
    { text: "Tiktok", key: "tiktokLink", type: "text" },
    { text: "Instagram", key: "instagramLink", type: "text" },
    { text: "EbisusBay", key: "ebLink", type: "text" },
    { text: "Agora", key: "agoraLink", type: "text" },
    { text: "Telegram", key: "telegramLink", type: "text" },
    { text: "Lootpad", key: "lootpadLink", type: "text" },
    { text: "OpenSea", key: "openSea", type: "text" },
    { text: "NFT Contract", key: "nftContract", type: "text" },
  ];

  export async function getServerSideProps(context) {
    let [projectTypeOptions, mintStatusOptions, statusOptions, contributors] =
      await Promise.all([
        serverAxios.get(`/project-types`),
        serverAxios.get(`/mint-status`),
        serverAxios.get(`/status`),
        serverAxios.get(`/users`),
      ]);
  
    contributors = contributors.data
      .filter(
        (contributor) =>
          contributor.roles?.length === 1 &&
          contributor.roles.includes("contributor")
      )
      .map((contributor) => ({
        _id: contributor._id,
        name: contributor.username,
      }));
  
    return {
      props: {
        projectTypeOptions: projectTypeOptions.data,
        mintStatusOptions: mintStatusOptions.data,
        statusOptions: statusOptions.data,
        contributors,
      },
    };
  }

export default function Create ({
    projectTypeOptions = [],
    mintStatusOptions = [],
    statusOptions = [],
    contributors = [],
  }){

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedMint, setSelectedMint] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedProjectType, setSelectedProjectType] = useState([]);
    const [selectedContributors, setSelectedContributors] = useState([]);
    const [projectDescription, setProjectDescription] = useState("");
    const [nftOptionId, setNftOptionId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const formRef = useRef(null);
    const DATETYPE = ["publicMintDate", "whitelistMintDate", "mintCloseDate"];
    const BOOLEAN_CHECKS = [
      "whitelistMintAnnouncement",
      "publicMintAnnouncement",
    ];
  
    // Router
    const router = useRouter();
  
    const submitHandler = (event) => {
      event.preventDefault();
      setError(null);
      setIsLoading(true);
  
      const bodyFormData = new FormData();
  
      for (let element of formRef.current.elements) {
        if (element.value || element.checked) {
          if (element.name === "image") {
            bodyFormData.set("image", image);
          } else if (DATETYPE.includes(element.name)) {
            bodyFormData.set(
              element.name,
              moment.utc(element.value.toString()).unix()
            );
          } else if (BOOLEAN_CHECKS.includes(element.name)) {
            bodyFormData.set(element.name, element.checked);
          } else {
            bodyFormData.set(element.name, element.value);
          }
        }
      }
  
      if (!selectedProjectType.some((id) => nftOptionId === id)) {
        bodyFormData.set("mintStatus", "");
      } else if (selectedMint) {
        bodyFormData.set("mintStatus", selectedMint);
      }
      bodyFormData.set(
        "projectType",
        JSON.stringify(selectedProjectType).replace(/[\[\]'"]+/g, "")
      );
      bodyFormData.set("status", selectedStatus);
      bodyFormData.set("description", projectDescription);
      bodyFormData.set("contributors", JSON.stringify(selectedContributors));
  
      clientAxios
        .post("/projects", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          router.push("/projects");
        })
        .catch((error) => {
          setIsLoading(false);
          setError(
            error.response.data.error || error.messge || JSON.stringify(error)
          );
        });
    };
  
    const onImageChangeHandler = (event) => {
      setImage(event.target.files[0]);
    };
  
    useEffect(() => {
      if (statusOptions[0]) {
        setSelectedStatus(statusOptions[0]._id);
      }
      if (projectTypeOptions[0]) {
        setSelectedProjectType([projectTypeOptions[0]._id]);
      }
    }, [statusOptions, projectTypeOptions]);
  
    useEffect(() => {
      if (!image) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(image);
    }, [image]);
  
    useEffect(() => {
      if (projectTypeOptions) {
        const projectTypeOption = projectTypeOptions.find((option) =>
          option.name.toLowerCase().includes("nfts")
        );
        if (projectTypeOption !== undefined) {
          setNftOptionId(projectTypeOption._id);
        }
      }
    }, [projectTypeOptions]);
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
          <h2 className="text-2xl leading-normal text-gray-800" style={{color:"white"}}>
            Create Project
          </h2>
        </div>
        {/* Form for create project */}
        <div className="">
          <form onSubmit={submitHandler} ref={formRef}>
            {/* Upload File */}
            <div className="py-6 w-full grid border-b items-center grid-cols-7 border-[#F3F4F6]">
              <span className="text-gray-600 col-span-2 text-lg leading-[18px] text-white">
                Image
              </span>
              <label
                htmlFor="upload"
                className="col-span-4 cursor-pointer flex items-center"
              >
                <div className="mr-4 " style={{width:"150px",height:"150px"}}>
                  {!imagePreviewUrl && (
                     

                    <Image
                      className="rounded relative  imgs"
                      src={"/Images/default.webp"}
                      width={150}
                      height={150}
                      objectFit="cover"
                      alt="Project Image"
                      
                    />
                  )}
                  {imagePreviewUrl && (
                  
                    <Image
                      className="rounded-full relative imgs"
                      src={imagePreviewUrl}
                      width={150}
                      height={150}
                      objectFit="cover"
                      alt="Project Image"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 leading-4 mb-4 text-white">
                    No files selected
                  </span>
                  <button
                    type="button"
                    className="text-purple-700 hover:bg-purple-50 border-purple-700 border py-3 w-40 rounded-lg pointer-events-none"
                  >
                    Choose FIle
                  </button>

                  <input
                    name="image"
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={onImageChangeHandler}
                  />
                </div>
              </label>
            </div>
            {PROPERTIES.map((property) => {
              return (
                <div
                  key={property.key}
                  className="py-6 w-full border-b border-[#F3F4F6]" style={{color:"black"}}
                >
                  <FormInput
                    name={property.key}
                    value={property.type === "editor" && projectDescription}
                    onChangeHandler={(e) =>
                      property.type === "editor" && setProjectDescription(e)
                    }
                    type={property.type}
                    label={property.text}
                    placeholder={property.text}
                  />
                </div>
              );
            })}
            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <MultiDropdown
                setSelectedValue={setSelectedProjectType}
                options={projectTypeOptions}
                name={"project-types-lookup"}
                label="Project Types"
                selectedStatus={selectedProjectType}
              />
            </div>
            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <MultiDropdown
                setSelectedValue={setSelectedContributors}
                options={contributors}
                selectedStatus={selectedContributors}
                label="Contributors"
                placeholder="Select Contributors"
              />
            </div>
            {nftOptionId &&
              selectedProjectType?.some((id) => nftOptionId === id) && (
                <div className="py-6 w-full border-b border-[#F3F4F6]">
                  <Dropdown
                    setSelectedValue={setSelectedMint}
                    options={mintStatusOptions}
                    name={"Mint Status"}
                    label="Mint Status"
                    selectedStatus={selectedMint}
                  />
                </div>
              )}
            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <Dropdown
                setSelectedValue={setSelectedStatus}
                options={statusOptions}
                name={"status"}
                label="Status" 
                
                selectedStatus={selectedStatus}
              />
            </div>
            {error && (
              <p className="mx-auto text-red-500 font-bold my-4">{error}</p>
            )}
            <div className="w-full pt-14 pb-4 mb-4 flex items-center gap-8 justify-end">
              <button
                onClick={() => router.push("/admin/project")}
                className="text-gray-600 font-bold"
                type="button"
              >
                Cancel
              </button>
              <button onClickHandler={""} type="submit" className="btn btn-info btn-fw">Create Project</button>
              {/* <Button text="Create Project" onClickHandler={() => {}} /> */}
            </div>
          </form>
        </div>
      </section>
    
    
    </>
  )
}
