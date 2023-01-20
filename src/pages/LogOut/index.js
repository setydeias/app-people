import { useState } from 'react';

const LogOut = () => {

    useState(()=> {

        localStorage.removeItem('token');
        localStorage.removeItem('document');
        window.location.href ='/';
    }, []) 
    
    return null;
}

export default LogOut;