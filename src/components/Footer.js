import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div className='bg-dark text-light p-3'>
            <h1 className='text-center'>
                ALL Right Resevered &copy;
            </h1>
            <p className='text-center mt-3 footer'>
                <Link to="/about">About</Link>
                |
                <Link to="/contact">Contact</Link>
                |
                <Link to="/policy">Policy</Link>
            </p>

        </div>
    )
}
