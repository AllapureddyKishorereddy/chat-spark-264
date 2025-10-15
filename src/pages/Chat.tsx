import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import SettingsSidebar from "@/components/chat/SettingsSidebar";

interface ChatInfo {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  isGroup?: boolean;
  members?: Array<{ id: string; name: string; avatar: string; online: boolean }>;
}

const Chat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChatInfo, setSelectedChatInfo] = useState<ChatInfo | undefined>(undefined);
  const [showSettings, setShowSettings] = useState(false);

  const handleSelectChat = (chatId: string, chat: any) => {
    setSelectedChatId(chatId);
    setSelectedChatInfo(chat);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
        <ChatSidebar 
          selectedChatId={selectedChatId} 
          onSelectChat={handleSelectChat}
          onOpenSettings={() => setShowSettings(true)}
        />
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 hidden md:block">
        <ChatWindow 
          selectedChatId={selectedChatId} 
          chatInfo={selectedChatInfo}
        />
      </div>

      {/* Settings Panel (Collapsible) */}
      {showSettings && (
        <div className="w-80 lg:w-96 flex-shrink-0 hidden lg:block">
          <SettingsSidebar onClose={() => setShowSettings(false)} />
        </div>
      )}
    </div>
  );
};

export default Chat;
