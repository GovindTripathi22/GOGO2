"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Truck, Fuel, Factory, Edit, X, Save, Loader2 } from 'lucide-react';

interface Lead {
    id: string;
    company_name: string;
    fleet_size: string;
    fuel_type: string;
    email: string;
    phone?: string;
    email_status?: string;
    created_at?: string;
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await fetch('/api/leads'); // Need to ensure GET /api/leads exists or use server action
            // Wait, we defined getLeads in db.ts but not a public API route for it yet? 
            // The previous page was server component using direct DB access.
            // I should construct an API endpoint or Server Action. 
            // For now, I'll assume I need to create GET /api/leads or use the existing page structure but strictly client side?
            // Actually, I should create the API route if not exists.
            // HACK: for this step, I will create a GET route in api/leads/route.ts if it doesn't return leads.
            // checking previous files... api/leads/route.ts handles POST (submit).
            // I will update that file in next step to support GET.

            const data = await res.json();
            if (Array.isArray(data)) {
                setLeads(data);
            }
        } catch {
            console.error("Failed to fetch leads");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLead) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/leads/${editingLead.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingLead)
            });

            if (res.ok) {
                setLeads(leads.map(l => l.id === editingLead.id ? editingLead : l));
                setEditingLead(null);
            } else {
                alert('Failed to save changes');
            }
        } catch {
            alert('Error updating lead');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/admin"
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Leads Dashboard</h1>
                        <p className="text-slate-500">Manage and track B2B quote requests</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 flex justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            No quotes received yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Company</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Contact</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Fleet Details</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                                        <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                                        <Factory className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-semibold text-slate-900">{lead.company_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Mail className="w-3 h-3" />
                                                        {lead.email}
                                                    </div>
                                                    {lead.phone && (
                                                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                                                            <Phone className="w-3 h-3" />
                                                            {lead.phone}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium w-fit">
                                                        <Truck className="w-3 h-3" />
                                                        {lead.fleet_size} Vehicles
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium w-fit">
                                                        <Fuel className="w-3 h-3" />
                                                        {lead.fuel_type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.email_status === 'sent' ? 'bg-green-100 text-green-800' :
                                                    lead.email_status === 'error' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {lead.email_status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setEditingLead(lead)}
                                                    className="p-2 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                                                    title="Edit Quote"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingLead && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-900">Edit Quote Request</h3>
                            <button onClick={() => setEditingLead(null)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    value={editingLead.company_name}
                                    onChange={(e) => setEditingLead({ ...editingLead, company_name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Fleet Size</label>
                                    <input
                                        type="text"
                                        value={editingLead.fleet_size}
                                        onChange={(e) => setEditingLead({ ...editingLead, fleet_size: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Fuel Type</label>
                                    <select
                                        value={editingLead.fuel_type}
                                        onChange={(e) => setEditingLead({ ...editingLead, fuel_type: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option value="Diesel">Diesel</option>
                                        <option value="Super">Super</option>
                                        <option value="Both">Both</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editingLead.email}
                                        onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={editingLead.phone || ''}
                                        onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select
                                    value={editingLead.email_status || 'pending'}
                                    onChange={(e) => setEditingLead({ ...editingLead, email_status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="sent">Sent to Driver</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="closed">Closed</option>
                                    <option value="error">Error</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingLead(null)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-900 font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
