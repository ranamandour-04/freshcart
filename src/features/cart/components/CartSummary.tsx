"use client";
import { appStateType } from "@/store/store";
import {
  IconLockFilled,
  IconShieldCheck,
  IconTag,
  IconTruck,
  IconTruckFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { cartValuesType } from "../slice/CartSlice";

export default function CartSummary({ data }: { data: cartValuesType }) {
  const { isAuthenticated } = useSelector(
    (state: appStateType) => state.authReducer,
  );
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const cartTotal = data?.data?.totalCartPrice ?? 0;
  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  return (
    <>
      {isAuthenticated ? (
        <div className="lg:col-span-4 rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-xs">
          {/* Header Box */}
          <div className="bg-primary-600 p-6 text-white">
            <div className="flex items-center gap-2.5">
              <IconLockFilled size={18} />
              <h2 className="text-lg font-bold">Order Summary</h2>
            </div>
            <p className="mt-1 text-xs text-emerald-100 font-medium">
              {data.numOfCartItems} items in your cart
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Free Shipping Alert Banner */}
            <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-100/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 mb-2">
                <IconTruckFilled
                  size={18}
                  className={`${shippingCost ? "text-amber-500" : "text-primary-600"}`}
                />
                <span className={`${shippingCost ? "" : "text-primary-600"}`}>
                  {shippingCost
                    ? "Unlocked your free shipping at 500 EGP or above!"
                    : `Enjoy your free shipping!`}
                </span>
              </div>
            </div>

            {/* Costs Breakdown */}
            <dl className="space-y-3.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-gray-900">
                  {data.data.totalCartPrice} EGP
                </dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>Shipping</dt>
                <dd className="font-semibold text-gray-900">
                  {shippingCost} EGP
                </dd>
              </div>
              <div className="border-t border-gray-100 pt-3.5 flex justify-between items-baseline">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd className="text-2xl font-bold text-gray-900 tracking-tight">
                  {grandTotal}{" "}
                  <span className="text-sm font-semibold text-gray-500">
                    EGP
                  </span>
                </dd>
              </div>
            </dl>

            {/* Apply Promo Code Button / Accordion */}
            <div>
              {!isPromoOpen ? (
                <button
                  type="button"
                  onClick={() => setIsPromoOpen(true)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
                >
                  <IconTag size={16} />
                  <span>Apply Promo Code</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    placeholder="Enter coupon code"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      toast.error(
                        "Coupon discounts is not available right now",
                      );
                    }}
                    className="rounded-xl bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Secure Checkout CTA */}
            <Link
              href={"/checkout"}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary-600 py-4 font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-primary-700 active:scale-95 transition-all cursor-pointer"
            >
              <IconLockFilled size={18} />
              <span>Secure Checkout</span>
            </Link>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-1 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <IconShieldCheck size={16} className="text-primary-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IconTruck size={16} className="text-blue-600" />
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* Bottom Continue Shopping Link */}
            <div className="text-center pt-2">
              <Link
                href="/products"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:col-span-4 rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-xs">
          <div className="bg-[#111827] px-6 py-5 text-white">
            <h2 className="text-lg font-bold">Order Summary</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({data.numOfCartItems} items)</span>
                <span className="font-bold text-gray-900">
                  {data.data.totalCartPrice} EGP
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-primary-600">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">
                  Estimated Total
                </span>
                <span className="text-2xl font-bold text-primary-600 tracking-tight">
                  {data.data.totalCartPrice} EGP
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-primary-700 active:scale-95 transition-all cursor-pointer text-sm sm:text-base"
              >
                <IconUserFilled size={18} />
                <span>Login to Checkout</span>
              </Link>

              <p className="text-center text-xs text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <ul className="space-y-2.5 border-t border-gray-100 pt-5 text-xs text-gray-500">
              <li className="flex items-center gap-2">
                <span className="text-gray-400">✓</span>
                <span>Your cart items will be saved</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">✓</span>
                <span>Track your orders easily</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gray-400">✓</span>
                <span>Access exclusive member deals</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
