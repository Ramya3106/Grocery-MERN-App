const Category = () => {
  return (
    <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">Category</p>
        <div>
            {
                Category.map((category,index)=>(
                    <div key={index}></div>
                ))
            }
        </div>
    </div>
  )
}

export default Category