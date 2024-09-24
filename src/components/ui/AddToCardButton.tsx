'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { Button } from '@headlessui/react'

interface AddToCartButtonProps {
  productId: string
  onAddToCart: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, onAddToCart }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await onAddToCart(productId)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000) // Reset after 2 seconds
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={`w-full sm:w-auto ${isAdded ? 'bg-green-500 hover:bg-green-600' : ''} transition-colors duration-300`}
      aria-label="Añadir al carrito"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 animate-spin" />
          Añadiendo...
        </span>
      ) : isAdded ? (
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4" />
          Añadido
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Añadir al carrito
        </span>
      )}
    </Button>
  )
}