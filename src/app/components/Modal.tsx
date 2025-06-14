"use client";

import useApidata from "@/hooks/useApiData";
import { Meals } from "@/types";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Skeleton } from "./ui/skeleton";

type ModalProps = {
  isOpen: boolean;
  handleModal: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  idMeal?: string;
};

export default function Modal({
  isOpen,
  handleModal,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = "",
  idMeal,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const { data, loading } = useApidata<Meals>(url);
  const meal = data?.[0];

  // Obtener ingredientes con sus medidas de forma segura
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal?.[`strIngredient${i}` as keyof typeof meal];
      const measure = meal?.[`strMeasure${i}` as keyof typeof meal];

      if (ingredient?.trim()) {
        ingredients.push(`${ingredient}${measure ? ` - ${measure}` : ""}`);
      }
    }
    return ingredients;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape && isOpen) {
        handleModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleModal, closeOnEscape]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (
      closeOnOutsideClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      handleModal();
    }
  };

  if (!isOpen) return null;
  //console.log(meal.strMealThumb);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl ${className}`}
      >
        <button
          onClick={handleModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 ml-2"
          aria-label="Cerrar modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="max-h-[80vh] overflow-y-auto ml-2 mt-6">
          {loading ? (
            <div>
              <div className="flex flex-col justify-center items-center h-auto gap-6">
                <Skeleton className="w-[376px] h-[376px] animate-pulse bg-blue-100" />
                <Skeleton className="w-40 h-4 animate-pulse bg-blue-100" />
                {/* <Skeleton className="w-[280px] h-auto rounded-sm animate-pulse bg-blue-100" /> */}
              </div>
              <div className="flex flex-col gap-3 mt-3.5">
                <Skeleton className="w-20 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-24 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-16 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-20 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-24 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-16 h-4 animate-pulse bg-blue-100" />
                <Skeleton className="ml-2 w-20 h-4 animate-pulse bg-blue-100" />
              </div>
            </div>
          ) : meal ? (
            <div className="space-y-4">
              {/* Imagen con fallback */}
              <div className="w-full h-auto bg-gray-100 rounded-lg overflow-hidden">
                {meal.strMealThumb ? (
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal || "Imagen de receta"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No image.
                  </div>
                )}
              </div>

              {/* Título */}
              <h2 className="font-montserrat text-blue-500 font-bold text-center">
                {meal.strMeal || "Receta sin nombre"}
              </h2>

              {/* Ingredientes */}
              <div>
                <h3 className="font-bold font-montserrat text-blue-500 mb-2">
                  Ingredients:
                </h3>
                {getIngredients().length > 0 ? (
                  <ul className="list-disc pl-5 font-montserrat text-blue-500 space-y-1">
                    {getIngredients().map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    There are no available ingredients.
                  </p>
                )}
              </div>

              {/* Preparación */}
              <div>
                <h3 className="font-bold font-montserrat text-blue-500 mb-2">
                  Instructions:
                </h3>
                {meal.strInstructions ? (
                  <div className="space-y-2">
                    {(meal.strInstructions || "")
                      .split("\r\n")
                      .filter((p) => p.trim() !== "")
                      .map((paragraph, index) => (
                        <p
                          className="font-montserrat text-blue-500"
                          key={index}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 font-montserrat">
                    There are no available instructions.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center  items-center h-48">
              <p className="font-montserrat">
                No recipe information was found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// "use client";

// import useApidata from "@/hooks/useApiData";
// import { Meals } from "@/types";
// import { useEffect, useRef } from "react";
// import ReactDOM from "react-dom";

// type ModalProps = {
//   isOpen: boolean;
//   handleModal: () => void;
//   closeOnOutsideClick?: boolean;
//   closeOnEscape?: boolean;
//   className?: string;
//   idMeal?: string;
// };

// export default function Modal({
//   isOpen,
//   handleModal,
//   closeOnOutsideClick = true,
//   closeOnEscape = true,
//   className = "",
//   idMeal,
// }: ModalProps) {
//   const modalRef = useRef<HTMLDivElement>(null);
//   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
//   const { data, loading } = useApidata<Meals>(url);
//   const meal = data?.[0];

//   // Obtener ingredientes con sus medidas
//   const getIngredients = () => {
//     const ingredients = [];
//     for (let i = 1; i <= 20; i++) {
//       const ingredient = meal?.[`strIngredient${i}` as keyof typeof meal];
//       const measure = meal?.[`strMeasure${i}` as keyof typeof meal];

//       if (ingredient && ingredient.trim() !== "") {
//         ingredients.push(`${ingredient} - ${measure || ""}`);
//       }
//     }
//     return ingredients;
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape" && closeOnEscape && isOpen) {
//         handleModal();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, handleModal, closeOnEscape]);

//   const handleOutsideClick = (e: React.MouseEvent) => {
//     if (
//       closeOnOutsideClick &&
//       modalRef.current &&
//       !modalRef.current.contains(e.target as Node)
//     ) {
//       handleModal();
//     }
//   };

//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
//       onClick={handleOutsideClick}
//     >
//       <div
//         ref={modalRef}
//         className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl ${className}`}
//       >
//         <button
//           onClick={handleModal}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//           aria-label="Cerrar modal"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         <div className="max-h-[80vh] overflow-y-auto">
//           {loading ? (
//             <p>Cargando...</p>
//           ) : meal ? (
//             <div className="space-y-4">
//               {/* Imagen */}
//               <img
//                 src={meal.strMealThumb}
//                 alt={meal.strMeal}
//                 className="w-full h-48 object-cover rounded-lg"
//               />

//               {/* Ingredientes */}
//               <div>
//                 <h3 className="font-bold mb-2">Ingredientes:</h3>
//                 <ul className="list-disc pl-5 space-y-1">
//                   {getIngredients().map((item, index) => (
//                     <li key={index}>{item}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Preparación */}
//               <div>
//                 <h3 className="font-bold mb-2">Preparación:</h3>
//                 <div className="space-y-2">
//                   {meal.strInstructions
//                     .split("\r\n")
//                     .filter((p) => p.trim() !== "")
//                     .map((paragraph, index) => (
//                       <p key={index}>{paragraph}</p>
//                     ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>No se encontró información de la receta.</p>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }
