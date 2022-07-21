import React, {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTable, faSignOut, faClock, faPager, faGears} from "@fortawesome/free-solid-svg-icons";
import TimeTrack from "./TimeTrack";
import Reports from "./Reports";
import Settings from "./Settings";

const UserArea = function ({userData,logout,getUser}) {
    console.log("UserArea",userData);
    const [activeTab,setActiveTab] = useState("clock");

    function ActiveContent() {
        switch (activeTab) {
            case "clock":
                return <TimeTrack userData={userData}/>;
            case "reports":
                return <Reports userData={userData}/>;
            case "settings":
                return <Settings/>;
        }
    }
    return (
        <div>
            <div id="userArea">
                {ActiveContent()}

                <div className="text-center" id="mainmenu">
                    <div className={'col-3'+(activeTab=='clock'?' active':'')} ><button className="border-0 bg-none" onClick={()=>setActiveTab('clock')}><FontAwesomeIcon icon={faClock}/><br/>Ponteaza</button></div>
                    <div className={'col-3'+(activeTab=='reports'?' active':'')}><button className="border-0 bg-none"  onClick={()=>setActiveTab('reports')}><FontAwesomeIcon icon={faTable}/><br/>Rapoarte</button></div>
                    <div className={'col-3'+(activeTab=='settings'?' active':'')}><button className="border-0 bg-none"  onClick={()=>setActiveTab('settings')}><FontAwesomeIcon icon={faGears}/><br/>Settings</button></div>
                    <div className={'col-3'} ><button className="border-0 bg-none"  onClick={()=>logout()}><FontAwesomeIcon icon={faSignOut}/><br/>Logout</button></div>
                </div>
            </div>
        </div>
    )
};


export default UserArea;