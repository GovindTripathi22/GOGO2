import { getLeads } from '@/lib/db';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Truck, Fuel, Calendar, Factory } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
    const leads = await getLeads();

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
                        <h1 className="text-2xl font-bold text-slate-900">B2B Quotes</h1>
                        <p className="text-slate-500">Manage incoming business requests</p>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    {leads.length === 0 ? (
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
                                        <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
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
                                                    {lead.email_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(lead.created_at!).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
