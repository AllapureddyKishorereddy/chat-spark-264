import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

interface GroupMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  members: GroupMember[];
}

const GroupMembersDialog = ({ open, onOpenChange, groupName, members }: GroupMembersDialogProps) => {
  const onlineCount = members.filter(m => m.online).length;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{groupName}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {members.length} members, {onlineCount} online
          </p>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {member.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-chat-onlineStatus border-2 border-background rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {member.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GroupMembersDialog;