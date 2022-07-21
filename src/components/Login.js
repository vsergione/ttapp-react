import React, {useEffect, useState} from "react";

const Login = function ({login}) {
    const [userId,setUserId] = useState('');
    const [err,setErr] = useState(null);

    useEffect(function () {
        console.log("login is rendered");
    },[]);

    const showError = function (statusText) {
        setErr(statusText);
        setTimeout(()=>setErr(null),2000);
    };

    function loginError(err) {
        if(!err) {
            return;
        }

        return <h2>{err}</h2>;
    }

    function performLogin(e) {
        e.preventDefault();
        if(userId && userId!=="")
            login(userId).catch(showError)
    }
    return <div className="p-2">
        <div className="vertical-center text-center">
            <form onSubmit={performLogin}>
                <input type="text" value={userId} onChange={(e)=>{
                    console.log(e);setUserId(e.target.value)}} className="form-control"/>
                <button type="submit" className="btn btn-primary" onClick={(e)=>{console.log(e)}}>Login</button>
            </form>
            {loginError(err)}
        </div>
    </div>;
};

export default Login;