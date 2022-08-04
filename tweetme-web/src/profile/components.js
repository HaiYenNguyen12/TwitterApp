import React  from "react";


export function UserLink(props) {
    const {username} = props
    const handleUserClick =(event) =>{
        event.preventDefault()
        window.location.href= `/profiles/${username}`

    }

    return <span className="pointer" onClick={handleUserClick}>{props.children}</span>

}

export function UserDisplay(props) {
    const {user, includeFullname} = props
    const displayFullName = includeFullname === true ? `${user.first_name}  ${user.last_name}  ` : null

    return <React.Fragment>
        {displayFullName}
        <UserLink username = {user.username}>@{user.username}</UserLink>
    </React.Fragment>
}

export function UserPicture ( props) {
    const {user} = props
    return  <UserLink username={user.username}><span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
           {user.username[0]}
    </span></UserLink>
}