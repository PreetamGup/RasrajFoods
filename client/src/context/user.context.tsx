import {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios';

// Define the types for the context
interface UserContextType {
    user: { fullName: string, role: string,mobile:number, address: string, _id: string, orderHistory:any[] };
    setUser: React.Dispatch<React.SetStateAction<{ fullName:string,  mobile:number, address:string,role: string, _id: string, orderHistory:any[]  }>>;
    cart: any[];
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: any;
    setError: React.Dispatch<React.SetStateAction<any>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    products: any[];
    setProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserDataProps {
    children: ReactNode;
}

const UserData = (props: UserDataProps) => {
    const [cart, setCart] = useState<any[]>([]);
    const [user, setUser] = useState<{fullName: string, role: string, mobile:number, address: string, _id: string, orderHistory:any[] }>({fullName:" ", mobile:0, role: " ", address: " ", _id: " ", orderHistory:[]});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);


    const fetchProducts = async () => {
        if (products.length > 0) return; // Avoid fetching if products are already loaded
        try {
          setLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_SERVER_API_V1}/product/allproducts`);
          setProducts(response.data.products);
        } catch (error:any) {
          console.error("Error fetching products:", error.message);
        } finally {
          setLoading(false);
        }
      };


    useEffect(() => {
        fetchProducts()
       
    },[setProducts]);
    

    useEffect(() => {
        // ...existing code..
        const token = localStorage.getItem('token');
        if(token){
           
            const {user,exp} = jwtDecode<{ user: any ,exp:number}>(token);

            if(Date.now() >= exp * 1000){
                console.error('expired token')
                localStorage.removeItem('token');
                setUser({fullName:" ", mobile:0, role: " ", address: " ", _id: " ", orderHistory:[]});
                setLoggedIn(false);
            }else{
              
                setUser(user);
                setLoggedIn(true);
            }
          
        }
        else{
            setLoggedIn(false);
        }

       
        
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, cart, setCart, loading, setLoading, error, setError, loggedIn, setLoggedIn, products, setProducts }}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserData');
    }
    return context;
}

export default UserData;

