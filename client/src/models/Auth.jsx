import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Auth = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("babar3@gmail.com"); // Default to existing user
    const [password, setPassword] = useState("123456"); // Default password
    const { setShowUserLogin, setuser, axios, navigate, checkUserAuth} = useContext(AppContext);

    const submitHandler = async (e) => {
        try{
            e.preventDefault();  
            const {data} = await axios.post(`/api/user/${state}` , {
                name,
                email,
                password,
            });
            if(data.success){
                toast.success(data.message);
                setuser(data.user);
                setShowUserLogin(false);
                
                // Refresh user authentication status
                if (checkUserAuth) {
                    checkUserAuth();
                }
                
                // Clear form
                setName("");
                setEmail("");
                setPassword("");
                
                navigate("/");
            }else{
                toast.error(data.message);
            }
        } catch (error){
            console.error("Auth error:", error);
            if (error.response) {
                const errorMessage = error.response.data?.message;
                if (errorMessage === "User does not exist" && state === "login") {
                    toast.error("User not found. Please register first or use existing demo credentials.");
                } else {
                    toast.error(errorMessage || `Error: ${error.response.status}`);
                }
            } else if (error.request) {
                toast.error("Network error. Please check if the backend server is running.");
            } else {
                toast.error(error.message || "An unexpected error occurred");
            }
        }
    };

    return (
        <div onClick={() => setShowUserLogin(false)}
        className="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-black/50 text-gray-600">
            <form onClick={(e) => e.stopPropagation()}
            onSubmit={submitHandler}
            className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            
            {state === "login" && (
                <div className="text-sm text-gray-500 text-center w-full">
                    <p>Demo Credentials:</p>
                    <p>Email: babar3@gmail.com</p>
                    <p>Password: 123456</p>
                </div>
            )}
            
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
        </div>
    );
};

export default Auth;