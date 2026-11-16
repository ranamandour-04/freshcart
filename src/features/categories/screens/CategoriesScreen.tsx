import Link from "next/link";
import { IconStack2Filled, IconArrowNarrowRight } from "@tabler/icons-react";
import { allCategories } from "../api/Categories.api";

export default function CategoriesScreen() {
  const categoriesData = allCategories.categories;
  return (
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
            <span className="text-white">Categories</span>
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
                All Categories
              </h1>
              <p className="mt-1 text-xs sm:text-base font-normal text-emerald-50">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. CATEGORIES 5-COLUMN GRID
      ========================================= */}
      <main className="container mx-auto px-4 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {categoriesData?.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 shadow-xs  hover:shadow-xl hover:-translate-y-1"
            >
              {/* Category Image Box */}
              <div className="relative aspect-square h-48 w-full overflow-hidden bg-contain rounded-xl bg-gray-50 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="max-h-64 w-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Title & Hover 'View Subcategories' */}
              <div className="mt-4 flex flex-col items-center justify-center text-center">
                <h3 className="text-base font-bold text-gray-800 transition-colors duration-200 group-hover:text-primary-600">
                  {category.name}
                </h3>

                <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 text-primary-700 text-xs transition-all duration-300 ">
                  <span>View Subcategories</span>
                  <IconArrowNarrowRight stroke={1} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
