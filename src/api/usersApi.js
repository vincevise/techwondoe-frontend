import axios from "axios";

// const baseURL = 'http://localhost:3023/users'
const baseURL = 'https://sore-rose-cormorant-cape.cyclic.app/users'

export const getUser = async() => {
    const response = await axios.get(`${baseURL}`)
    return response.data
}

export const createUser = async(data) => {
    return await axios.post(`${baseURL}`,data) 
}

export const updateUser = async(data) => {
    return await axios.patch(`${baseURL}/${data.id}`,data) 
}

export const deleteUser = async(data) => {
    return await axios.delete(`${baseURL}/${data.id}`) 
}