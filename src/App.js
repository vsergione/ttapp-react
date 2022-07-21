import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect, useState} from "react";
import './App.css'
import Login from "./components/Login";

import Loader from "./components/Loader";
import Error from "./components/Error";
import UserArea from "./components/UserArea/UserArea";


window.apiBaseUrl = "http://192.168.8.247/dbapi/v2/spaleck";

function App() {
    const [state,setState] = useState("loading");
    const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

    console.log(userData);
    let setUserDataTmp = function (dt) {
        console.log("setUserDataTmp",dt);
        setUserData(dt);
    };

    const logout = function () {
        localStorage.removeItem("userData");
        setUserData(null);
        setState("guest");
    };

    function parseData(data) {
        return data;
    }

    const login = function (userId) {
        return new Promise(function (resolve, reject) {
            getUsr(userId)
                .then((response)=>{
                    if(!response.ok) {
                        logout();
                        reject(response.statusText);
                        return;
                    }
                    console.log(response,response.ok);
                    response.json()
                        .then(data=>{
                            localStorage.setItem("userData",JSON.stringify(data));
                            setUserData(parseData(data));
                            setState("loggedIn");
                            resolve();
                        });
                })
                .catch(function () {
                    reject("interal error")
                })
        });

    };

    const getUsr = function (userId) {
        return fetch(window.apiBaseUrl + "/tags/" + userId+"?include=emplid");
    };

    const getUser = function (userId,cb){

        // fetch from server
        fetch(window.apiBaseUrl + "/tags/" + userId+"?include=emplid")
            .then(response=>{
                if(response.ok) {
                    response.json().then(data=>{
                        console.log('user data received',data);
                        localStorage.setItem("userId",userId);
                        console.log("before update",userData)
                        console.log(setUserData(data));
                        console.log("after update",userData)

                        console.log("before update State!!!",state);
                        setState("loggedIn");
                        console.log("after update State!!!",state);

                        if(cb) {
                            cb(response);
                        }
                    });
                }
                else {
                    localStorage.removeItem("userId");
                    setState("guest");
                    setUserDataTmp({});
                    if(cb) {
                        cb(response);
                    }
                }

            })
            .catch(error=>{
                console.error(error);
            })
    };

    const  Main = function () {
        console.log("state!!!!",state);
        switch (state) {
            case "loading":
                return <Loader/>;
            case "error":
                return <Error/>;
            case "loggedIn":
                return <UserArea logout={logout} userData={userData}/>;
            case "guest":
                return <Login login={login}/>;
        }
    };

    useEffect(() => {
        if(userData) {
            login(userData.data.id);
        }
        else {
            setState("guest");
        }
    },[]);

    return (
        <Main/>
    )
}

export default App;
