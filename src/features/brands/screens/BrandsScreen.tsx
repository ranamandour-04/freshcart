"use client";
import Link from "next/link";
import { IconArrowNarrowRight, IconTagFilled } from "@tabler/icons-react";
import { allBrands } from "../api/Brands.api";

export default function BrandsScreen() {
  const brandsdata = allBrands.brands;
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-800 flex flex-col font-sans">
      {/* =========================================
          3. PURPLE HERO BANNER
      ========================================= */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#8026ff] via-[#8d44ff] to-[#b370ff] py-14 sm:py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-purple-200">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Brands</span>
          </nav>

          {/* Header Title with Tag Icon */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-md shadow-inner text-white">
              <IconTagFilled size={30} className="-rotate-12" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Top Brands
              </h1>
              <p className="mt-1 text-xs sm:text-base font-normal text-purple-100">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. BRANDS GRID SECTION
      ========================================= */}
      <main className="container mx-auto px-4 lg:px-8 py-10 sm:py-14 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6">
          {brandsdata?.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-300 shadow-xs hover:-translate-y-1 hover:shadow-md"
            >
              {/* Inner Gray Logo Container */}
              <div className="flex h-36 w-full items-center justify-center rounded-xl bg-gray-50/80 p-5 transition-colors group-hover:bg-gray-100/70">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-108"
                  loading="lazy"
                />
              </div>

              {/* Brand Label */}
              <h3 className="mt-3 text-center text-sm font-medium text-gray-800 transition-colors group-hover:text-purple-700">
                {brand.name}
              </h3>
              <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 text-purple-700 text-xs transition-all duration-300 ">
                <span>View Products</span>
                <IconArrowNarrowRight stroke={1} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
