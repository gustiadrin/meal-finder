import Image, { StaticImageData } from "next/image";

type Props = {
  imageUrl: string | StaticImageData;
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const MealCard = ({ imageUrl, title }: Props) => {
  // const truncatedTitle = title
  //   ? title.split(" ").slice(0, 4).join(" ") +
  //     (title.split(" ").length > 4 ? "..." : "")
  //   : "Título de receta";
  const words = title?.split(" ") || [];
  const isLongTitle = words.length > 4;
  const truncatedTitle = isLongTitle
    ? words.slice(0, 4).join(" ") + "..."
    : title;

  return (
    <div className="bg-white max-w-3xs h-[350px] overflow-hidden flex flex-col justify-between relative p-4 rounded-sm shadow-lg aspect-[4/5]">
      <Image
        alt="meal-image"
        src={imageUrl}
        width={224}
        height={250}
        className="rounded-sm w-auto h-auto" // object
      />

      <div className="relative group">
        <h3 className="mb-3 font-roboto text-blue-400 font-bold truncate">
          {truncatedTitle}
        </h3>
        {/* Tooltip dinámico */}
        {isLongTitle && (
          <div
            className={`
            absolute hidden group-hover:block bottom-full left-0
            ${
              words.length > 8 ? "w-full" : "w-48"
            }  // Ancho según cantidad de palabras
            bg-gray-800 text-white text-sm px-3 py-2 rounded shadow-lg
            transform transition-all duration-200 origin-bottom
            scale-95 group-hover:scale-100
          `}
          >
            {title}
            {/* Flecha del tooltip */}
            <div className="absolute w-3 h-3 bg-gray-800 rotate-45 bottom-[-6px] left-6"></div>
          </div>
        )}
      </div>

      <button className="w-28 h-9 font-montserrat text-white bg-blue-400 rounded-md hover:bg-blue-700">
        Ver receta
      </button>
    </div>
  );
};

export default MealCard;
