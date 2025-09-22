import { createContext, useContext, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthContext = createContext();

const AuthProvider =({children}) => {
    const [loading, setloading] = useState(false);
    const [session, setSession] = useState(false); // if it is true then we go to home page other wise we will go to the signin page
    const [user, setUser] = useState(false);

    const signin = async () => {}
    const signout = async () => {}

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

