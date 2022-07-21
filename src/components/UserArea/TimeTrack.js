import React, {useEffect, useState} from "react";
import Loader from "../Loader";



const TimeTrack = function ({userData}) {
    const [state,setState] = useState("loading");
    const [error,setError] = useState(null);

    const Working = function () {
        return (
            <div className="">
                <h3>{userData.data.attributes.fname},{userData.data.attributes.lname}</h3>
                Working since: {state.attributes.start}<br/>
                <button onClick={()=>stop_work()}>Stop</button>
            </div>
        );
    };

    const NotWorking = function ({userData}) {
        return (
            <div className="">
                Welcome {userData.data.attributes.fname},{userData.data.attributes.lname}
                <button onClick={()=>start_work()}>Start</button>
            </div>
        );
    };

    function start_work() {
        fetch(window.apiBaseUrl+"/timetracking",{
            method: 'POST',
            headers: {
                'Content-type':'application/vnd.api+json'
            },
            body: JSON.stringify({
                data:{attributes:{employee:userData.data.relationships.emplid.data.id}}
            })
        })
            .then((Response)=> {
                if(Response.ok) {
                    Response
                        .json()
                        .then(function (data) {
                            console.log(data);
                            setState(data.data)
                        })
                }
                else {
                    Response
                        .json()
                        .then(function (data) {
                            setError(data.errors[0].title);
                        })
                }
            })
            .then(function (data) {
                console.log(data);
                setState(data.data)
            })
            .catch((a)=>{
                console.log(a)
            })
    }

    function stop_work() {
        fetch(window.apiBaseUrl+"/timetracking/"+state.id,{
            method: 'PATCH',
            headers: {
                'Content-type':'application/vnd.api+json'
            },
            body: JSON.stringify({data:{id:state.id,attributes:{status:"f"}}})
        })
            .then(()=> {
                setState( null);
            })
            .catch((a)=>{
                console.log(a)
            })
    }

    function check_status() {
        fetch(window.apiBaseUrl+"/tags/"+userData.data.id+"/started_work")
            .then(Response=> Response.json())
            .then(function (data) {
                console.log(data);
                setState(data.data.length ? data.data[0] : null);
            })
    }

    useEffect(()=>{
        check_status();
    },[]);

    function isWorking() {

    }


    console.log("TimeTrack",userData,state);
    function  Error() {
        if(error) {
            setTimeout(()=>setError(null),2000);
            return <div className="error"><pre>{error}</pre></div>;
        }
        else
            return null;
    }

    function Body() {
        switch (state) {
            case null:
                return <NotWorking userData={userData}/>;
            case "loading":
                return <Loader/>;
            default:
                return <Working/>;
        }
    }
    return (
        <>
            <Body/>
            <Error/>
        </>
    )


};

export  default TimeTrack;