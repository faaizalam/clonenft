import React, { useState } from 'react'
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import Iframe from '../../component/Ui/Ifram/ifram';
import localAxios , { serverAxios } from '../../config/config';
// import Button from '../../component/Reusable/Button';






export async function getServerSideProps(context) {
  const response = await serverAxios.get("/codes");
  let code = response.data.find((code) => code.location === "left-panel");

  if (code === undefined) {
    code = "//Write your HTML here";
  } else {
    code = code.code;
  }

  return {
    props: { code },
  };
}




export default  function LeftPanel ({ code: fetchedCode })  {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(fetchedCode);
  const [showCode, setShowCode] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveCode = () => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    localAxios.post("/codes", { location: "left-panel", code })
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
  };
 
  return (
    <>
      {showDeleteModal && (
        <div onClicked={() => setShowDeleteModal(false)}>
          <div
            header="Delete?"
            body="Delete this project?"
            onCanceled={() => setShowDeleteModal(false)}
            onConfirmed={deleteProject}
          />
        </div>
      )}
      {isLoading && (
        <div>
          <div className="loader relative top-56 z-50"></div>
        </div>
      )}
      <div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
            <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold underline">Left Panel</h2>
        <div className="">
          <button
            className="btn btn-info btn-fw"
           
            onClick={() => setShowCode((oldState) => !oldState)}>
            {showCode ? "Hide Code" : "Show Code"}
          </button>
          <button
          
          className="btn btn-info btn-fw"
                   style={{marginLeft:"10px"}}
            onClick={() => setShowPreview((oldState) => !oldState)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-row items-stretch">
        {showCode && (
          <div className={`${showPreview ? "w-1/2" : "w-full"}`}style={{color:"black"}}>
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
        {/* <Button text="Save" onClickHandler={saveCode}/> */}
        <button onClick={saveCode} type="button" className="btn btn-info btn-fw">Save</button>
      </div>

              
               
             
              </div>
            </div>
          </div>
       
      </div>
    </>
  )
}

// export default leftPanel
