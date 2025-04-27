"use client";
import { useState, useEffect, useRef } from "react";
import useApidata from "@/hooks/useApiData";
import { Category } from "@/types";
import { Skeleton } from "@/app/components/ui/skeleton";

interface SideNavProps {
  setCategory: (category: string) => void;
}

const SKELETON_WIDTHS = [
  "w-[70px]",
  "w-[90px]",
  "w-[60px]",
  "w-[80px]",
  "w-[100px]",
  "w-[65px]",
  "w-[85px]",
  "w-[75px]",
  "w-[95px]",
  "w-[55px]",
  "w-[110px]",
  "w-[50px]",
  "w-[120px]",
  "w-[45px]",
];

export default function SideNav({ setCategory }: SideNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [isMobile, setIsMobile] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data, loading } = useApidata<Category>(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );

  const handleCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const selectedCategory =
    "bg-blue-300 md:bg-blue-400 text-blue-500 md:text-blue-50 font-semibold shadow-md";

  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const checkScroll = () => {
    if (menuRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = menuRef.current;
      const scrollPosition = scrollTop + clientHeight;

      setShowScrollTop(scrollTop > 100);
      setIsAtTop(scrollTop === 0);
      setIsAtBottom(scrollPosition >= scrollHeight - 10);

      // Mostrar indicador de scroll abajo solo si no hemos llegado al final
      setShowScrollBottom(scrollPosition < scrollHeight - 50);
    }
  };

  const scrollToTop = () => {
    if (menuRef.current) {
      menuRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (menuRef.current) {
      menuRef.current.scrollTo({
        top: menuRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const renderSkeletons = () => (
    <div className="space-y-[1.9rem] p-4">
      {SKELETON_WIDTHS.map((width, i) => (
        <Skeleton
          key={`skeleton-${i}`}
          className={`h-[10px] rounded-full bg-blue-100 ${width}`}
        />
      ))}
    </div>
  );

  if (!isMounted) {
    return (
      <div className="hidden md:block w-[250px] sticky top-16 h-[calc(100vh-4rem)]">
        <div className="p-4">
          <h2 className="text-lg font-roboto text-blue-400 font-bold mb-4">
            CATEGORÍAS
          </h2>
          {renderSkeletons()}
        </div>
      </div>
    );
  }

  return (
    <nav className="shadow-lg">
      {/* Menú móvil */}
      {isMobile && (
        <div className="md:hidden">
          <button
            className="fixed top-[5px] left-1 z-50 p-2 rounded-md text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div
            className={`fixed inset-0 z-4 bg-black/70 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={closeMobileMenu}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-full w-3/5 max-w-xs bg-blue-50 transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 bg-blue-50 sticky top-0 z-10">
                <h2 className="font-roboto text-lg text-blue-400 font-bold">
                  CATEGORÍAS
                </h2>
                <button
                  className="text-2xl text-blue-50 hover:text-gray-700 focus:outline-none"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  &times;
                </button>
              </div>

              <div className="relative flex-1 overflow-hidden  bg-blue-50">
                <div
                  ref={menuRef}
                  className="h-full overflow-y-auto  pb-4"
                  onScroll={checkScroll}
                >
                  <div className="bg-blue-50 p-4 min-h-full">
                    {loading ? (
                      renderSkeletons()
                    ) : (
                      <ul className="space-y-2">
                        {data?.map((category: Category) => (
                          <li
                            key={category.strCategory}
                            onClick={() => {
                              setSelected(category.strCategory);
                              closeMobileMenu();
                              handleCategory(category.strCategory);
                            }}
                            className={`p-2 font-montserrat rounded cursor-pointer transition-all duration-200 transform hover:translate-x-1 ${
                              selected === category.strCategory
                                ? selectedCategory
                                : "text-blue-400"
                            }`}
                          >
                            {category.strCategory}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Gradiente superior solo cuando no estamos en el top */}
                {!isAtTop && (
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-100 to-transparent pointer-events-none"></div>
                )}

                {/* Gradiente inferior solo cuando no estamos en el bottom */}
                {!isAtBottom && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-100 to-transparent pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Botón de volver arriba */}
            {showScrollTop && (
              <button
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={scrollToTop}
                aria-label="Volver arriba"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            )}

            {/* Botón de ver más abajo (solo en móvil y cuando hay más contenido) */}
            {isMobile && showScrollBottom && (
              <button
                className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                onClick={scrollToBottom}
                aria-label="Ver más categorías"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Menú escritorio */}
      {!isMobile && (
        <div className="hidden md:block shadow-xl w-[250px] bg-blue-50 sticky top-16 h-[calc(100vh-4rem)]">
          <div className="p-4">
            <h2 className="text-lg font-roboto text-blue-400 font-bold mb-4">
              CATEGORÍAS
            </h2>
            {loading ? (
              renderSkeletons()
            ) : (
              <ul className="space-y-2">
                {data?.map((category: Category) => (
                  <li
                    key={category.strCategory}
                    onClick={() => {
                      handleCategory(category.strCategory);
                      setSelected(category.strCategory);
                    }}
                    className={`p-2 text-blue-400 font-montserrat rounded cursor-pointer transition-all duration-200 transform hover:translate-x-1  ${
                      selected === category.strCategory ? selectedCategory : ""
                    }`}
                  >
                    {category.strCategory}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
