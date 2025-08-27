import { categories } from "../assets/assets"

const Category = () => {
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Category</p>
        <div className="my-6 grid grid-cols-2 ,d:grid-cols-3 lg:grid-cols-5 gap-3 items-center justify-center">
            {
                categories.map((category,index)=>(
                    <div key={index} className={`group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center`}>
                        <img src={category.image} alt="" className="max-w-28 transition group-hover:scale-110" />
                        <p className="text-sm font-medium">{category.text}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Category