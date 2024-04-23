import axios from 'axios';
import { useState } from 'react'

const useCrud = (base) => {
    const [apiData, setApiData] = useState();

    // LEER EL ENDPOINT
    const getApi = (path) => {
        const url = `${base}${path}/`;
        axios.get(url)
            .then(res => setApiData(res.data))
            .catch(err => console.log(err))
    }

    //! CREAR USUARIO
    const postApi = (path, data) => {
        const url = `${base}${path}/`
        axios.post(url, data)
            .then(res => {
                setApiData([...apiData, res.data]);

            })
            .catch(err => console.log(err))
    }

    //? BORRAR USUARIO
    const deleteApi = (path, id) => {
        const url = `${base}${path}/${id}`;
        axios.delete(url)
            .then(() => {
                setApiData(apiData.filter(user => user.id !== id))
            })
            .catch(err => console.log(err))
    }

    //* MODIFICAR USUARIO
    const patchApi = (path, data, id) => {
        const url = `${base}${path}/${id}/`;
        axios.patch(url, data)
            .then(res => {
                setApiData(apiData.map(user => user.id === id ? data : user));
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    //TODO CUIDADO ELIMINAR TODO
    const deleteAllApi = (path) => {
        Promise.all(
            apiData.map(user =>
                axios.delete(`${base}${path}/${user.id}/`)
            )
        ).then(() => {
            setApiData([]); // Vaciar la lista de usuarios
        }).catch(err => console.log(err));
    }


    return [apiData, getApi, postApi, deleteApi, patchApi, deleteAllApi];
}

export default useCrud;