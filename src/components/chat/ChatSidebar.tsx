import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, PlusCircle, Search, Users, UserCircle, Settings } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateGroupDialog from "./CreateGroupDialog";
import { useToast } from "@/hooks/use-toast";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  members?: Array<{ id: string; name: string; avatar: string; online: boolean }>;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Sarah Smith",
    avatar: "",
    lastMessage: "Thanks for the help!",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "",
    lastMessage: "See you tomorrow 👋",
    timestamp: "3h ago",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "",
    lastMessage: "That sounds great!",
    timestamp: "1d ago",
    unread: 1,
    online: false,
  },
];

interface ChatSidebarProps {
  selectedChatId: string | null;
  onSelectChat: (chatId: string, chat: Chat) => void;
  onOpenSettings: () => void;
}

const ChatSidebar = ({ selectedChatId, onSelectChat, onOpenSettings }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const { toast } = useToast();

  const handleGroupCreated = (groupName: string, members: string[]) => {
    const mockMembers = members.map((name, idx) => ({
      id: `member-${idx}`,
      name,
      avatar: "",
      online: Math.random() > 0.5,
    }));

    const newGroup: Chat = {
      id: `group-${Date.now()}`,
      name: groupName,
      avatar: "",
      lastMessage: "Group created",
      timestamp: "now",
      unread: 0,
      online: false,
      isGroup: true,
      members: mockMembers,
    };
    setChats([newGroup, ...chats]);
  };

  const handleNewChat = () => {
    toast({
      title: "New Chat",
      description: "Feature coming soon! Search for contacts above.",
    });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="h-full bg-chat-sidebar border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Chats</h2>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full gap-1 mb-3"
            onClick={() => setShowCreateGroup(true)}
          >
            <Users className="w-4 h-4" />
            Create Group
          </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search chats or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id, chat)}
              className={`p-4 hover:bg-background/50 cursor-pointer chat-transition ${
                selectedChatId === chat.id ? "bg-background/70" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {chat.isGroup ? <Users className="w-4 h-4" /> : chat.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {!chat.isGroup && chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-chat-onlineStatus border-2 border-chat-sidebar rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Floating Add Button */}
        <div className="sticky bottom-4 right-4 flex justify-end p-4">
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg"
            title="New Chat"
            onClick={handleNewChat}
          >
            <PlusCircle className="w-6 h-6" />
          </Button>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="mt-auto border-t p-3 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="flex-1"
          onClick={onOpenSettings}
          title="Profile"
        >
          <UserCircle className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex-1"
          onClick={onOpenSettings}
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>

    <CreateGroupDialog 
      open={showCreateGroup} 
      onOpenChange={setShowCreateGroup}
      onGroupCreated={handleGroupCreated}
    />
  </>
  );
};

export default ChatSidebar;
