import { useEffect, useState } from "react";

// import Backdrop from "../components/UI/Backdrop/Backdrop";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import Iframe from "../../component/Ui/Ifram/ifram";
import localAxios, { serverAxios, BASEURL } from "../../config/config";
// import ImageUploader from "../components/UI/ImageUploader/ImageUploader";
import NextImage from "../../component/Image/NextImage";
import Image from "next/image";
export async function getServerSideProps(context) {
  const response = await serverAxios.get("/about/code");
  let code = response.data;

  if (code === "") {
    code = "//Write your HTML here";
  } else {
    code = code.code;
  }

  return {
    props: { code },
  };
}

export default function About({ code: fetchedCode }) {
  const [code, setCode] = useState(fetchedCode);
  const [showCode, setShowCode] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [image, setImage] = useState(null);

  const saveCode = () => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    var formData = new FormData();
    formData.set("image", image);
    localAxios
      .post("/about/code", { code })
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
    localAxios
      .patch("/about/Image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {})
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const onImageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

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

  return (
    <>
      {isLoading && (
        <div>
          <div className="loader relative top-56 z-50"></div>
        </div>
      )}
      <h2 className="text-lg font-bold">About</h2>
      {/* <div className="flex justify-between items-center border border-white py-3 px-5 rounded my-4">
      <ImageUploader />
      <ImageUploader />
      <ImageUploader />
      <ImageUploader />
    </div> */}

      <label
        htmlFor="upload"
        className="col-span-4 cursor-pointer flex items-center m-8 mb"
      >
        <div className="mr-4">
          {!imagePreviewUrl && (
            <Image
              className="rounded-full relative"
              src={`${BASEURL}/about/Image`}
              width={150}
              height={150}
              objectFit="cover"
              alt="Project Image"
            />
          )}
          {imagePreviewUrl && (
            <Image
              className="rounded-full relative"
              src={imagePreviewUrl}
              width={150}
              height={150}
              objectFit="cover"
              alt="Project Image"
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          {!imagePreviewUrl && (
            <span className="text-sm text-white-600 leading-4 mb-4">
              No files selected
            </span>
          )}
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

      <div className="flex w-full justify-end">
        <button
          className="btn btn-info btn-fw"
          onClick={() => setShowCode((oldState) => !oldState)}
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>
        <button
          className="btn btn-info btn-fw"
          style={{ marginLeft: "10px" }}
          onClick={() => setShowPreview((oldState) => !oldState)}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>
      <div className="mt-4 flex flex-row items-stretch">
        {showCode && (
          <div className={`${showPreview ? "w-1/2" : "w-full"}`}>
            <CodeMirror
              value={code}
              height="450px"
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              onChange={(value, viewUpdate) => {
                setCode(value);
              }}
            />
          </div>
        )}
        {showPreview && (
          <div
            className={`${
              showCode ? "w-1/2 ml-4" : "w-full"
            } rounded bg-white overflow-auto h-450`}
            style={{ height: "450px" }}
          >
            <Iframe content={code} />
          </div>
        )}
      </div>
      <div className="flex justify-end items-center my-4">
        {error && <p className="text-red-500 font-medium mr-5">{error}</p>}
        {success && (
          <p className="text-green-500 font-medium mr-5">
            Code saved successfully!
          </p>
        )}
        {/* <Button text="Save" onClickHandler={saveCode} /> */}
        <button
          onClick={saveCode}
          type="button"
          className="btn btn-info btn-fw"
        >
          Save
        </button>
      </div>
    </>
  );
}

// export default About
