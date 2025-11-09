import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Construction, LucideIcon } from "lucide-react";

interface ComingSoonDialogProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function ComingSoonDialog({ title, children, icon: Icon }: ComingSoonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-12 text-center text-muted-foreground">
          {Icon ? <Icon className="mx-auto h-16 w-16 mb-4 opacity-50" /> : 
                 <Construction className="mx-auto h-16 w-16 mb-4 opacity-50" />}
          <h3 className="text-lg font-semibold mb-2 text-foreground">Coming Soon!</h3>
          <p>We're working hard to bring you this feature.</p>
          <p className="text-sm mt-2">Stay tuned for updates!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}