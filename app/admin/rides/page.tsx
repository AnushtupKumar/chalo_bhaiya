import prisma from "@/lib/prisma";
import { Suspense } from "react";
import RidesClientTable from "./RidesClientTable";
import AutoRefresh from "../AutoRefresh";

export const dynamic = "force-dynamic";

export default async function RidesPage() {
  const rides = await prisma.ride.findMany({
    orderBy: { created_at: "desc" },
    include: {
      student: true,
      driver: true,
    },
  });

  const serializedRides = rides.map(r => ({
    ...r,
    price: r.price ? r.price.toNumber() : null,
    driver: r.driver ? { ...r.driver, rating: r.driver.rating ? r.driver.rating.toNumber() : null } : null,
  }));

  return (
    <div className="space-y-6">
      <AutoRefresh intervalMs={3000} />
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          Live Rides Tracking
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </h1>
        <p className="text-gray-400">Monitor all ride activity and live auctions across the platform.</p>
      </div>

      <Suspense fallback={<div className="h-64 bg-[#1a1a1a] rounded-xl animate-pulse"></div>}>
        <RidesClientTable initialRides={serializedRides} />
      </Suspense>
    </div>
  );
}
