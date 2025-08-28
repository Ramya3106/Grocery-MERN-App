import { useContext } from "react"
import { AppContext } from "../context/AppContext"
const BestSeller = () => {
    const { Products } = useContext(AppContext);
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
        <div>
            {

            }
        </div>
    </div>
  )
}

export default BestSeller