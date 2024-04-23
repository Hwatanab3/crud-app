import { useEffect, useState } from 'react';
import './App.css'
import UserForm from './components/UserForm'
import useCrud from './hooks/useCrud'
import UserInfo from './components/UserInfo';
import { dateChange } from './utils/dateChange';
import { Toaster, toast } from 'sonner';

function App() {

  const urlBase = "https://users-crud.academlo.tech/"

  const [isOpen, setIsOpen] = useState(false)
  const [updateUser, setUpdateUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [users, getUsers, createUsers, deleteUsers, editUsers, deleteAllUsers] = useCrud(urlBase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    const path = 'users';
    getUsers(path);
  }, [])

  const urlRan = "https://randomuser.me";

  const [userRan, getUserRan] = useCrud(urlRan)

  useEffect(() => {
    const path = "/api"
    getUserRan(path)
  }, [users])

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleRan = () => {
    const userRandom = userRan.results[0];
    const data = {
      first_name: `${userRandom.name.first}`,
      last_name: `${userRandom.name.last}`,
      email: `${userRandom.email}`,
      password: `${userRandom.login.password}`,
      birthday: dateChange(userRandom.dob.date),
      image_url: `${userRandom.picture.large}`
    };
    createUsers("users", data)
    toast("Created user", {
      description: `${userRandom.name.first} ${userRandom.name.last} was created`
    })
  }

  const handleDeleteAll = () => {
    deleteAllUsers('users');
    toast("All users deleted", {
      description: "All users have been successfully deleted."
    });
  }

  return (
    <>
      {
        isLoading ? (
          <div className='loading'>
            <img className='loading__gif' src='../assets/loading.gif' alt='loading...' />
          </div>
        ) : (
          <div className='app'>
            <header className='app__header'>
              <div className='header__content'>
                <h1 className='app__title'>DASHBOARD | YOU HAVE <span className='title__span'>{users?.length || 0}</span> USERS</h1>
                <p className='title__txt'>Welcome! Admin</p>
                <button className='btn__dltAll' onClick={handleDeleteAll}>Delete all</button>
              </div>
              <div className='header__btn'>
                <button onClick={handleRan}><ion-icon name="dice-outline"></ion-icon>  Test</button>
                <button onClick={handleOpen}><ion-icon name="add-outline"></ion-icon> Create User</button>
              </div>
            </header>
            <UserForm
              createUsers={createUsers}
              updateUser={updateUser}
              editUsers={editUsers}
              setUpdateUser={setUpdateUser}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <div className='app__container'>
              {
                users?.map((user) => <UserInfo
                  key={user.id}
                  user={user}
                  deleteUsers={deleteUsers}
                  setUpdateUser={setUpdateUser}
                />)
              }
            </div>
            <a href="https://portafolio-hwatanabe.netlify.app/" target='blank'>
              <img className='logo' src='../assets/logo_dark.png' alt='logo' />
            </a>
            <Toaster />
          </div>
        )
      }

    </>

  )
}

export default App


