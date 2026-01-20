"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Plus, Trash2, KeyRound, X, Loader2, AlertCircle } from "lucide-react";

interface AdminUser {
    id: string;
    email: string;
    role: string;
    created_at: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState<string | null>(null); // userId to edit
    // router unused

    // Form States
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch {
            // Removed unused error handling
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError("");

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newEmail, password: newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to create user");
            }

            // Success
            setNewEmail("");
            setNewPassword("");
            setShowAddModal(false);
            fetchUsers();
            alert("User added successfully!");
        } catch (err: unknown) {
            setFormError((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? They will lose access immediately.")) return;

        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Failed to delete");
                return;
            }

            setUsers(users.filter(u => u.id !== id));
        } catch {
            alert("Failed to delete user");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!showPasswordModal) return;

        setSubmitting(true);
        setFormError("");

        try {
            const res = await fetch(`/api/admin/users/${showPasswordModal}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setNewPassword("");
            setShowPasswordModal(null);
            alert("Password updated successfully!");
        } catch (err: unknown) {
            setFormError((err as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/admin/cms" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-500 p-2 rounded-xl text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
                                <p className="text-sm text-slate-500">Manage access to the CMS</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add User
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
                        <p className="mt-2 text-slate-500">Loading users...</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-medium text-slate-500">Email</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Role</th>
                                    <th className="px-6 py-3 font-medium text-slate-500">Created At</th>
                                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4 font-medium text-slate-900">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                                            <button
                                                onClick={() => {
                                                    setNewPassword("");
                                                    setShowPasswordModal(user.id);
                                                    setFormError("");
                                                }}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Change Password"
                                            >
                                                <KeyRound className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Add New Admin</h2>
                            <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>

                        {formError && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {formError}
                            </div>
                        )}

                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="new.admin@gogo.bj"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Minimum 8 characters"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create User"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
                            <button onClick={() => setShowPasswordModal(null)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>

                        {formError && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {formError}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
