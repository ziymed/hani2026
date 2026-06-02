<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminMessageController extends Controller
{
    /**
     * Display the contact messages list.
     */
    public function index(): Response
    {
        return Inertia::render('admin/messages/index', [
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    /**
     * Toggle the read/unread status of a contact message.
     */
    public function toggleRead(ContactMessage $message): RedirectResponse
    {
        $message->is_read = ! $message->is_read;
        $message->save();

        $status = $message->is_read ? 'marked as read' : 'marked as unread';

        return back()->with('success', "Message has been successfully {$status}.");
    }

    /**
     * Remove a contact message from the database.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message has been successfully deleted.');
    }
}
