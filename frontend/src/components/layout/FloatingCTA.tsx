import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
      <Button
        asChild
        className="btn-primary rounded-full px-6 py-6 shadow-strong animate-pulse-glow"
      >
        <Link to="/contact" className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span>Need Help?</span>
        </Link>
      </Button>
    </div>
  );
};

export default FloatingCTA;
