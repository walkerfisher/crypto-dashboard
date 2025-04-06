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
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Crypto Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {coins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const coins: Coin[] = await res.json();

    return {
      props: {
        coins,
      },
      revalidate: 60, // rebuild the page every 60 seconds
    };
  } catch (error) {
    console.error("Failed to fetch coins", error);
    return {
      props: { coins: [] },
      revalidate: 60,
    };
  }
}