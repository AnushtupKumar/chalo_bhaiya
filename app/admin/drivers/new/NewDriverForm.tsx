"use client";

import { useState } from "react";
import { createDriver } from "../../actions";
import { useRouter } from "next/navigation";

export default function NewDriverForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle_number: ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.phone) return alert("Phone number is required");
    
    setIsPending(true);
    try {
      const newId = await createDriver(formData);
      router.push(`/admin/drivers/${newId}`);
    } catch (e) {
      alert("Error creating driver. Phone number might already exist.");
    }
    setIsPending(false);
  }

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Phone Number (Required)</label>
          <input 
            type="text" 
            required
            placeholder="+919876543210"
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Vehicle Number</label>
          <input 
            type="text" 
            placeholder="MH01AB1234"
            className="w-full bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-blue-500"
            value={formData.vehicle_number}
            onChange={e => setFormData({...formData, vehicle_number: e.target.value})}
          />
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Create Driver & Proceed to KYC"}
        </button>
      </form>
    </div>
  );
}
