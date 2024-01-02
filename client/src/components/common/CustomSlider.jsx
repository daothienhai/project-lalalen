import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "..";

const CustomSlider = ({ products, activedTab, normal, slidesToShow }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  return (
    <>
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
