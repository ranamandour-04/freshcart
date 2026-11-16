"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IconArrowLeft,
  IconClipboardList,
  IconHome,
  IconInfoCircleFilled,
  IconBuildingCommunity,
  IconMapPin,
  IconPhone,
  IconWallet,
  IconCash,
  IconCreditCard,
  IconCircleCheckFilled,
  IconShieldCheckFilled,
  IconShoppingBag,
  IconTruck,
  IconReceipt,
  IconShieldCheck,
  IconRotateClockwise,
  IconLoader2,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { appStateType } from "@/store/store";
import { createCashOrder } from "../server/checkout.actions";
import { clearCart } from "@/features/cart/server/Cart.actions";

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux state
  const cartResponse = useSelector((state: appStateType) => state.cartReducer);
  const cartId = cartResponse?.data?._id;
  const cartProducts = cartResponse?.data?.products ?? [];
  const cartTotal = cartResponse?.data?.totalCartPrice ?? 0;
  const shippingCost = cartTotal >= 500 || cartTotal === 0 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  // Form State
  const [formData, setFormData] = useState({
    city: "",
    streetAddress: "",
    phone: "",
    paymentMethod: "cash" as "cash" | "online",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodSelect = (method: "cash" | "online") => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Submit / Place Order Handler
  const handlePlaceOrder = async () => {
    // 1. Validation
    if (!cartId || cartProducts.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("Please provide a city for shipping.");
      return;
    }

    if (!formData.streetAddress.trim()) {
      toast.error("Please provide your street address.");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Please provide a valid phone number.");
      return;
    }

    // Phone format check for Egyptian numbers (starts with 01 and has 11 digits)
    const egyptianPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!egyptianPhoneRegex.test(formData.phone.trim())) {
      toast.error(
        "Please enter a valid 11-digit Egyptian phone number (e.g. 010xxxxxxxx).",
      );
      return;
    }

    // 2. Execution based on payment method
    if (formData.paymentMethod === "cash") {
      try {
        setIsSubmitting(true);
        const payload = {
          details: formData.streetAddress.trim(),
          phone: formData.phone.trim(),
          city: formData.city.trim(),
        };

        const res = await createCashOrder(cartId, payload);

        if (res.status === "success") {
          toast.success("Order placed successfully!");

          // Redirect to orders history / success page
          router.push("/");
        }
      } catch (err: any) {
        console.error("Failed to place order:", err);
        const errorMsg =
          err?.response?.data?.message ||
          "Failed to create order. Please try again.";
        toast.error(errorMsg);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Online payment (Stripe) placeholder
      toast.info("Online payment will be processed via Stripe checkout.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-800 pb-20">
      <div className="container mx-auto px-4 lg:px-8 py-6">
        {/* =========================================
            BREADCRUMBS
        ========================================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mb-6">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-gray-900 transition-colors">
            Cart
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Checkout</span>
        </nav>

        {/* =========================================
            TITLE ROW WITH "BACK TO CART"
        ========================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-md shadow-emerald-500/20">
                <IconClipboardList size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Complete Your Order
              </h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#16a34a] hover:text-[#15803d] transition-colors"
          >
            <IconArrowLeft size={16} />
            <span>Back to Cart</span>
          </Link>
        </div>

        {/* =========================================
            CHECKOUT 2-COLUMN LAYOUT
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Shipping & Payment Form */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* 1. SHIPPING ADDRESS SECTION */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
              <div className="bg-[#16a34a] px-6 py-4 text-white">
                <div className="flex items-center gap-2">
                  <IconHome size={20} className="stroke-[2.2]" />
                  <h2 className="text-base font-bold sm:text-lg">
                    Shipping Address
                  </h2>
                </div>
                <p className="mt-0.5 text-xs text-emerald-100 font-normal">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-5">
                {/* Delivery Information Banner */}
                <div className="flex items-start gap-3 rounded-xl bg-[#eff6ff] p-4 text-[#1e40af] border border-[#dbeafe]">
                  <IconInfoCircleFilled
                    size={20}
                    className="shrink-0 mt-0.5 text-[#3b82f6]"
                  />
                  <div className="text-xs sm:text-sm">
                    <span className="font-semibold block text-[#1e3a8a]">
                      Delivery Information
                    </span>
                    <span className="text-[#3b82f6] font-normal">
                      Please ensure your address is accurate for smooth delivery
                    </span>
                  </div>
                </div>

                {/* City Field */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-xs font-semibold text-gray-700"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <IconBuildingCommunity size={18} />
                    </div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Street Address Field (mapped to 'details' in API) */}
                <div>
                  <label
                    htmlFor="streetAddress"
                    className="block text-xs font-semibold text-gray-700"
                  >
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <IconMapPin size={18} />
                    </div>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Street name, building number, floor, apartment..."
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                      <IconPhone size={18} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01xxxxxxxxx"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-36 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[11px] font-medium text-gray-400">
                      Egyptian numbers only
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD SECTION */}
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
              <div className="bg-[#16a34a] px-6 py-4 text-white">
                <div className="flex items-center gap-2">
                  <IconWallet size={20} className="stroke-[2.2]" />
                  <h2 className="text-base font-bold sm:text-lg">
                    Payment Method
                  </h2>
                </div>
                <p className="mt-0.5 text-xs text-emerald-100 font-normal">
                  Choose how you'd like to pay
                </p>
              </div>

              <div className="p-5 sm:p-7 space-y-4">
                {/* Cash on Delivery */}
                <div
                  onClick={() => handlePaymentMethodSelect("cash")}
                  className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between ${
                    formData.paymentMethod === "cash"
                      ? "border-[#16a34a] bg-[#f0fdf4]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        formData.paymentMethod === "cash"
                          ? "bg-[#16a34a] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <IconCash size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        Cash on Delivery
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>

                  <div>
                    {formData.paymentMethod === "cash" ? (
                      <IconCircleCheckFilled
                        size={22}
                        className="text-[#16a34a]"
                      />
                    ) : (
                      <span className="block h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </div>

                {/* Pay Online */}
                <div
                  onClick={() => handlePaymentMethodSelect("online")}
                  className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between ${
                    formData.paymentMethod === "online"
                      ? "border-[#16a34a] bg-[#f0fdf4]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        formData.paymentMethod === "online"
                          ? "bg-[#16a34a] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <IconCreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">
                        Pay Online
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[9px] font-bold text-white tracking-widest">
                          VISA
                        </span>
                        <span className="rounded bg-[#eb001b] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          mc
                        </span>
                        <span className="rounded bg-[#006fcf] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          AMEX
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formData.paymentMethod === "online" ? (
                      <IconCircleCheckFilled
                        size={22}
                        className="text-[#16a34a]"
                      />
                    ) : (
                      <span className="block h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </div>

                {/* Security Banner */}
                <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] p-4 text-[#15803d] border border-[#dcfce7]">
                  <IconShieldCheckFilled
                    size={20}
                    className="shrink-0 text-[#16a34a]"
                  />
                  <div className="text-xs font-normal">
                    <span className="font-semibold block text-[#15803d]">
                      Secure &amp; Encrypted
                    </span>
                    <span className="text-[#16a34a]">
                      Your payment info is protected with 256-bit SSL encryption
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-20 z-10 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
              <div className="bg-[#16a34a] px-6 py-4 text-white">
                <div className="flex items-center gap-2">
                  <IconShoppingBag size={20} className="stroke-[2.2]" />
                  <h2 className="text-base font-bold sm:text-lg">
                    Order Summary
                  </h2>
                </div>
                <p className="mt-0.5 text-xs text-emerald-100 font-normal">
                  {cartResponse.numOfCartItems ?? 0}{" "}
                  {cartResponse.numOfCartItems === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {/* Scrollable Items List */}
                <div className="max-h-72 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-gray-200">
                  {cartProducts.length === 0 ? (
                    <p className="text-center text-xs text-gray-400 py-4">
                      No items in cart
                    </p>
                  ) : (
                    cartProducts.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white p-1 border border-gray-100 flex items-center justify-center">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                              {item.product.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                              {item.count} × {item.price.toLocaleString()} EGP
                            </p>
                          </div>
                        </div>

                        <span className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
                          {(item.count * item.price).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Pricing Breakdown */}
                <div className="space-y-3 border-t border-gray-100 pt-5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {cartTotal.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <IconTruck size={16} className="text-gray-400" />
                      <span>Shipping</span>
                    </span>
                    <span className="font-bold text-[#16a34a] text-xs uppercase tracking-wide">
                      {shippingCost === 0 ? "FREE" : `${shippingCost} EGP`}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-t border-gray-100 pt-3">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#16a34a] tracking-tight">
                      {grandTotal.toLocaleString()}{" "}
                      <span className="text-xs font-semibold text-gray-400 uppercase">
                        EGP
                      </span>
                    </span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting || cartProducts.length === 0}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#16a34a] py-3.5 px-4 font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-[#15803d] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <IconLoader2 size={20} className="animate-spin" />
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <IconReceipt size={20} />
                      <span>Place Order</span>
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[11px] font-medium text-gray-500">
                  <div className="flex items-center gap-1">
                    <IconShieldCheck size={14} className="text-[#16a34a]" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconTruck size={14} className="text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconRotateClockwise size={14} className="text-amber-500" />
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
