"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaPhone,
  FaHeart,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useWatchlistStore } from "@/lib/stores/watchlistStore";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useAuthStore } from "@/lib/stores/authStore";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const watchlistCount = useWatchlistStore(
    (state) => state.watchlist?.length || 0
  );
  const { user, token } = useAuthStore();

  const isLoggedIn = !!user && !!token;
  // const fetchWatchlist = useWatchlistStore((state) => state.fetchWatchlist);

  // React.useEffect(() => {
  //   // Only fetch watchlist if user is logged in (token exists)
  //   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
  //     fetchWatchlist();
  //   }
  // }, [fetchWatchlist]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/work" },
    // { name: "Help Center", href: "/" },
    { name: "Contact Us", href: "/contact-us" },
  ];
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
   <header className="w-full border-b shadow-sm sticky top-0 z-50 bg-white">
  {/* Top Bar */}
  <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white flex-wrap gap-3">
    {/* Left group: Account + Phone + Language (on desktop) */}
    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-sm order-2 sm:order-1">
      <Link href="/account">
        <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors">
          {isLoggedIn ? (
            user?.profileImage ? (
              <Image
                src={user.profileImage}
                alt={user?.username || "User"}
                width={28}
                height={28}
                className="rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )
          ) : (
            <FaUser className="text-lg" />
          )}
          <span className="hidden xs:inline">
            {isLoggedIn ? user?.username || t("Account") : t("Login")}
          </span>
        </div>
      </Link>

      {/* Phone – visible from sm, but shorter text on very small screens */}
      <div className="hidden sm:flex items-center gap-2 hover:text-green-600 transition-colors">
        <FaPhone className="text-lg" />
        <a href="tel:+966536465526" className="whitespace-nowrap">
          {t("+966 53 646 5526")}
        </a>
      </div>

      {/* Language switcher – always visible */}
      <div className="hidden sm:block">
        <LanguageSwitcher />
      </div>
    </div>

    {/* Center: Logo – order-first on mobile */}
    <div className="order-1 sm:order-2 w-full sm:w-auto text-center flex-1 sm:flex-none">
      <Link href="/">
        <Image
          src="/Ma3rood-logo-green2.png"
          alt="Al Ma3rood Logo"
          width={220}
          height={45}
          className="mx-auto max-h-10 sm:max-h-12 md:max-h-[50px] object-contain md:ltr:ml-[-60px] md:rtl:mr-[-60px] lg:ltr:ml-[-80px] lg:rtl:mr-[-80px]"
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 256px"
          priority
        />
      </Link>
    </div>

    {/* Right side: Actions + Mobile Menu Button */}
    <div className="flex items-center gap-4 sm:gap-6 order-3">
      {/* Logged-in actions – hidden below md */}
      {isLoggedIn ? (
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          <Link href="/watchlist">
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors">
              <FaHeart className="text-lg" />
              <span>
                {t("Watchlist")} ({watchlistCount})
              </span>
            </div>
          </Link>
          <Link href="/listing">
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors whitespace-nowrap">
              <FaPlus className="text-lg" />
              <span>{t("Start a Listing")}</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          <Link href="/listing">
            <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition-colors whitespace-nowrap">
              <FaPlus className="text-lg" />
              <span>{t("Start a Listing")}</span>
            </div>
          </Link>
        </div>
      )}

      {/* Mobile menu toggle + language on mobile */}
      <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher /> {/* Language visible on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </div>
    </div>
  </div>

  {/* Navigation Bar */}
  <nav
    className="text-white text-sm bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/nav.png')" }}
  >
    {/* Desktop nav */}
    <ul className="hidden md:flex justify-center gap-6 lg:gap-10 xl:gap-12 py-3.5 px-4">
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="hover:text-green-300 transition-colors cursor-pointer"
        >
          <Link href={link.href}>{t(link.name)}</Link>
        </li>
      ))}
    </ul>

    {/* Mobile menu dropdown */}
    {mobileMenuOpen && (
  <div className="md:hidden bg-[#175f48]/95 backdrop-blur-md text-white">
    <ul className="flex flex-col gap-4 px-5 py-6 text-base font-medium">
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="hover:text-green-300 transition-colors border-b border-white/15 pb-3 last:border-0 last:pb-0"
        >
          <Link
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:pl-2 transition-all"
          >
            {t(link.name)}
          </Link>
        </li>
      ))}

      {/* Extra logged-in actions inside mobile menu */}
      {isLoggedIn && (
        <div className="pt-4 border-t border-white/20 mt-2 space-y-4">
          <Link
            href="/watchlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 hover:text-green-300 transition-colors"
          >
            <FaHeart className="text-xl" />
            <span>{t("Watchlist")} ({watchlistCount})</span>
          </Link>
          <Link
            href="/listing"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 hover:text-green-300 transition-colors"
          >
            <FaPlus className="text-xl" />
            <span>{t("Start a Listing")}</span>
          </Link>
        </div>
      )}

      {/* Optional: Add quick login/register if not logged in */}
      {!isLoggedIn && (
        <div className="pt-4 border-t border-white/20 mt-2 flex flex-col gap-3">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md font-medium transition-colors"
          >
            {t("Login")}
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-white/10 hover:bg-white/20 text-white text-center py-3 rounded-md border border-white/30 font-medium transition-colors"
          >
            {t("Register")}
          </Link>
        </div>
      )}
    </ul>
  </div>
)}
  </nav>
</header>
  );
};

export default Navbar;
