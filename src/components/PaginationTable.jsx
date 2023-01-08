import React, { useMemo, useState } from 'react'
import {useTable, useSortBy,usePagination} from 'react-table'
// import { COLUMNS } from '../../column'
import {format} from 'date-fns'
import { Cell } from 'react-table'
import { Active } from './Badge'
import Modal from './Modal'
import ActiveBadge from './ActiveBadge'
import InvitedBadge from './InvitedBadge'
import {BsPersonCircle} from 'react-icons/bs'
import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {AiOutlineArrowLeft,AiOutlineArrowRight,AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'

 

const PaginationTable = ({data}) => {

    const [modal,setModal] = useState(false)
    const [mutateData,setMutateData] = useState({})
    const handleUpdate = (data) => {
        data.action = 'update'
        setMutateData(data)
        setModal(true)

    }

    const handleDelete = (data) => {
        data.action = 'delete'
        setMutateData(data)
        setModal(true)

    }
    const COLUMNS = [ 
        {
            Header:'Name', 
            accessor:'first_name',
            Cell:({row})=>(
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <img src={row.original.photo} className='w-16 h-16 rounded-full' alt="" />
                    <div style={{display:'inline'}}>
                        <span>{row.original.first_name}</span>
                        <span> {row.original.last_name}</span>
                        <div>{row.original.email}</div>
                    </div>
                </div>
            )
        },  
        {
            Header:'Status',
            accessor:'status',
            Cell:({row})=>(
                <>
                    {row.original.status ?  
                        <ActiveBadge/> 
                        :
                        <InvitedBadge/>
                    } 
                </>
            )
        },
        {
            Header:'Role',
            accessor:'role'
        },
        {
            Header:'Last Login',
            accessor:'last_login',
            Cell:({value})=>{return format(new Date(value),"yyyy-MM-dd'T'HH:mm:ss'Z'")}
        },
        {
            Header:' ',
            Cell:({row})=>(
                <>
                    <button  className='text-slate-500  mx-2' onClick={()=>handleUpdate(row.original)}><FiEdit2 size={15}/></button>
                    <button className='text-slate-500 mx-2'  onClick={()=>handleDelete(row.original)}><RiDeleteBin5Line size={15}/></button>
                     
                </>
            )
        }
    ]

    const columns = useMemo(()=>COLUMNS,[])
    const users = useMemo(()=>data,[])

    const tableInstance = useTable({
        columns:columns,
        data:users
    },
    useSortBy,usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount
    } = tableInstance

    const {pageIndex} = state

  return (
    <>
    <table {...getTableProps()} className="border border-slate-300 rounded-md w-full text-left text-sm  "  >
        <thead className='font-thin text-slate-500'>
            {
                headerGroups.map((headerGroup,i)=>(
                    <tr  key={i} {...headerGroup.getHeaderGroupProps()}  >
                        {headerGroup.headers.map((column,i)=>(
                                <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-slate-500">
                                    
                                    <span className='inline flex items-center gap-2'>
                                    {column.render('Header')}
                                        {column.isSorted ? 
                                            (column.isSortedDesc ? 
                                               <AiOutlineArrowDown/> : <AiOutlineArrowUp/>)
                                                :
                                                ''
                                        }
                                    </span>
                                </th>
                        ))}
                    </tr>
                ))
            }
            
        </thead>
        <tbody {...getTableBodyProps()} >
            {
                page.map((row,i)=>{
                    prepareRow(row)
                    const style = `${i % 2 ? 'bg-[#f9fafb]' : 'bg-white'}`
                    return (
                        <tr  key={i} {...row.getRowProps()}  className={`${style} text-sm`}>
                            {
                                row.cells.map((cell,i)=>{
                                    return <td className="px-4 py-1" key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                        </tr>
                    )
                })
            }
           
        </tbody>
    </table>
    <div className='w-full flex items-center justify-between px-10 py-3 border border-slate-300 border-t-0 rounded-b-lg'>
       
        
        <button onClick={()=> previousPage()} disabled={!canPreviousPage} className='px-2 py-1 flex items-center gap-2 border border-slate-300 rounded-md text-slate-900 font-semibold'><AiOutlineArrowLeft/>Previous</button>

        <div style={{display:'inline'}}>
        
        {Array.apply(null, Array(pageCount)).map((x,i)=>{
                var style = ''
                if(pageIndex===i){
                    style = 'bg-gray-300 text-black'
                }else{
                    style = 'bg-none'
                }
            return(
                <button key={i} onClick={()=>gotoPage(i)} className={`${style} py-2 px-4 mx-2 rounded-md text-slate-600`}>{i + 1}</button>
            )
        })}
        </div> 

        <button onClick={()=>nextPage()} disabled={!canNextPage}  className='px-2 py-1 flex items-center gap-2 border border-slate-300 rounded-md text-slate-900 font-semibold'>Next <AiOutlineArrowRight/></button>
    </div>
    {
        modal && <Modal data={mutateData} setModal={setModal}/>
    }
    </>
  )
}

export default PaginationTable