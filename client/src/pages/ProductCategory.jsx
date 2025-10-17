import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
const ProductCategory = () => {
  const { Products } = useContext(AppContext);
  const { category } = useParams();
  
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  // Fixed filtering logic - match product category with the category path
  const filteredProducts = Products.filter((product) => {
    if (!product.category || !searchCategory) return false;
    
    // Compare product category with the original category path (case-insensitive)
    return product.category.toLowerCase() === searchCategory.path.toLowerCase();
  });
  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-3xl md:text-4xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}     
      {filteredProducts.length > 0 ? (
        <div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            No products found
          </h1>
          <p className="text-gray-600 mb-4">
            We don't have any products in the {searchCategory?.text || category} category yet.
          </p>
          <p className="text-gray-500">
            Check back soon or browse other categories!
          </p>
        </div>
      )}
    </div>
  );
};
export default ProductCategory;