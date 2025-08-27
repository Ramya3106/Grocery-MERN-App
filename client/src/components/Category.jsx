const Category = () => {
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Category</p>
        <div>
            {
                Category.map((category,index)=>(
                    <div key={index} className={`group cursor-pointer py-5 px-3 rounded-lg gap-2 flex flex-col items-center justify-center`}></div>
                ))
            }
        </div>
    </div>
  )
}

export default Category