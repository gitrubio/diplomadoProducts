import { CardBody, CardContainer, CardItem } from "./Card"
import { Button, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

interface ProductPros {
  id: number;
  title: string;
  description: string;
  img: string;

}

export function ThreeDCardDemo({ Product, handleOrder }: { Product: ProductPros, handleOrder: ()=>void}) {
  return (
    <CardContainer className="inter-var rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]">
      <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border ">
        <CardItem translateZ="100" className="w-full pb-0 h-[100px]">
          <Image
            src={Product.img}
            height="1000"
            width="1000"
            className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
            alt="shirts"
          />
        </CardItem>
        <CardItem translateZ="50" className="w-full pt-0">
          <div className="p-4 text-center">

            <div className="w-full flex items-center justify-center gap-1">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
            <h1 className="text-xl font-bold group-hover:text-white duration-10">{Product.title}</h1>
            <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
              {Product.description}
            </p>
          </div>
        </CardItem>
        <div className="flex items-center mt-0 justify-center">
          <CardItem
            translateZ={20}
            className=""
          >
            <Button
              className="bg-[#4F46E5] hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-[#4F46E5]"
              onClick={handleOrder}
            >
              Order Now
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

