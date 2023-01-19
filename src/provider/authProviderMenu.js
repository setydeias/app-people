import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProviderMenu = (props) => {
    
    const [menuShow, setMenuShow ] = useState(true)

    return(
        <AuthContext.Provider value={{ menuShow, setMenuShow }}> 
            { props.children }
        </AuthContext.Provider>
    );
}; 