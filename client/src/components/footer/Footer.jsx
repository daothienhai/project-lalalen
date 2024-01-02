import React, { memo } from "react";
import icons from "../../utils/icons";

const { MdEmail } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">ĐĂNG KÝ NHẬN TIN</span>
            <small className="text-[13px] text-gray-300">
              Đăng ký ngay và nhận bản tin hàng tuần
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full w-full bg-[#efbe63a6] ouline-none text-white placeholder:text-sm placeholder:text-white placeholder:italic "
              type="text"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-[#efbe63a6] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              VỀ CHÚNG TÔI
            </h3>
            <span>
              <span>Địa chỉ: </span>
              <span className="opacity-70">
                Thuy Linh, Linh Nam, Hoang Mai, Ha Noi
              </span>
            </span>
            <span>
              <span>Số điện thoại: </span>
              <span className="opacity-70">0989764356</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">lalalen.craft@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              THÔNG TIN
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contacts</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              GIỚI THIỆU
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contacts</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              TUYỂN DỤNG
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contacts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
