import { useContext, createContext, useState} from "react";

export const blogContext = createContext({});

export const Spacex = ({children}) => {
    const [token, setToken] = useState("");
    const [refresh, setRefresh] = useState(""); // love this solution for running useEffect() when there is
    // a new comment posted
    // for the navbar details
    const setAccessToken = (token) => {setToken(token)}
    
    // when a user views another user homepage then for that data we need the follwing

    const [viewUserData, setViewDataUser] = useState({});

    return (
        <blogContext.Provider value={{
            token, setAccessToken, 
            refresh, setRefresh,
            viewUserData, setViewDataUser
            }}>
            {children}
        </blogContext.Provider>
    )
};

export const useSpacexProvider = () => useContext(blogContext);