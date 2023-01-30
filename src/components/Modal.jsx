import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteUser, updateUser } from "../api/usersApi";
import ActiveBadge from "./ActiveBadge";
import InvitedBadge from "./InvitedBadge";

const Modal = ({ data, setModal }) => {
  console.log(data.action);
  const queryClient = useQueryClient()

  const [input,setInput] = useState({
    id:data.id,
    first_name:data.first_name,
    last_name:data.last_name,
    role:data.role
  })

  
  const updateUserMutation = useMutation(updateUser,{
    onSuccess:()=>{
      queryClient.invalidateQueries('users')
    }
  })

  const deleteUserMutation = useMutation(deleteUser,{
    onSuccess:()=>{
      queryClient.invalidateQueries('users')
    }
  })

  const handleDelete = (e) => {
    e.preventDefault()
    deleteUserMutation.mutate(data)
    setModal(false)

  }

  const handleUpdate = (e) => {
    e.preventDefault()
    updateUserMutation.mutate(input)
    setModal(false)
  }

 

  return (
    <>
      <div className="fixed w-full h-full bg-black/50 inset-0" onClick={() => setModal(false)}></div>
      <div className="fixed w-fit h-fit	inset-0 m-auto z-10 bg-white rounded-lg px-6 py-2">
        <div className="w-fit h-auto m-auto py-4 top-10">
        <div className="w-fit px-4 py-2 flex border border-slate-300 rounded-lg mx-auto text-center gap-3">
          <div className="my-auto">
            <img
              src={data.photo}
              alt=""
              className="w-36 rounded-full"
            />
          </div>
          <div className=" [&_span]:px-2 [&_span]:py-1"> 
            <div className="  flex justify-between">
              <span className="font-semibold">First Name :</span>
               
                <input 
                type="text" 
                name="first_name" 
                value={input.first_name}
                disabled={data.action==='delete' ? true : false }
                className={`bg-white px-2  border ${data.action ==='delete' ? '' : 'border-slate-600'} rounded-md`}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                /> 
              
            </div>
            <div className="  flex justify-between my-2">
              <span className="font-semibold">Last Name :</span>
               
              <input 
                type="text" 
                name="last_name" 
                value={input.last_name}
                disabled={data.action==='delete' ? true : false }
                className={`bg-white px-2  border ${data.action ==='delete' ? '' : 'border-slate-600'} rounded-md`}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
              /> 
              
            </div>
            <div className="  flex justify-between my-2">
              <span className="font-semibold">Email :</span>
              <span>{data.email}</span>
            </div>
            <div className="  flex justify-between my-2">
              <span className="font-semibold">Status :</span>
              <span>{data.status ? <ActiveBadge /> : <InvitedBadge />}</span>
            </div>
            <div className="flex justify-between my-2">
              <span className="font-semibold">Role :</span>
              <input 
                type="text" 
                name="role" 
                value={input.role}
                disabled={data.action==='delete' ? true : false }
                className={`bg-white px-2  border ${data.action ==='delete' ? '' : 'border-slate-600'} rounded-md`}
                onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
              /> 
            </div>
          </div>
        </div>
        {
          data.action === 'delete' 
          ? 
          <p className="my-5 text-center">Are you sure You want to Delete this user ?</p> 
          : 
          <p className="my-5 text-center">Update the user</p> 
        }
        
        <div className="flex justify-center w-full text-center gap-2">
          {data.action === 'delete' ?   
            <button className="border border-red-500 bg-red-500 px-4 py-1 rounded-lg text-white"
            onClick={handleDelete}
            >Delete</button>
          :
            <button className="border border-blue-500 bg-blue-500 px-4 py-1 rounded-lg text-white"
            onClick={handleUpdate}>Update</button>
          }
          <button className="border border-slate-600 px-4 py-1 rounded-lg text-slate-600" onClick={()=>setModal(false)}>Cancel</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Modal;
