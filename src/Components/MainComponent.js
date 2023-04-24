import React from 'react'
import Images from './Images'
import EditPage from './EditPage'

const MainComponent = () => {
    return (
        <div className='container-fluid'>
            <div className="row ">
                <div className="col-6  ">
                    <div className="row border ">
                        <Images />
                    </div>
                </div>
                <div className="col-6">
                    {/* <Edit/> */}
                    <EditPage />
                </div>
            </div>
        </div>
    )
}

export default MainComponent