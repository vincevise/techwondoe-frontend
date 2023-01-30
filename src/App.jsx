import {useQuery} from 'react-query'
import PaginationTable from './components/PaginationTable'
import { useState } from 'react'
import Header from './components/Header'
import AddUserModal from './components/AddUserModal'
import { getUser } from './api/usersApi'
import { useEffect } from 'react'
 
function App() {
  let {data,isLoading,isError,isFetching,isFetched,refetch} = useQuery('users',getUser)
  // useEffect(()=>{
  //   refetch()
  // },[])
  const [modal,setModal] = useState(false)

  if(isLoading){
    return <div>Loading..</div>
  }

  if(isError){
    return <div>Error</div>
  }

  if(isFetching){
    return <div>Loading..</div>
  }

  if(isFetched){
    return (
      <div className='w-full px-20 border py-5  ' >
        <div className='shadow-2xl'>
      
          <Header setModal={setModal} data={data}/>
          
          <PaginationTable data={data}  /> 
          {modal &&<AddUserModal setModal={setModal}/>}
        </div>
      </div>
    )
  }
}

export default App
