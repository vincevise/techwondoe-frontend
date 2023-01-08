import axios from "axios";

export const createUser = async(data) => {
    return await axios.post('https://sore-rose-cormorant-cape.cyclic.app/users',data) 
}

export const updateUser = async(data) => {
    return await axios.patch(`https://sore-rose-cormorant-cape.cyclic.app/users/${data.id}`,data) 
}

export const deleteUser = async(data) => {
    return await axios.delete(`https://sore-rose-cormorant-cape.cyclic.app/users/${data.id}`) 
}