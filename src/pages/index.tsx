import Head from "next/head";
import CryptoCard from "@/components/CryptoCard/CryptoCard";
import { Coin } from "@/types/coin.types";
import { useState } from 'react';
import SearchInput from "@/components/SearchInput/SearchInput";
import SortMenu from "@/components/SortMenu/SortMenu";

type HomeProps = {
  coins: Coin[]
}

export default function Home({ coins }: HomeProps) {
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('market_cap_desc');

  const sortOptions = [
    { label: "Market Cap (High → Low)", value: "market_cap_desc" },
    { label: "Market Cap (Low → High)", value: "market_cap_asc" },
    { label: "Price (High → Low)", value: "price_desc" },
    { label: "Price (Low → High)", value: "price_asc" },
  ];

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    switch (sortBy) {
      case "market_cap_desc":
        return b.market_cap - a.market_cap;
      case "market_cap_asc":
        return a.market_cap - b.market_cap;
      case "price_desc":
        return b.current_price - a.current_price;
      case "price_asc":
        return a.current_price - b.current_price;
      default:
        return 0;
    }
  });
  
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>

      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Crypto Dashboard
        </h1>

        <div className="sticky top-0 z-10 bg-gray-900 py-4 mb-8 shadow-md">
          <div className="flex justify-center gap-4 mb-8">
            <SearchInput onSearch={setSearch} placeholder="Search coins..." />
            <SortMenu value={sortBy} onChange={setSortBy} options={sortOptions} />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {sortedCoins.length > 0 ? (
          sortedCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">No results found.</p>
        )}
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