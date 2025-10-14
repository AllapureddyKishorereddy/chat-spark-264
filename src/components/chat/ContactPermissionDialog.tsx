import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ContactPermissionDialogProps {
  open: boolean;
  onPermissionResponse: (response: "allow" | "always" | "deny") => void;
}

const ContactPermissionDialog = ({ open, onPermissionResponse }: ContactPermissionDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Access Your Contacts</AlertDialogTitle>
          <AlertDialogDescription>
            This app would like to access your contacts to help you find and connect with friends who are also using the app.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={() => onPermissionResponse("always")}
            className="w-full"
          >
            Allow Always
          </Button>
          <Button
            onClick={() => onPermissionResponse("allow")}
            variant="secondary"
            className="w-full"
          >
            Allow
          </Button>
          <AlertDialogCancel
            onClick={() => onPermissionResponse("deny")}
            className="w-full mt-0"
          >
            Deny
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactPermissionDialog;
