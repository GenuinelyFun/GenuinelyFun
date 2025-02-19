import {useEffect, useState} from "react";

export const TestApi = () => {
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('/api/data')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return <div>{message}</div>;
}