"use client";

import { useState } from "react";
import { updateSetting } from "../actions";

export default function SettingsClientForm({ initialSettings }: { initialSettings: any }) {
  const [advanceFee, setAdvanceFee] = useState(initialSettings.ADVANCE_FEE_PERCENTAGE || "20");
  const [platformFee, setPlatformFee] = useState(initialSettings.PLATFORM_FEE_PERCENTAGE || "10");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);
    setMessage("");
    try {
      await updateSetting("ADVANCE_FEE_PERCENTAGE", advanceFee);
      await updateSetting("PLATFORM_FEE_PERCENTAGE", platformFee);
      setMessage("✅ Settings updated successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (e) {
      alert("Error updating settings.");
    }
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        {/* Advance Fee Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Advance Payment (Anti-Spam)
          </label>
          <p className="text-xs text-gray-500 mb-2">Percentage paid by student to confirm the ride.</p>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              className="flex-1 bg-[#222] border border-gray-700 rounded-xl px-4 py-3 text-white text-lg font-bold outline-none focus:border-yellow-500 transition-colors"
              value={advanceFee}
              onChange={e => setAdvanceFee(e.target.value)}
            />
            <span className="text-2xl font-bold text-gray-600">%</span>
          </div>
        </div>

        {/* Platform Fee Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Platform Fee (Your Revenue)
          </label>
          <p className="text-xs text-gray-500 mb-2">Net commission Chalo keeps from the total fare.</p>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              className="flex-1 bg-[#222] border border-gray-700 rounded-xl px-4 py-3 text-white text-lg font-bold outline-none focus:border-blue-500 transition-colors"
              value={platformFee}
              onChange={e => setPlatformFee(e.target.value)}
            />
            <span className="text-2xl font-bold text-gray-600">%</span>
          </div>
        </div>
      </div>

      <div className="bg-[#222] p-4 rounded-xl border border-gray-700">
        <p className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">Projected Flow (₹100 Ride)</p>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Student Pays Upfront:</span>
            <span className="text-yellow-500 font-bold text-sm">₹{advanceFee}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Chalo Net Profit:</span>
            <span className="text-blue-400 font-bold text-sm">₹{platformFee}</span>
          </div>
          <div className="flex flex-col gap-1 col-span-2 pt-2 border-t border-gray-800">
            <span className="text-gray-500">Total Driver Earning:</span>
            <span className="text-green-400 font-bold text-sm">₹{100 - (Number(platformFee) || 0)}</span>
          </div>
        </div>
      </div>

      <button 
        disabled={isPending}
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Apply Changes"}
      </button>

      {message && (
        <p className="text-center text-green-500 text-sm font-medium animate-bounce mt-4">
          {message}
        </p>
      )}
    </form>
  );
}
