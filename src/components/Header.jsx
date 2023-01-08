import React from 'react'
import {AiOutlineCloudDownload} from 'react-icons/ai'
import {GrAdd} from 'react-icons/gr'

const Header = ({setModal,data}) => {
  const noOfUsers = data.filter((x)=>x.status === true)

  function downloadCSV(data) {
    const keys = Object.keys(data[0]);
    const csvData = data.map(d => keys.map(k => d[k]).join(','));
    csvData.unshift(keys.join(','));
    const csvUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData.join('\n'))}`;
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'data.csv';
    link.click();
  }

  const handleDownload = () => {
    console.log('downloadCSV')
    downloadCSV(data)
  }
  return (
    <div className='border-x border-t border-slate-300 rounded-t-lg px-4 py-4 flex justify-between items-center '>
        <div>
            <div className='flex '>
              <span className='text-lg font-semibold'>Users</span>
               
              <span className='w-fit bg-green-100 flex items-center mx-2 px-2 text-sm rounded-full text-green-600'>
                <span className=' pr-1'>{noOfUsers.length} </span> 
                <span>users</span>
              </span>
            </div>
            <div className='text-sm text-slate-500'>Manage your team members and their account permissions here.</div> 
        </div>
        <div className='flex gap-2'>
            <button className='flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg' onClick={handleDownload}><AiOutlineCloudDownload size={20} /> Download CSV</button>
            <button className='flex items-center gap-2 bg-blue-400 px-4 py-2 rounded-lg text-white font-semibold' onClick={()=>setModal(true)}>
              <span className='text-white'><GrAdd color='white'/></span>
              <span>Add User</span>
            </button>
        </div>
    </div>
  )
}

export default Header