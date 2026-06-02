import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Users, ArrowLeft, Save, ShieldCheck, Mail, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { toast } from 'sonner';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

interface UserFormProps {
    user: User | null;
}

export default function UserForm({ user }: UserFormProps) {
    const isEditMode = user !== null;

    // useForm hook tracks name, email, password, and administrative privilege status
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        is_admin: user?.is_admin || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditMode) {
            put(`/admin/users/${user.id}`, {
                onSuccess: () => toast.success('User account updated successfully!'),
                onError: () => toast.error('Check form errors and try again.'),
            });
        } else {
            post('/admin/users', {
                onSuccess: () => {
                    toast.success('User account created successfully!');
                    reset('password');
                },
                onError: () => toast.error('Check form errors and try again.'),
            });
        }
    };

    return (
        <>
            <Head title={isEditMode ? `Edit User: ${user.name}` : 'Create New User Account'} />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 overflow-y-auto max-h-[85vh]">
                {/* Back Link */}
                <Link href="/admin/users" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors mb-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to user accounts
                </Link>

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        {isEditMode ? `Modify User Profile: ${user.name}` : 'Create User Account'}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isEditMode ? 'Update user credentials, profile particulars, or administrative roles.' : 'Create a new user credentials, email details, and assign administrative roles.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <Card className="dark:bg-zinc-900 dark:border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-base font-bold">User Identity Parameters</CardTitle>
                            <CardDescription>Authentication credentials and dashboard role settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1">
                                    <UserIcon className="h-3.5 w-3.5 text-zinc-450" />
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="e.g. John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-1">
                                    <Mail className="h-3.5 w-3.5 text-zinc-450" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold">
                                    Secure Account Password {isEditMode && '(Leave blank to keep current)'}
                                </Label>
                                <PasswordInput
                                    id="password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="rounded-xl border-zinc-200 dark:border-zinc-800"
                                    required={!isEditMode}
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Role (is_admin Checkbox) */}
                            <div className="flex items-center space-x-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                <Checkbox
                                    id="is_admin"
                                    checked={data.is_admin}
                                    onCheckedChange={(checked) => setData('is_admin', !!checked)}
                                    className="rounded-md"
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="is_admin" className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer">
                                        <ShieldCheck className={`h-4 w-4 ${data.is_admin ? 'text-amber-500 fill-current' : 'text-zinc-400'}`} />
                                        Assign Administrative Privileges
                                    </Label>
                                    <p className="text-[10px] text-zinc-550">Administrators receive unrestricted dashboard access to manage projects, submissions, and users</p>
                                </div>
                                <InputError message={errors.is_admin} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-3 justify-end border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-4">
                            <Link href="/admin/users">
                                <Button variant="outline" className="rounded-xl" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-zinc-900 dark:bg-zinc-550 hover:bg-zinc-850 text-zinc-50 font-bold gap-1.5 shadow-md px-5"
                            >
                                <Save className="h-4 w-4" />
                                {processing ? 'Committing...' : 'Commit Account'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

UserForm.layout = (page: any) => {
    const isEdit = page.props.user !== null;
    return {
        breadcrumbs: [
            {
                title: 'Admin Overview',
                href: '/admin',
            },
            {
                title: 'Manage Users',
                href: '/admin/users',
            },
            {
                title: isEdit ? 'Edit User' : 'New User',
                href: isEdit ? `/admin/users/${page.props.user.id}/edit` : '/admin/users/create',
            },
        ],
    };
};
