"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconRefresh,
  IconEye,
  IconStarFilled,
  IconStar,
  IconPlus,
} from "@tabler/icons-react";

// Import Swiper core styles
import "swiper/css";
import "swiper/css/navigation";

import { Product } from "../types/Products.types";
import { addCartItem } from "@/features/cart/server/Cart.actions";
import { toast } from "sonner";
export default function RelatedProducts({
  products,
  id,
}: {
  products: Product[];
  id: string;
}) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  async function handleAddToCart() {
    const response = await addCartItem(id);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
    }
    if (response.status === "success") {
      toast.success(response.message);
    }
  }
  if (!products || products.length === 0) return null;

  return (
    <section className="py-10 container mx-auto px-4 lg:px-8">
      {/* =========================================
          1. HEADER WITH TITLE & ARROWS
      ========================================= */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="relative text-2xl font-bold text-black/80 px-3">
          <div className="section-mark"></div>
          You May Also{" "}
          <span className="bg-linear-to-r from-primary-600  to-primary-700 bg-clip-text text-transparent py-1">
            Like
          </span>
        </h2>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous products"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <IconChevronLeft size={18} stroke={2.5} />
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Next products"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
          >
            <IconChevronRight size={18} stroke={2.5} />
          </button>
        </div>
      </div>

      {/* =========================================
          2. SWIPER SLIDER (2 -> 5 items)
      ========================================= */}
      <div className="w-full min-w-0">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2} // Minimum 2 visible on mobile
          slidesPerGroup={1} // Shifts 1 card per click
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5, // Maximum 5 on large desktops
              spaceBetween: 20,
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as NavigationOptions;
            if (navigation) {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          className="py-2"
        >
          {products.map((product) => {
            // Compute discount percentage if discounted
            const hasDiscount =
              product.priceAfterDiscount &&
              product.priceAfterDiscount < product.price;
            const discountPercentage = hasDiscount
              ? Math.round(
                  ((product.price - (product.priceAfterDiscount ?? 0)) /
                    product.price) *
                    100,
                )
              : null;

            return (
              <SwiperSlide key={product._id} className="h-auto">
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:shadow-md hover:border-gray-200">
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="absolute left-3 top-3 z-10 rounded-md bg-[#f53b3b] px-2 py-0.5 text-xs font-bold text-white shadow-xs">
                      -{discountPercentage}%
                    </span>
                  )}

                  {/* Floating Action Buttons */}
                  <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:text-primary-600"
                    >
                      <IconHeart size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Compare"
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:text-primary-600"
                    >
                      <IconRefresh size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Quick View"
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm transition-colors hover:text-primary-600"
                    >
                      <IconEye size={16} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative mb-3 flex h-40 sm:h-48 w-full items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div>
                    <span className="text-[11px] font-medium text-gray-400 block truncate">
                      {product.category?.name}
                    </span>

                    <h3 className="mt-1 truncate text-xs sm:text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                      {product.title}
                    </h3>

                    {/* Star Ratings */}
                    <div className="mt-1.5 flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((star) =>
                          (product.ratingsAverage ?? 0) >= star ? (
                            <IconStarFilled
                              key={star}
                              size={14}
                              className="sm:w-3.5 sm:h-3.5"
                            />
                          ) : (
                            <IconStar
                              key={star}
                              size={14}
                              className="text-gray-300 sm:w-3.5 sm:h-3.5"
                            />
                          ),
                        )}
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {product.ratingsAverage} ({product.ratingsQuantity ?? 0}
                        )
                      </span>
                    </div>

                    {/* Price & Add to Cart Button */}
                    <div className="mt-3 flex items-center justify-between z-10">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span
                          className={`text-sm sm:text-base font-bold ${
                            hasDiscount ? "text-primary-600" : "text-gray-900"
                          }`}
                        >
                          {product.priceAfterDiscount ?? product.price} EGP
                        </span>
                        {hasDiscount && (
                          <span className="text-[11px] sm:text-xs text-gray-400 line-through">
                            {product.price} EGP
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Add to cart handler
                          handleAddToCart();
                        }}
                        aria-label="Add to Cart"
                        className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white shadow-xs transition-all duration-200 hover:bg-primary-700 active:scale-95 z-10"
                      >
                        <IconPlus size={16} stroke={2.5} />
                      </button>
                    </div>
                  </div>

                  {/* Clickable Card Link */}
                  <Link
                    href={`/products/${product._id || product.id}`}
                    className="absolute inset-0 z-0"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
