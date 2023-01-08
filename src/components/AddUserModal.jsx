import React, { useRef, useState } from 'react'
import ActiveBadge from './ActiveBadge'
import InvitedBadge from './InvitedBadge'
import { AvatarGenerator } from 'random-avatar-generator';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../api/usersApi';


const AddUserModal = ({setModal}) => {
    const queryClient = useQueryClient()

    const createUserMutation = useMutation(createUser,{
        onSuccess:()=>{
          queryClient.invalidateQueries('users')
        }
      })

    
    const generator = new AvatarGenerator()
    const photoURL = generator.generateRandomAvatar()
    const [input,setInput] = useState({
        first_name:'',
        last_name:'',
        email:'',
        status:false,
        role:'',
        last_login:format(new Date(),"yyyy-MM-dd'T'HH:mm:ss'Z'"),
        photo:photoURL
    })

    const errorRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
     

        if(input.first_name.trim()==''||
            input.last_name.trim()==''||
            input.role.trim()==''
             ){
                errorRef.current.innerHTML = 'Please Fill all the details'
        }else{
            const hash = input.email.trim().toLowerCase();
            const avatarUrl = `https://robohash.org/${hash}`;
            setInput({...input,photo:avatarUrl})
            createUserMutation.mutate(input)
            setModal(false)
        }
    }

    

  return (
  <>
    <div className='bg-black/50 w-full h-full fixed inset-0' onClick={()=>setModal(false)}></div>
    <div className='fixed w-fit h-fit m-auto bg-white inset-0 rounded-lg'>
        <form className='px-4 py-2 [&_div]:py-2 [&_input]:mx-2 [&_input]:border [&_input]:border-slate-500 [&_input]:rounded-md [&_input]:px-2 [&_input]:py-1 [&_div]:flex  [&_div]:justify-between text-center'>
            <h1 className='font-semibold text-lg my-2'>Add New User Form</h1>
            <div>
                <label htmlFor="first_name">First Name</label>
                <input 
                    type="text"
                    id='first_name'
                    value={input.first_name}
                    name='first_name'
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} 
                />
                
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <input 
                    type="text"
                    id='last_name'
                    value={input.last_name}
                    name='last_name'
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} 
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id='email'
                    value={input.email}
                    name='email'
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} 
                />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input 
                    type="text" 
                    id='role'
                    value={input.role}
                    name='role'
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select 
                    name="status" 
                    id="status" 
                    value={input.status} 
                    onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                    >
                    <option value="false">
                        Invited
                    </option>
                    <option value="true">Active</option>
                </select>
            </div>
            <span className='text-red-600 block py-2' ref={errorRef}></span>
            <button className='mx-auto border border-green-600 px-4 py-2 rounded-lg text-white bg-green-600' onClick={handleSubmit}>Add User</button>
        </form>
    </div>
  </>
  )
}

export default AddUserModal