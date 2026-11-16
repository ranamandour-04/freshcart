"use client";

import {
  IconBrandFacebook,
  IconBrandGoogleFilled,
  IconEye,
  IconLockFilled,
  IconMail,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormTypes, LoginSchema } from "../../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginAction from "../../server/Login.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loading from "@/components/Layout/Loading";
import { setToken } from "../../server/auth.action";
import { useDispatch } from "react-redux";
import { authActions } from "../../slices/auth.slice";
import { userInfo } from "os";

export default function LoginForm() {
  const router = useRouter();
  const { setAuthState } = authActions;
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginFormTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormTypes> = async (
    values: LoginFormTypes,
  ) => {
    const response = await LoginAction(values);
    if (response.success === true) {
      toast.success(response.message ?? "account created successfully");

      console.log(response.data.token);

      router.push("/");
      await setToken(response.data.token);
      dispatch(
        setAuthState({
          isAuthenticated: true,
          userInfo: {
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
          },
        }),
      );
    }
    if (response.success === false) {
      if (response.fieldErrors) {
        for (const [keys, messages] of Object.entries(response.fieldErrors)) {
          setError(keys as keyof LoginFormTypes, { message: messages[0] });
        }
      }
    }
    setError("root", { message: response.message });
  };
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">
            Sign in to continue your fresh shopping experience
          </p>
        </div>

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandGoogleFilled className="text-red-500 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <IconBrandFacebook stroke={2} className="text-blue-600 text-lg" />

            <span className="font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your email"
                id="email"
                {...register("email")}
              />
              <IconMail
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
              ** {errors.email.message}
            </p>
          )}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Link
                href="/forget-password"
                className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={"password"}
                id="password"
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                placeholder="Enter your password"
                {...register("password")}
              />
              <IconLockFilled className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <IconEye stroke={2} />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.password.message}
              </p>
            )}
          </div>
          {/* // ! to-do */}
          {/* <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-3 text-sm text-gray-700">
                Keep me signed in
              </span>
            </label>
          </div> */}
          {errors.root && (
            <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
              ** {errors.root?.message}
            </p>
          )}
          <button
            type="submit"
            className={`btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-primary-600/70 w-full`}
          >
            {isSubmitting ? <Loading /> : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">
            New to FreshCart?
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center">
            <IconLockFilled className="mr-1" />
            SSL Secured
          </div>
          <div className="flex items-center">
            <IconUsers stroke={2} className="mr-1" />
            50K+ Users
          </div>
          <div className="flex items-center">
            <IconStarFilled className="mr-1" />
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}
