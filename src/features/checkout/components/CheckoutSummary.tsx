// "use client";
// import { appStateType } from "@/store/store";
// import {
//   IconShoppingBag,
//   IconTruck,
//   IconShieldCheck,
//   IconRotateClockwise,
//   IconReceipt,
// } from "@tabler/icons-react";
// import { useSelector } from "react-redux";

// export default function CheckoutSummary() {
//   const cartResponse = useSelector((state: appStateType) => state.cartReducer);
//   const cartTotal = cartResponse.data.totalCartPrice ?? 0;
//   const shippingCost = cartTotal >= 500 ? 0 : 50;
//   const grandTotal = cartTotal + shippingCost;
//   return (
//     <div className="sticky top-20 z-10 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
//       {/* Top Banner Header */}
//       <div className="bg-[#16a34a] px-6 py-4 text-white">
//         <div className="flex items-center gap-2">
//           <IconShoppingBag size={20} className="stroke-[2.2]" />
//           <h2 className="text-base font-bold sm:text-lg">Order Summary</h2>
//         </div>
//         <p className="mt-0.5 text-xs text-emerald-100 font-normal">
//           {cartResponse.numOfCartItems}{" "}
//           {cartResponse.numOfCartItems === 1 ? "item" : "items"}
//         </p>
//       </div>

//       <div className="p-5 sm:p-6 space-y-6">
//         {/* Scrollable Items List */}
//         <div className="max-h-72 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-gray-200">
//           {cartResponse.data.products.map((item) => (
//             <div
//               key={item._id}
//               className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3"
//             >
//               {/* Thumbnail & Description */}
//               <div className="flex items-center gap-3 min-w-0">
//                 <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white p-1 border border-gray-100 flex items-center justify-center">
//                   <img
//                     src={item.product.imageCover}
//                     alt={item.product.title}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
//                     {item.product.title}
//                   </h4>
//                   <p className="text-[11px] text-gray-500 font-medium mt-0.5">
//                     {item.count} × {item.price.toLocaleString()} EGP
//                   </p>
//                 </div>
//               </div>

//               {/* Line Price */}
//               <span className="text-xs sm:text-sm font-bold text-gray-900 shrink-0">
//                 {(item.count * item.price).toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Pricing Breakdown */}
//         <div className="space-y-3 border-t border-gray-100 pt-5 text-sm">
//           <div className="flex justify-between text-gray-600">
//             <span>Subtotal</span>
//             <span className="font-semibold text-gray-900">
//               {cartResponse.data.totalCartPrice.toLocaleString()} EGP
//             </span>
//           </div>

//           <div className="flex justify-between items-center text-gray-600">
//             <span className="flex items-center gap-1.5">
//               <IconTruck size={16} className="text-gray-400" />
//               <span>Shipping</span>
//             </span>
//             <span className="font-bold text-[#16a34a] text-xs uppercase tracking-wide">
//               {shippingCost}
//             </span>
//           </div>

//           <div className="flex justify-between items-baseline border-t border-gray-100 pt-3">
//             <span className="text-base font-bold text-gray-900">Total</span>
//             <span className="text-2xl font-bold text-[#16a34a] tracking-tight">
//               {grandTotal}{" "}
//               <span className="text-xs font-semibold text-gray-400 uppercase">
//                 EGP
//               </span>
//             </span>
//           </div>
//         </div>

//         {/* Place Order CTA Button */}
//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#16a34a] py-3.5 px-4 font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-[#15803d] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer text-sm sm:text-base"
//         >
//           <IconReceipt size={20} />
//           <span>Place Order</span>
//         </button>

//         {/* Trust Badges */}
//         <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[11px] font-medium text-gray-500">
//           <div className="flex items-center gap-1">
//             <IconShieldCheck size={14} className="text-[#16a34a]" />
//             <span>Secure</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <IconTruck size={14} className="text-blue-500" />
//             <span>Fast Delivery</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <IconRotateClockwise size={14} className="text-amber-500" />
//             <span>Easy Returns</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
