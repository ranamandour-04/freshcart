import {
  IconArrowRight,
  IconBrandAppleFilled,
  IconBrandGooglePlay,
  IconLeaf,
  IconMailFilled,
  IconSparkles,
  IconStarFilled,
  IconTag,
  IconTruck,
} from "@tabler/icons-react";
export default function Newsletter() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Outer Mint Banner Container */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#f2fcf6] via-[#f7fdf9] to-[#edf9f3] shadow-2xl shadow-primary-200/80 p-8 md:p-12 lg:p-16 border border-[#e2f3e8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Newsletter Section */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Newsletter Badge */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600  text-white shadow-md shadow-emerald-500/20">
                <IconMailFilled size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-primary-600 uppercase">
                  Newsletter
                </span>
                <span className="text-xs font-medium text-gray-600">
                  50,000+ subscribers
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-tight leading-[1.15]">
              Get the Freshest Updates <br />
              <span className="text-primary-600 ">Delivered Free</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-gray-500 font-normal">
              Weekly recipes, seasonal offers &amp; exclusive member perks.
            </p>

            {/* Feature Pills */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f7ef] text-[#00a859]">
                  <IconLeaf size={14} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Fresh Picks Weekly
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f7ef] text-[#00a859]">
                  <IconTruck size={14} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Free Delivery Codes
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2 shadow-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e6f7ef] text-[#00a859]">
                  <IconTag size={14} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Members-Only Deals
                </span>
              </div>
            </div>

            {/* Subscription Form */}
            <form className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full sm:max-w-md rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 shadow-sm focus:border-[#00a859] focus:outline-none focus:ring-2 focus:ring-[#00a859]/20"
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#00a859] px-7 py-3.5 font-semibold text-white shadow-md shadow-emerald-500/20 transition-all duration-200 hover:bg-[#00924c] active:scale-95 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <IconArrowRight size={18} />
              </button>
            </form>

            {/* Anti-spam note */}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
              <IconSparkles size={14} className="text-amber-500" />
              <span>Unsubscribe anytime. No spam, ever.</span>
            </div>
          </div>

          {/* Right Column: Dark Mobile App Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-4xl bg-linear-to-b from-[#13222a] via-[#0e1a20] to-[#0a1318] p-7 text-white shadow-2xl border border-[#1c303b]">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#133331] px-3 py-1 border border-[#1d4d47]">
                <span className="text-xs">📱</span>
                <span className="text-[11px] font-bold tracking-wider text-[#2dd4bf] uppercase">
                  Mobile App
                </span>
              </div>

              {/* Card Title & Subtitle */}
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                Shop Faster on Our App
              </h3>
              <p className="mt-2 text-sm text-gray-400 font-normal leading-relaxed">
                Get app-exclusive deals &amp; 15% off your first order.
              </p>

              {/* Download Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <span className="flex items-center gap-3.5 rounded-xl border border-[#263c48] bg-[#1a2c35] px-4 py-2.5 transition-colors duration-200 hover:bg-[#213742]">
                  <IconBrandAppleFilled size={24} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                      Download on
                    </span>
                    <span className="text-sm font-semibold text-white -mt-0.5">
                      App Store
                    </span>
                  </div>
                </span>

                <span className="flex items-center gap-3.5 rounded-xl border border-[#263c48] bg-[#1a2c35] px-4 py-2.5 transition-colors duration-200 hover:bg-[#213742]">
                  <IconBrandGooglePlay size={24} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                      Get it on
                    </span>
                    <span className="text-sm font-semibold text-white -mt-0.5">
                      Google Play
                    </span>
                  </div>
                </span>
              </div>

              {/* Rating Section */}
              <div className="mt-7 flex items-center gap-2 pt-1 border-t border-white/5">
                <div className="flex text-amber-400 gap-0.5">
                  <IconStarFilled size={15} />
                  <IconStarFilled size={15} />
                  <IconStarFilled size={15} />
                  <IconStarFilled size={15} />
                  <IconStarFilled size={15} />
                </div>
                <span className="text-xs font-medium text-gray-300">
                  4.9 · 100K+ downloads
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
