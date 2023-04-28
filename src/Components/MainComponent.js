import React from "react";
import Images from "./Images";
import EditPage from "./EditPage";
import Extra from "./Extra";

const MainComponent = () => {
  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-6 bg-light images  ">
          <div className="row  border">
            <Images />
          </div>
        </div>
        <div className="col-6">
          <EditPage />
          
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
