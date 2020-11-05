import React, { useContext, useEffect } from 'react'
import Contact from './../contacts/Contacts'
import ContactForm from './../contacts/ContactForm'
import ContactFilter from './../contacts/ContactFilter'
import AuthContext from './../../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext)

    const { loadUser } = authContext

    useEffect(() => {
        loadUser()
    }, [])


    return (
        <div className="grid-2">
            <div>
                {/* Contact Form*/}
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home
