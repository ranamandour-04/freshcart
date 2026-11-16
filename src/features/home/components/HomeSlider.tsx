"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HomeSlideImage from "../../../assets/home-slider-1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeSlider() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden">
      {/* 1. Equal Height: Fixed responsive height on Swiper container */}
      <Swiper
        className="w-full h-90 sm:h-105 md:h-115"
        slidesPerView={1}
        loop={true}
        speed={600}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".slider-prev-btn",
          nextEl: ".slider-next-btn",
        }}
        pagination={{
          clickable: true,
          
        }}
      >
        {/* ================= Slide 1 ================= */}
        <SwiperSlide className="h-full">
          <div
            className="h-full w-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 text-white space-y-4"
            style={{
              backgroundImage: `linear-gradient(to right, #16a34add, #4ade80aa), url(${HomeSlideImage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h2 className="max-w-sm font-bold text-2xl sm:text-3xl leading-snug sm:leading-10">
              Fresh Products Delivered to your Door
            </h2>
            <p className="text-base sm:text-lg font-normal">
              Get 20% off your first order
            </p>
            <div className="flex gap-4 pt-1">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-white text-emerald-600 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={() => router.push("/deals")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-transparent text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                View Deals
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= Slide 2 ================= */}
        <SwiperSlide className="h-full">
          <div
            className="h-full w-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 text-white space-y-4"
            style={{
              backgroundImage: `linear-gradient(to right, #16a34add, #4ade80aa), url(${HomeSlideImage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h2 className="max-w-sm font-bold text-2xl sm:text-3xl leading-snug sm:leading-10">
              Premium Quality Guaranteed
            </h2>
            <p className="text-base sm:text-lg font-normal">
              Fresh from farm to your table
            </p>
            <div className="flex gap-4 pt-1">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-white text-emerald-600 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={() => router.push("/about")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-transparent text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* ================= Slide 3 ================= */}
        <SwiperSlide className="h-full">
          <div
            className="h-full w-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 text-white space-y-4"
            style={{
              backgroundImage: `linear-gradient(to right, #16a34add, #4ade80aa), url(${HomeSlideImage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <h2 className="max-w-sm font-bold text-2xl sm:text-3xl leading-snug sm:leading-10">
              Fast &amp; Free Delivery
            </h2>
            <p className="text-base sm:text-lg font-normal">
              Same day delivery available
            </p>
            <div className="flex gap-4 pt-1">
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-white text-emerald-600 transition-transform duration-200 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                Shop Now
              </button>
              <button
                type="button"
                onClick={() => router.push("/delivery")}
                className="border-2 border-white/50 py-2 px-5 rounded-lg font-semibold text-sm sm:text-base bg-transparent text-white transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                Delivery Info
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Navigation Arrows */}
        <button
          type="button"
          aria-label="Previous Slide"
          className="slider-prev-btn hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-emerald-600 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        >
          <IconChevronLeft size={24} stroke={2.5} />
        </button>

        <button
          type="button"
          aria-label="Next Slide"
          className="slider-next-btn hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-emerald-600 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer"
        >
          <IconChevronRight size={24} stroke={2.5} />
        </button>

        {/* 2. Centered Pagination (Tailwind only) */}
        <div className="custom-slider-pagination absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2" />
      </Swiper>
    </section>
  );
}
