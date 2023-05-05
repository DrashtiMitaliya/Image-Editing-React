import React from "react";
import Images from "./Images";
import EditPage from "./EditPage";
import Extra from "./Extra";
import Crud from "./Crud";

import CrudExtra from "./CrudExtra";

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
          {/* <EditPage /> */}
          <Extra/>
          {/* <Crud/> */}
          {/* <CrudExtra/> */}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
