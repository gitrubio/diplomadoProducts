
import { Button } from '@nextui-org/react'
import Slider, { Settings } from 'react-slick'
import { ImagesList } from '@/data/hero'


const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,

}
export default function SliderComponent() {
    return (
        <div className='relative overflow-hidden min-h-[550px] max-h-[560px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/**background pattern*/}
            <div className='h-[600px] w-[600px] bg-[#4F46E5] absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'>
            </div>
            <div className='container pb-8 sm:pb-0'>
                <Slider {...settings}>
                    {ImagesList.map((image,index) => (
                     <div key={image.id}>
                     <div className='grid grid-cols-1 sm:grid-cols-2'>
                         <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                             <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{image.title}</h1>
                             <p className='text-ms'>
                                {image.description}
                             </p>
                             <Button radius='full' size='sm' className='max-w-[100px] bg-gradient-to-r from-[#4F46E5] to-[#6b64e6] transition-all text-white py-2 px-4'>
                                 Order Now
                             </Button>

                         </div>
                         <div className='order-1 sm:order-2'>
                             <div data-aos="zoom-in" data-aos-once="true" className='relative z-10'>
                                 <img src={image.src} alt={"nothing" + index} className='w-[300px] h-[300px] sm:h-[350px] sm:w-[350px] sm:scale-125 object-contain mx-auto' />
                             </div>
                         </div>
                     </div>
                 </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}
