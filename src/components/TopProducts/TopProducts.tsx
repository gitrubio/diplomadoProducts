import { ProductsDataTop } from "@/data/products";
import { ThreeDCardDemo } from "@/components/Card-3d/Card3D";


const TopProducts = ({ handleOrder }: {handleOrder: ()=> void }) => {
  return (
    <div>
      <div  className="container">
        {/* Header section */}
        <div className="text-center mb-24">
          <p data-aos="fade-up" className="text-ms text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-ms text-gray-950">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div data-aos="fade-up"  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductsDataTop.map((product) => (
           <ThreeDCardDemo  key={product.id} Product={product} handleOrder={handleOrder}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
