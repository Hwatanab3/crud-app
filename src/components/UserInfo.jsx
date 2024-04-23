import { Toaster, toast } from "sonner";
import "./styles/userInfo.css"

import React from 'react'

const UserInfo = ({ user, deleteUsers, setUpdateUser }) => {

    const handleDelete = () => {
        deleteUsers('users', user.id);
        toast("User delete", {
            description: `${user.first_name} ${user.last_name} has deleted`,
        })
    };

    const handleEdit = () => {
        setUpdateUser(user);
    };

    return (
        <div className="user">
            <div className="user__title">
                <img className="user__avatar" src={user.image_url} alt="user avatar" />
                <h2 className="user__name">{user.first_name} {user.last_name}</h2>
            </div>
            <hr className="user__line" />
            <ul className="user__list">
                <li className="user__item"><span>Email: </span><span>{user.email}</span></li>
                <li className="user__item"><span>Birthday: </span><span><ion-icon name="gift-outline"></ion-icon> {user.birthday}</span></li>
            </ul>
            <hr className="user__line" />
            <div className="user__buttons">
                <button className="user__btn" onClick={handleDelete}><ion-icon name="trash-outline"></ion-icon></button>
                <button className="user__btn" onClick={handleEdit}><ion-icon name="create-outline"></ion-icon></button>
            </div>
            <Toaster />
        </div>
    )
}

export default UserInfo;