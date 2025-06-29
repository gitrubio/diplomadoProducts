import Banner from "@/assets/website/footer-pattern.jpg";
import { Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

export default function Subscribe(){
  return (
    <div
      className="mb-10 sm:mb-20 bg-gray-100 dark:bg-gray-800 text-white "
      style={BannerImg}
    >
      <div className="container backdrop-blur-sm py-8 sm:py-10 px-4">
        <div className="space-y-6 max-w-xl mx-auto text-center">
          <NavLink to="/store">
            <Button 
              className="bg-[#3B6F00] hover:scale-105 active:scale-95 duration-300 text-white py-4 sm:py-6 px-8 sm:px-12 rounded-full text-lg sm:text-xl lg:text-2xl font-bold shadow-2xl hover:shadow-3xl transform transition-all w-full sm:w-auto"
            >
              Ver Catálogo Completo
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}


