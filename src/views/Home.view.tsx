import Banner from '@/components/Banner/Banner'
import SliderComponent from '@/components/Slider/Slider'
import Subscribe from '@/components/Subscribe/Subscribe'
import TopProducts from '@/components/TopProducts/TopProducts'

export default function Home() {
  return (
    <div className='flex flex-col' >
    <SliderComponent />
    <TopProducts handleOrder={()=>{}} />
    <Banner />
    <Subscribe />
    </div>
  )
}
