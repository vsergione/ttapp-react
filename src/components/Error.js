import React from "react";

const Error = function (error) {
    return <div>{JSON.stringify(error)}</div>;
};

export default Error;