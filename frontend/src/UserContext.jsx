import axios from "axios";
import {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  console.log("UserContext", user);
  const [ready,setReady] = useState(false);
  const [isLoading,setIsloading] = useState(true);
  // useEffect(() => {
  //   if (!user) {
  //     axios.get('/profile').then(({data}) => {
  //       setUser(data);
  //       setIsloading(false);
  //     });
  //   }
  // }, []);
  return (
    <UserContext.Provider value={{user,setUser, isLoading}}>
      {children}
    </UserContext.Provider>
  );
}