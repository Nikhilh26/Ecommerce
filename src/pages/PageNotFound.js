import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <Layout title='404 Error'>
            <div className='pnf'>

                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>NOT FOUND!!</h2>
                {/* CREATE A GO BACK BUTTON */}
                {/* <button className='pnf-btn'>
                </button> */}
                <Link to="/" >
                    Go Back
                </Link>

            </div>
        </Layout>
    )
}
