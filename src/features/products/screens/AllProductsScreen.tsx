import React from "react";
import { featuredProducts } from "../api/Products.api";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { IconStack2Filled } from "@tabler/icons-react";

export default function AllProductsScreen() {
  const productsData = featuredProducts.featured;

  return (
    <>
      <div className="min-h-screen bg-[#FDFDFD]">
        {/* =========================================
          1. GREEN HERO BANNER
      ========================================= */}
        <section className="relative overflow-hidden bg-linear-to-b from-primary-600 via-primary-500 to-primary-400 py-14 sm:py-16 text-white shadow-xs">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-100">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">All Products</span>
            </nav>

            {/* Banner Title & Icon Box */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Layer / Stack Icon Box */}
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-inner text-white">
                <IconStack2Filled size={32} />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                  All Products
                </h1>
                <p className="mt-1 text-xs sm:text-base font-normal text-emerald-50">
                  Explore our complete product collection
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Home featured products */}
        <section className="py-10 container">
          <div className="font-medium">Showing {productsData?.length} products</div>
          <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {productsData?.map((product) => (
              <ProductCard key={product._id} productInfo={product} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
