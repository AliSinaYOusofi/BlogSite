import { useContext, createContext, Children} from "react";
import InitialState from "./InitialState";

export const blogContext = createContext(InitialState);

export const Spacex = () => {


    return (
        <blogContext.Provider>
            {Children}
        </blogContext.Provider>
    )
}