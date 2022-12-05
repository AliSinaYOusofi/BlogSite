import { useContext, createContext, useState} from "react";

export const blogContext = createContext({});

export const Spacex = ({children}) => {
    const [token, setToken] = useState("");

    // for the navbar details
    const [dataUsername, setDataUsername] = useState("");
    const [dataProfileUrl, setDataSetProfileUrl] = useState(""); 
    const [dataEmail, setDataEmail] = useState("");
    const [dataBio, setDataBio] = useState("");
    const [dataTitle, setDataTitle] = useState("");

    const setAccessToken = (token) => {setToken(token)}
    const setLoggedInUserEmail = (email) => setDataEmail(email);

    return (
        <blogContext.Provider value={{
            setAccessToken, token, setDataEmail, dataEmail,
            setDataUsername, dataUsername, setDataSetProfileUrl, dataProfileUrl,
            setDataBio, dataBio, setDataTitle, dataTitle,
            }}>
            {children}
        </blogContext.Provider>
    )
};

export const useSpacexProvider = () => useContext(blogContext);