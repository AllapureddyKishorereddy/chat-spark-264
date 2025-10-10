import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Moon, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const UserPanel = () => {
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
    <div className="h-full bg-chat-userPanel border-l">
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">User Info</h2>
          </div>

          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      KR
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-chat-onlineStatus border-2 border-card rounded-full" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Kishore Reddy</h3>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <Label htmlFor="notifications" className="cursor-pointer">
                    Notifications
                  </Label>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <Label htmlFor="privacy" className="cursor-pointer">
                    Privacy
                  </Label>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-muted-foreground" />
                  <Label htmlFor="darkmode" className="cursor-pointer">
                    Dark Mode
                  </Label>
                </div>
                <Switch id="darkmode" />
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default UserPanel;
