import { createContext, useState, useEffect, useContext } from "react";
import api from "@/api/axios";
import { setAuthFailureHandler } from "@/api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkAuth(){
        try{
            const verify = await api.post('/verify');
            setUser(verify.data.data);
        }catch(error){
            console.log(error);
            try{
                await api.post('/newAccessToken');
                const user = await api.post('/verify');
                setUser(user.data.data);
            }catch(error){
                console.log(error);
                setUser(null);
            }
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        setAuthFailureHandler(() => setUser(null)); //To setUser(null) on failure of api interceptor.
    }, []);

    return(
        <AuthContext.Provider value={{ user, loading }}>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}