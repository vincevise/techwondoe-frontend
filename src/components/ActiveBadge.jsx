import React from 'react'

const ActiveBadge = () => {
    const style = {
        backgroundColor:'#effcf4',
        color:'#528f6b',
        padding:'5px 10px',
        display:'inline',  
        borderRadius:'20px',
        fontSize:'12px',
        fontWeight:'600',
    }
  return (
    <div style={style}> &#x2022;  Active</div>
  )
}

export default ActiveBadge