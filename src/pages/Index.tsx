import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Shield, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="bg-primary rounded-full p-6 mb-4">
            <MessageSquare className="w-16 h-16 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Connect Instantly with
            <span className="text-primary block mt-2">Realtime Chat</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experience seamless communication with our modern chat platform. 
            Stay connected with friends, family, and colleagues in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:shadow-lg chat-transition">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Real-time messaging with instant delivery and read receipts
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:shadow-lg chat-transition">
            <div className="bg-accent/10 rounded-full p-4 mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              End-to-end encryption keeps your conversations safe and private
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border hover:shadow-lg chat-transition">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground">
              Chat with unlimited users and create group conversations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
