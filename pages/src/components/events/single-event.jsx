import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SingleEvent = ({ data }) => {
    const inputEmail = useRef();
    const router = useRouter();
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const emailValue = inputEmail.current.value;
        const eventId = router.query.id;

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage('Please introduce a correct email address');
    }
        
        try {
            const response = await fetch('/api/email-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: emailValue, eventId})

            })
            if (!response.ok) throw new Error(`Error: ${error.status}`)
            const data = await response.json();
            setMessage(data.message);
            inputEmail.current.value = ''
        } catch (error) {
            
        }
    }
    return (
        <div className="event_single_page">
            <Image src={data.image} width={1000} height={400} alt={data.title} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <form onSubmit={onSubmit} className="email_registration">
                <label> Get Registered for this event!</label>
                <input
                    ref={inputEmail}
                    type="email"
                    id="email"
                    placeholder="Please insert your email here"
                />
                <button type="submit"> Submit</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default SingleEvent;