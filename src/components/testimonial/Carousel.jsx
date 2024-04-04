import { Carousel } from "@material-tailwind/react";
import client from "./client";

export function CarouselDefault() {
    return (
        <Carousel className="rounded-xl m-40 mt-0 mb-0">
            {client.map(cli => (
                <div key={cli.id} className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
                    <img src={cli.img} alt="image 2" className="max-h-[500px] max-w-[500px] object-contain" />
                </div>
            ))}
        </Carousel>
    );
}
