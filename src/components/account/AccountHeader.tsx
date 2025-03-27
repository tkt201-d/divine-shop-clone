
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AccountHeaderProps {
  user: User | null;
}

export function AccountHeader({ user }: AccountHeaderProps) {
  // Lấy chữ cái đầu tiên của email để làm avatar
  const getInitials = () => {
    if (!user?.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      <Avatar className="h-16 w-16 border-2 border-border">
        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
          {getInitials()}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Thông tin tài khoản</h1>
        <p className="text-muted-foreground">
          {user?.email}
        </p>
      </div>
    </div>
  );
}
