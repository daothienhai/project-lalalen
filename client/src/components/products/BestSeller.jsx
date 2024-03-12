import React, { useState, useEffect } from 'react';
import { apiGetProducts } from '../../apis/product';
import CustomSlider from '../common/CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from '../../store/products/asyncActions';
import clsx from 'clsx';

const tabs = [
  { id: 1, name: 'sản phẩm bán chạy' },
  { id: 2, name: 'sản phẩm mới' },
];
const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.app);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: '-sold' });
    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? 'hidden' : 'block')}>
      <div className="flex text-[20px] pb-4 border-b-2 border-main xs:flex-col">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase pr-8  cursor-pointer ${activedTab === el.id ? 'text-black' : 'text-gray-400'}`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider products={products} activedTab={activedTab} slidesToShow={4} />
      </div>
    </div>
  );
};

export default BestSeller;
