"use client";
import Link from "next/link";
import {
  IconShoppingCart,
  IconShoppingCartFilled,
  IconMinus,
  IconPlus,
  IconTrash,
  IconArrowLeft,
  IconLockFilled,
  IconShieldCheck,
  IconTruck,
  IconTag,
  IconTruckFilled,
  IconUserFilled,
  IconRefresh,
  IconAlertTriangle,
} from "@tabler/icons-react";
import CartSummary from "../components/CartSummary";
import { clearCart, getCartItems } from "../server/Cart.actions";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { appStateType } from "@/store/store";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CartScreen() {
  const cartResponse = useSelector((state: appStateType) => state.cartReducer);
  // const {}=cartAction()
  async function handleClearCart() {
    const response = await clearCart();
    if (response.status === "fail" || response.status === "error") {
      toast.error(response.message ?? "try again");
      return;
    }
    if (response.status === "success") {
      toast.success(response.message ?? "Cart cleared successfully");
    }
  }

  if (cartResponse.status === "fail") {
    return (
      <>
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-16 text-center">
          {/* Circular Icon Container */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#f1f3f5] text-[#9ca3af]">
            <IconAlertTriangle
              size={56}
              stroke={1.5}
              className="text-[#9ca3af]"
            />
          </div>

          {/* Title */}
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Unauthorized User
          </h2>

          {/* Subtitle / Description */}
          <div className="mt-3 max-w-md space-y-1 text-sm text-[#6b7280] sm:text-base">
            <p>User not logged in</p>
            <p>Please log in and try again later.</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={"/login"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all duration-200 hover:bg-primary-700 active:scale-95"
            >
              {/* <IconRefresh size={18} stroke={2} /> */}
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </>
    );
  } else if (cartResponse.status === "error") {
    return (
      <>
        <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 py-16 text-center">
          {/* Circular Icon Container */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#f1f3f5] text-[#9ca3af]">
            <IconAlertTriangle
              size={56}
              stroke={1.5}
              className="text-[#9ca3af]"
            />
          </div>

          {/* Title */}
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
            Something Went Wrong!
          </h2>

          {/* Subtitle / Description */}
          <div className="mt-3 max-w-md space-y-1 text-sm text-[#6b7280] sm:text-base">
            <p>Please reload the page or try again later.</p>
          </div>
        </div>
      </>
    );
  }
  if (cartResponse.status === "success") {
    const cartData = cartResponse.data.products;
    return (
      <div className="min-h-screen bg-[#FDFDFD] text-gray-800 pb-20">
        {/* =========================================
          1. BREADCRUMBS
      ========================================= */}
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Shopping Cart</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* =========================================
            2. PAGE TITLE WITH ICON
        ========================================= */}
          <div className="mb-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md shadow-emerald-500/20">
                <IconShoppingCartFilled size={26} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Shopping Cart
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You have{" "}
              <span className="font-semibold text-primary-600">
                {cartData?.length}
                {/* {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} */}
              </span>{" "}
              in your cart
            </p>
          </div>

          {/* =========================================
            3. MAIN CONTENT (Left: List, Right: Summary)
        ========================================= */}
          {cartData?.length === 0 ? (
            /* Empty Cart State */
            <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-xs">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-primary-600">
                <IconShoppingCart size={38} />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Your cart is empty
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-primary-700 transition-all"
              >
                <IconArrowLeft size={18} />
                <span>Start Shopping</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Items */}
                <div className="space-y-4">
                  {cartData?.map((item) => (
                    <CartItem itemInfo={item} />
                  ))}
                </div>

                {/* Action Buttons Below Cart List */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="/products"
                    className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <IconArrowLeft size={18} />
                    <span>Continue Shopping</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <IconTrash size={16} />
                    <span>Clear all items</span>
                  </button>
                </div>
              </div>
              <CartSummary data={cartResponse} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
