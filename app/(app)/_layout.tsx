import { useAuth } from '@/context/AuthContext';
import { Redirect, Slot } from 'expo-router';


export default function AppLayout(){
    console.log("hello",useAuth());
    const session = useAuth()
    console.log(session);
    return (!session.session)?<Redirect href="/singin"/> : <Slot/>
}