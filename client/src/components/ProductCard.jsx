import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const ProductCard = ({product}) => {
  const { navigate } = useContext(AppContext);
    
  return (
    product && (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2
    bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2 h-32 md:h-40">
        <img 
          src={product.image?.[0] || '/placeholder-image.jpg'} 
          alt={product.name || 'Product'} 
          className="group-hover:scale-105 transition-transform duration-200 max-w-24 md:max-w-36 max-h-full object-contain"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
        </div>
        <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium textlg truncate w-full">{product.name}</p>
        <div className="flex items-center gap-0.5">
          {
            Array(5).fill('').map((_,i)=>(
              <img src={i<4?assets.star_icon:assets.star_dull_icon} alt=""/>
            ))
          }
        </div>
        <div>
          
        </div>
        </div>
        

    </div>
  )
)
}

export default ProductCard