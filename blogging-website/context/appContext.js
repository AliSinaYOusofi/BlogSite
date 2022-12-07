import { useContext, createContext, useState} from "react";

export const blogContext = createContext({});

export const Spacex = ({children}) => {
    const [token, setToken] = useState("");

    // for the navbar details
    const setAccessToken = (token) => {setToken(token)}
   

    return (
        <blogContext.Provider value={{
            token, setAccessToken
            }}>
            {children}
        </blogContext.Provider>
    )
};

export const useSpacexProvider = () => useContext(blogContext);