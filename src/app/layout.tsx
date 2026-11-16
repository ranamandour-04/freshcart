import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "sonner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { verifyToken } from "@/features/auth/server/auth.action";
import { authReducer } from "@/features/auth/slices/auth.slice";
import { getCartItems } from "@/features/cart/server/Cart.actions";
import { cartValuesType } from "@/features/cart/slice/CartSlice";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "E-commerce App",
  icons: {
    icon: "/mini-logo.png",
  },
};
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const authStates = await verifyToken();

  let cartResponse: cartValuesType = {
    status: "",
    message: "",
    numOfCartItems: 0,
    cartId: null,
    data: {
      products: [],
      totalCartPrice: 0,
    },
  };
  if (authStates.isAuthenticated) {
    const cartValues = await getCartItems();
    if (cartValues.status === "success") {
      cartResponse = cartValues;
    }
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 🔴 Removed min-w-6xl. Added w-full */}
      <body className="min-h-full flex flex-col w-full overflow-x-hidden">
        <Providers
          preloadedState={{
            authReducer: authStates,
            cartReducer: cartResponse,
          }}
        >
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
