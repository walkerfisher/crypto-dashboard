import Image from "next/image";
import { Coin } from "@/types/coin.types";

export default function CryptoCard({ coin }: { coin: Coin }) {
  return (
    <div className="w-64 bg-white/10 border border-white/20 rounded-2xl shadow-md backdrop-blur-md p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
      <Image
        src={coin.image}
        alt={coin.name}
        width={48}
        height={48}
        className="mb-2"
      />
      <h2 className="text-lg font-semibold">{coin.name}</h2>
      <p className="text-sm text-gray-400">{coin.symbol.toUpperCase()}</p>
      <p className="text-xl font-bold">${coin.current_price.toLocaleString()}</p>
      <p
        className={`text-sm ${
          coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
}