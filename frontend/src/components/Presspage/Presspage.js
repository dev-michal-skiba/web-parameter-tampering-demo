
import React from 'react';
import PresspagePublic from "./PresspagePublic"
import PresspagePrivate from "./PresspagePrivate";

function Presspage (props) {
    return (
        props.auth === true
            ? <PresspagePrivate />
            : <PresspagePublic {...props} />
    )
}

export default Presspage;
