import { getDiscount } from '@/api/products.api';
import { productPrice } from '@/lib/utils';
import useAlertStore from '@/store/alerts';
import useProductsCart from '@/store/products';
import { IDiscount } from '@/types/products.type';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCardCart from './ProductCardCart';
import ProductNotFound from '@/components/ui/ProductNotFound';

export default function Cart() {
	const navigate = useNavigate();
	const [discount] = useState<IDiscount>(getDiscount());
	const { addAlert } = useAlertStore();
	const { products, addProduct, updateProducts, removeProduct } = useProductsCart();


	const total = products.reduce((acc, product) => acc + +productPrice(product.price, discount) * product.quantity, 0);

	return (
		<div className='font-sans lg:max-w-7xl m-auto'>
			<div className='grid lg:grid-cols-3 gap-10 p-4'>
				<div className='lg:col-span-2 bg-white divide-y'>
					<div className='lg:col-span-2 max-lg:order-1'>
						<div className='flex items-start'>
							<div className='w-full pb-5'>
								<div className='flex items-center w-full'>
									<div className='w-8 h-8 shrink-0 mx-[-1px] bg-gray-800 p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-sm text-white font-bold'>1</span>
									</div>
									<div className='w-full h-[3px] mx-4 rounded-lg bg-gray-300'></div>
								</div>
								<div className='mt-2 mr-4'>
									<h6 className='text-sm font-bold text-gray-800'>Envío</h6>
								</div>
							</div>

							<div className='w-full'>
								<div className='flex items-center w-full'>
									<div className='w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-sm text-white font-bold'>2</span>
									</div>
									<div className='w-full h-[3px] mx-4 rounded-lg bg-gray-300'></div>
								</div>
								<div className='mt-2 mr-4'>
									<h6 className='text-sm font-bold text-gray-300'>Facturación</h6>
								</div>
							</div>

							<div>
								<div className='flex items-center'>
									<div className='w-8 h-8 shrink-0 mx-[-1px] bg-gray-200 p-1.5 flex items-center justify-center rounded-full'>
										<span className='text-sm text-white font-bold'>3</span>
									</div>
								</div>
								<div className='mt-2'>
									<h6 className='text-sm font-bold text-gray-300'>Confirmar</h6>
								</div>
							</div>
						</div>
					</div>
					{products.length === 0 && <ProductNotFound text='El Carrito esta vacio' />}
					{products.map((product, index) => (
						<ProductCardCart
							key={index + '_product_id'}
							index={index}
							product={product}
							discount={discount}
							addProduct={addProduct}
							removeProduct={removeProduct}
							updateProducts={updateProducts}
							products={products}
						/>
					))}
				</div>

				<div className='shadow-md p-6 lg:sticky lg:top-0 h-max'>
					<h3 className='text-lg font-bold text-gray-800 border-b pb-4'>Resumen del Pedido</h3>

					<ul className='text-gray-800 divide-y mt-4'>
						<li className='flex flex-wrap gap-4 text-sm py-3'>
							Subtotal <span className='ml-auto font-bold'>${total.toFixed(2)}</span>
						</li>
						<li className='flex flex-wrap gap-4 text-sm py-3'>
							Envío <span className='ml-auto font-bold'>$5.00</span>
						</li>
						{/* <li className='flex flex-wrap gap-4 text-sm py-3'>
							Impuesto <span className='ml-auto font-bold'>$4.00</span>
						</li> */}
						<li className='flex flex-wrap gap-4 text-sm py-3 font-bold'>
							Total <span className='ml-auto'>${(total + 5.0 ).toFixed(2)}</span>
						</li>
					</ul>

					<button
						type='button'
						onClick={() => {
							if (products.length === 0) {
								addAlert('No hay productos en el carrito', 'info');
							} else {
								navigate('/checkout');
							}
						}}
						className='mt-4 text-sm px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md'
					>
						Hacer Pedido
					</button>

					<div className='mt-8'>
						<h3 className='text-lg font-bold text-gray-800 mb-4'>Aplicar código promocional</h3>

						<div className='flex border border-blue-600 overflow-hidden max-w-md rounded-md'>
							<input
								type='email'
								placeholder='Código promocional'
								className='w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5'
							/>
							<button type='button' className='flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-5 text-sm text-white'>
								Aplicar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
