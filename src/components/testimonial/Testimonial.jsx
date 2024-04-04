import { CarouselDefault } from "./Carousel";

/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h2 className=" text-center text-2xl font-semibold mb-10">
                        Algunos de nuestros <span className=" text-pink-500">clientes</span>
                    </h2>
                    <div className="flex justify-center ">
                        <CarouselDefault />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
