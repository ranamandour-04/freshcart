"use client";
import { useState } from "react";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { CartItemType } from "../types/Cart.types";
import Link from "next/link";
import { removeCartItem } from "../server/Cart.actions";
import { toast } from "sonner";

export default function CartItem({ itemInfo }: { itemInfo: CartItemType }) {
  async function handleRemoveItem() {
    const response = await removeCartItem(itemInfo.product._id);
    if (response.status === "fail" || response.status === "error") {
      toast.error(response.message ?? "try again");
      return;
    }
    if (response.status === "success") {
      toast.success(response.message ?? "item removed successfully");
    }
  }
  return (
    <>
      <div className="relative rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all hover:shadow-sm">
        {/* Item Details Row */}
        <div className="relative flex items-start gap-4 sm:gap-5">
          {/* Product Thumbnail Box */}
          <div className="h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2 flex items-center justify-center">
            <img
              src={itemInfo.product.imageCover}
              alt={itemInfo.product.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h3 className="text-base relative cursor-pointer sm:text-lg font-bold text-gray-900">
              {itemInfo.product.title}
            </h3>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-primary-600">
                {itemInfo.product.category?.name}
              </span>
            </div>
            <Link
              className="absolute inset-0"
              href={`/products/${itemInfo.product._id}`}
            ></Link>
            {/* Price per unit */}
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-base font-bold text-primary-600">
                {itemInfo.price} EGP
              </span>
              <span className="text-xs text-gray-400">per unit</span>
            </div>

            {/* Stock indicator badge */}
            {itemInfo.product.quantity === 0 ? (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-700 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>out Stock</span>
              </div>
            ) : (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>In Stock</span>
              </div>
            )}
          </div>
        </div>

        {/* Quantity Controls & Line Total */}
        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          {/* Stepper */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-2xs">
            <button
              type="button"
              disabled={itemInfo.count <= 1}
              className="p-2 text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors"
              aria-label="Decrease quantity"
            >
              <IconMinus size={16} />
            </button>
            <span className="w-9 text-center font-bold text-gray-800 text-sm">
              {itemInfo.count}
            </span>
            <button
              type="button"
              disabled={itemInfo.count === itemInfo.product.quantity}
              className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Increase quantity"
            >
              <IconPlus size={16} />
            </button>
          </div>

          {/* Total Item Price */}
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-gray-400 font-medium">Total</span>
            <span className="text-lg font-bold text-gray-900">
              {itemInfo.price * itemInfo.count}
            </span>
            <span className="text-xs font-semibold text-gray-500">EGP</span>
          </div>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => {
              handleRemoveItem();
            }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
            aria-label="Remove item"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
