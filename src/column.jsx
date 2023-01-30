import {format} from 'date-fns'
import { Cell } from 'react-table'
import ActiveBadge from './components/ActiveBadge'
import InvitedBadge from './components/InvitedBadge'
 

export const COLUMNS = [ 
    {
        Header:'Name', 
        accessor:'first_name',
        Cell:({row})=>(
            <>
                <span>{row.original.first_name}</span>
                <span> {row.original.last_name}</span>
                <div>{row.original.email}</div>
            </>
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
                <button onClick={()=>console.log(row.original)}>Edit</button>
                <span>Delete</span>
                 
            </>
        )
    }
]