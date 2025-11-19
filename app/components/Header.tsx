"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile }) => {
  const pathname = usePathname();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentRoute =
    pathname === "/"
      ? "Dashboard"
      : pathname
          .split("/")
          .filter(Boolean)
          .slice(-1)[0]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-[#EEEEEE66] border-b border-[#11182714] backdrop-blur-2xl w-full flex items-center justify-between px-5 py-3">
        <div>
          {/* Desktop */}
          <div className="text-[14px] p-2 rounded-lg hidden xl:flex items-center gap-2 text-[#111827]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V5.83333C11.6667 6.29357 12.0398 6.66667 12.5 6.66667H16.6667C17.1269 6.66667 17.5 6.29357 17.5 5.83333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.6667 10H12.5C12.0398 10 11.6667 10.3731 11.6667 10.8333V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V10.8333C17.5 10.3731 17.1269 10 16.6667 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 13.3333H3.33333C2.8731 13.3333 2.5 13.7064 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7064 7.96024 13.3333 7.5 13.3333Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {currentRoute}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 max-[1280px]:flex min-[1281px]:hidden">
            <button
              onClick={onMenuClick}
              className="cursor-pointer"
              aria-label="Toggle menu"
            >
              <Image
                src="/images/minimize.svg"
                width={24}
                height={24}
                alt="menu"
              />
            </button>
            <Image
              src="/images/mobile-logo.svg"
              width={40}
              height={40}
              alt="logo"
            />

            <div className="text-[14px] p-2 rounded-lg hidden sm:flex xl:hidden items-center gap-2 text-[#111827]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V9.16667C2.5 9.6269 2.8731 10 3.33333 10H7.5C7.96024 10 8.33333 9.6269 8.33333 9.16667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.6667 2.5H12.5C12.0398 2.5 11.6667 2.8731 11.6667 3.33333V5.83333C11.6667 6.29357 12.0398 6.66667 12.5 6.66667H16.6667C17.1269 6.66667 17.5 6.29357 17.5 5.83333V3.33333C17.5 2.8731 17.1269 2.5 16.6667 2.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.6667 10H12.5C12.0398 10 11.6667 10.3731 11.6667 10.8333V16.6667C11.6667 17.1269 12.0398 17.5 12.5 17.5H16.6667C17.1269 17.5 17.5 17.1269 17.5 16.6667V10.8333C17.5 10.3731 17.1269 10 16.6667 10Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 13.3333H3.33333C2.8731 13.3333 2.5 13.7064 2.5 14.1667V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V14.1667C8.33333 13.7064 7.96024 13.3333 7.5 13.3333Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {currentRoute}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={`p-1 rounded-lg transition cursor-pointer`}
          >
            <Image
              src="/images/notification-icon.svg"
              alt="notifications"
              width={40}
              height={40}
            />
          </button>
          <Link href="/profile">
            <Image
              src="/images/profile.svg"
              alt="profile"
              width={40}
              height={40}
            />
          </Link>
        </div>

        {isNotificationOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 sm:right-5 top-[76px] max-w-[493px] w-full min-h-[560px] h-full overflow-auto"
          >
            <div className="rounded-xl bg-white border border-[#ECEDEE] shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h1>Notifications</h1>
                <button
                  className="cursor-pointer"
                  onClick={() => setIsNotificationOpen(false)}
                >
                  <Image
                    src="/images/cross-notification.svg"
                    width={32}
                    height={32}
                    alt="cross-notification"
                  />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <ul className="flex items-center gap-5">
                    <li className="text-[#00000066] body-4 font-medium">All</li>
                    <li className="text-[#00000066] body-4 font-medium">
                      Read
                    </li>
                    <li className="text-[#00000066] body-4 font-medium">
                      Unread
                    </li>
                  </ul>
                  <div className="flex items-center gap-1">
                    <input type="checkbox" />
                    <p className="text-[#00000066] body-4 font-medium">
                      Mark all as read
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-[#E2E3E5] pb-4">
                    <div className="p-2 bg-[#F4F4F4] rounded-lg flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] bg-white p-1.5">
                          <Image
                            src="/images/rocket-yellow.png"
                            width={20}
                            height={20}
                            alt="rocket-yellow"
                          />
                        </div>
                        <div className="space-y-1 max-w-[258px]">
                          <h1 className="text-[#000000CC] body-3">
                            Campaign sent
                          </h1>
                          <p className="text-[#00000066] body-4">
                            Your campaign Product Launch was sent successfully.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#000000CC] body-4">10m</p>
                        <div className="w-2 h-2 rounded-full bg-[#F87B1B]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-[#E2E3E5] pb-4">
                    <div className="p-2 bg-[#F4F4F4] rounded-lg flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] bg-white p-1.5">
                          <Image
                            src="/images/rocket-yellow.png"
                            width={20}
                            height={20}
                            alt="rocket-yellow"
                          />
                        </div>
                        <div className="space-y-1 max-w-[258px]">
                          <h1 className="text-[#000000CC] body-3">
                            Campaign sent
                          </h1>
                          <p className="text-[#00000066] body-4">
                            Your campaign Product Launch was sent successfully.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#000000CC] body-4">10m</p>
                        <div className="w-2 h-2 rounded-full bg-[#F87B1B]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-[#E2E3E5] pb-4">
                    <div className="p-2 bg-[#F4F4F4] rounded-lg flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] bg-white p-1.5">
                          <Image
                            src="/images/rocket-yellow.png"
                            width={20}
                            height={20}
                            alt="rocket-yellow"
                          />
                        </div>
                        <div className="space-y-1 max-w-[258px]">
                          <h1 className="text-[#000000CC] body-3">
                            Campaign sent
                          </h1>
                          <p className="text-[#00000066] body-4">
                            Your campaign Product Launch was sent successfully.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#000000CC] body-4">10m</p>
                        <div className="w-2 h-2 rounded-full bg-[#F87B1B]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-[#E2E3E5] pb-4">
                    <div className="p-2 bg-[#F4F4F4] rounded-lg flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.08)] bg-white p-1.5">
                          <Image
                            src="/images/rocket-yellow.png"
                            width={20}
                            height={20}
                            alt="rocket-yellow"
                          />
                        </div>
                        <div className="space-y-1 max-w-[258px]">
                          <h1 className="text-[#000000CC] body-3">
                            Campaign sent
                          </h1>
                          <p className="text-[#00000066] body-4">
                            Your campaign Product Launch was sent successfully.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#000000CC] body-4">10m</p>
                        <div className="w-2 h-2 rounded-full bg-[#F87B1B]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
