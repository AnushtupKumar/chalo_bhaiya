import prisma from "@/lib/prisma";
import AuctionList from "./AuctionList";

export const dynamic = "force-dynamic";

export default async function AuctionsPage() {
  let activeAuctions: any[] = [];
  
  try {
    activeAuctions = await prisma.ride.findMany({
      where: {
        status: "BIDDING",
      },
      include: {
        student: true,
        bids: {
          include: {
            driver: true
          },
          orderBy: {
            bid_price: 'asc'
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  } catch (e) {
    console.error("Auction fetch failed (likely build-time):", e);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Live Auction Monitor</h1>
        <p className="text-gray-400">Watch real-time bidding activity on WhatsApp.</p>
      </div>

      <AuctionList initialAuctions={activeAuctions} />
    </div>
  );
}
