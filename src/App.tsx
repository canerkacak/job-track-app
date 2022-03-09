import * as React from "react";
import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { CreateForm } from "./components/forms/CreateForm";
import { CustomTable } from "./components/table/CustomTable";
import { EditModal } from "./components/modal/EditModal";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const getStorageData = localStorage.getItem("jobStorageDatas");

  const [data, setData] = useState(() => {
    return getStorageData !== null ? JSON.parse(getStorageData) : [];
  });

  const [selectedData, setSelectedData] = useState(Object);
  const [selectedDataId, setSelectedDataId] = useState(Number);
  const [showModal, setShowModal] = useState(false);

  function createJob(addRowData: any) {
    setData((previous: any) => {
      return [...previous, addRowData];
    });
  }

  function deleteJob(index: number) {
    data.splice(index, 1);
    setData([...data]);
  }

  function editJob(value: number) {
    const newData = [...data];

    newData[selectedDataId] = {
      jobName: selectedData.jobName,
      jobPriority: value,
    };

    setData(newData);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  function handleEditData(index: number) {
    setSelectedData(data[index]);
    setSelectedDataId(index);
    handleClose();
  }

  useEffect(() => {
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  });

  function onUnload(event: any) {
    event.preventDefault();

    if (data.length > 0)
      localStorage.setItem("jobStorageDatas", JSON.stringify(data));
    else localStorage.removeItem("jobStorageDatas");
  }

  return (
    <React.Fragment>
      <div className="container my-4">
        <Row>
          <h3>Create New Job</h3>
          <hr></hr>
        </Row>
        <Row>
          <CreateForm createJob={createJob} />
        </Row>
        <Row>
          <CustomTable
            data={data}
            deleteJob={deleteJob}
            handleEditData={handleEditData}
          />
        </Row>
        {showModal ? (
          <EditModal
            data={selectedData}
            showModal={showModal}
            handleClose={handleClose}
            editJob={editJob}
          ></EditModal>
        ) : null}
      </div>
    </React.Fragment>
  );
}
export default App;
