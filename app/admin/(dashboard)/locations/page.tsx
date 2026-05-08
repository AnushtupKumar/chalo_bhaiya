import prisma from "@/lib/prisma";
import LocationsClientTable from "./LocationsClientTable";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const locations = await prisma.location.findMany({
    orderBy: { name: 'asc' }
  });

  const serializedLocations = locations.map(loc => ({
    ...loc,
    fixed_price: loc.fixed_price ? loc.fixed_price.toNumber() : null,
    distance_km: loc.distance_km ? loc.distance_km.toNumber() : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Managed Locations</h1>
        <p className="text-gray-400">Configure pickup points, destinations, and their respective fair prices.</p>
      </div>

      <LocationsClientTable initialLocations={serializedLocations} />
    </div>
  );
}
