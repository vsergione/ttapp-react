import React, {useEffect, useState} from "react";

const Reports = function ({userData}) {
    console.log(userData.data.relationships.emplid.data.id);
    const [days,setDays] = useState({lbls:[],content:[]});

    function getTT() {
        fetch(window.apiBaseUrl + "/employees/"+userData.data.relationships.emplid.data.id+"/timetracking?sort=-start")
            .then(Response=>Response.json())
            .then((data)=>{
                let daysIdx = [], daysTmp = [];
                data.data.forEach((item)=>{
                    let tmp = item.attributes.start.substr(0,10);
                    let pos = daysIdx.indexOf(tmp);
                    if(pos===-1) {
                        pos = daysIdx.push(tmp)-1;
                        daysTmp.push([])
                    }
                    daysTmp[pos].push(item);
                });
                setDays({lbls:daysIdx,content:daysTmp});
            });
    }

    useEffect(()=>{
        getTT();
    },[]);

    function Days() {
        let [daysLbls,daysContent] =[days.lbls,days.content];
        console.log("render days",daysLbls,daysContent);
        return daysLbls.map((item,idx)=>{
                        return (<div className="card m-2">
                            <div className="card-header p-1">{item}</div>
                            <div className="card-body p-1">
                            <ul>
                            {daysContent[idx].map((item)=>{
                                return <div className="alert alert-secondary m-1 p-1 d-flex">
                                    <span className="flex-grow-1">{item.attributes.start.substr(10,6)} - {item.attributes.stop.substr(10,6)}</span>
                                    <strong>{item.attributes.duration}</strong>
                                </div>;
                            })}
                        </ul></div></div>);
                    });

    }

    return <div id="reports">
        <h2>Rapoarte</h2>
        <div>
            <Days/>
        </div>
    </div>
};

export default Reports;
