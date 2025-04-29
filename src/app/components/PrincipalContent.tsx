// "use client";

// import { Skeleton } from "@/app/components/ui/skeleton";
// import useApiData from "@/hooks/useApiData";
// import { Meals } from "@/types";
// import MealCard from "./MealCard";

// interface PrincipalContentProps {
//   meal: string;
// }

// export default function PrincipalContent({ meal }: PrincipalContentProps) {
//   const { data, loading } = useApiData<Meals>(
//     `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
//   );
//   if (loading || !data?.length) {
//     return (
//       <div className="flex-1 bg-blue-50 overflow-y-auto">
//         <div className="h-auto gap-4 m-[3%] flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center">
//           {/* Mismo número de skeletons que cards mostrarías */}
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={`skeleton-${index}`}
//               className="bg-white max-w-3xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg"
//             >
//               <Skeleton className="w-[224px] h-[250px] rounded-sm animate-pulse bg-blue-100" />
//               <Skeleton className="w-40 h-3 animate-pulse bg-blue-100" />
//               <Skeleton className="w-28 h-9 animate-pulse bg-blue-100" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="flex-1  bg-blue-50 min-h-0 overflow-y-auto">
//         <div className="gap-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 p-4 md:m-[3%] md:min-h-0 md:flex md:flex-col md:items-center">
//           {data.map((meal) => (
//             <MealCard
//               key={meal.strMealThumb}
//               imageUrl={meal.strMealThumb}
//               title={meal.strMeal}
//             ></MealCard>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// "use client";

// import { Skeleton } from "@/app/components/ui/skeleton";
// import useApiData from "@/hooks/useApiData";
// import { Meals } from "@/types";
// import MealCard from "./MealCard";

// interface PrincipalContentProps {
//   meal: string;
// }

// export default function PrincipalContent({ meal }: PrincipalContentProps) {
//   const { data, loading } = useApiData<Meals>(
//     `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
//   );

//   if (loading || !data?.length) {
//     return (
//       <div className="flex-1 bg-blue-50 overflow-y-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%]">
//           {[...Array(8)].map((_, index) => (
//             <div
//               key={`skeleton-${index}`}
//               className="bg-white w-full max-w-xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg"
//             >
//               <Skeleton className="w-full h-[250px] rounded-sm animate-pulse bg-blue-100" />
//               <Skeleton className="w-40 h-3 animate-pulse bg-blue-100" />
//               <Skeleton className="w-28 h-9 animate-pulse bg-blue-100" />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-blue-50 min-h-0 overflow-y-auto">
//       <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%]">
//         {data.map((meal) => (
//           <MealCard
//             key={meal.strMealThumb}
//             imageUrl={meal.strMealThumb}
//             title={meal.strMeal}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Skeleton } from "@/app/components/ui/skeleton";
import useApiData from "@/hooks/useApiData";
import { Meals } from "@/types";
import MealCard from "./MealCard";

interface PrincipalContentProps {
  meal: string;
}

export default function PrincipalContent({ meal }: PrincipalContentProps) {
  const { data, loading } = useApiData<Meals>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );

  if (loading || !data?.length) {
    return (
      <div className="flex-1 bg-blue-50 overflow-y-auto min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%]">
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="bg-white w-full max-w-xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg"
            >
              <Skeleton className="w-full h-[250px] rounded-sm animate-pulse bg-blue-100" />
              <Skeleton className="w-40 h-3 animate-pulse bg-blue-100" />
              <Skeleton className="w-28 h-9 animate-pulse bg-blue-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-blue-50 overflow-y-auto min-h-[calc(100vh-64px)]">
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:flex md:flex-wrap justify-center gap-4 p-4 md:m-[3%] min-h-full">
        {data.map((meal) => (
          <MealCard
            key={meal.strMealThumb}
            imageUrl={meal.strMealThumb}
            title={meal.strMeal}
          />
        ))}
      </div>
    </div>
  );
}
