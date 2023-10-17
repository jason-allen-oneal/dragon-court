import { createContext, useContext, useState, PropsWithChildren } from 'react';
import {apiCall} from "@/lib/game";

type UserType = {
  id: number;
  name: string;
  email: string;
  firstRun: boolean;
  chat: string;
};

type userContextType = {
  user: UserType;
  setUser: (u: UserType) => void;
  setUserData: (k: string, v: string | boolean) => void;
};

const userContextDefault: userContextType = {
  user: {
    id: 0,
    name: "",
    email: "",
    firstRun: true,
    chat: "global"
  },
  setUser: (u: UserType) => {},
  setUserData: (k: string, v: string | boolean) => {},
};

export const UserContext = createContext(userContextDefault);

export function UserProvider(props: PropsWithChildren) {
  const [user, setUser] = useState(userContextDefault.user);
  
  const setUserData = async (key: string, value: string | boolean) => {
    const u = user;
    u[key] = value;
    setUser(u);
    await userUpdate();
  };
  
  const userUpdate = async () => {
    const response = await apiCall("user/update", { user });

    if (response.status == "ok") {
      return response;
    } else {
      console.log("error", JSON.stringify(response.result));
      return false;
    }
  };
  
  return (
    <UserContext.Provider value={{ user, setUser, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}