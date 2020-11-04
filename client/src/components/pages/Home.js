import React from 'react'
import Contact from './../contacts/Contacts'
import ContactForm from './../contacts/ContactForm'
import ContactFilter from './../contacts/ContactFilter'

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                {/* Contact Form*/}
                <ContactFilter />
                <ContactForm />
            </div>
            <div>
                <Contact />
            </div>
        </div>
    )
}

export default Home
