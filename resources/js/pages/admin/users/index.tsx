import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Users, PlusCircle, Pencil, Trash2, Calendar, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface UsersIndexProps {
    users: User[];
}

export default function UsersIndex({ users }: UsersIndexProps) {
    const { props } = usePage<any>();
    const currentAdminId = props.auth?.user?.id;

    const handleDelete = (user: User) => {
        if (user.id === currentAdminId) {
            toast.error('Security Block: You cannot delete your own administrative account.');
            return;
        }

        if (confirm(`Are you absolutely sure you want to delete user "${user.name}"? All associated settings will be lost permanently.`)) {
            router.delete(`/admin/users/${user.id}`, {
                onSuccess: () => toast.success('User account deleted successfully'),
                onError: (err: any) => toast.error(err.error || 'Failed to delete user account'),
            });
        }
    };

    return (
        <>
            <Head title="Manage User Accounts" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">Manage User Accounts</h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Review roles, manage permissions, create new users, or delete user accounts</p>
                    </div>
                    <Link href="/admin/users/create">
                        <Button className="rounded-xl bg-zinc-900 dark:bg-zinc-50 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-950 font-semibold gap-1.5 shadow-md">
                            <PlusCircle className="h-4 w-4" />
                            Add New User
                        </Button>
                    </Link>
                </div>

                {/* Users Table */}
                <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                    <CardHeader className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
                        <CardTitle className="text-base font-bold">Registered Users</CardTitle>
                        <CardDescription>Your database contains {users.length} total registered accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {users.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900">
                                            <th className="p-4 pl-6">Profile & Name</th>
                                            <th className="p-4">Email Address</th>
                                            <th className="p-4 text-center">Administrative Role</th>
                                            <th className="p-4">Date Joined</th>
                                            <th className="p-4 pr-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-sm">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-850/10 transition-colors">
                                                {/* Profile Name */}
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-500">
                                                            <UserIcon className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                                                                {user.name}
                                                                {user.id === currentAdminId && (
                                                                    <Badge className="bg-zinc-100 border-zinc-250 text-zinc-500 text-[9px] font-bold px-1.5 py-0 rounded-full">
                                                                        You
                                                                    </Badge>
                                                                )}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="p-4 text-zinc-650 dark:text-zinc-350">
                                                    {user.email}
                                                </td>

                                                {/* Role */}
                                                <td className="p-4 text-center">
                                                    {user.is_admin ? (
                                                        <Badge className="bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-full font-extrabold text-[9px] gap-1 px-2.5 py-0.5">
                                                            <ShieldCheck className="h-3 w-3" />
                                                            Administrator
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="rounded-full text-[9px] font-bold text-zinc-400 dark:text-zinc-500 border-zinc-200/50 dark:border-zinc-850 px-2 py-0.5">
                                                            Standard User
                                                        </Badge>
                                                    )}
                                                </td>

                                                {/* Date Joined */}
                                                <td className="p-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="p-4 pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link href={`/admin/users/${user.id}/edit`}>
                                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg" title="Edit user">
                                                                <Pencil className="h-4 w-4 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            className={`h-8 w-8 rounded-lg ${
                                                                user.id === currentAdminId ? 'opacity-40 cursor-not-allowed' : ''
                                                            }`}
                                                            title={user.id === currentAdminId ? 'Self-deletion blocked' : 'Delete user'}
                                                            onClick={() => handleDelete(user)}
                                                            disabled={user.id === currentAdminId}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Users className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                                <h3 className="font-bold">No Users Found</h3>
                                <p className="text-xs text-zinc-450 mt-1">Add users to build your administrative and development team.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

UsersIndex.layout = (page: any) => ({
    breadcrumbs: [
        {
            title: 'Admin Overview',
            href: '/admin',
        },
        {
            title: 'Manage Users',
            href: '/admin/users',
        },
    ],
});
