import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LogOut,
  PlusCircle,
  ShoppingBag,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useMemo } from "react";
export default function UserMenu({ handleLogout, user }) {
  const avatar = useMemo(() => user?.avatar, [user]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.full_name}`}
              alt={user?.full_name}
            />
            <AvatarFallback>
              {user?.full_name?.charAt(0)?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" forceMount>
        <DropdownMenuLabel className="font-normal py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            className="cursor-pointer w-full flex items-center py-2 text-sm space-x-2"
          >
            <Settings className="ml-2 h-4 w-4 text-muted-foreground" />
            <span>إدارة الحساب</span>
          </Link>
        </DropdownMenuItem>
        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link
              to="/dashboard"
              className="cursor-pointer w-full flex items-center py-2 text-sm space-x-2"
            >
              <LayoutDashboard className="ml-2 h-4 w-4 text-muted-foreground" />
              <span>لوحة التحكم</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link
            to="/profile?tab=purchased"
            className="cursor-pointer w-full flex items-center py-2 text-sm space-x-2"
          >
            <ShoppingBag className="ml-2 h-4 w-4 text-muted-foreground" />
            <span>مشترياتي</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/add-note"
            className="cursor-pointer w-full flex items-center py-2 text-sm space-x-2"
          >
            <PlusCircle className="ml-2 h-4 w-4 text-muted-foreground" />
            <span>إضافة ملخص</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-700 focus:bg-red-50 dark:focus:text-red-300 dark:focus:bg-red-900/50 py-2 text-sm"
        >
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
