import React, { useState, useCallback, useEffect } from 'react';
import { InputField, Button, Loading } from '../../components';
import { apiForgotPassword, apiLogin, apiRegister, apiFinalRegister } from '../../apis/user';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import path from '../../utils/path';
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../../utils/helpers';
import { showModal } from '../../store/app/appSlice';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayLoad] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobile: '',
  });
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('redirect'));
  const resetPayload = () => {
    setPayLoad({
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      mobile: '',
    });
  };
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.mes, { theme: 'colored' });
    } else {
      toast.info(response.mes, { theme: 'colored' });
    }
  };
  useEffect(() => {
    resetPayload();
  }, [isRegister]);
  // Submit:
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));

        if (response.success) {
          setIsVerifiedEmail(true);
          // Swal.fire("Congratulation", response.mes, "success").then(() => {
          //   setIsRegister(false);
          //   resetPayload();
          // });
        } else Swal.fire('Oops!', response.mes, 'error');
      } else {
        const rs = await apiLogin(data);
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          searchParams.get('redirect') ? navigate(searchParams.get('redirect')) : navigate(`/${path.HOME}`);
        } else Swal.fire('Oops!', rs.mes, 'error');
      }
    }
  }, [payload, isRegister]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire('Congratulation', response.mes, 'success').then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else {
      Swal.fire('Oops!', response.mes, 'error');
    }
    setIsVerifiedEmail(false);
    setToken('');
  };
  return (
    <div className="w-screen h-screen relative login">
      {isVerifiedEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col justify-center items-center xs:right-0 xs:w-full xs:py-6">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4 className="">We sent a code to your mail. Please check your mail and enter your code:</h4>
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className="p-2 border rounded-md outline-none" />
            <button type="button" className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md ml-4" onClick={finalRegister}>
              Submit
            </button>
          </div>
        </div>
      )}

      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              placeholder="Exp: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button name="Submit" handleOnClick={handleForgotPassword} style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2" />
              <Button name="Back" handleOnClick={() => setIsForgotPassword(false)} />
            </div>
          </div>
        </div>
      )}

      <img src="https://cdn5.f-cdn.com/contestentries/1578585/21468461/5d62b49ac544b_thumb900.jpg" alt="" className="w-full h-full object-cover" />
      <div className="absolute top-0 bottom-0 right-1/2 items-center justify-center flex xs:right-0 xs:w-full xs:px-4">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] xs:min-w-full">
          <h1 className="text-[28px] font-semibold text-main mb-8">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h1>
          {isRegister && (
            <div className="flex w-full items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayLoad}
                nameKey="firstname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayLoad}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          <InputField value={payload.email} setValue={setPayLoad} nameKey="email" invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayLoad}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}

          <InputField
            value={payload.password}
            setValue={setPayLoad}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button children={isRegister ? 'Đăng ký' : 'Đăng nhập'} handleOnClick={handleSubmit} fw />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span onClick={() => setIsForgotPassword(true)} className="text-blue-500 hover:underline cursor-pointer">
                Quên tài khoản?
              </span>
            )}
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => setIsRegister(true)}>
                Tạo tài khoản
              </span>
            )}
            {isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer w-full text-center" onClick={() => setIsRegister(false)}>
                Tới đăng nhập
              </span>
            )}
          </div>
          <Link className="text-blue-500 text-sm hover:underline cursor-pointer" to={`/${path.HOME}`}>
            Tới trang chủ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
