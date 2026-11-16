"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormTypes, SignupSchema } from "../../schemas/SignupSchema";
import { toast } from "sonner";
import signupAction from "../../server/Signup.action";
import { useRouter } from "next/navigation";
import Loading from "@/components/Layout/Loading";
export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormTypes>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(SignupSchema),
  });
  const handleSignup: SubmitHandler<SignupFormTypes> = async (values) => {
    const response = await signupAction(values);
    if (response.success) {
      toast.success(response.message ?? "account created successfully");
      router.push("/login");
    }
    if (!response.success) {
      if (response.fieldErrors) {
        for (const [keys, messages] of Object.entries(response.fieldErrors)) {
          setError(keys as keyof SignupFormTypes, { message: messages[0] });
        }
      }
    }
    setError("root", { message: response.message });
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        {/* Header */}
        <header className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </header>

        <form className="space-y-7" onSubmit={handleSubmit(handleSignup)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.password.message}
              </p>
            )}

            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div className={`progress bg-orange-500 w-50 h-full`}></div>
                </div>
                <span>Fair</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="rePassword"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.rePassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="01 xxxxxxxx"
              id="phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
                {...register("terms")}
              />
              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
                ** {errors.terms.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="text-xs text-red-600 bg-red-100 p-2 font-medium rounded-lg">
              ** {errors.root.message}
            </p>
          )}
          <button
            type="submit"
            // disabled={errors ? true : false}
            // onClick={()=>{console.log('done')}}
            className={`btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-primary-600/70 w-full`}
          >
            {isSubmitting ? (
              <Loading />
            ) : (
              <span className="flex gap-1 justify-center items-center">
                <IconUserPlus stroke={2} /> <p>Create My Account</p>
              </span>
            )}
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
