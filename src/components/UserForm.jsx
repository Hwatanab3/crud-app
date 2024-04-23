import { useForm } from "react-hook-form"
import "./styles/userForm.css"

import React, { useEffect } from 'react'
import { Toaster, toast } from "sonner";


const UserForm = ({ createUsers, updateUser, editUsers, setUpdateUser, isOpen, setIsOpen }) => {

    const { handleSubmit, register, reset } = useForm();

    useEffect(() => {
        if (updateUser) {
            reset(updateUser);
            setIsOpen(true);
        }
    }, [updateUser]);

    const submit = data => {
        if (updateUser) {
            editUsers('users', data, updateUser.id);
            setUpdateUser();
        } else {
            createUsers('users', data);
        }
        setIsOpen(false)
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
            avatar: "",
            image_url: "",
        })
        toast("Created user", {
            description: `${data.first_name} ${data.last_name} was created`
        })
    }

    const handleClose = () => {
        setIsOpen(false)
        setUpdateUser();
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
            avatar: "",
            image_url: "",
        })
    }

    return (
        <div className={`form__back ${isOpen && `active`}`}>
            <form className="form" onSubmit={handleSubmit(submit)}>
                <button onClick={handleClose} type="button" className="form__close"><ion-icon name="close"></ion-icon></button>
                <h2 className="form__title">Edit user</h2>
                <div className="form__item">
                    <label htmlFor="first_name">First name</label>
                    <input {...register('first_name')} id="first_name" type="text" />
                </div>
                <div className="form__item">
                    <label htmlFor="last_name">Last name</label>
                    <input {...register('last_name')} id="last_name" type="text" />
                </div>
                <div className="form__item">
                    <label htmlFor="email">E-mail</label>
                    <input {...register('email')} id="email" type="text" />
                </div>
                <div className="form__item">
                    <label htmlFor="password">Password</label>
                    <input {...register('password')} id="password" type="password" />
                </div>
                <div className="form__item">
                    <label htmlFor="birthday">Birthday</label>
                    <input {...register('birthday')} id="birthday" type="date" />
                </div>
                <div className="form__item">
                    <label htmlFor="image_url">Avatar</label>
                    <input {...register('image_url')} id="image_url" type="text" />
                </div>
                <button className="form__btn">Send</button>
            </form>
            <Toaster />
        </div>
    )
}

export default UserForm