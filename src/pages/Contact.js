import React from 'react'
import Layout from '../components/Layout'

export default function Contact() {
    return (
        <Layout title='Contact Us'>

            <div className='contact-wrapper'>

                <div className='col-md-6'>
                    <img src='logo192.png' alt='contact us' style={{ 'width': '100%' }} />
                </div>

                <div className='contact-nested-flex'>

                    <p className="m-auto">Contact Us!!</p>
                    <p>📧 :Mail!!</p>
                    <p>📱 :Call!!</p>
                    <p>🎧 :Toll free</p>

                </div>
            </div>

        </Layout>
    )
}