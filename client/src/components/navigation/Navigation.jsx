import React from 'react';
import { navigation } from '../../utils/contants';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="w-full xl:w-main h-[48px] py-2 border-y text-sm flex items-center xs:justify-center sm:pl-4 xl:pl-0">
      {navigation.map((el) => (
        <NavLink to={el.path} key={el.id} className={({ isActive }) => (isActive ? 'pr-10 hover:text-main text-main' : 'pr-10 hover:text-main')}>
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
