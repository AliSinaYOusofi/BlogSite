import { useContext, createContext, useState} from "react";

export const blogContext = createContext({});

export const Spacex = ({children}) => {
    const [token, setToken] = useState("");

    // for the navbar details
    const [dataUsername, setDataUsername] = useState("");
    const [dataProfileUrl, dataSetProfileUrl] = useState(""); 
    const [dataEmail, setDataEmail] = useState("");

    const setAccessToken = (token) => {setToken(token)}
    setLoggedInUserEmail = (email) => setDataEmail(email);

    return (
        <blogContext.Provider value={{setAccessToken, token, setDataEmail}}>
            {children}
        </blogContext.Provider>
    )
};

export const useSpacexProvider = () => useContext(blogContext);