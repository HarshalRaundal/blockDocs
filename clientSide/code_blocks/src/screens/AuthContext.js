import { createContext ,useState} from "react";


export const GlobalUserContext = createContext({userId :"",loggedIn:false});

export let GlobalUserProvider = (props) => {
    const [globalUser , setGlobalUser] = useState({userId :"",loggedIn:false});
    return (
        <GlobalUserContext.Provider value={[globalUser, setGlobalUser]}>
            {props.children}
        </GlobalUserContext.Provider>
    );
}

