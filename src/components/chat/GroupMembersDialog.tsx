import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  role: 'admin' | 'member';
}

interface GroupMembersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  members: GroupMember[];
  currentUserId: string;
}

const GroupMembersDialog = ({ open, onOpenChange, groupName, members, currentUserId }: GroupMembersDialogProps) => {
  const { toast } = useToast();
  const onlineCount = members.filter(m => m.online).length;
  const currentUserMember = members.find(m => m.id === currentUserId);
  const isCurrentUserAdmin = currentUserMember?.role === 'admin';
  
  const handleRemoveMember = (memberId: string, memberName: string) => {
    toast({
      title: "Member removed",
      description: `${memberName} has been removed from the group`,
    });
  };

  const handleAddMember = () => {
    toast({
      title: "Add member",
      description: "Add member functionality coming soon",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{groupName}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {members.length} members, {onlineCount} online
          </p>
        </DialogHeader>
        
        {isCurrentUserAdmin && (
          <Button onClick={handleAddMember} className="w-full" variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        )}
        
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
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{member.name}</p>
                    {member.role === 'admin' && (
                      <Badge variant="secondary" className="text-xs">Admin</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.online ? "Online" : "Offline"}
                  </p>
                </div>
                {isCurrentUserAdmin && member.id !== currentUserId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveMember(member.id, member.name)}
                    title="Remove member"
                  >
                    <UserMinus className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GroupMembersDialog;