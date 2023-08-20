import React, {useState} from 'react'
import {HiOutlineMenuAlt4} from 'react-icons/hi'
import {FaRegTimesCircle} from 'react-icons/fa'
import {Link} from "react-router-dom";

const Logout = () => {

    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    return (
        <div className='navbar'>

        </div>
    )
}

export default Logout