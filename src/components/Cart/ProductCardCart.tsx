import { productPrice } from '@/lib/utils';
import { ProductCartInfo } from '@/store/products';
import { IDiscount } from '@/types/products.type';
import { RadioGroup } from '@headlessui/react';
import { Radio } from 'lucide-react';

interface IproductCardCart {
    discount: IDiscount,
	product: ProductCartInfo;
	index: number;
    products: ProductCartInfo[],
	addProduct: (product: ProductCartInfo) => void;
	updateProducts: (product: ProductCartInfo[]) => void;
	removeProduct: (productIndex: number) => void;
}

export default function ProductCardCart({discount, index, product, addProduct, removeProduct, updateProducts, products }: Readonly<IproductCardCart>) {
	function classNames(...classes: any) {
		return classes.filter(Boolean).join(' ');
	}

	const removeAllProduct = (id: string) => {
		const newProducts = products.filter((product) => product.id !== id);
		updateProducts(newProducts);
	};

	return (
		<div className='flex items-start gap-4 py-4'>
			<div className='h-24 sm:h-32 lg:h-36 shrink-0'>
				<img src={product.image} className='w-24 sm:w-32 lg:w-40 h-full object-contain rounded-md' alt='imagen del producto en el cart' />
			</div>

			<div className='flex flex-col sm:flex-row sm:items-start gap-4 w-full'>
				<div className='flex-1 min-w-0'>
					<h3 className='text-base sm:text-lg font-bold text-gray-800 mb-1 truncate'>{product.title}</h3>
					<div className='space-y-1'>
						{product.size && <h6 className='text-xs sm:text-sm text-gray-800'>Talla: {product.size}</h6>}
						<div className='flex flex-row items-center'>
							<h6 className='text-xs sm:text-sm text-gray-800'>Color: </h6>
							<RadioGroup className='flex items-center pl-2 sm:pl-5'>
								<Radio
									values={product?.color ?? ''}
									className={classNames(
										product.color,
										'relative border border-black -m-0.5 w-4 h-4 sm:w-6 sm:h-6 flex cursor-pointer items-center justify-center rounded-full p-0.5 '
									)}
								></Radio>
							</RadioGroup>
						</div>
					</div>

					<div className='mt-3 sm:mt-4 flex flex-wrap gap-4'>
						<button
							onClick={() => removeAllProduct(product.id)}
							type='button'
							className='font-semibold text-red-500 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 shrink-0'
						>
							<svg xmlns='http://www.w3.org/2000/svg' className='w-3 h-3 sm:w-4 sm:h-4 fill-current inline' viewBox='0 0 24 24'>
								<path
									d='M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z'
									data-original='#000000'
								></path>
								<path
									d='M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z'
									data-original='#000000'
								></path>
							</svg>
							Eliminar
						</button>
					</div>
				</div>

				<div className='sm:ml-auto text-right'>
					<div className='flex items-center justify-end gap-2 sm:gap-3'>
						<button
							type='button'
							onClick={() => removeProduct(index)}
							className='flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 bg-blue-600 outline-none rounded-full hover:bg-blue-700 transition-colors'
						>
							<svg xmlns='http://www.w3.org/2000/svg' className='w-2.5 sm:w-2 fill-white' viewBox='0 0 124 124'>
								<path
									d='M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z'
									data-original='#000000'
								></path>
							</svg>
						</button>
						<span className='font-bold text-sm sm:text-sm leading-[18px] min-w-[20px]'>{product.quantity}</span>
						<button
							type='button'
							onClick={() => addProduct(product)}
							className='flex items-center justify-center w-6 h-6 sm:w-5 sm:h-5 bg-blue-600 outline-none rounded-full hover:bg-blue-700 transition-colors'
						>
							<svg xmlns='http://www.w3.org/2000/svg' className='w-2.5 sm:w-2 fill-white' viewBox='0 0 42 42'>
								<path
									d='M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z'
									data-original='#000000'
								></path>
							</svg>
						</button>
					</div>

					<div className='mt-3 sm:mt-4'>
						{discount.discount !== 0 && <h4 className='text-sm sm:text-lg text-gray-500 line-through'>${product.price}</h4>}

						<h4 className='text-base sm:text-lg font-bold text-gray-800'>
							${(+productPrice(product.price, discount) * product.quantity).toFixed(2)}
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
