import React from "react";
import { Card } from "@/components";

const latestShoes = [
  {
    title: "Air Jordan 1 Retro High OG",
    price: "170",
    originalPrice: "200",
    meta: "6 Colour",
    image: "/shoes/shoe-1.jpg",
    imageAlt: "Air Jordan 1 Retro High OG",
    category: "Sneakers",
    isOnSale: true,
    isNew: false,
  },
  {
    title: "Air Max 270",
    price: "150",
    meta: "5 Colour",
    image: "/shoes/shoe-2.webp",
    imageAlt: "Air Max 270",
    category: "Lifestyle",
    isNew: true,
  },
  {
    title: "React Element 55",
    price: "130",
    meta: "4 Colour",
    image: "/shoes/shoe-3.webp",
    imageAlt: "React Element 55",
    category: "Lifestyle",
    badge: "Trending",
  },
  {
    title: "Air Force 1 '07",
    price: "90",
    meta: "3 Colour",
    image: "/shoes/shoe-4.webp",
    imageAlt: "Air Force 1 '07",
    category: "Sneakers",
    isNew: true,
  },
  {
    title: "Blazer Mid '77",
    price: "85",
    meta: "6 Colour",
    image: "/shoes/shoe-5.avif",
    imageAlt: "Blazer Mid '77",
    category: "Lifestyle",
  },
  {
    title: "Dunk Low",
    price: "100",
    meta: "4 Colour",
    image: "/shoes/shoe-6.avif",
    imageAlt: "Dunk Low",
    category: "Sneakers",
    badge: "Popular",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-light-100">
      {/* Latest Shoes Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-heading-2 font-jost font-bold text-dark-900 mb-12">
            Latest Shoes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {latestShoes.map((shoe, index) => (
              <Card key={index} {...shoe} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
