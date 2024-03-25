import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter(obj => obj.category.includes(categoryname));

    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const addCart = item => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Agregado al carrito");
    };

    const deleteCart = item => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart");
    };

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);
    return (
        <Layout>
            <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>

                {/* main  */}
                {loading ? (
                    <>
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    </>
                ) : (
                    <>
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-5 mx-auto ">
                                <div className="flex flex-wrap -m-4  justify-center">
                                    {filterProduct.length > 0 ? (
                                        <>
                                            {filterProduct.map((item, index) => {
                                                const { id, title, price, productImageUrl } = item;
                                                return (
                                                    <div key={index} className="m-1 w-full md:w-1/4">
                                                        <div className="flex flex-col justify-between h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                            <img
                                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                                className="max-h-60 w-auto"
                                                                src={productImageUrl}
                                                                alt="blog"
                                                            />
                                                            <div className="p-2">
                                                                <span className="tracking-widest text-xs title-font font-bold text-black mb-2">
                                                                    PERFUMESROSARIO.LS
                                                                </span>
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
                                        </>
                                    ) : (
                                        <div className="w-full">
                                            <div className="flex justify-start">
                                                <Link to={"/"}>
                                                    <button className="px-5 py-2 bg-black border text-white opacity-80 hover:bg-gray-400 border-gray-1000 rounded">
                                                        Volver a la web
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="flex justify-center">
                                                <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                            </div>
                                            <h1 className=" text-black text-xl">No hay productos en {categoryname}! </h1>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
