import { useContext, createContext, useState} from "react";

export const blogContext = createContext({});

export const Spacex = ({children}) => {
    const [token, setToken] = useState("");

    const setAccessToken = (token) => {setToken(token)}
    return (
        <blogContext.Provider value={{setAccessToken, token}}>
            {children}
        </blogContext.Provider>
    )
};

export const useSpacexProvider = () => useContext(blogContext);