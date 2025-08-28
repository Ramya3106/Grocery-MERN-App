import { categories } from "../assets/assets"

const Category = () => {
        return (
            <div className="mt-16">
                <p className="text-2xl font-medium md:text-3xl">Category</p>
                <div className="my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 md:grid-cols-7 gap-3 items-center justify-center">
                    {categories.map((category, index) => (
                        <div onClick={() => {
                            Navigate(`/products/${category.path.toLowerCase()}`)
                        }}
                            key={index}
                            className="group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center"
                             style={{ backgroundColor: category.bgColor }}
                        >
                            <img
                                src={category.image}
                                alt=""
                                className="max-w-20 mb-2 rounded-lg bg-white p-2"
                                style={{ background: 'transparent' }}
                            />
                            <p className="text-sm font-medium mt-2">{category.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default Category