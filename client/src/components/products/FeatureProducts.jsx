import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis";
import ProductCard from "./ProductCard";
import banner1 from "../../assets/banner-1.jpg";
import banner2 from "../../assets/banner-2.jpg";
import banner3 from "../../assets/banner-3.jpg";
import banner4 from "../../assets/banner-4.jpg";
const FeatureProducts = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        SẢN PHẨM NỔI BẬT
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <img
          src={banner1}
          alt="banner 1"
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src={banner2}
          alt="banner 2"
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src={banner4}
          alt="banner 3"
          className="w-full h-full object-cover col-span-1 row-span-2"
        />
        <img
          src={banner3}
          alt="banner 4"
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
