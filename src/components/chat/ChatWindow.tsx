import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Phone, Video, MoreVertical, Smile, Paperclip, Send, Users } from "lucide-react";
import GroupMembersDialog from "./GroupMembersDialog";

interface Message {
  id: string;
  sender: "me" | "other";
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "other",
    content: "Hey! How are you?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "me",
    content: "I'm good! How about you?",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    sender: "other",
    content: "Doing great! Working on that new project",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    sender: "me",
    content: "That's awesome! Let me know if you need any help",
    timestamp: "10:33 AM",
  },
];

interface ChatInfo {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  isGroup?: boolean;
  members?: Array<{ id: string; name: string; avatar: string; online: boolean; role: 'admin' | 'member' }>;
}

interface ChatWindowProps {
  selectedChatId: string | null;
  chatInfo?: ChatInfo;
}

const ChatWindow = ({ selectedChatId, chatInfo }: ChatWindowProps) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showGroupMembers, setShowGroupMembers] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  if (!selectedChatId) {
    return (
      <div className="h-full bg-chat-window flex items-center justify-center">
        <div className="text-center">
          <div className="bg-muted rounded-full p-8 inline-block mb-4">
            <Phone className="w-16 h-16 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Select a chat to start messaging</h3>
          <p className="text-muted-foreground">Choose a conversation from the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-chat-window flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div 
            className={`flex items-center gap-3 ${chatInfo?.isGroup ? 'cursor-pointer' : ''}`}
            onClick={() => chatInfo?.isGroup && setShowGroupMembers(true)}
          >
            <div className="relative">
              <Avatar>
                <AvatarImage src={chatInfo?.avatar || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {chatInfo?.isGroup ? (
                    <Users className="w-4 h-4" />
                  ) : (
                    chatInfo?.name.split(" ").map((n) => n[0]).join("") || "JD"
                  )}
                </AvatarFallback>
              </Avatar>
              {!chatInfo?.isGroup && chatInfo?.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-chat-onlineStatus border-2 border-background rounded-full" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{chatInfo?.name || "John Doe"}</h3>
              <p className="text-xs text-muted-foreground">
                {chatInfo?.isGroup 
                  ? `${chatInfo.members?.length || 0} members, ${chatInfo.members?.filter(m => m.online).length || 0} online`
                  : chatInfo?.online ? "online" : "offline"
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Phone className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Video className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "me"
                    ? "bg-chat-bubbleSent text-primary-foreground"
                    : "bg-chat-bubbleReceived"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost">
            <Smile className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="flex-1"
          />
          <Button type="button" size="icon" variant="ghost">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button type="submit" size="icon">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
      
      {chatInfo?.isGroup && chatInfo.members && (
        <GroupMembersDialog
          open={showGroupMembers}
          onOpenChange={setShowGroupMembers}
          groupName={chatInfo.name}
          members={chatInfo.members}
          currentUserId="member-0"
        />
      )}
    </div>
  );
};

export default ChatWindow;
