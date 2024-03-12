import React, { useEffect, useState } from 'react';
// import logo from "../assets/logolalalen.svg";
import icons from '../../utils/icons';
import { Link } from 'react-router-dom';
import path from '../../utils/path';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/userSlice';
import { showCart } from '../../store/app/appSlice';
import withBaseComponent from '../../hocs/withBaseComponent';
const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById('profile');
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener('click', handleClickoutOptions);
    return () => {
      document.removeEventListener('click', handleClickoutOptions);
    };
  }, []);
  return (
    <div className="xs:w-full xs:flex-col xl:w-main w-full flex justify-between h-[110px] py-[35px] xs:py-0 px-4 xl:px-0">
      {/* <img src={logo} alt="Logo" className="w-[234px] object-contain" /> */}
      <Link to={`/${path.HOME}`} className="flex items-center xs:justify-center">
        <span className="logo font-logo object-contain  text-main text-[55px]">lalalen</span>
      </Link>
      <div className="flex text-[13px] xs:justify-center xs:mb-8">
        <div className="flex flex-col items-center sm:px-2 lg:px-6 border-r xs:hidden">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="#FFA603" />
            <span className="font-semibold">0989764356</span>
          </span>
          <span>Thứ 2 - Thứ 6 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center sm:px-2 lg:px-6 border-r xs:hidden">
          <span className="flex gap-4 items-center">
            <MdEmail color="#FFA603" />
            <span className="font-semibold">lalalen.craft@gmail.com</span>
          </span>
          <span>Hỗ trợ 24/7</span>
        </div>
        {current && (
          <>
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center justify-center gap-2 lg:px-6 sm:px-2 xs:px-2 border-r"
            >
              <BsHandbagFill color="#FFA603" />
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center sm:px-2 xs:px-2 lg:px-6 gap-2 relative"
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              <FaUserCircle color="#FFA603" />
              <span>Tài khoản</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full flex flex-col left-[16px] bg-gray-100 border min-w-[150px] py-2"
                >
                  <Link className="p-2 w-full hover:bg-sky-100" to={`/${path.MEMBER}/${path.PERSONAL}`}>
                    Personal
                  </Link>
                  {+current.role === 1994 && (
                    <Link className="p-2 w-full hover:bg-sky-100" to={`/${path.ADMIN}/${path.DASHBOARD}`}>
                      Admin workspace
                    </Link>
                  )}
                  <span onClick={() => dispatch(logout())} className="p-2 w-full hover:bg-sky-100">
                    Logout
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withBaseComponent(Header);
