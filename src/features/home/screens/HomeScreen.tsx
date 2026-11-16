import CategoriesCard from "../../categories/components/CategoriesCard";
import HomeSlider from "../components/HomeSlider";
import {
  IconArrowBack,
  IconArrowNarrowRight,
  IconHeadphonesFilled,
  IconShieldHalfFilled,
  IconTruckFilled,
} from "@tabler/icons-react";
import { allCategories } from "@/features/categories/api/Categories.api";
import { featuredProducts } from "@/features/products/api/Products.api";
import ProductCard from "@/features/products/components/ProductCard";
import Newsletter from "../components/Newsletter";
import Link from "next/link";
import React from "react";
// import Link from "next/link";
import { IconFlame, IconSparkles, IconArrowRight } from "@tabler/icons-react";

interface PromoCardProps {
  badgeIcon: React.ReactNode;
  badgeText: string;
  title: string;
  description: string;
  discount: string;
  couponCode: string;
  buttonText: string;
  href?: string;
  gradientClass: string;
  buttonTextColor: string;
}

export default function HomeScreen() {
  function PromoCard({
    badgeIcon,
    badgeText,
    title,
    description,
    discount,
    couponCode,
    buttonText,
    href = "#",
    gradientClass,
    buttonTextColor,
  }: PromoCardProps) {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl ${gradientClass} p-8 sm:p-10 text-white shadow-sm flex flex-col justify-between min-h-[340px]`}
      >
        {/* Top-Right Decorative Circular Overlay */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-52 w-52 rounded-full bg-white/10" />

        {/* Top Content */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-xs text-xs font-medium text-white mb-4">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-white leading-tight">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="mt-2 text-sm sm:text-base text-white/85 font-normal">
            {description}
          </p>

          {/* Discount & Promo Code */}
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {discount}
            </span>
            <span className="text-xs sm:text-sm text-white/80 font-normal">
              Use code:{" "}
              <strong className="font-bold text-white tracking-wide uppercase">
                {couponCode}
              </strong>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="relative z-10 mt-8">
          <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm sm:text-base font-semibold ${buttonTextColor} shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg active:scale-95`}
          >
            <span>{buttonText}</span>
            <IconArrowRight size={18} stroke={2.5} />
          </Link>
        </div>
      </div>
    );
  }
  const categoriesData = allCategories.categories;
  const productsData = featuredProducts.featured;

  return (
    <>
      <div className="flex flex-col bg-white">
        {/* Home slider */}
        <HomeSlider />
        <main className="px-3">
          <section className="bg-[#F9FAFB] py-3 md:py-4">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {/* 1. Free Shipping */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="bg-blue-100 rounded-full p-2.5 shrink-0">
                    <IconTruckFilled
                      size={24}
                      className="text-blue-600 sm:w-[26px] sm:h-[26px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm sm:text-base text-black">
                      Free Shipping
                    </h3>
                    <p className="text-[12px] font-medium text-gray-500">
                      On orders over 500 EGP
                    </p>
                  </div>
                </div>

                {/* 2. Secure Payment */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="bg-primary-100 rounded-full p-2.5 shrink-0">
                    <IconShieldHalfFilled
                      size={24}
                      className="text-primary-600 sm:w-[26px] sm:h-[26px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm sm:text-base text-black">
                      Secure Payment
                    </h3>
                    <p className="text-[12px] font-medium text-gray-500">
                      100% secure transactions
                    </p>
                  </div>
                </div>

                {/* 3. Easy Returns */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="bg-orange-100 rounded-full p-2.5 shrink-0">
                    <IconArrowBack
                      stroke={2}
                      size={24}
                      className="text-orange-600 sm:w-[26px] sm:h-[26px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm sm:text-base text-black">
                      Easy Returns
                    </h3>
                    <p className="text-[12px] font-medium text-gray-500">
                      14-day return policy
                    </p>
                  </div>
                </div>

                {/* 4. 24/7 Support */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="bg-purple-100 rounded-full p-2.5 shrink-0">
                    <IconHeadphonesFilled
                      size={24}
                      className="text-purple-600 sm:w-[26px] sm:h-[26px]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-sm sm:text-base text-black">
                      24/7 Support
                    </h3>
                    <p className="text-[12px] font-medium text-gray-500">
                      Dedicated support team
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Home categories */}
          <section className="py-10 sm:py-10 container mx-auto px-4 lg:px-8">
            {/* Header Row */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-black/80 px-3">
                <div className="section-mark"></div>
                Shop By{" "}
                <span className="bg-linear-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent py-1">
                  Category
                </span>
              </h2>

              <Link
                href="/categories"
                className="group flex items-center gap-1 text-xs sm:text-sm md:text-base text-primary-600 cursor-pointer hover:text-primary-700 font-medium shrink-0 *:transition-all *:duration-300"
              >
                <span>View All Categories</span>
                <IconArrowNarrowRight
                  stroke={2}
                  className="size-4 sm:size-5 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Categories Grid */}
            <div className="py-6 sm:py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
              {categoriesData?.map((categ) => (
                <CategoriesCard key={categ._id} categoryInfo={categ} />
              ))}
            </div>
          </section>
          {/* deals */}
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Fresh Organic Fruits */}
              <PromoCard
                badgeIcon={
                  <IconFlame
                    size={15}
                    className="text-amber-400 fill-amber-400"
                  />
                }
                badgeText="Deal of the Day"
                title="Fresh Organic Fruits"
                description="Get up to 40% off on selected organic fruits"
                discount="40% OFF"
                couponCode="ORGANIC40"
                buttonText="Shop Now"
                href="/shop/fruits"
                gradientClass="bg-gradient-to-br from-[#00b473] via-[#009b69] to-[#007a53]"
                buttonTextColor="text-[#009b69]"
              />

              {/* Card 2: Exotic Vegetables */}
              <PromoCard
                badgeIcon={
                  <IconSparkles size={15} className="text-amber-300" />
                }
                badgeText="New Arrivals"
                title="Exotic Vegetables"
                description="Discover our latest collection of premium vegetables"
                discount="25% OFF"
                couponCode="FRESH25"
                buttonText="Explore Now"
                href="/shop/vegetables"
                gradientClass="bg-gradient-to-br from-[#ff9337] via-[#ff5d41] to-[#ff2a57]"
                buttonTextColor="text-[#ff5d41]"
              />
            </div>
          </section>
          {/* Home featured products */}
          <section className="py-10 container">
            <h2 className="relative text-3xl font-bold text-black/80 px-3">
              <div className="section-mark"></div>
              Featured{" "}
              <span className="bg-linear-to-r from-primary-600  to-primary-700 bg-clip-text text-transparent py-1">
                Products
              </span>
            </h2>
            <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {productsData?.map((product) => (
                <ProductCard key={product._id} productInfo={product} />
              ))}
            </div>
          </section>
          {/* Newsletter */}
          <div className=" bg-[#F9FAFB]">
            <Newsletter />
          </div>
        </main>
      </div>
    </>
  );
}
