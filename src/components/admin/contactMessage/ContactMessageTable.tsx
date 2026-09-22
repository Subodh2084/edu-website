"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ContactMessage } from "@/types/database";
import {
  deleteContactMessageAction,
  updateContactMessageStatusAction,
} from "@/app/admin/contact-messages/actions";

interface ContactMessageTableProps {
  messages: ContactMessage[];
}

export default function ContactMessageTable({
  messages,
}: ContactMessageTableProps) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    status: ContactMessage["status"],
  ) => {
    try {
      setLoadingId(id);
      setError(null);

      await updateContactMessageStatusAction(id, status);

      router.refresh();
    } catch (error) {
      console.error("Failed to update message status:", error);
      setError("Failed to update message status.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      setError(null);

      await deleteContactMessageAction(id);

      router.refresh();
    } catch (error) {
      console.error("Failed to delete message:", error);
      setError("Failed to delete message.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-leaf-border bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-leaf-border bg-leaf-bg hover:bg-leaf-bg">
                <TableHead className="text-leaf-navy">Name</TableHead>
                <TableHead className="text-leaf-navy">Email</TableHead>
                <TableHead className="text-leaf-navy">Subject</TableHead>
                <TableHead className="text-leaf-navy">Message</TableHead>
                <TableHead className="text-leaf-navy">Status</TableHead>
                <TableHead className="text-leaf-navy">Received</TableHead>
                <TableHead className="text-right text-leaf-navy">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-leaf-muted"
                  >
                    No contact messages found.
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className="border-leaf-border transition-colors hover:bg-leaf-bg/60"
                  >
                    {/* Name */}
                    <TableCell className="font-medium text-leaf-navy">
                      {message.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-sm text-leaf-muted">
                      {message.email}
                    </TableCell>

                    {/* Subject */}
                    <TableCell className="max-w-55">
                      <p className="truncate font-medium text-leaf-navy">
                        {message.subject || "No subject"}
                      </p>
                    </TableCell>

                    {/* Message */}
                    <TableCell className="max-w-75">
                      <p className="truncate text-sm text-leaf-muted">
                        {message.message}
                      </p>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Select
                        value={message.status}
                        disabled={loadingId === message.id}
                        onValueChange={(value) =>
                          handleStatusChange(
                            message.id,
                            value as ContactMessage["status"],
                          )
                        }
                      >
                        <SelectTrigger className="w-28 border-none bg-transparent shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Received */}
                    <TableCell className="whitespace-nowrap text-sm text-leaf-muted">
                      {new Date(message.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-leaf-navy hover:bg-leaf-soft"
                              disabled={loadingId === message.id}
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">
                                Open actions
                              </span>
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="bg-white"
                          >
                            {/* View */}
                            <DropdownMenuItem>
                              <Link
                                href={`/admin/contact-messages/${message.id}`}
                                className="flex items-center gap-2"
                              >
                                <Eye className="size-4" />
                                View
                              </Link>
                            </DropdownMenuItem>

                            {/* Delete */}
                            <AlertDialogTrigger>
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={(event) =>
                                  event.preventDefault()
                                }
                              >
                                <Trash2 className="size-4" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Delete Confirmation */}
                        <AlertDialogContent className="bg-leaf-bg">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete this message?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This will permanently delete the message from{" "}
                              <span className="font-medium text-leaf-navy">
                                {message.name}
                              </span>
                              . This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              disabled={loadingId === message.id}
                              onClick={() => handleDelete(message.id)}
                              className="bg-red-500 text-white hover:bg-red-600"
                            >
                              {loadingId === message.id ? (
                                "Deleting..."
                              ) : (
                                <>
                                  <Trash2 className="size-4" />
                                  Delete
                                </>
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}