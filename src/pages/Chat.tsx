import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import UserPanel from "@/components/chat/UserPanel";

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
        <ChatSidebar selectedChatId={selectedChatId} onSelectChat={setSelectedChatId} />
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 hidden md:block">
        <ChatWindow selectedChatId={selectedChatId} />
      </div>

      {/* User Info Panel */}
      <div className="w-80 lg:w-96 flex-shrink-0 hidden lg:block">
        <UserPanel />
      </div>
    </div>
  );
};

export default Chat;
