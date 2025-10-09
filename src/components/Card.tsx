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
  variant = "default",
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
      className={`bg-light-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group ${
        variant === "featured" ? "ring-2 ring-dark-900" : ""
      }`}
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
              className={`px-2 py-1 rounded-full text-caption font-jost font-medium ${getBadgeColor()}`}
            >
              {getBadgeText()}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 p-2 bg-light-100 rounded-full shadow-md hover:bg-light-200 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <svg
            className="h-4 w-4 text-dark-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-caption font-jost text-dark-500 mb-1">{category}</p>

        {/* Title */}
        <h3 className="text-body font-jost font-medium text-dark-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-body font-jost font-bold text-dark-900">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-caption font-jost text-dark-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-dark-900 text-light-100 py-2 px-4 rounded-md text-body font-jost font-medium hover:bg-dark-700 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
