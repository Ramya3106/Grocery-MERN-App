import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import Product from "../Pages/Product";
const BestSeller = () => {
    const { Products } = useContext(AppContext);
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
        <div>
            {
            Products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>())
            }
        </div>
    </div>
  )
}

export default BestSeller