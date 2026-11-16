// "use client";

// import React, { useState } from "react";
// import {
//   IconHome,
//   IconInfoCircleFilled,
//   IconBuildingCommunity,
//   IconMapPin,
//   IconPhone,
//   IconWallet,
//   IconCash,
//   IconCreditCard,
//   IconCircleCheckFilled,
//   IconShieldCheckFilled,
// } from "@tabler/icons-react";


// export default function CheckoutShippingForm() {
//   return (
//     <div className="flex flex-col gap-6">
//       {/* =========================================
//           1. SHIPPING ADDRESS SECTION
//       ========================================= */}
//       <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
//         {/* Section Header */}
//         <div className="bg-[#16a34a] px-6 py-4 text-white">
//           <div className="flex items-center gap-2">
//             <IconHome size={20} className="stroke-[2.2]" />
//             <h2 className="text-base font-bold sm:text-lg">Shipping Address</h2>
//           </div>
//           <p className="mt-0.5 text-xs text-emerald-100 font-normal">
//             Where should we deliver your order?
//           </p>
//         </div>

//         <div className="p-5 sm:p-7 space-y-5">
//           {/* Blue Delivery Information Callout */}
//           <div className="flex items-start gap-3 rounded-xl bg-[#eff6ff] p-4 text-[#1e40af] border border-[#dbeafe]">
//             <IconInfoCircleFilled
//               size={20}
//               className="shrink-0 mt-0.5 text-[#3b82f6]"
//             />
//             <div className="text-xs sm:text-sm">
//               <span className="font-semibold block text-[#1e3a8a]">
//                 Delivery Information
//               </span>
//               <span className="text-[#3b82f6] font-normal">
//                 Please ensure your address is accurate for smooth delivery
//               </span>
//             </div>
//           </div>

//           {/* City Field */}
//           <div>
//             <label
//               htmlFor="city"
//               className="block text-xs font-semibold text-gray-700"
//             >
//               City <span className="text-red-500">*</span>
//             </label>
//             <div className="relative mt-2">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
//                 <IconBuildingCommunity size={18} />
//               </div>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Cairo, Alexandria, Giza"
//                 className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
//               />
//             </div>
//           </div>

//           {/* Street Address Field */}
//           <div>
//             <label
//               htmlFor="streetAddress"
//               className="block text-xs font-semibold text-gray-700"
//             >
//               Street Address <span className="text-red-500">*</span>
//             </label>
//             <div className="relative mt-2">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
//                 <IconMapPin size={18} />
//               </div>
//               <input
//                 type="text"
//                 id="streetAddress"
//                 name="streetAddress"
//                 value={formData.streetAddress}
//                 onChange={handleInputChange}
//                 placeholder="Street name, building number, floor, apartment..."
//                 className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
//               />
//             </div>
//           </div>

//           {/* Phone Number Field */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-xs font-semibold text-gray-700"
//             >
//               Phone Number <span className="text-red-500">*</span>
//             </label>
//             <div className="relative mt-2">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
//                 <IconPhone size={18} />
//               </div>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="01xxxxxxxxx"
//                 className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-36 text-sm text-gray-900 placeholder-gray-400 focus:border-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/15 transition-all"
//               />
//               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[11px] font-medium text-gray-400">
//                 Egyptian numbers only
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           2. PAYMENT METHOD SECTION
//       ========================================= */}
//       <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
//         {/* Section Header */}
//         <div className="bg-[#16a34a] px-6 py-4 text-white">
//           <div className="flex items-center gap-2">
//             <IconWallet size={20} className="stroke-[2.2]" />
//             <h2 className="text-base font-bold sm:text-lg">Payment Method</h2>
//           </div>
//           <p className="mt-0.5 text-xs text-emerald-100 font-normal">
//             Choose how you'd like to pay
//           </p>
//         </div>

//         <div className="p-5 sm:p-7 space-y-4">
//           {/* Option A: Cash on Delivery */}
//           <div
//             onClick={() => handlePaymentMethodSelect("cash")}
//             className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between ${
//               formData.paymentMethod === "cash"
//                 ? "border-[#16a34a] bg-[#f0fdf4]"
//                 : "border-gray-200 bg-white hover:border-gray-300"
//             }`}
//           >
//             <div className="flex items-center gap-4">
//               <div
//                 className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
//                   formData.paymentMethod === "cash"
//                     ? "bg-[#16a34a] text-white"
//                     : "bg-gray-100 text-gray-500"
//                 }`}
//               >
//                 <IconCash size={24} />
//               </div>
//               <div>
//                 <h3 className="text-sm sm:text-base font-bold text-gray-900">
//                   Cash on Delivery
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
//                   Pay when your order arrives at your doorstep
//                 </p>
//               </div>
//             </div>

//             {/* Custom Radio Icon */}
//             <div>
//               {formData.paymentMethod === "cash" ? (
//                 <IconCircleCheckFilled size={22} className="text-[#16a34a]" />
//               ) : (
//                 <span className="block h-5 w-5 rounded-full border-2 border-gray-300" />
//               )}
//             </div>
//           </div>

//           {/* Option B: Pay Online */}
//           <div
//             onClick={() => handlePaymentMethodSelect("online")}
//             className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between ${
//               formData.paymentMethod === "online"
//                 ? "border-[#16a34a] bg-[#f0fdf4]"
//                 : "border-gray-200 bg-white hover:border-gray-300"
//             }`}
//           >
//             <div className="flex items-center gap-4">
//               <div
//                 className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
//                   formData.paymentMethod === "online"
//                     ? "bg-[#16a34a] text-white"
//                     : "bg-gray-100 text-gray-500"
//                 }`}
//               >
//                 <IconCreditCard size={24} />
//               </div>
//               <div>
//                 <h3 className="text-sm sm:text-base font-bold text-gray-900">
//                   Pay Online
//                 </h3>
//                 <p className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
//                   Secure payment with Credit/Debit Card via Stripe
//                 </p>
//                 {/* Brand Card Badges */}
//                 <div className="mt-2 flex items-center gap-1.5">
//                   <span className="rounded bg-[#1a1f71] px-1.5 py-0.5 text-[9px] font-bold text-white tracking-widest">
//                     VISA
//                   </span>
//                   <span className="rounded bg-[#eb001b] px-1.5 py-0.5 text-[9px] font-bold text-white">
//                     mc
//                   </span>
//                   <span className="rounded bg-[#006fcf] px-1.5 py-0.5 text-[9px] font-bold text-white">
//                     AMEX
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Custom Radio Icon */}
//             <div>
//               {formData.paymentMethod === "online" ? (
//                 <IconCircleCheckFilled size={22} className="text-[#16a34a]" />
//               ) : (
//                 <span className="block h-5 w-5 rounded-full border-2 border-gray-300" />
//               )}
//             </div>
//           </div>

//           {/* Green Security Banner */}
//           <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] p-4 text-[#15803d] border border-[#dcfce7]">
//             <IconShieldCheckFilled
//               size={20}
//               className="shrink-0 text-[#16a34a]"
//             />
//             <div className="text-xs font-normal">
//               <span className="font-semibold block text-[#15803d]">
//                 Secure &amp; Encrypted
//               </span>
//               <span className="text-[#16a34a]">
//                 Your payment info is protected with 256-bit SSL encryption
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
