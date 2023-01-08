import React from 'react'

const InvitedBadge = () => {
    const style = {
        backgroundColor:'lightgrey',
        color:'#292929',
        padding:'3px 8px',
        display:'inline',
        borderRadius:'20px',
        fontSize:'12px',
        fontWeight:'600'
    }

    
  return (
    <div style={style}> • Invited</div>
  )
}

export default InvitedBadge