"use client";

import React from "react";
import Link from "next/link";
import {
  IconHeart,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconRefresh,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import { Product } from "../types/Products.types";
import { addCartItem } from "@/features/cart/server/Cart.actions";
import { toast } from "sonner";
import { addProductToWishlist } from "@/features/wishlist/server/whishlist.actions";

export default function ProductCard({ productInfo }: { productInfo: Product }) {
  const hasDiscount =
    Boolean(productInfo.priceAfterDiscount) &&
    (productInfo.priceAfterDiscount ?? 0) < productInfo.price;

  // Calculate discount percentage (e.g. -20%)
  const discountPercent = hasDiscount
    ? Math.round(
        ((productInfo.price - (productInfo.priceAfterDiscount ?? 0)) /
          productInfo.price) *
          100,
      )
    : null;
  const prodID = productInfo._id;
  async function handleAddtoWishlist() {
    const response = await addProductToWishlist(prodID);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
    }
    if (response.status === "success") {
      toast.success(response.message);
    }
  }
  async function handleAddToCart() {
    const response = await addCartItem(prodID);
    if (response.status === "error" || response.status === "fail") {
      toast.error(response.message);
    }
    if (response.status === "success") {
      toast.success(response.message);
    }
  }
  return (
    <div className="group relative cursor-pointer flex w-full min-h-80 flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1.5">
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-[#f53b3b] px-2 py-0.5 text-xs font-semibold text-white shadow-xs">
          -{discountPercent}%
        </span>
      )}

      {/* Floating Action Buttons (Higher z-index so they can be clicked) */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2">
        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Add to wishlist handler
            handleAddtoWishlist();
          }}
          aria-label="Add to wishlist"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:text-red-600 active:scale-90"
        >
          <IconHeart stroke={2} size={18} />
        </button>

        {/* Compare */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Compare handler
          }}
          aria-label="Compare"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:text-primary-600 active:scale-90"
        >
          <IconRefresh stroke={2} size={18} />
        </button>

        {/* Quick View */}
        <Link
          href={`/products/${productInfo._id}`}
          aria-label="Quick view product"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition-colors hover:text-primary-600 active:scale-90"
        >
          <IconEye stroke={2} size={18} />
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative mb-3 flex w-full aspect-square items-center justify-center overflow-hidden rounded-lg bg-gray-50/50">
        <img
          src={productInfo.imageCover}
          alt={productInfo.title}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div>
        {/* Category */}
        <span className="text-xs font-normal text-gray-400 block truncate">
          {productInfo.category?.name}
        </span>

        {/* Product Title */}
        <h3 className="mt-1 truncate text-base font-semibold text-[#183b56] transition-colors group-hover:text-primary-600">
          {productInfo.title}
        </h3>

        {/* Dynamic Star Ratings */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex text-[#ffc107]">
            {[1, 2, 3, 4, 5].map((star) => {
              const rating = productInfo.ratingsAverage ?? 0;
              if (rating >= star) {
                return <IconStarFilled key={star} size={16} />;
              } else if (rating >= star - 0.5) {
                return <IconStarHalfFilled key={star} size={16} />;
              } else {
                return (
                  <IconStar
                    key={star}
                    stroke={2}
                    size={16}
                    className="text-gray-300"
                  />
                );
              }
            })}
          </div>

          <span className="text-xs text-gray-500 font-medium">
            {productInfo.ratingsAverage} ({productInfo.ratingsQuantity ?? 0})
          </span>
        </div>

        {/* Price & Add to Cart Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-[#0c2340]">
              {productInfo.priceAfterDiscount ?? productInfo.price} EGP
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {productInfo.price} EGP
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
            aria-label="Add to cart"
            className="flex h-9 w-9 z-20 items-center justify-center rounded-full bg-primary-600 text-white shadow-sm transition-all duration-200 hover:bg-primary-700 active:scale-95"
          >
            <IconPlus size={18} stroke={2.5} />
          </button>
        </div>
      </div>

      {/* Whole-card Click Link */}
      <Link
        className="absolute inset-0 z-0"
        href={`/products/${productInfo._id}`}
        aria-label={productInfo.title}
      />
    </div>
  );
}
