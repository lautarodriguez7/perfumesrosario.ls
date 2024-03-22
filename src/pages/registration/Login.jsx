/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate
    const navigate = useNavigate();

    // User Signup State
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          User Login Function
     *========================================================================**/

    const userLoginFunction = async () => {
        // validation
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(collection(fireDB, "user"), where("uid", "==", users?.user?.uid));
                const data = onSnapshot(q, QuerySnapshot => {
                    let user;
                    QuerySnapshot.forEach(doc => (user = doc.data()));
                    localStorage.setItem("users", JSON.stringify(user));
                    setUserLogin({
                        email: "",
                        password: ""
                    });
                    toast.success("Login Successfully");
                    setLoading(false);
                    if (user.role === "user") {
                        navigate("/user-dashboard");
                    } else {
                        navigate("/admin-dashboard");
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    };
    return (
        <div>
            <Link to={"/"} className="m-2">
                <button className="px-5 py-2 bg-black border text-white opacity-80 hover:bg-gray-400 border-gray-1000 rounded">Volver a la web</button>
            </Link>
            <div className="flex justify-center items-center h-screen">
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-black opacity-80 px-8 py-6 border border-black rounded-xl shadow-md">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className="text-center text-2xl font-bold text-white ">Login</h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userLogin.email}
                            onChange={e => {
                                setUserLogin({
                                    ...userLogin,
                                    email: e.target.value
                                });
                            }}
                            className="bg-gray-100 border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-gray-700"
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="contraseña"
                            value={userLogin.password}
                            onChange={e => {
                                setUserLogin({
                                    ...userLogin,
                                    password: e.target.value
                                });
                            }}
                            className="bg-gray-100 border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-gray-700"
                        />
                    </div>

                    {/* Signup Button  */}
                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={userLoginFunction}
                            className="bg-green-700 hover:bg-green-600 w-full text-white text-center py-2 font-bold rounded-md "
                        >
                            Login
                        </button>
                    </div>
                    <div className="mb-4 flex justify-center">
                        <span className="text-white">
                            No tenes cuenta?{" "}
                            <Link className=" text-red-400" to={"/signup"}>
                                Registrate
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
