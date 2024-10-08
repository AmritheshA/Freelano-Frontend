import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, TypeDispatch } from "../../Redux/Store";
import ScaleLoader from "react-spinners/ScaleLoader";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { toast } from "react-toastify";
import { registerUser, registerUserLoading } from "@/Redux/Slices/UserReducer/userReducer";
import loginImage from "@/assets/loginImage.png";



function AuthForm() {
  const dispatch: TypeDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const state = useSelector((state: RootState) => state.userDetails);
  const isLoaded = state.loading;

  const url = window.location.href;
  const params = new URLSearchParams(new URL(url).search);
  const role = params.get("role");

  const initialValues = {
    email: "",
    userName: "Amrithesh",
    password: "password",
    confirmPassword: "password"
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Minimum 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch(registerUser());
      const respose = await axiosInstance.post(`/api/v1/auth/sendMail`, { ...values, role }, config);
      console.log(respose.data);
      dispatch(registerUserLoading());
      toast("Check your mail for verification")
      setSubmitting(false);
    } catch (error: any) {
      dispatch(registerUserLoading());
      if (error.response && error.response.data) {
        toast(error.response.data);
      } else {
        toast("something went wrong")
      }
    }
  };


  return (
    <div className="flex sm:px-[12%] flex-col-reverse sm:flex-row px-4">
      <div className="lg:w-[50%] w-full flex justify-center items-center py-20 sm:backdrop-blur-[15px] sm:h-[800px] sm:bg-white sm:bg-opacity-30 sm:max-w-[640px] sm:min-w-[550px] rounded-[25px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col mt-10 max-w-full w-[410px] max-md:mt-10">
              <div className="self-start ml-2.5 text-4xl font-bold text-slate-900">
                SignUp
              </div>
              <label className="mt-7 text-sm text-slate-900">Username</label>
              <Field
                type="text"
                name="userName"
                className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-1 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                placeholder="Amrithesh A"
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="text-red-600"
              />
              <label className="mt-7 text-sm text-slate-900">Email</label>
              <Field
                type="text"
                name="email"
                className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-1 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                placeholder="username@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
              <label className="mt-8 text-sm text-slate-900">Password</label>
              <div className="relative flex">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="flex-1 px-6 py-4 pr-16 mt-1 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-9 right-0 flex items-center px-4 focus:outline-none"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
              <label className="mt-8 text-sm text-slate-900">Confirm Password</label>
              <div className="relative flex">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="flex-1 px-6 py-4 pr-16 mt-2.5 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-9 right-0 flex items-center px-4 focus:outline-none"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600"
              />

              <div className="flex flex-col pl-2.5 mt-5">
                <div className="text-xs text-slate-900">
                  <h1 className="text-blue-800 font-semibold">
                    Forgot Password?
                  </h1>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center px-16 py-3.5 mt-5 text-xl font-bold text-white whitespace-nowrap bg-orange-600 rounded-3xl max-md:px-5 relative"
                >
                  {isLoaded ? (
                    <ScaleLoader
                      color="#ffffff"
                      loading={isLoaded}
                      height={20}
                      width={10}
                      radius={2}
                      margin={2}
                    />
                  ) : "Register"}
                </button>
                <div className="self-start mt-5 ml-10 text-sm whitespace-nowrap text-slate-900 max-md:ml-2.5">
                  <h1 className="flex">
                    Don’t have an account yet ?
                    <h1 className="text-blue-800 font-semibold">
                      <Link to="/login">Login</Link>
                    </h1>
                  </h1>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:flex items-center justify-center lg:w-[50%] md:ml-[3%] ml-auto max-w-[700px]">
        <img
          src={loginImage}
          alt="Login Image"
          className="object-cover "
        />
      </div>
    </div >
  );
}

export default AuthForm;
