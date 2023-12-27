import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';


export default function Layout(props) {
    //console.log(props);
    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content='{description}' />
                <meta name="keywords" content='{keywords}' />
                <meta name="author" content='{author}' />
                <title>{props.title}</title>
            </Helmet>

            <Header />

            <div style={{ minHeight: '73.5vh' }}>
                {props.children}
            </div>

            <Footer />

        </>
    )

}

Layout.defaultProps = {
    title: "Ecommerce App",
    description: ""
}
