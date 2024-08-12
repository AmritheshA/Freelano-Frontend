import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAction } from "../../Redux/Actions/UserActions/userActions";
import { RootState, TypeDispatch } from "../../Redux/Store";
import ScaleLoader from "react-spinners/ScaleLoader";
import loginImage from "@/assets/loginImage.png"



function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);


    const dispatch: TypeDispatch = useDispatch();
    const state = useSelector((state: RootState) => state.userDetails);
    const isLoaded = state.loading;

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Minimum 8 characters")
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        await dispatch(userLoginAction(values))
        setSubmitting(false);
    };


    return (
        <div className="flex sm:px-[12%] flex-col-reverse sm:flex-row px-4">
            <div className="lg:w-[50%] w-full flex justify-center items-center py-20 sm:backdrop-blur-[15px] sm:h-[750px] sm:bg-white sm:bg-opacity-30 sm:max-w-[640px] sm:min-w-[550px] rounded-[25px]">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col mt-20 max-w-full w-[410px] max-md:mt-10">
                            <div className="flex gap-3 justify-center items-center self-start ml-2.5 text-4xl font-bold text-slate-900">
                                <div>
                                    Login
                                </div>
                                <div className="cursor-pointer tooltip" data-tip="Sample user details">
                                    <FaInfoCircle size={18} onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()} />
                                </div>
                                <dialog id="my_modal_2" className="modal">
                                    <div className="modal-box bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
                                        <div className="space-y-6">
                                            <div className="bg-white p-4 rounded-md shadow">
                                                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Freelancer</h3>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-600">Email:</h2>
                                                        <div className="flex items-center space-x-2">
                                                            <h1 className="text-sm font-medium">xiwapib352@eryod.com</h1>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-600">Password:</h2>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium">password</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white p-4 rounded-md shadow">
                                                <h3 className="text-xl font-semibold text-indigo-700 mb-3">Client</h3>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-600">Email:</h2>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium">amrithesh0000@gmail.com</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm text-gray-600">Password:</h2>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm font-medium">password</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </div>
                            <label className="mt-7 text-sm text-slate-900">Email</label>
                            <Field
                                type="text"
                                name="email"
                                className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-2 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
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
                                    className="flex-1 px-6 py-4 pr-16 mt-2.5 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
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
                            <div className="flex flex-col pl-2.5 mt-5">
                                <div className="text-xs text-slate-900">
                                    <h1 className="text-blue-800 font-semibold">
                                        Forgot Password?
                                    </h1>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex justify-center items-center px-16 py-3.5 mt-9 text-xl font-bold text-white whitespace-nowrap bg-orange-600 rounded-3xl max-md:px-5 relative"
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
                                    ) : "Login"}
                                </button>
                                {/* <div className="self-center mt-11 text-sm whitespace-nowrap text-slate-900 max-md:mt-10">
                                    or continue with
                                </div>
                                <div className="flex gap-10 sm:gap-24 justify-between self-center mt-4 bg-background">
                                    <GoogleLogin 
                                        onSuccess={(credentialResponse) => {
                                            dispatch(userOauthLogin(credentialResponse.credential))
                                        }}
                                        onError={() => {
                                            console.log("Login Failed");
                                        }}
                                        useOneTap
                                        theme="outline"
                                        shape="circle"
                                        />
                                </div> */}
                                <div className="self-start mt-8 ml-10 text-sm whitespace-nowrap text-slate-900 max-md:ml-2.5">
                                    <h1 className="flex">
                                        Don’t have an account yet ?
                                        <h1 className="text-blue-800 font-semibold">
                                            <Link to="/selection">Register</Link>
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

export default LoginForm;
