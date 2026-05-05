import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@repo/ui";

import { useDeleteAccount } from "@/hooks/user/use-delete-account";

export function DeleteAccount() {
  const { deleteAccount, loading } = useDeleteAccount();

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive-outline" />}>
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogPopup className={"font-inter"}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"font-semibold"}>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
            <span className="text-accent-warning">
              You can&apos;t create a new account with the same email on devkit.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose
            render={<Button variant="ghost" className="rounded-2xl" />}
          >
            Cancel
          </AlertDialogClose>
          <AlertDialogClose
            render={
              <Button
                variant="destructive"
                className="rounded-2xl"
                disabled={loading}
                onClick={deleteAccount}
              />
            }
          >
            {loading ? "Deleting..." : "Delete Account"}
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
