import { account } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthContext = createContext();

const AuthProvider =({children}) => {
    const [loading, setloading] = useState(true);
    const [session, setSession] = useState(false); // if it is true then we go to home page other wise we will go to the signin page
    const [user, setUser] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
       checkAuth() 
    }

    const checkAuth = async () =>{
        try{
            const responseSession = await account.getSession("current");
            setSession(responseSession)
            const responseUser = await account.get()
            setUser(responseUser);
        }catch(error){
            console.log(error)
        }
        setloading(false);
    }

    const signin = async ({email, password}) => {
        setloading(true)
        try{
            // await account.deleteSession('current');
            const responseSession = await account.createEmailPasswordSession(email, password);
            setSession(responseSession)
            const responseUser = await account.get()
            setUser(responseUser)
        }catch(error){
            console.log(error)
        }
        setloading(false);
    };

    const signout = async () => {
        setloading(true)
        account.deleteSession('current')
        setSession(null)
        setUser(null)
        setloading(false)
    };

    const contextData = {session, user, signin, signout};
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? (
                <SafeAreaView>
                    <Text>loading ...</Text>
                </SafeAreaView>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };

