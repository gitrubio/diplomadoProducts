import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { GiftIcon, FireIcon } from '@heroicons/react/16/solid';
import cupongimage10 from '@/assets/images/cuponbeta10.png';
import cupongimage20 from '@/assets/images/cuponbeta20.png';
import cupongimage30 from '@/assets/images/cuponbeta30.png';
import cupongimage40 from '@/assets/images/cuponbeta40.png';
import cupongimage70 from '@/assets/images/70.png';
import React from 'react'
import { getDiscount, setDiscount } from '@/api/products.api';
import { IDiscount } from '@/types/products.type';

  
const Skeleton = ({image} :{image: string}) => (
    <div className="flex flex-1  h-full min-h-[6rem] justify-center rounded-xl bg-transparent">
        <img src={image} className=''/>
    </div>
  );

  const discountCoupons = [
    {
      id: 1,
      title: "10% Off on Innovation Products",
      description: "Get a 10% discount on all innovation-related items.",
      header: <Skeleton image={cupongimage10} />,
      color: "text-pink-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 10, // percentage discount
      className: "border-t border-b border-gray-200",
    },
    {
      id: 2,
      title: "20% Off Digital Products",
      description: "Enjoy a 20% discount on all digital technology products.",
      header: <Skeleton image={cupongimage20} />,
      color: "text-green-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 20, // percentage discount
      className: "border-t border-b border-gray-200",
    },
    {
        id: 3,
      title: "30% Off Design Services",
      description: "Enjoy a 30% discount on all digital technology products.",
      header: <Skeleton image={cupongimage30}/>,
      color: "text-blue-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 30, // percentage discount
      className: "border-t border-b border-gray-200",
    },
    {
        id: 4,
      title: "40% Off Communication Tools",
      description: "Get 40% off on communication tools and services.",
      header: <Skeleton image={cupongimage40}/>,
      color: "text-orange-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 40, // percentage discount
      className: "border-t border-b border-gray-200",
    },
    {
        id: 5,
      title: "70% Off Knowledge Resources",
      description: "Enjoy a massive 70% discount on educational resources.",
      header: <Skeleton image={cupongimage70}/>,
      color: "text-red-500",
      icon: (
        <>
          <GiftIcon className="h-4 w-4" />
          <FireIcon className="h-4 w-4 text-orange-500" />
        </>
      ),
      value: 70, // percentage discount
      className: "md:col-span-2 border-t border-b border-gray-200",
    },
    
  ];
  
export default function Offerts() {

    const [selected, setSelected] = React.useState<IDiscount>(getDiscount());

    const selectDiscount = (id: number,value: number) => {
      if (selected.id === id) {
        setSelected({ id: 0, discount: 0 });
        setDiscount({ id: 0, discount: 0 });
        return
      }
      const discount = {
        id,
        discount: value
      }
        setSelected(discount);
        setDiscount(discount);
    }
  return (
    <div className="bg-white mt-0">
    <div className="mx-auto max-w-2xl px-4 py-6  sm:px-6  lg:max-w-7xl lg:px-8">
    <div className='flex w-full justify-center pb-5'>
    <h2 className="text-2xl  tracking-tight text-gray-900 justify-centers">
      Choose your discount coupon
    </h2>
    </div>
    <BentoGrid className="max-w-4xl mx-auto">
      {discountCoupons.map((item, i) => (
        <BentoGridItem
          key={i}
          id={item.id}
          title={item.title}
          color={item.color}
          description={item.description}
          value={item.value}
          header={item.header}
          icon={item.icon}
          className={item.className}
          selected={selected.id === item.id}
          setSelected={selectDiscount}
        />
      ))}
    </BentoGrid>
    </div>
  </div>
  )
}
