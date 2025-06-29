import { ProductsDataTop } from "@/data/products";
import { ThreeDCardDemo } from "@/components/Card-3d/Card3D";


const TopProducts = ({ handleOrder }: {handleOrder: ()=> void }) => {
  return (
    <div>
      <div  className="container min-h-[700px] md:h-[700px] back-products px-4">
        {/* Header section */}
        <div className="text-center py-8 space-y-4">
          <h1 
            data-aos="fade-up"
            className="text-4xl font-bold tracking-tight text-[#F5F5DC] sm:text-5xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
          >
            Productos Destacados
          </h1>
          {/* <p 
            data-aos="fade-up" 
            className="mx-auto max-w-2xl text-lg leading-8 text-[#F5F5DC] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
          >
            Descubre nuestra selección exclusiva de productos más vendidos, 
            cuidadosamente elegidos para ti.
          </p> */}
         {/*  <div 
            className="w-24 h-1 bg-blue-600 mx-auto rounded-full"
            data-aos="fade-up"
            data-aos-delay="200"
          /> */}
        </div>
        {/* Body section */}
        <div data-aos="fade-up"  className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsDataTop.map((product) => (
           <ThreeDCardDemo  key={product.id} Product={product} handleOrder={handleOrder}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
