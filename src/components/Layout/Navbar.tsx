"use client";

import Link from "next/link";
import logo from "../../assets/freshcart-logo.svg";
import Image from "next/image";
import {
  IconBabyCarriage,
  IconChevronDown,
  IconDotsVertical,
  IconHeart,
  IconHeadsetFilled,
  IconMail,
  IconMenu2,
  IconX,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconSearch,
  IconShirtSport,
  IconShoppingCart,
  IconUser,
  IconUserCircle,
  IconPhoneCallFilled,
  IconLogout,
  IconCarFilled,
  IconGiftFilled,
  IconUserPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/features/auth/slices/auth.slice";
import { appStateType } from "@/store/store";
import { deleteToken } from "@/features/auth/server/auth.action";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthenticated, userInfo } = useSelector(
    (state: appStateType) => state.authReducer,
  );
  const { numOfCartItems } = useSelector(
    (state: appStateType) => state.cartReducer,
  );
  const { logout } = authActions;

  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    deleteToken();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-40">
      {/* =========================================
          1. TOP ANNOUNCEMENT BAR (Desktop)
      ========================================= */}
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hidden text-xs lg:flex py-2.5 justify-between items-center text-gray-500">
            {/* Left Perks */}
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2">
                <IconCarFilled size={16} className="text-primary-600" />
                <span>Free Shipping on Orders 500 EGP</span>
              </li>
              <li className="flex items-center gap-2">
                <IconGiftFilled size={16} className="text-primary-600" />
                <span>New Arrivals Daily</span>
              </li>
            </ul>

            {/* Right Contact & User Auth */}
            <ul className="flex items-center gap-5">
              <li className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
                <IconPhoneCallFilled size={14} />
                <Link href="tel:+18001234567">+1 (800) 123-4567</Link>
              </li>
              <li className="flex items-center gap-1.5 pr-4 border-r border-gray-200 hover:text-primary-600 transition-colors">
                <IconMail stroke={2} size={16} />
                <Link href="mailto:support@freshcart.com">
                  support@freshcart.com
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <IconUser stroke={2} size={16} />
                      <span>{userInfo?.name}</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                    >
                      <IconLogout stroke={2} size={16} />
                      <span>Sign out</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                    >
                      <IconUser stroke={2} size={16} />
                      <span>Sign in</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                    >
                      <IconUserPlus stroke={2} size={16} />
                      <span>Sign up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================
          2. MAIN NAVBAR
      ========================================= */}
      <div className=" w-full  bg-white shadow-xs border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="py-3.5 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                src={logo}
                alt="Freshcart Logo"
                className="w-36 sm:w-40 h-auto"
                priority
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="relative hidden lg:flex items-center flex-1 max-w-md mx-4">
              <input
                type="text"
                className="w-full rounded-full border border-gray-200 bg-gray-50/80 px-4 py-2 pl-4 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/15 transition-all"
                placeholder="Search for products ..."
              />
              <IconSearch
                stroke={2}
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Desktop Navigation Links & Actions */}
            <menu className="hidden lg:flex gap-6 items-center text-sm font-medium text-gray-700">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary-600 transition-colors"
                >
                  Shop
                </Link>
              </li>

              {/* Categories Dropdown */}
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors focus:outline-none"
                >
                  <span>Categories</span>
                  <IconChevronDown
                    stroke={2}
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="absolute z-50 top-10 left-0 w-60 bg-white rounded-xl shadow-xl border border-gray-100 divide-y divide-gray-50 overflow-hidden py-1">
                    <li>
                      <Link
                        href="/categories"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconDotsVertical size={18} />
                        <span>View All Categories</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d5b90049ad0b52b90048"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconUser size={18} />
                        <span>Men's Fashion</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d58a0049ad0b52b9003f"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconShirtSport size={18} />
                        <span>Women's Fashion</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/baby-toys"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconBabyCarriage size={18} />
                        <span>Baby & Toys</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/beauty-health"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconReportMedical size={18} />
                        <span>Beauty & Health</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d2d167d9aa4ca970649f"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <IconProgressBolt size={18} />
                        <span>Electronics</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href="/brands"
                  className="hover:text-primary-600 transition-colors"
                >
                  Brands
                </Link>
              </li>

              {/* 24/7 Support Widget */}
              <li className="pl-2 border-l border-gray-200">
                <Link href="/contact" className="flex items-center gap-2 group">
                  <div className="bg-primary-50 p-2 text-primary-600 rounded-full group-hover:bg-primary-100 transition-colors">
                    <IconHeadsetFilled size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-medium block leading-tight">
                      Support
                    </span>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">
                      24/7 help
                    </p>
                  </div>
                </Link>
              </li>

              {/* Wishlist Icon */}
              <li>
                <Link
                  href="/wishlist"
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <IconHeart stroke={2} size={22} />
                </Link>
              </li>

              {/* Cart Icon */}
              <li>
                <Link
                  href="/cart"
                  className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <IconShoppingCart stroke={2} size={22} />
                  <span className="absolute 1 top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                    {numOfCartItems}
                  </span>
                </Link>
              </li>

              {/* Profile or Sign-in */}
              {isAuthenticated ? (
                <li>
                  <Link
                    href="/profile"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <IconUserCircle stroke={2} size={24} />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
                  >
                    <IconUser size={16} />
                    <span>Sign in</span>
                  </Link>
                </li>
              )}
            </menu>

            {/* Mobile Header Actions (Cart + Burger) */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100"
              >
                <IconShoppingCart stroke={2} size={22} />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  0
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:scale-95 transition-all"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <IconX size={22} />
                ) : (
                  <IconMenu2 size={22} />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* =========================================
            3. MOBILE MENU COLLAPSIBLE DRAWER
        ========================================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-5 shadow-lg">
            {/* Mobile Search */}
            <div className="relative mb-5">
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-primary-600 focus:outline-none"
                placeholder="Search products..."
              />
              <IconSearch
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col space-y-3 font-medium text-gray-700">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50 hover:text-primary-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50 hover:text-primary-600"
                >
                  Shop
                </Link>
              </li>

              {/* Mobile Categories Submenu */}
              <li>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 hover:text-primary-600"
                >
                  <span>Categories</span>
                  <IconChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className="mt-1 space-y-1 pl-4 text-sm text-gray-600">
                    <li>
                      <Link
                        href="/categories"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-1.5 hover:text-primary-600"
                      >
                        View All Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d5b90049ad0b52b90048"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-1.5 hover:text-primary-600"
                      >
                        Men's Fashion
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d58a0049ad0b52b9003f"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-1.5 hover:text-primary-600"
                      >
                        Women's Fashion
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/categories/6439d2d167d9aa4ca970649f"
                        onClick={() => {
                          setIsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-md px-3 py-1.5 hover:text-primary-600"
                      >
                        Electronics
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href="/brands"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50 hover:text-primary-600"
                >
                  Brands
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-50 hover:text-primary-600"
                >
                  <IconHeart size={18} />
                  <span>Wishlist</span>
                </Link>
              </li>

              {/* Mobile Auth Actions */}
              <li className="pt-3 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-800 font-semibold hover:bg-gray-50"
                    >
                      <IconUser size={18} />
                      <span>{userInfo?.name} (Profile)</span>
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <IconLogout size={18} />
                      <span>Sign out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <IconUser size={16} />
                      <span>Sign in</span>
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-primary-600 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-700"
                    >
                      <IconUserPlus size={16} />
                      <span>Sign up</span>
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* <div className="h-[68px] w-full" aria-hidden="true" /> */}
    </header>
  );
}
