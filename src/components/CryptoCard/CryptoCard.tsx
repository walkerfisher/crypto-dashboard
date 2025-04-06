import { CryptoCardProps } from '@/types/cryptoCard';
import Image from 'next/image';

export default function CryptoCard({
  name,
  image,
  price,
  symbol,
  priceChange,
}: CryptoCardProps) {
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 flex items-center justify-between transition hover:scale-[1.02]">
      <div className="flex items-center space-x-4">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h2>
          <p className="text-sm text-gray-500 uppercase">{symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          ${price.toLocaleString()}
        </p>
        <p className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}
          {priceChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}