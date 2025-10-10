import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Edit, Shield, LogOut, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SettingsSidebarProps {
  onClose: () => void;
}

const SettingsSidebar = ({ onClose }: SettingsSidebarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [soundNotifications, setSoundNotifications] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="h-full flex flex-col bg-chat-userPanel border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <UserCog className="w-5 h-5 text-primary" />
          Profile & Settings
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="p-4 space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  KR
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Kishore Reddy</h3>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
              <Button className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="text-sm">
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">kishore@example.com</p>
              </div>
              <div className="text-sm">
                <Label className="text-muted-foreground">Mobile</Label>
                <p className="font-medium">+91 98765 43210</p>
              </div>
              <div className="text-sm">
                <Label className="text-muted-foreground">Status</Label>
                <p className="font-medium">Hey there! I'm using Realtime Chat</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-4 space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Switch to dark theme
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sound">Sound Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Play sound for new messages
                  </p>
                </div>
                <Switch
                  id="sound"
                  checked={soundNotifications}
                  onCheckedChange={setSoundNotifications}
                />
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Settings
                </Button>

                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsSidebar;
