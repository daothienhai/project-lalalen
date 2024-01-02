import React, { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showCart, showModal } from "../../store/app/appSlice";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils/helpers";
import Button from "../buttons/Button";
import { ImBin } from "react-icons/im";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import path from "../../utils/path";
const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  console.log(currentCart);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] max-h-screen grid grid-rows-10 bg-black text-white p-6"
    >
      <header className="border-b border-gray-500 flex justify-between items-center row-span-1 h-full font-bold text-2xl">
        <span>Your Cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className="p-2 cursor-pointer"
        >
          <AiFillCloseCircle size={24} />
        </span>
      </header>
      <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Your cart is empty.</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div key={el._id} className="flex gap-2 relative">
              <img
                src={el.thumbnail}
                alt="thumb"
                className="w-16 h-16 object-cover"
              />
              <div className="flex flex-col gap-1 ml-2">
                <span className="text-main">{el.title}</span>
                <span className="text-[10px]">{el.color}</span>
                <span className="text-[10px]">{`Quantity: ${el.quantity}`}</span>
                <span className="text-sm">
                  {formatMoney(el.price) + " VND"}
                </span>
              </div>
              <span
                onClick={() => removeCart(el.product?._id, el.color)}
                className="h-8 w-8 absolute top-1 right-0 rounded-full cursor-pointer"
              >
                <ImBin size={16} />
              </span>
            </div>
          ))}
      </section>
      <div className="row-span-2 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Subtotal:</span>
          <span>
            {formatMoney(
              currentCart?.reduce(
                (sum, el) => sum + Number(el.price) * el.quantity,
                0
              )
            ) + " VND"}
          </span>
        </div>
      </div>
      <Button
        handleOnClick={() => {
          dispatch(showCart());
          navigate(`/${path.DETAIL_CART}`);
        }}
        style="rounded-none w-full bg-main py-3"
      >
        Shopping Cart
      </Button>
    </div>
  );
};

export default withBaseComponent(memo(Cart));
