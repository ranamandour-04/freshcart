"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconChevronRight,
  IconHeart,
  IconStarFilled,
  IconStar,
  IconStarHalfFilled,
  IconPlus,
  IconShoppingCartFilled,
  IconShieldFilled,
  IconTruckFilled,
  IconHome,
  IconMinus,
  IconBolt,
  IconShare,
  IconTruck,
  IconRotateClockwise,
  IconShieldCheck,
  IconCheck,
  IconFileText,
  IconLoader2,
} from "@tabler/icons-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import { Product } from "../types/Products.types";
import { addCartItem } from "@/features/cart/server/Cart.actions";
import { id } from "zod/v4/locales";
import { toast } from "sonner";
import { addProductToWishlist } from "@/features/wishlist/server/whishlist.actions";

interface ProductInfoProps {
  productInfo: Product;
  onAddToCart?: (productId: string, quantity: number) => Promise<void> | void;
  onBuyNow?: (productId: string, quantity: number) => void;
  onToggleWishlist?: (productId: string) => Promise<void> | void;
}

export default function ProductInfo({
  productInfo,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
}: ProductInfoProps) {
  const {
    category,
    sold,
    subcategory,
    brand,
    _id,
    imageCover,
    images,
    description,
    ratingsAverage = 0,
    ratingsQuantity = 0,
    quantity: stock = 0,
    price,
    priceAfterDiscount,
    title,
  } = productInfo;

  // =========================================
  // 1. STATE & CALCULATIONS
  // =========================================
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "reviews" | "shipping"
  >("details");

  // Active unit price and total price
  const hasDiscount = Boolean(priceAfterDiscount && priceAfterDiscount < price);
  const unitPrice = hasDiscount ? (priceAfterDiscount as number) : price;
  const totalPrice = (unitPrice * selectedQty).toFixed(2);

  const discountPercentage = hasDiscount
    ? Math.round(((price - (priceAfterDiscount as number)) / price) * 100)
    : null;

  // Rating breakdown percentages
  const breakdown = [
    { stars: 5, percentage: 25 },
    { stars: 4, percentage: 60 },
    { stars: 3, percentage: 25 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 5 },
  ];

  // Images list (fallback to imageCover if images array is empty)
  const allImages = images && images.length > 0 ? images : [imageCover];

  // =========================================
  // 2. HANDLERS
  // =========================================
  const handleQuantityChange = (action: "inc" | "dec"): void => {
    if (action === "inc" && selectedQty < stock) {
      setSelectedQty((prev) => prev + 1);
    } else if (action === "dec" && selectedQty > 1) {
      setSelectedQty((prev) => prev - 1);
    }
  };

  async function handleAddToCart() {
    const response = await addCartItem(_id);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
    }
    if (response.status === "success") {
      toast.success(response.message);
    }
  }

  // const handleWishlistToggle = async (): Promise<void> => {
  //   try {
  //     setIsWishlisted((prev) => !prev);
  //     if (onToggleWishlist) {
  //       await onToggleWishlist(_id);
  //     }
  //   } catch (error) {
  //     setIsWishlisted((prev) => !prev);
  //     console.error("Wishlist error:", error);
  //   }
  // };
  async function handleAddtoWishlist() {
    const response = await addProductToWishlist(_id);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
    }
    if (response.status === "success") {
      toast.success(response.message);
    }
  }
  return (
    <>
      {/* =========================================
          1. BREADCRUMBS
      ========================================= */}
      <div className="container mx-auto px-4 lg:px-8 py-5">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 font-medium">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gray-900 transition-colors"
          >
            <IconHome size={16} />
            <span>Home</span>
          </Link>
          <IconChevronRight size={14} className="text-gray-400" />
          <Link
            href={`/categories/${category?._id}`}
            className="hover:text-gray-900 transition-colors"
          >
            {category?.name}
          </Link>
          {subcategory?.[0]?.name && (
            <>
              <IconChevronRight size={14} className="text-gray-400" />
              <Link
                href={`/subcategories/${subcategory[0]._id || "women-clothing"}`}
                className="hover:text-gray-900 transition-colors"
              >
                {subcategory[0].name}
              </Link>
            </>
          )}
          <IconChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900 font-semibold truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </nav>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* =========================================
            2. PRODUCT HERO SECTION (Images & Info)
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery using Swiper */}
          <div className="w-full min-w-0 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6 flex flex-col gap-3">
            {/* Main Swiper */}
            <div className="rounded-3xl min-w-0 border border-gray-100 bg-white p-4 sm:p-6 shadow-xs overflow-hidden aspect-square flex items-center justify-center">
              <Swiper
                spaceBetween={10}
                effect="fade"
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Thumbs, EffectFade]}
                className="w-full h-full"
              >
                {allImages.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center bg-white"
                  >
                    <img
                      src={img}
                      alt={`${title} - image ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails Swiper */}
            <div className="w-full min-w-0 overflow-hidden px-1">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView="auto"
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="py-1 w-full"
              >
                {allImages.map((img, index) => (
                  <SwiperSlide key={index} className="!w-auto">
                    <button
                      type="button"
                      className="relative block h-18 w-18 sm:h-20 sm:w-20 overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-1.5 transition-all duration-200 hover:border-gray-300 opacity-70 [&.swiper-slide-thumb-active]:border-primary-600 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:shadow-sm cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full min-w-0 lg:col-span-7 xl:col-span-8 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs flex flex-col space-y-6">
            <div>
              {/* Category & Brand Badges */}
              <div className="flex items-center gap-2">
                {category?.name && (
                  <span className="rounded-full bg-[#e8f7ee] px-3.5 py-1.5 text-xs font-semibold text-primary-600">
                    {category.name}
                  </span>
                )}
                {brand?.name && (
                  <span className="rounded-full bg-gray-100 px-3.5 py-1.5 text-xs font-semibold text-gray-700">
                    {brand.name}
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>

              {/* Dynamic Rating & Reviews */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => {
                    if (ratingsAverage >= star) {
                      return <IconStarFilled key={star} size={18} />;
                    } else if (ratingsAverage >= star - 0.5) {
                      return <IconStarHalfFilled key={star} size={18} />;
                    }
                    return (
                      <IconStar
                        key={star}
                        size={18}
                        className="text-gray-300"
                      />
                    );
                  })}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {ratingsAverage} ({ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price Display */}
              <div className="mt-4 flex gap-4 items-center">
                <span
                  className={`tracking-tight ${
                    hasDiscount
                      ? "line-through text-gray-400 text-xl font-medium"
                      : "text-gray-900 text-2xl sm:text-3xl font-bold"
                  }`}
                >
                  {price} EGP
                </span>
                {hasDiscount && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                      {priceAfterDiscount} EGP
                    </span>
                    <span className="rounded-md bg-[#f53b3b] px-2 py-0.75 text-xs font-semibold text-white">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Stock Status Badge */}
              {stock > 0 ? (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span>Out of Stock</span>
                </div>
              )}

              {/* Short Description */}
              <p className="mt-5 border-t pt-5 border-gray-100 text-sm text-gray-600 font-normal leading-relaxed">
                {description}
              </p>

              {/* Quantity Stepper */}
              <div className="mt-6">
                <label className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  Quantity
                </label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("dec")}
                      disabled={selectedQty <= 1 || stock <= 0}
                      className="p-3 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <IconMinus size={18} />
                    </button>
                    <span className="min-w-12 text-center font-bold text-gray-900 text-base">
                      {selectedQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("inc")}
                      disabled={selectedQty >= stock || stock <= 0}
                      className="p-3 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <IconPlus size={18} />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {stock} available
                  </span>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 p-5 border border-gray-100">
                <span className="text-base sm:text-lg font-medium text-gray-600">
                  Total Price:
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {totalPrice} EGP
                </span>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart();
                  }}
                  disabled={stock <= 0 || isAddingToCart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 px-6 font-semibold text-white shadow-md shadow-emerald-500/20 hover:bg-primary-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isAddingToCart ? (
                    <IconLoader2 size={20} className="animate-spin" />
                  ) : (
                    <IconShoppingCartFilled size={20} />
                  )}
                  <span>
                    {stock <= 0
                      ? "Out of Stock"
                      : isAddingToCart
                        ? "Adding..."
                        : "Add to Cart"}
                  </span>
                </button>
                <button
                  type="button"
                  disabled={stock <= 0}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0f172a] py-3.5 px-6 font-semibold text-white shadow-md hover:bg-[#1e293b] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <IconBolt size={20} className="fill-white" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Wishlist & Share Row */}
              <div className="mt-3.5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAddtoWishlist();
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl border py-3 px-4 font-semibold text-sm transition-all cursor-pointer ${
                    isWishlisted
                      ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100/70"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-600"
                  }`}
                >
                  <IconHeart
                    size={20}
                    className={isWishlisted ? "fill-red-600 text-red-600" : ""}
                  />
                  <span>
                    {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Share product"
                  title={shareCopied ? "Link copied!" : "Share product"}
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors shadow-xs hover:border-primary-500 hover:text-primary-600 active:scale-95 cursor-pointer"
                >
                  <IconShare size={20} />
                  {shareCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-2 py-0.5 text-[10px] text-white whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Value Props Row */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-primary-600">
                  <IconTruck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Free Delivery
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Orders over 500 EGP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-primary-600">
                  <IconRotateClockwise size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    30 Days Return
                  </h4>
                  <p className="text-xs font-medium text-gray-500">
                    Money back
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-primary-600">
                  <IconShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Secure Payment
                  </h4>
                  <p className="text-xs font-medium text-gray-500">
                    100% Protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            3. TABBED DETAILS SECTION
        ========================================= */}
        <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xs">
          {/* Tab Navigation Header */}
          <div className="flex items-center gap-8 border-b border-gray-100 pb-4 text-sm sm:text-base font-semibold overflow-x-auto [scrollbar-width:none]">
            {/* Tab 1: Product Details */}
            <button
              type="button"
              onClick={() => setActiveTab("details")}
              className={`flex items-center gap-2 pb-2 transition-all relative shrink-0 cursor-pointer ${
                activeTab === "details"
                  ? "text-[#16a34a]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <IconFileText size={20} />
              <span>Product Details</span>
              {activeTab === "details" && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#16a34a]" />
              )}
            </button>

            {/* Tab 2: Reviews */}
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`flex items-center gap-2 pb-2 transition-all relative shrink-0 cursor-pointer ${
                activeTab === "reviews"
                  ? "text-[#16a34a]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <IconStar size={20} />
              <span>Reviews ({ratingsQuantity ?? 0})</span>
              {activeTab === "reviews" && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#16a34a]" />
              )}
            </button>

            {/* Tab 3: Shipping & Returns */}
            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`flex items-center gap-2 pb-2 transition-all relative shrink-0 cursor-pointer ${
                activeTab === "shipping"
                  ? "text-[#16a34a]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <IconTruck size={20} />
              <span>Shipping &amp; Returns</span>
              {activeTab === "shipping" && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#16a34a]" />
              )}
            </button>
          </div>

          {/* Tab 1 Content: Product Details */}
          {activeTab === "details" && (
            <div className="pt-6 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  About this Product
                </h3>
                <p className="mt-2 text-sm text-gray-600 font-normal leading-relaxed">
                  {description ||
                    "Material Polyester Blend Colour Name Multicolour Department Women"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card: Product Info */}
                <div className="rounded-2xl bg-[#F9FAFB] p-6 sm:p-7 border border-gray-100/60">
                  <h4 className="text-base font-bold text-gray-900 mb-5">
                    Product Information
                  </h4>

                  <dl className="space-y-4 text-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                      <dt className="text-gray-500 font-medium">Category</dt>
                      <dd className="font-semibold text-gray-900">
                        {category?.name || "N/A"}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                      <dt className="text-gray-500 font-medium">Subcategory</dt>
                      <dd className="font-semibold text-gray-900">
                        {subcategory?.[0]?.name || "N/A"}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                      <dt className="text-gray-500 font-medium">Brand</dt>
                      <dd className="font-semibold text-gray-900">
                        {brand?.name || "N/A"}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <dt className="text-gray-500 font-medium">Items Sold</dt>
                      <dd className="font-semibold text-gray-900">
                        {sold ?? 0}+ sold
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Right Card: Key Features */}
                <div className="rounded-2xl bg-[#F9FAFB] p-6 sm:p-7 border border-gray-100/60">
                  <h4 className="text-base font-bold text-gray-900 mb-5">
                    Key Features
                  </h4>

                  <ul className="space-y-4 text-sm font-medium text-gray-700">
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Premium Quality Product</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>100% Authentic Guarantee</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Fast &amp; Secure Packaging</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Quality Tested</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 Content: Reviews */}
          {activeTab === "reviews" && (
            <div className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left: Overall Score */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center py-4">
                  <span className="text-6xl font-extrabold text-gray-900 tracking-tight">
                    {ratingsAverage ?? 0}
                  </span>

                  <div className="mt-3 flex items-center gap-1 text-[#f59e0b]">
                    {[1, 2, 3, 4, 5].map((star) =>
                      (ratingsAverage ?? 0) >= star ? (
                        <IconStarFilled key={star} size={20} />
                      ) : (
                        <IconStar
                          key={star}
                          size={20}
                          className="text-gray-300"
                          stroke={2}
                        />
                      ),
                    )}
                  </div>

                  <span className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
                    Based on {ratingsQuantity ?? 0} reviews
                  </span>
                </div>

                {/* Right: Progress Bars */}
                <div className="md:col-span-8 flex flex-col gap-3.5 pr-2">
                  {breakdown.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center gap-4 text-xs sm:text-sm"
                    >
                      <span className="w-10 text-gray-600 font-medium shrink-0">
                        {item.stars} star
                      </span>

                      <div className="relative h-2 w-full flex-1 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#f59e0b] transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>

                      <span className="w-10 text-right text-gray-500 font-medium shrink-0">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-10 border-t border-gray-100" />

              <div className="flex flex-col items-center justify-center text-center pb-6">
                <IconStarFilled size={44} className="text-gray-300/80 mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  Customer reviews will be displayed here.
                </p>
                <button
                  type="button"
                  className="mt-2 text-sm font-semibold text-[#16a34a] hover:text-[#15803d] hover:underline transition-colors cursor-pointer"
                >
                  Write a Review
                </button>
              </div>
            </div>
          )}

          {/* Tab 3 Content: Shipping & Returns */}
          {activeTab === "shipping" && (
            <div className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card: Shipping Info */}
                <div className="rounded-2xl bg-[#edf9f2] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-xs">
                      <IconTruckFilled size={22} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Shipping Information
                    </h3>
                  </div>

                  <ul className="space-y-3.5 text-sm font-medium text-gray-700">
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Free shipping on orders over 500 EGP</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Standard delivery: 3-5 business days</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>
                        Express delivery available (1-2 business days)
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Track your order in real-time</span>
                    </li>
                  </ul>
                </div>

                {/* Right Card: Returns & Refunds */}
                <div className="rounded-2xl bg-[#edf9f2] p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-xs">
                      <IconRotateClockwise size={22} stroke={2.5} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Returns &amp; Refunds
                    </h3>
                  </div>

                  <ul className="space-y-3.5 text-sm font-medium text-gray-700">
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>30-day hassle-free returns</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Full refund or exchange available</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Free return shipping on defective items</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <IconCheck
                        size={18}
                        className="shrink-0 text-[#16a34a]"
                        stroke={2.5}
                      />
                      <span>Easy online return process</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Card: Buyer Protection Guarantee */}
              <div className="flex items-center gap-4 rounded-2xl bg-[#F9FAFB] p-5 sm:p-6 border border-gray-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200/70 text-gray-600">
                  <IconShieldFilled size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="mt-0.5 text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
                    Get a full refund if your order doesn't arrive or isn't as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
