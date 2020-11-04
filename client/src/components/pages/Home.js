import React from 'react'
import Contact from './../contacts/Contacts'
import ContactForm from './../contacts/ContactForm'
import ContactFilter from './../contacts/ContactFilter'

const Home = () => {
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
