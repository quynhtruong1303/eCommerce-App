import React from "react";
import Image from "next/image";

export interface CardProps {
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  imageAlt: string;
  category: string;
  isOnSale?: boolean;
  isNew?: boolean;
  badge?: string;
  variant?: "default" | "featured";
}

const Card: React.FC<CardProps> = ({
  title,
  price,
  originalPrice,
  image,
  imageAlt,
  category,
  isOnSale = false,
  isNew = false,
  badge,
}) => {
  const getBadgeColor = () => {
    if (isNew) return "bg-green text-light-100";
    if (isOnSale) return "bg-red text-light-100";
    if (badge === "Trending") return "bg-orange text-light-100";
    return "bg-dark-700 text-light-100";
  };

  const getBadgeText = () => {
    if (isNew) return "New";
    if (isOnSale) return "Sale";
    return badge || "";
  };

  return (
    <div
      className={`bg-light-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group`}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-light-200 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        {(isNew || isOnSale || badge) && (
          <div className="absolute top-3 left-3">
            <span
              className={`px-3 py-1 rounded-full text-caption font-jost font-medium ${getBadgeColor()}`}
            >
              {getBadgeText()}
            </span>
          </div>
        )}
      </div>

      {/* Black Information Strip */}
      <div className="bg-light-100 text-dark-900 p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-body font-jost font-medium text-dark-900 flex-1">
            {title}
          </h3>
          <span className="text-body font-jost font-medium text-dark-900 ml-2">
            ${price}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-caption font-jost text-dark-700">{category}</p>
          <p className="text-caption font-jost text-dark-700">6 Colour</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
