import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProductCard = ({products}) => {
    const ProductCard = ({ product }) => {
        const { navigate } = useContext(AppContext);
    }
  return product && (
    <div className="border bordeer-gray-500/20 rounded-md md:px-4 px-3 py-2
    bg-white min-w-56 max-w-56 w-full">
      <div  className="group cursor-poiter flex items-center justify-center px-2">
        <img src="" alt=""/>

        </div>
        

    </div>
  )
}

export default ProductCard