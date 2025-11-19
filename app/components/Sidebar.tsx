"use client";
import Image from "next/image";
import React, { Activity, useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import ConfirmationModal from "../shared/ConfirmationModal";
import { useRouter } from "next/navigation";

interface SidebarProps {
  onClose?: () => void;
  isMobile: boolean;
  // optional controlled minimize props to support layout-level control
  minimized?: boolean;
  onMinimize?: () => void;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDrawerOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  isMobile,
  minimized: minimizedProp,
  onMinimize,
  setIsDrawerOpen,
  isDrawerOpen,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([
    "essential",
    "engage",
  ]);
  const [minimizedState, setMinimized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const minimized =
    typeof minimizedProp === "boolean" ? minimizedProp : minimizedState;
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 641px) and (max-width: 1023px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      setMinimized(e.matches);
    };
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleMinimizeClick = () => {
    if (isMobile && onClose) {
      onClose();
      return;
    }

    // If parent provided an onMinimize handler, call it (controlled behavior)
    if (onMinimize) {
      onMinimize();
      return;
    }

    // otherwise toggle internal minimized state
    setMinimized((s) => !s);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (isMobile && onClose) {
      onClose();
      // Use setTimeout to ensure the component has re-rendered and input is available
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return;
    }

    // If parent provided an onMinimize handler, call it (controlled behavior)
    if (onMinimize) {
      onMinimize();
      return;
    }

    // otherwise toggle internal minimized state
    setMinimized((s) => !s);
  };
  const confirmLogout = () => {
    console.log("User logged out!");

    // Clear any auth tokens if needed, e.g. localStorage.removeItem("token");

    setIsLogoutModalOpen(false);

    // Redirect to login page
    router.push("/login");
  };

  const pathname = usePathname();

  const isActive = pathname;

  return (
    <>
      <div
        className={
          (minimized && !isMobile ? "w-[72px] p-3" : "w-[260px] p-5") +
          " bg-white xl:bg-[#EEEEEE66]   border-r border-[#11182714] h-screen overflow-auto transition-all duration-200 hide-scrollbar"
        }
      >
        <div className="flex flex-col items-start justify-between gap-7 h-full w-full">
          <div className="w-full">
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full">
              <Image
                src="/images/full-logo.svg"
                width={160}
                height={35}
                alt="logo"
                className={minimized && !isMobile ? "hidden" : undefined}
              />
              <button
                aria-pressed={minimized}
                aria-label={
                  isMobile
                    ? "Close sidebar"
                    : minimized
                    ? "Expand sidebar"
                    : "Minimize sidebar"
                }
                onClick={handleMinimizeClick}
                className="p-1 rounded-md hover:bg-[#1118270A]"
              >
                <Image
                  src="/images/minimize.svg"
                  width={24}
                  height={24}
                  alt="menu"
                  className={`cursor-pointer ${minimized ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Search Box */}
            <div className="pt-7">
              <div className="relative">
                <Image
                  src="/images/search-icon.svg"
                  width={20}
                  height={20}
                  onClick={minimized ? handleSearchClick : undefined}
                  alt="search"
                  className={`absolute ${
                    minimized ? "right-4 cursor-pointer " : "right-5"
                  }  top-2 z-20`}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  className={`py-2 pl-4 pr-8 flex items-center outline-none rounded-full bg-[#FFFFFF99] shadow-[0_6px_8px_0_rgba(0,0,0,0.12)] backdrop-blur-[20px] text-[14px] font-normal leading-5 ${
                    minimized ? "hidden" : ""
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menus */}
            <div
              className={`${minimized ? "gap-0" : "gap-3"} flex flex-col pt-6`}
            >
              {/* Essential Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown("essential")}
                  className={
                    "flex items-center justify-between w-full cursor-pointer transition " +
                    (minimized ? "px-0" : "")
                  }
                >
                  <div
                    className={
                      "flex items-center gap-3 " +
                      (minimized ? "justify-center w-full" : "")
                    }
                  >
                    <span
                      className={
                        "text-[14px] font-normal text-[#A0A3A9] " +
                        (minimized ? "hidden" : "")
                      }
                    >
                      ESSANTIAL
                    </span>
                  </div>
                  <Image
                    src="/images/arrow-down.svg"
                    width={16}
                    height={16}
                    alt="arrow"
                    className={`transition-transform ${
                      openDropdowns.includes("essential") ? "rotate-180" : ""
                    } ${minimized ? "hidden" : ""}`}
                  />
                </button>

                {openDropdowns.includes("essential") && (
                  <div className="flex flex-col mt-3 space-y-1">
                    <NavLink href="/dashboard" minimized={minimized}>
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
                      <span className={minimized ? "hidden" : ""}>
                        Dashboard
                      </span>
                    </NavLink>
                    <NavLink href="/people" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5.00002C4.11597 12.5 3.26812 12.8512 2.643 13.4763C2.01788 14.1014 1.66669 14.9493 1.66669 15.8333V17.5M15.8334 6.66667V11.6667M18.3334 9.16667H13.3334M10.8334 5.83333C10.8334 7.67428 9.34097 9.16667 7.50002 9.16667C5.65907 9.16667 4.16669 7.67428 4.16669 5.83333C4.16669 3.99238 5.65907 2.5 7.50002 2.5C9.34097 2.5 10.8334 3.99238 10.8334 5.83333Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>People</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Engage Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown("engage")}
                  className={
                    "flex items-center justify-between w-full cursor-pointer transition " +
                    (minimized ? "px-0 hidden" : "block")
                  }
                >
                  <div
                    className={
                      "flex items-center gap-3 " +
                      (minimized ? "justify-center w-full" : "")
                    }
                  >
                    <span
                      className={
                        "text-[14px] font-normal text-[#A0A3A9] " +
                        (minimized ? "hidden" : "")
                      }
                    >
                      ENGAGE
                    </span>
                  </div>
                  <Image
                    src="/images/arrow-down.svg"
                    width={16}
                    height={16}
                    alt="arrow"
                    className={`transition-transform ${
                      openDropdowns.includes("engage") ? "rotate-180" : ""
                    } ${minimized ? "hidden" : ""}`}
                  />
                </button>

                {openDropdowns.includes("engage") && (
                  <div
                    className={`flex flex-col ${
                      minimized ? "mt-0" : "mt-3"
                    } space-y-1`}
                  >
                    <NavLink href="/leads" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5.00002C4.11597 12.5 3.26812 12.8512 2.643 13.4763C2.01788 14.1014 1.66669 14.9493 1.66669 15.8333V17.5M18.3334 17.4999V15.8332C18.3328 15.0947 18.087 14.3772 17.6345 13.7935C17.182 13.2098 16.5485 12.7929 15.8334 12.6082M13.3334 2.60824C14.0504 2.79182 14.6859 3.20882 15.1397 3.79349C15.5936 4.37817 15.8399 5.09726 15.8399 5.8374C15.8399 6.57754 15.5936 7.29664 15.1397 7.88131C14.6859 8.46598 14.0504 8.88298 13.3334 9.06657M10.8334 5.83333C10.8334 7.67428 9.34097 9.16667 7.50002 9.16667C5.65907 9.16667 4.16669 7.67428 4.16669 5.83333C4.16669 3.99238 5.65907 2.5 7.50002 2.5C9.34097 2.5 10.8334 3.99238 10.8334 5.83333Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>Leads</span>
                    </NavLink>
                    <NavLink href="/campaigns" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M9.99998 12.4996L7.49998 9.99956M9.99998 12.4996C11.164 12.0568 12.2807 11.4985 13.3333 10.8329M9.99998 12.4996V16.6662C9.99998 16.6662 12.525 16.2079 13.3333 14.9996C14.2333 13.6496 13.3333 10.8329 13.3333 10.8329M7.49998 9.99956C7.94343 8.84908 8.50182 7.74627 9.16665 6.70789C10.1376 5.15538 11.4897 3.8771 13.0941 2.99463C14.6986 2.11217 16.5022 1.65486 18.3333 1.66622C18.3333 3.93289 17.6833 7.91622 13.3333 10.8329M7.49998 9.99956L3.33331 9.99957C3.33331 9.99957 3.79165 7.47457 4.99998 6.66624C6.34998 5.76624 9.16665 6.66624 9.16665 6.66624M3.74998 13.7496C2.49998 14.7996 2.08331 17.9163 2.08331 17.9163C2.08331 17.9163 5.19998 17.4996 6.24998 16.2496C6.84165 15.5496 6.83331 14.4746 6.17498 13.8246C5.85107 13.5155 5.42439 13.3368 4.97683 13.323C4.52928 13.3091 4.09238 13.4611 3.74998 13.7496Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>
                        Campaigns
                      </span>
                    </NavLink>
                    <NavLink href="/ai-outreach" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M11.6665 5.83366L14.1665 8.33366M4.16646 5.00033V8.33366M15.8331 11.667V15.0003M8.33313 1.66699V3.33366M5.83313 6.66699H2.4998M17.4998 13.3337H14.1665M9.16646 2.50033H7.4998M18.0332 3.0337L16.9665 1.96703C16.8727 1.87229 16.7611 1.79709 16.6381 1.74576C16.5151 1.69444 16.3831 1.66801 16.2498 1.66801C16.1165 1.66801 15.9846 1.69444 15.8616 1.74576C15.7385 1.79709 15.6269 1.87229 15.5332 1.96703L1.9665 15.5337C1.87176 15.6275 1.79656 15.7391 1.74523 15.8621C1.69391 15.9851 1.66748 16.1171 1.66748 16.2504C1.66748 16.3837 1.69391 16.5156 1.74523 16.6386C1.79656 16.7617 1.87176 16.8733 1.9665 16.967L3.03317 18.0337C3.12635 18.1295 3.23778 18.2056 3.36087 18.2575C3.48396 18.3095 3.61622 18.3363 3.74983 18.3363C3.88345 18.3363 4.01571 18.3095 4.1388 18.2575C4.26189 18.2056 4.37332 18.1295 4.4665 18.0337L18.0332 4.46703C18.1289 4.37385 18.205 4.26242 18.257 4.13933C18.309 4.01623 18.3358 3.88398 18.3358 3.75036C18.3358 3.61675 18.309 3.48449 18.257 3.3614C18.205 3.23831 18.1289 3.12688 18.0332 3.0337Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>
                        AI outreach
                      </span>
                    </NavLink>
                    <NavLink href="/emails" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M18.3334 10.833V4.99967C18.3334 4.55765 18.1578 4.13372 17.8452 3.82116C17.5326 3.5086 17.1087 3.33301 16.6667 3.33301H3.33335C2.89133 3.33301 2.4674 3.5086 2.15484 3.82116C1.84228 4.13372 1.66669 4.55765 1.66669 4.99967V14.9997C1.66669 15.9163 2.41669 16.6663 3.33335 16.6663H10M18.3334 5.83301L10.8584 10.583C10.6011 10.7442 10.3036 10.8297 10 10.8297C9.69642 10.8297 9.39896 10.7442 9.14169 10.583L1.66669 5.83301M15.8334 13.333V18.333M13.3334 15.833H18.3334"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>Emails</span>
                    </NavLink>
                    <NavLink href="/meetings" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M11.6667 15.0003L15 18.3337M15 18.3337L18.3333 15.0003M15 18.3337V11.667M13.3333 1.66699V5.00033M17.5 9.46199V5.00033C17.5 4.5583 17.3244 4.13437 17.0118 3.82181C16.6993 3.50925 16.2754 3.33366 15.8333 3.33366H4.16667C3.72464 3.33366 3.30072 3.50925 2.98816 3.82181C2.67559 4.13437 2.5 4.5583 2.5 5.00033V16.667C2.5 17.109 2.67559 17.5329 2.98816 17.8455C3.30072 18.1581 3.72464 18.3337 4.16667 18.3337H10.2858M2.5 8.33366H17.5M6.66667 1.66699V5.00033"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>
                        Meetings
                      </span>
                    </NavLink>
                    <NavLink href="/design-system" minimized={minimized}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M11.6667 15.0003L15 18.3337M15 18.3337L18.3333 15.0003M15 18.3337V11.667M13.3333 1.66699V5.00033M17.5 9.46199V5.00033C17.5 4.5583 17.3244 4.13437 17.0118 3.82181C16.6993 3.50925 16.2754 3.33366 15.8333 3.33366H4.16667C3.72464 3.33366 3.30072 3.50925 2.98816 3.82181C2.67559 4.13437 2.5 4.5583 2.5 5.00033V16.667C2.5 17.109 2.67559 17.5329 2.98816 17.8455C3.30072 18.1581 3.72464 18.3337 4.16667 18.3337H10.2858M2.5 8.33366H17.5M6.66667 1.66699V5.00033"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={minimized ? "hidden" : ""}>
                        Design system
                      </span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col mt-3 space-y-1">
              <NavLink href="/settings" minimized={minimized}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.5 13.3329V6.66626C17.4997 6.37399 17.4225 6.08693 17.2763 5.83389C17.13 5.58086 16.9198 5.37073 16.6667 5.22459L10.8333 1.89126C10.58 1.74498 10.2926 1.66797 10 1.66797C9.70744 1.66797 9.42003 1.74498 9.16667 1.89126L3.33333 5.22459C3.08022 5.37073 2.86998 5.58086 2.72372 5.83389C2.57745 6.08693 2.5003 6.37399 2.5 6.66626V13.3329C2.5003 13.6252 2.57745 13.9122 2.72372 14.1653C2.86998 14.4183 3.08022 14.6285 3.33333 14.7746L9.16667 18.1079C9.42003 18.2542 9.70744 18.3312 10 18.3312C10.2926 18.3312 10.58 18.2542 10.8333 18.1079L16.6667 14.7746C16.9198 14.6285 17.13 14.4183 17.2763 14.1653C17.4225 13.9122 17.4997 13.6252 17.5 13.3329Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 13.333C11.8409 13.333 13.3333 11.8406 13.3333 9.99967C13.3333 8.15872 11.8409 6.66634 10 6.66634C8.15905 6.66634 6.66667 8.15872 6.66667 9.99967C6.66667 11.8406 8.15905 13.333 10 13.333Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={minimized ? "hidden" : ""}>Setting</span>
              </NavLink>
              <button
                className={
                  "text-[14px] py-2 px-3 rounded-full flex items-center gap-2 text-[#111827] hover:text-[#FFFFFF] hover:bg-[#11224E] bg-transparent transition " +
                  (minimized ? "justify-center px-1" : "") +
                  (isDrawerOpen ? " bg-[#11224E]! text-[#FFFFFF]!" : "")
                }
                onClick={() => setIsDrawerOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 13.3337H10.0084M10 6.66699V10.0003M12.76 1.66699C13.202 1.66709 13.6259 1.84274 13.9384 2.15533L17.845 6.06199C18.1576 6.37448 18.3333 6.79833 18.3334 7.24033V12.7603C18.3333 13.2023 18.1576 13.6262 17.845 13.9387L13.9384 17.8453C13.6259 18.1579 13.202 18.3336 12.76 18.3337H7.24002C6.79803 18.3336 6.37418 18.1579 6.06169 17.8453L2.15502 13.9387C1.84244 13.6262 1.66678 13.2023 1.66669 12.7603V7.24033C1.66678 6.79833 1.84244 6.37448 2.15502 6.06199L6.06169 2.15533C6.37418 1.84274 6.79803 1.66709 7.24002 1.66699H12.76Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={minimized ? "hidden" : ""}>
                  Help & support
                </span>
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className={
                  "text-[14px] py-2 px-3 rounded-full flex items-center gap-2 text-[#111827] hover:text-[#FFFFFF] hover:bg-[#11224E] bg-transparent transition " +
                  (minimized ? "justify-center px-1" : "") +
                  (isLogoutModalOpen ? " bg-[#11224E]! text-[#FFFFFF]!" : "") // ✅ active state
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className={minimized ? "hidden" : ""}>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLogoutModalOpen && (
        <ConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={confirmLogout}
          title="Are you sure you want to logout?"
          message="You'll be signed out of your account and need to log in again to continue."
          icon="/images/logout.svg"
          confirmText="Logout"
          cancelText="Go back"
        />
      )}
    </>
  );
};

export default Sidebar;
