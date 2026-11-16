import lightLogo from "../../assets/mini-logo.png";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowBack,
  IconArrowBackUp,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
  IconCreditCard,
  IconCreditCardFilled,
  IconHeadphones,
  IconHeadphonesFilled,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShieldCheck,
  IconShieldHalfFilled,
  IconTruck,
  IconTruckFilled,
} from "@tabler/icons-react";

const shopLinks = [
  "All Products",
  "Categories",
  "Brands",
  "Electronics",
  "Men's Fashion",
  "Women's Fashion",
];

const accountLinks = [
  "My Account",
  "Order History",
  "Wishlist",
  "Shopping Cart",
  "Sign In",
  "Create Account",
];

const supportLinks = [
  "Contact Us",
  "Help Center",
  "Shipping Info",
  "Returns & Refunds",
  "Track Order",
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  return (
    <div>
      <section className="bg-linear-to-t from-primary-200/50 to-primary-100/50 border-t border-primary-200/50">
        <div className="py-3">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300">
                <div className="bg-primary-200/90 rounded-full p-2.5 shrink-0">
                  <IconTruckFilled
                    size={24}
                    className="text-primary-600 sm:w-[26px] sm:h-[26px]"
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

              {/* Feature 2 */}
              <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300">
                <div className="bg-primary-200/90 rounded-full p-2.5 shrink-0">
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

              {/* Feature 3 */}
              <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300">
                <div className="bg-primary-200/90 rounded-full p-2.5 shrink-0">
                  <IconArrowBack
                    stroke={2}
                    size={24}
                    className="text-primary-600 sm:w-[26px] sm:h-[26px]"
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

              {/* Feature 4 */}
              <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300">
                <div className="bg-primary-200/90 rounded-full p-2.5 shrink-0">
                  <IconHeadphonesFilled
                    size={24}
                    className="text-primary-600 sm:w-[26px] sm:h-[26px]"
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
        </div>
      </section>
      <footer className="bg-[#0b1c2b] text-slate-100">
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_0.8fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-lg bg-white px-5 py-2 shadow-sm">
                  <div className="flex items-center justify-center rounded-lg bg-[#edf9f1]">
                    <Image
                      src={lightLogo}
                      alt="FreshCart logo"
                      className="h-6 w-auto"
                    />
                  </div>
                  <span className="text-3xl font-bold tracking-tight text-[#0b1c2beb]">
                    FreshCart
                  </span>
                </div>

                <p className="max-w-sm text-sm leading-7 text-slate-300">
                  FreshCart is your one-stop destination for quality products.
                  From fashion to electronics, we bring you the best brands at
                  competitive prices with a seamless shopping experience.
                </p>

                <div className="space-y-3 text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-green-400">
                      <IconPhone size={14} stroke={2} />
                    </div>
                    <span>+1 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-green-400">
                      <IconMail size={14} stroke={2} />
                    </div>
                    <span>support@freshcart.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-green-400">
                      <IconMapPin size={14} stroke={2} />
                    </div>
                    <span>123 Commerce Street, New York, NY 10001</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {[
                    IconBrandFacebook,
                    IconBrandTwitter,
                    IconBrandInstagram,
                    IconBrandPinterest,
                  ].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      aria-label="Social media"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-[#41b37d] hover:text-white"
                    >
                      <Icon size={16} stroke={2} />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">Shop</h3>
                <ul className="space-y-3 text-base text-slate-200">
                  {shopLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="transition hover:text-[#6ad6aa]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Account
                </h3>
                <ul className="space-y-3 text-base text-slate-200">
                  {accountLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="transition hover:text-[#6ad6aa]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Support
                </h3>
                <ul className="space-y-3 text-base text-slate-200">
                  {supportLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="transition hover:text-[#6ad6aa]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-6 text-2xl font-semibold text-white">
                  Legal
                </h3>
                <ul className="space-y-3 text-base text-slate-200">
                  {legalLinks.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="transition hover:text-[#6ad6aa]"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-sm text-slate-400 md:flex-row">
            <p>© 2026 FreshCart. All rights reserved.</p>

            <div className="flex items-center gap-8">
              <div className="flex gap-2 items-center">
                <IconCreditCardFilled size={18} />{" "}
                <span className="font-medium">Visa</span>
              </div>
              <div className="flex gap-2 items-center">
                <IconCreditCardFilled size={18} />{" "}
                <span className="font-medium">Mastercard</span>
              </div>
              <div className="flex gap-2 items-center">
                <IconCreditCardFilled size={18} />{" "}
                <span className="font-medium">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
