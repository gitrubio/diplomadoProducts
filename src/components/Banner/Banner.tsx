import BannerImg from "@/assets/women/pieza muestra.gif";
import { FaShieldAlt, FaClock, FaPalette, FaCreditCard } from "react-icons/fa";
import { Image } from "@nextui-org/react";

export default function Banner(){
  return (
    <div data-aos="fade-up"  className="min-h-[500px] sm:min-h-[550px] text-[#3B6F00] flex justify-center items-center py-8 sm:py-12 lg:py-0 px-4">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* image section */}
          <div className="flex justify-center order-1 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                isZoomed
                isBlurred
                src={BannerImg}
                alt=""
                className="max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] h-[250px] sm:h-[300px] lg:h-[350px] w-full mx-auto object-cover" 
              />
            </div>
          </div>

          {/* text details section */}
          <div className="flex flex-col justify-center gap-4 sm:gap-6 lg:pt-0 order-2 lg:order-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
              Aquí tus ideas se hacen realidad.
              </h1>
            <p className="text-sm sm:text-base tracking-wide leading-5 text-center lg:text-left">
              Transformamos tus ideas en objetos reales, impresos con precisión y detalle.
              Damos forma a proyectos únicos, funcionales o decorativos.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div  className="flex items-center gap-3 sm:gap-4">
                <FaShieldAlt className="text-2xl sm:text-3xl lg:text-4xl h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 shadow-sm p-2 sm:p-3 lg:p-4 rounded-full bg-violet-100 dark:bg-violet-400 flex-shrink-0" />
                <p className="text-sm sm:text-base">Calidad Profesional Garantizada</p>
              </div>
              <div  className="flex items-center gap-3 sm:gap-4">
                <FaClock className="text-2xl sm:text-3xl lg:text-4xl h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 shadow-sm p-2 sm:p-3 lg:p-4 rounded-full bg-orange-100 dark:bg-orange-400 flex-shrink-0" />
                <p className="text-sm sm:text-base"> Tiempos de Producción Realistas</p>
              </div>
              <div  className="flex items-center gap-3 sm:gap-4">
                <FaPalette className="text-2xl sm:text-3xl lg:text-4xl h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 shadow-sm p-2 sm:p-3 lg:p-4 rounded-full bg-green-100 dark:bg-green-400 flex-shrink-0" />
                <p className="text-sm sm:text-base">Diseños Personalizados</p>
              </div>
              <div  className="flex items-center gap-3 sm:gap-4">
                <FaCreditCard className="text-2xl sm:text-3xl lg:text-4xl h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 shadow-sm p-2 sm:p-3 lg:p-4 rounded-full bg-yellow-100 dark:bg-yellow-400 flex-shrink-0" />
                <p className="text-sm sm:text-base">Pagos Cómodos y Seguros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
