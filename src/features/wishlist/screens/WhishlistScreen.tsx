"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconHeartFilled,
  IconShoppingCartFilled,
  IconCheck,
  IconTrash,
  IconArrowLeft,
  IconLoader2,
  IconHeart,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Product } from "@/features/products/types/Products.types";
import {
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "../server/whishlist.actions";

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [cartProductIds, setCartProductIds] = useState<string[]>([]); // Track products in cart

  // Fetch Wishlist Items on Mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getLoggedUserWishlist();
      setWishlistItems(res.data || []);
    } catch (err: any) {
      console.error("Failed to load wishlist:", err);
      toast.error(
        err?.response?.data?.message || "Failed to load wishlist items",
      );
    } finally {
      setLoading(false);
    }
  };

  // Remove Item from Wishlist
  const handleRemove = async (productId: string) => {
    try {
      setRemovingId(productId);
      const res = await removeProductFromWishlist(productId);

      // Update local state
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      toast.success(res.message || "Product removed from wishlist");
    } catch (err: any) {
      console.error("Failed to remove product:", err);
      toast.error(err?.response?.data?.message || "Could not remove product");
    } finally {
      setRemovingId(null);
    }
  };

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
          <span className="text-gray-900 font-semibold">Wishlist</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* =========================================
            2. PAGE TITLE & COUNT
        ========================================= */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 shadow-sm border border-red-100">
              <IconHeartFilled size={24} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                My Wishlist
              </h1>
              <p className="mt-1 text-sm text-gray-500 font-medium">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            3. MAIN CONTENT: TABLE OR EMPTY STATE
        ========================================= */}
        {loading ? (
          /* Loading State */
          <div className="flex h-72 w-full flex-col items-center justify-center gap-3">
            <IconLoader2 size={36} className="animate-spin text-[#16a34a]" />
            <p className="text-sm font-medium text-gray-500">
              Loading your wishlist...
            </p>
          </div>
        ) : wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-400">
              <IconHeart size={40} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Your wishlist is empty
            </h3>
            <p className="mt-1.5 text-sm text-gray-500">
              Save items you love here by clicking the heart icon on any
              product.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#16a34a] px-6 py-3 font-semibold text-white shadow-md shadow-emerald-500/20 hover:bg-[#15803d] transition-all"
            >
              <IconArrowLeft size={18} />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          /* Wishlist Table Card */
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-gray-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-100">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right pr-2">Actions</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-gray-100">
              {wishlistItems.map((product) => {
                const inCart = cartProductIds.includes(product._id);
                const isOutOfStock = product.quantity <= 0;

                return (
                  <div
                    key={product._id}
                    className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center p-5 sm:p-6 gap-4 md:gap-0 transition-colors hover:bg-gray-50/50"
                  >
                    {/* 1. Product Thumbnail & Titles (Col 6) */}
                    <div className="col-span-6 flex items-center gap-4">
                      {/* Image Box */}
                      <Link
                        href={`/products/${product._id}`}
                        className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50/80 p-2 border border-gray-100 flex items-center justify-center hover:opacity-90"
                      >
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="h-full w-full object-contain"
                        />
                      </Link>

                      <div className="flex flex-col min-w-0">
                        <Link
                          href={`/products/${product._id}`}
                          className="text-base font-bold text-gray-900 hover:text-[#16a34a] transition-colors truncate"
                        >
                          {product.title}
                        </Link>
                        <span className="text-xs text-gray-400 font-medium mt-0.5">
                          {product.category?.name || "Fashion"}
                        </span>
                      </div>
                    </div>

                    {/* 2. Price (Col 2) */}
                    <div className="col-span-2 flex md:justify-center items-baseline gap-1 text-base font-bold text-gray-900">
                      <span>{product.priceAfterDiscount ?? product.price}</span>
                      <span className="text-xs font-semibold text-gray-500">
                        EGP
                      </span>
                    </div>

                    {/* 3. Status Badge (Col 2) */}
                    <div className="col-span-2 flex md:justify-center">
                      {inCart ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#16a34a]">
                          <IconShoppingCartFilled size={14} />
                          <span>In Cart</span>
                        </span>
                      ) : isOutOfStock ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          <span>Out of Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#16a34a]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                          <span>In Stock</span>
                        </span>
                      )}
                    </div>

                    {/* 4. Actions: Cart CTA & Delete (Col 2) */}
                    <div className="col-span-2 flex w-full md:w-auto items-center justify-between md:justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                      {inCart ? (
                        <Link
                          href="/cart"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <IconCheck
                            size={16}
                            className="text-[#16a34a]"
                            stroke={2.5}
                          />
                          <span>View Cart</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#16a34a] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#15803d] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                          <IconShoppingCartFilled size={16} />
                          <span>Add to Cart</span>
                        </button>
                      )}

                      {/* Trash Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(product._id)}
                        disabled={removingId === product._id}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40 cursor-pointer border border-gray-100"
                        aria-label="Remove item"
                      >
                        {removingId === product._id ? (
                          <IconLoader2
                            size={16}
                            className="animate-spin text-red-500"
                          />
                        ) : (
                          <IconTrash size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================
            4. FOOTER LINK
        ========================================= */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#16a34a] transition-colors"
          >
            <span>←</span>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
