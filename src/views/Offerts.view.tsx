import { BentoGrid, BentoGridItem } from '@/components/ui/bentoGrid'
import { GiftIcon, FireIcon } from '@heroicons/react/16/solid';
import React from 'react'

  
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">

    </div>
  );

  const discountCoupons = [
    {
      id: 1,
      title: "10% Off on Innovation Products",
      description: "Get a 10% discount on all innovation-related items.",
      header: <Skeleton />,
      color: "text-pink-400",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 10, // percentage discount
      className: "",
    },
    {
      id: 2,
      title: "20% Off Digital Products",
      description: "Enjoy a 20% discount on all digital technology products.",
      header: <Skeleton />,
      color: "text-green-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 20, // percentage discount
      className: "",
    },
    {
        id: 3,
      title: "30% Off Design Services",
      description: "Save 30% on design and aesthetic services.",
      header: <Skeleton />,
      color: "text-blue-500",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 30, // percentage discount
      className: "",
    },
    {
        id: 4,
      title: "40% Off Communication Tools",
      description: "Get 40% off on communication tools and services.",
      header: <Skeleton />,
      color: "text-orange-300",
      icon: <GiftIcon className="h-4 w-4 " />,
      value: 40, // percentage discount
      className: "",
    },
    {
        id: 5,
      title: "70% Off Knowledge Resources",
      description: "Enjoy a massive 70% discount on educational resources.",
      header: <Skeleton />,
      color: "text-red-500",
      icon: (
        <>
          <FireIcon className="h-4 w-4 text-orange-500" />
          <GiftIcon className="h-4 w-4" />
        </>
      ),
      value: 70, // percentage discount
      className: "md:col-span-2",
    },
  ];
  
export default function Offerts() {

    const [selected, setSelected] = React.useState(0);

  return (
    <div className="bg-white mt-0">
    <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
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
          selected={selected === item.id}
          setSelected={setSelected}
        />
      ))}
    </BentoGrid>
    </div>
  </div>
  )
}
