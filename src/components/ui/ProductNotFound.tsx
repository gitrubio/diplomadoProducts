import { PackageX } from "lucide-react";


export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
      <PackageX className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">No se encontraron productos</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Lo sentimos, no pudimos encontrar ningún producto que coincida con tu búsqueda. Por favor, intenta con otros términos o categorías.
      </p>
   
    </div>
  )
}
