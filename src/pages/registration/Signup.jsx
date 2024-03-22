/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate
    const navigate = useNavigate();

    // User Signup State
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function
     *========================================================================**/

    const userSignupFunction = async () => {
        // validation
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric"
                })
            };

            // create user Refrence
            const userRefrence = collection(fireDB, "user");

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate("/login");
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                        <h2 className="text-center text-2xl font-bold text-white">Registrate</h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={userSignup.name}
                            onChange={e => {
                                setUserSignup({
                                    ...userSignup,
                                    name: e.target.value
                                });
                            }}
                            className="bg-gray-100 border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600"
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={userSignup.email}
                            onChange={e => {
                                setUserSignup({
                                    ...userSignup,
                                    email: e.target.value
                                });
                            }}
                            className="bg-gray-100 border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600"
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={userSignup.password}
                            onChange={e => {
                                setUserSignup({
                                    ...userSignup,
                                    password: e.target.value
                                });
                            }}
                            className="bg-gray-100 border border-black px-2 py-2 w-96 rounded-md outline-none placeholder-gray-600"
                        />
                    </div>

                    {/* Signup Button  */}
                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={userSignupFunction}
                            className="bg-green-600 hover:bg-green-500 w-full text-white text-center py-2 font-bold rounded-md "
                        >
                            Registrate
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <h2 className="text-white">
                            Entra con tu cuenta{" "}
                            <Link className="text-red-700 " to={"/login"}>
                                Login
                            </Link>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
