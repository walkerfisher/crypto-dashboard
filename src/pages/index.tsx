import Head from "next/head";
import CryptoCard from "@/components/CryptoCard/CryptoCard";
import { Coin } from "@/types/coin";

type HomeProps = {
  coins: Coin[]
}

export default function Home({ coins }: HomeProps) {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Crypto Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coins.map((coin: Coin) => (
            <CryptoCard
              key={coin.id}
              name={coin.name}
              image={coin.image}
              price={coin.current_price}
              symbol={coin.symbol}
              priceChange={coin.price_change_percentage_24h}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  const coins: Coin[] = await res.json();

  return {
    props: {
      coins,
    },
  };
}