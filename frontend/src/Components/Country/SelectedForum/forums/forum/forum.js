import React from 'react'

const Forum = (props) => {
    return (
        <div className="post">
            <h1>{props.title}</h1>
            <div className="postInfo">
                <p class="pCountry">Country: {props.country}</p>
                <p class="pUser">User: {props.user}</p>
                <p class="pDate">Date: {props.date.toString().slice(0, 10)}</p>
            </div>
            <div className="postContent">
                <p>{props.text}</p>
            </div>
        </div>
    )
}


export default Forum