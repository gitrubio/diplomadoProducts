import { getDiscount } from "@/api/products.api"
import { productPrice } from "@/lib/utils"
import useAlertStore from "@/store/alerts"
import useProductsCart from "@/store/products"
import { IDiscount } from "@/types/products.type"
import { Radio, RadioGroup } from "@headlessui/react"
import {  useState } from "react"
import { useNavigate } from "react-router-dom"



export default function Cart() {
 
  const navigate = useNavigate()
  const [discount] = useState<IDiscount>(getDiscount())
  const {addAlert} = useAlertStore()
  const {products, addProduct, updateProducts, removeProduct} = useProductsCart()

  function classNames(...classes : any) {
    return classes.filter(Boolean).join(' ')
  }
  const removeAllProduct = (id: string) => {
    const newProducts = products.filter((product) => product.id !== id)
    updateProducts(newProducts)
  }
  const total = products.reduce((acc, product) => acc + (+productPrice(product.price,discount))*product.quantity, 0)

  return (
  <div className="font-sans lg:max-w-7xl m-auto">
      <div className="grid lg:grid-cols-3 gap-10 p-4">
        <div className="lg:col-span-2 bg-white divide-y">
        <div className="lg:col-span-2 max-lg:order-1">

<div className="flex items-start">
  <div className="w-full pb-5">
    <div className="flex items-center w-full">
      <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full">
        <span className="text-sm text-white font-bold">1</span>
      </div>
      <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
    </div>
    <div className="mt-2 mr-4">
      <h6 className="text-sm font-bold text-gray-800">Shipping</h6>
    </div>
  </div>

  <div className="w-full">
    <div className="flex items-center w-full">
      <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full">
        <span className="text-sm text-white font-bold">2</span>
      </div>
      <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
    </div>
    <div className="mt-2 mr-4">
      <h6 className="text-sm font-bold text-gray-300">Billing</h6>
    </div>
  </div>

  <div>
    <div className="flex items-center">
      <div className="w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full">
        <span className="text-sm text-white font-bold">3</span>
      </div>
    </div>
    <div className="mt-2">
      <h6 className="text-sm font-bold text-gray-300">Confirm</h6>
    </div>
  </div>
</div>

</div>
         {products.length === 0 && <h3 className="text-lg font-bold text-gray-800 py-4">No products in the cart</h3>}
         {products.map((product,index) => (
           <div className="flex items-start max-sm:flex-col gap-4 py-4">
           <div className="h-36 shrink-0">
             <img src={product.image} className="w-40 h-full object-contain rounded-md" />
           </div>

           <div className="flex items-start gap-4 w-full">
             <div>
               <h3 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h3>
               <div className="space-y-1">
               {product.size && <h6 className="text-sm text-gray-800">Size: {product.size}</h6>}
                  <div className="flex flex-row items-center">
                 <h6 className="text-sm text-gray-800">Color: </h6>
                 <RadioGroup className="flex items-center pl-5">
                 
                      <Radio
                        value={product.color}
                        className={classNames(
                          product.color,
                          'relative border border-black -m-0.5 w-6 h-6 flex cursor-pointer items-center justify-center rounded-full p-0.5 ',
                        )}
                      >
          
                      </Radio>
                  </RadioGroup> 
                  </div>
               </div>

               <div className="mt-4 flex flex-wrap gap-4">
                 <button onClick={()=>removeAllProduct(product.id)}type="button" className="font-semibold text-red-500 text-sm flex items-center gap-2 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                     <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                     <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                   </svg>
                   Remove
                 </button >
               </div>
             </div>

             <div className="ml-auto text-right">
               <div className="flex items-center justify-end gap-3">
                 <button type="button" onClick={() => removeProduct(index)}
                   className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                     <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                   </svg>
                 </button>
                 <span className="font-bold text-sm leading-[18px]">{product.quantity}</span>
                 <button type="button" onClick={() => addProduct(product)}
                   className="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                     <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                   </svg>
                 </button>
               </div>

               <div className="mt-4">
                
                 {discount.discount !== 0 && <h4 className="text-lg text-gray-500 line-through">${product.price}</h4>}
                  
                 <h4 className="text-lg font-bold text-gray-800">{(+productPrice(product.price,discount)*product.quantity).toFixed(2)}</h4>
               </div>
             </div>
           </div>
         </div>

         ))}
        
        </div>

        <div className="shadow-md p-6 lg:sticky lg:top-0 h-max">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-4">Order Summary</h3>

          <ul className="text-gray-800 divide-y mt-4">
            <li className="flex flex-wrap gap-4 text-sm py-3">Subtotal <span className="ml-auto font-bold">${total.toFixed(2)}</span></li>
            <li className="flex flex-wrap gap-4 text-sm py-3">Shipping <span className="ml-auto font-bold">$5.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm py-3">Tax <span className="ml-auto font-bold">$4.00</span></li>
            <li className="flex flex-wrap gap-4 text-sm py-3 font-bold">Total <span className="ml-auto">${(total + 5.00 + 4.00).toFixed(2)}</span></li>
          </ul>

          <button type="button" onClick={()=> {
            if(products.length === 0){
              addAlert('No products in the cart','info')
            }else{
              navigate("/checkout")
            }
          }} className="mt-4 text-sm px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md">Make Payment</button>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Apply promo code</h3>

            <div className="flex border border-blue-600 overflow-hidden max-w-md rounded-md">
              <input type="email" placeholder="Promo code"
                className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
              <button type='button' className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-5 text-sm text-white">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
