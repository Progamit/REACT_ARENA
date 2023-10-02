import {useState} from "react";


const [username, setUsername] = useState("andrius")

const data = {
    username: username,
    updateUser: () => {
        setUsername("petraszzz")
    }
}

export {data}