/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryData } from "@/lib/hooks/useCategory";
import { Category } from "@/lib/types/category";
import { ChevronDown, Globe, LayoutList, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          element: string,
        ) => void;
      };
    };
  }
}

const SOURCE_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "vendopos-language";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "es", label: "Spanish" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bangla" },
  { code: "ur", label: "Urdu" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "tr", label: "Turkish" },
  { code: "it", label: "Italian" },
  { code: "nl", label: "Dutch" },
  { code: "pl", label: "Polish" },
  { code: "uk", label: "Ukrainian" },
  { code: "ro", label: "Romanian" },
  { code: "el", label: "Greek" },
  { code: "he", label: "Hebrew" },
  { code: "th", label: "Thai" },
  { code: "vi", label: "Vietnamese" },
  { code: "id", label: "Indonesian" },
  { code: "ms", label: "Malay" },
  { code: "fa", label: "Persian" },
  { code: "sw", label: "Swahili" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" },
  { code: "pa", label: "Punjabi" },
  { code: "ml", label: "Malayalam" },
  { code: "kn", label: "Kannada" },
  { code: "or", label: "Odia" },
  { code: "as", label: "Assamese" },
  { code: "ne", label: "Nepali" },
  { code: "si", label: "Sinhala" },
  { code: "my", label: "Burmese" },
  { code: "km", label: "Khmer" },
  { code: "lo", label: "Lao" },
  { code: "mn", label: "Mongolian" },
  { code: "kk", label: "Kazakh" },
  { code: "uz", label: "Uzbek" },
  { code: "tk", label: "Turkmen" },
  { code: "ky", label: "Kyrgyz" },
  { code: "tg", label: "Tajik" },
  { code: "az", label: "Azerbaijani" },
  { code: "hy", label: "Armenian" },
  { code: "ka", label: "Georgian" },
  { code: "sq", label: "Albanian" },
  { code: "sr", label: "Serbian" },
  { code: "bs", label: "Bosnian" },
  { code: "hr", label: "Croatian" },
  { code: "sl", label: "Slovenian" },
  { code: "sk", label: "Slovak" },
  { code: "cs", label: "Czech" },
  { code: "hu", label: "Hungarian" },
  { code: "bg", label: "Bulgarian" },
  { code: "mk", label: "Macedonian" },
  { code: "lt", label: "Lithuanian" },
  { code: "lv", label: "Latvian" },
  { code: "et", label: "Estonian" },
  { code: "fi", label: "Finnish" },
  { code: "sv", label: "Swedish" },
  { code: "no", label: "Norwegian" },
  { code: "da", label: "Danish" },
  { code: "is", label: "Icelandic" },
  { code: "ga", label: "Irish" },
  { code: "cy", label: "Welsh" },
  { code: "mt", label: "Maltese" },
  { code: "af", label: "Afrikaans" },
  { code: "zu", label: "Zulu" },
  { code: "xh", label: "Xhosa" },
  { code: "am", label: "Amharic" },
  { code: "so", label: "Somali" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
  { code: "ha", label: "Hausa" },
  { code: "ceb", label: "Cebuano" },
  { code: "jw", label: "Javanese" },
  { code: "su", label: "Sundanese" },
  { code: "tl", label: "Filipino" },
  { code: "mi", label: "Maori" },
  { code: "sm", label: "Samoan" },
  { code: "ht", label: "Haitian Creole" },
  { code: "eo", label: "Esperanto" },
  { code: "la", label: "Latin" },
  { code: "lb", label: "Luxembourgish" },
  { code: "eu", label: "Basque" },
  { code: "gl", label: "Galician" },
  { code: "ca", label: "Catalan" },
] as const;
type LanguageCode = (typeof languages)[number]["code"];

function getSavedLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";

  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
                                
  return languages.some((item) => item.code === savedLanguage)
    ? (savedLanguage as LanguageCode)
    : "en";
}

function setGoogleTranslateCookie(languageCode: LanguageCode) {
  const cookieValue = `/${SOURCE_LANGUAGE}/${languageCode}`;
  const expires = "max-age=31536000";

  document.cookie = `googtrans=${cookieValue}; path=/; ${expires}`;

  document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}; ${expires}`;
}

function removeGoogleTranslateCookie() {
  document.cookie =
    "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

function resetGoogleTranslateToolbar() {
  document.body.style.top = "0px";

  const toolbarFrame = document.querySelector<HTMLIFrameElement>(
    "iframe.goog-te-banner-frame, iframe.skiptranslate",
  );

  if (toolbarFrame) {
    toolbarFrame.style.display = "none";
  }
}

function applyGoogleTranslate(languageCode: LanguageCode, retries = 12) {
  setGoogleTranslateCookie(languageCode);

  resetGoogleTranslateToolbar();

  const translateSelect =
    document.querySelector<HTMLSelectElement>(".goog-te-combo");

  if (!translateSelect) {
    if (retries > 0) {
      window.setTimeout(
        () => applyGoogleTranslate(languageCode, retries - 1),
        250,
      );
    }

    return;
  }

  translateSelect.value = languageCode;

  translateSelect.dispatchEvent(new Event("change"));

  window.setTimeout(resetGoogleTranslateToolbar, 250);
}

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];

const COUNTRIES = [
  { name: "Bangladesh", value: "bangladesh" },
  { name: "Pakistan", value: "pakistan" },
  { name: "India", value: "india" },
  { name: "United States", value: "usa" },
  { name: "United Kingdom", value: "uk" },
  { name: "Germany", value: "germany" },
  { name: "France", value: "france" },
  { name: "Canada", value: "canada" },
  { name: "Australia", value: "australia" },
  { name: "Japan", value: "japan" },
  { name: "China", value: "china" },
  { name: "Russia", value: "russia" },
  { name: "Brazil", value: "brazil" },
  { name: "Mexico", value: "mexico" },
  { name: "Italy", value: "italy" },
  { name: "Spain", value: "spain" },
  { name: "South Korea", value: "south-korea" },
  { name: "Saudi Arabia", value: "saudi-arabia" },
  { name: "UAE", value: "uae" },
  { name: "Singapore", value: "singapore" },
  { name: "Malaysia", value: "malaysia" },
  { name: "Thailand", value: "thailand" },
  { name: "Vietnam", value: "vietnam" },
  { name: "Philippines", value: "philippines" },
  { name: "Indonesia", value: "indonesia" },
  { name: "Sri Lanka", value: "sri-lanka" },
  { name: "Nepal", value: "nepal" },
  { name: "Bhutan", value: "bhutan" },
  { name: "Maldives", value: "maldives" },
  { name: "Egypt", value: "egypt" },
  { name: "South Africa", value: "south-africa" },
  { name: "Nigeria", value: "nigeria" },
  { name: "Kenya", value: "kenya" },
  { name: "Ethiopia", value: "ethiopia" },
  { name: "Ghana", value: "ghana" },
  { name: "Morocco", value: "morocco" },
  { name: "Algeria", value: "algeria" },
  { name: "Tunisia", value: "tunisia" },
];

const Navitems = () => {
  const currentActive = usePathname();
  const route = useRouter();

  const [language, setLanguage] = useState<LanguageCode>("en");

  const selectedLanguage = useMemo(
    () => languages.find((item) => item.code === language)?.label ?? "English",
    [language],
  );

  const { data } = useCategoryData();

  const categories =
    data?.data?.flatMap((region: any) => region.categories) || [];

  // initialize language
  useEffect(() => {
    setLanguage(getSavedLanguage());
  }, []);

  // google translate init
  useEffect(() => {
    const initialLanguage = getSavedLanguage();

    if (initialLanguage !== "en") {
      setGoogleTranslateCookie(initialLanguage);
    } else {
      removeGoogleTranslateCookie();
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: SOURCE_LANGUAGE,
          includedLanguages: languages
            .filter((item) => item.code !== "en")
            .map((item) => item.code)
            .join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );

      if (initialLanguage !== "en") {
        window.setTimeout(() => {
          applyGoogleTranslate(initialLanguage);
        }, 100);
      }
    };

    if (!document.querySelector("#google-translate-script")) {
      const script = document.createElement("script");

      script.id = "google-translate-script";

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);

      return;
    }

    if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  // language change
  const handleLanguageChange = (value: string) => {
    const nextLanguage = value as LanguageCode;

    setLanguage(nextLanguage);

    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

    // reset to original english
    if (nextLanguage === "en") {
      removeGoogleTranslateCookie();

      localStorage.removeItem("googtrans");

      window.location.href = window.location.pathname;

      return;
    }

    // apply translation
    setGoogleTranslateCookie(nextLanguage);

    window.location.reload();
  };

  const handleCategory = (category: string) => {
    route.push(`/shop?productType=${category}`);
  };

  const handleCountry = (country: string) => {
    route.push(`/shop?country=${country}`);
  };

  return (
    <section className="bg-white">
      {/* hidden google translate */}
      <div id="google_translate_element" className="hidden" />

      <div className="container mx-auto px-4 md:px-0">
        <div className="flex flex-col lg:flex-row items-center justify-start lg:gap-20 py-4 w-full">
          {/* Left side */}
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col lg:flex-row items-start gap-4 w-full lg:w-auto">
              {/* Category Selector */}
              <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
                <Select onValueChange={handleCategory}>
                  <SelectTrigger className="bg-primary text-white hover:bg-primary/90 w-full md:w-[240px] h-12 transition-colors">
                    <div className="flex items-center gap-2">
                      <LayoutList className="text-white" size={18} />

                      <SelectValue
                        placeholder={
                          <span className="font-medium text-center text-white">
                            Browse All Category
                          </span>
                        }
                      />

                      <ChevronDown className="text-white" size={18} />
                    </div>
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    className="w-full left-0 max-w-[600px] mt-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                    sideOffset={8}
                  >
                    <SelectGroup>
                      <SelectLabel className="text-lg text-gray-600 font-semibold px-4 py-2 text-center block w-full">
                        All Categories
                      </SelectLabel>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                        {categories?.length > 0 ? (
                          categories.map((item: Category, idx: number) => (
                            <SelectItem
                              key={`${item.region}-${item.productType}-${idx}`}
                              value={item.productType}
                              textValue={item.productType}
                              className="p-3 cursor-pointer flex flex-col-reverse justify-center rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 focus:bg-primary/10 focus:text-primary border border-gray-100 hover:border-primary/30 hover:scale-[1.02] [&>span:first-child]:hidden"
                              displayContent={
                                <div className="flex mx-auto flex-col items-center justify-center gap-2 text-center w-full">
                                  <Image
                                    className="object-cover rounded-lg max-w-10 sm:max-w-12 mx-auto max-h-10 sm:max-h-12"
                                    src={item?.productImage?.url}
                                    alt={item.productType}
                                    width={48}
                                    height={48}
                                  />
                                </div>
                              }
                            >
                              <span className="text-xs sm:text-sm font-medium">
                                {item.productType}
                              </span>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="col-span-full py-8 text-center text-gray-500 font-medium">
                            You have no category
                          </div>
                        )}
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Country Selector */}
              <div className="w-full lg:w-auto">
                <Select onValueChange={handleCountry}>
                  <SelectTrigger className="border-gray-200 hover:border-primary/50 transition-all w-full lg:w-[200px] h-12 lg:h-10 bg-white">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-primary" />

                      <SelectValue placeholder="Select Country" />
                    </div>
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    className="max-h-[400px] w-[calc(100vw-2rem)] sm:w-[500px] md:w-[600px] overflow-y-auto mt-2 bg-white border-gray-100 shadow-xl rounded-xl p-2"
                  >
                    <SelectGroup>
                      <SelectLabel className="text-gray-400 text-xs font-bold uppercase tracking-wider px-3 py-2">
                        Select Country
                      </SelectLabel>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                        {COUNTRIES.map((item, index) => (
                          <SelectItem
                            key={index}
                            value={item.value}
                            className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-primary/5 hover:text-primary transition-colors focus:bg-primary/5 focus:text-primary border-none outline-none"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/30 group-data-[state=checked]:bg-primary" />

                              <span className="truncate font-medium text-sm">
                                {item.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Language Selector */}
              <div className="w-full lg:w-auto">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="border-gray-200 hover:border-primary/50 transition-all w-full lg:w-[180px] h-12 lg:h-10 bg-white">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe size={16} className="text-primary" />

                      <SelectValue>{selectedLanguage}</SelectValue>
                    </div>
                  </SelectTrigger>

                  <SelectContent className="bg-white">
                    {languages.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right side */}
          <nav className="hidden md:flex flex-col lg:flex-row items-center gap-4 lg:gap-8 w-full lg:w-auto mt-4 lg:mt-0">
            {NAV_ITEMS.map((item, index) => {
              const isActive = currentActive === item.link;

              return (
                <Link
                  href={item.link}
                  key={index}
                  className={`relative font-medium transition-colors group py-2 lg:py-0 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.name}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 hidden lg:block ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Navitems;
