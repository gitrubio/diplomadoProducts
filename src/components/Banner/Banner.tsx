import BannerImg from "@/assets/women/pieza muestra.gif";
import { FaShieldAlt, FaClock, FaPalette, FaCreditCard } from "react-icons/fa";
import { Image } from "@nextui-org/react";

export default function Banner(){
  return (
    <div data-aos="fade-up"  className="min-h-[550px] text-[#3B6F00] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* image section */}
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                isZoomed
                isBlurred
                src={BannerImg}
                alt=""
                className="max-w-[400px] h-[350px] w-full mx-auto object-cover" 
              />
            </div>
          </div>

          {/* text details section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0 ">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Aquí tus ideas se hacen realidad.
              </h1>
            <p className="text-sm  tracking-wide leading-5">
              Transformamos tus ideas en objetos reales, impresos con precisión y detalle.
              Damos forma a proyectos únicos, funcionales o decorativos.
            </p>
            <div className="flex flex-col gap-4">
              <div  className="flex items-center gap-4">
                <FaShieldAlt className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                <p>Calidad Profesional Garantizada</p>
              </div>
              <div  className="flex items-center gap-4">
                <FaClock className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                <p> Tiempos de Producción Realistas</p>
              </div>
              <div  className="flex items-center gap-4">
                <FaPalette className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p>Diseños Personalizados</p>
              </div>
              <div  className="flex items-center gap-4">
                <FaCreditCard className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                <p>Pagos Cómodos y Seguros</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
