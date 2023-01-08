import {useQuery} from 'react-query'
import axios from 'axios'
import PaginationTable from './components/PaginationTable'
import Modal from './components/Modal'
import { useState } from 'react'
import Header from './components/Header'
import AddUserModal from './components/AddUserModal'
 
function App() {
  let {data,isLoading,isError,isFetching,isFetched} = useQuery('users',async()=>{
    const response = await axios.get('https://sore-rose-cormorant-cape.cyclic.app/users')
    return response.data
  })

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
