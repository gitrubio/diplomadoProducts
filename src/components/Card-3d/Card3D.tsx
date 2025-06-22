import { CardBody, CardContainer, CardItem } from "./Card"
import { Button, Image } from "@nextui-org/react";
import { FaStar } from "react-icons/fa";

interface ProductPros {
  id: number;
  title: string;
  description: string;
  img: string;
  customClass?: string;

}

export function ThreeDCardDemo({ Product, handleOrder }: { Product: ProductPros, handleOrder: ()=>void}) {
  return (
    <CardContainer className="inter-var rounded-2xl bg-black/20 backdrop-blur-sm dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[400px]">
      <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border ">
        <CardItem translateZ="100" className="w-full pb-0 h-[160px]">
          <Image
            src={Product.img}
            height="500"
            width="500"
            className={`max-w-[200px] ${Product.customClass} block mx-auto  transform  group-hover:scale-105 duration-300 drop-shadow-md`}
            alt="productos"
          />
        </CardItem>
        <CardItem translateZ="50" className="w-full pt-4">
          <div className="p-4 text-center">

            <div className="w-full flex items-center justify-center gap-1 mb-2">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
            <h1 className="text-xl font-bold text-white duration-10 mb-2">{Product.title}</h1>
            <p className="text-gray-500 text-white duration-300 text-sm line-clamp-2">
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
              className="bg-[#3B6F00] hover:scale-105 duration-300 text-white  py-1 px-4 rounded-full mt-4 "
              onClick={handleOrder}
            >
              Comprar
            </Button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

