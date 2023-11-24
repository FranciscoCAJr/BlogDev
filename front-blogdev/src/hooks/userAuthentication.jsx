import { db } from '../firebase/config';
import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react'

export const userAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()
    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }
    async function createUser(data){
        checkIfIsCancelled()
        setLoading(true)
        setError(null)
        try{
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)
            return user
        }catch(error){
            console.error(error.message)
            console.table(typeof error.message)
            let systemErrorMessage
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado"
            }else{
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }
    async function loginU(data) {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            setLoading(false);
            return user;
        } catch (error) {
            console.error(error.message);
            let systemErrorMessage;
            if (error.message.includes('There is no user record corresponding to this'))
            {systemErrorMessage = 'email não encontrado';
            } else if (error.message.includes('password is invalid')) {
                systemErrorMessage = 'senha errada';
            } else {systemErrorMessage = 'ocorreu um erro';}
            setLoading(false);
            setError(systemErrorMessage);
        }
    }
    async function logout() {
        checkIfIsCancelled();
        try {
            await signOut(auth);
            setLoading(false);
            setUser(null);
        } catch(error){
            console.error('erro ao fazer logout:', error.message);
            setLoading(false);
            setError('erro ao fazer logout');
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])
    return {
        auth,
        createUser,
        error,
        loading,
        loginU,
        logout
    }
}
