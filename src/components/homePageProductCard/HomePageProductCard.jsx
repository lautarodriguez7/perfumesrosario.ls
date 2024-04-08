import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const { loading, getAllProduct } = context;

    const cartItems = useSelector(state => state.cart);

    // console.log(cartItems);

    const dispatch = useDispatch();

    // Agregar al carrito function
    const addCart = item => {
        dispatch(addToCart(item));
        toast.success("Agregado al carrito!");
    };

    // Eliminar del carrito function
    const deleteCart = item => {
        dispatch(deleteFromCart(item));
        toast.error("Eliminado del carrito!");
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">Los perfumes mas vendidos</h1>
            </div>

            {/* main 1 */}
            <section className="text-gray-600 body-font">
                {/* main 2 */}
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex justify-center">{loading && <Loader />}</div>
                    {/* main 3  */}
                    <div className="flex flex-wrap m-4 justify-center">
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, productImageUrl } = item;
                            return (
                                <div key={index} className="m-1 w-full md:w-1/4">
                                    <div className="flex flex-col justify-between h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <div className="flex justify-center">
                                            <img onClick={() => navigate(`/productinfo/${id}`)} className="max-h-60 w-3/6" src={productImageUrl} alt="blog" />
                                        </div>
                                        <div className="p-2">
                                            <span className="tracking-widest text-xs title-font font-bold text-black mb-2">PERFUMESROSARIO.LS</span>
                                            <hr />
                                            <span className="title-font text-m font-medium text-gray-900">{title.substring(0, 25)}</span>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-1">
                                                <b>${price}</b>
                                            </h1>

                                            <div className="flex justify-center ">
                                                {cartItems.some(p => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className=" bg-red-700 hover:bg-gray-500 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Eliminar del carrito
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className=" bg-green-400 hover:bg-gray-400 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Agregar al carrito
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
