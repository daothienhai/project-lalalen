import React, { memo, useEffect } from 'react';
import path from '../../utils/path';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrent } from '../../store/user/asyncActions';
import icons from '../../utils/icons';
import { clearMessage, logout } from '../../store/user/userSlice';
import Swal from 'sweetalert2';
import { navigation } from '../../utils/contants';

const { AiOutlineLogout } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes)
      Swal.fire('Oops!', mes, 'info').then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);
  return (
    <div className="xs:h-[55px] h-[38px] py-[10px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white py-16 xs:w-full md:flex xs:flex-col sm:flex-row xs:px-4 px-4 xl:px-0 xs:mt-[10px]">
        <span>GỌI NGAY: 0989764356</span>
        {isLoggedIn && current ? (
          <div className="flex gap-4 text-sm items-center">
            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span onClick={() => dispatch(logout())} className="hover:rounded-full hover:bg-gray-200 cursor-pointer hover:text-main p-2">
              <AiOutlineLogout size={18} />
            </span>
          </div>
        ) : (
          <Link className="text-white hover:text-gray-800" to={`/${path.LOGIN}`}>
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
