import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Menu, 
  Search, 
  Puzzle, 
  User,
  Home,
  Bell,
  Settings,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { authStore } from '@/store/authstore';
import { Link } from 'react-router';

// Mock data
const mockUser = {
  username: "John Doe",
  avatar: "/api/placeholder/32/32",
  notifications: 3
};

const desktopNavItems = [
  { icon: Home, label: "Home", href: "/challenge" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: mockUser.notifications },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const mobileNavItems = [
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: mockUser.notifications },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const mobileBottomNavItems = [
  { icon: Home, label: "Home", href: "/challenge" },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: mockUser.notifications },
  { icon: User, label: "Profile", href: "/profile" },
];

const NavLinks = ({ items, className = "", onClick = () => {} }) => (
  <div className={`flex gap-4 sm:flex-row flex-col ${className}`}>
    {items.map((item, index) => (
    <Link to={item.href}>
      <Button
        key={index}
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-primary relative"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          <item.icon className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500">{item.label}</span>
          {item.badge && (
            <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center rounded-full absolute -top-1 -right-1">
              {item.badge}
            </Badge>
          )}
        </div>
      </Button>
          </Link>
    ))}
  </div>
);

export default function Preview() {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = authStore()

  return (
    <div className="w-full rounded-lg relative pb-4 md:pb-0">
      <header className="border-b mb-2 mt-0">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex items-center gap-2 mb-6">
                  <Puzzle className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-bold">Scramble</span>
                </div>
                {/* User Profile in Mobile Menu */}
                <div className="flex items-center gap-2 mb-6 p-2 bg-secondary/20 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mockUser.username}</p>
                    <p className="text-sm text-muted-foreground">View Profile</p>
                  </div>
                </div>
                <nav className="flex flex-col space-y-4">
                  <NavLinks items={mobileNavItems} onClick={() => setIsOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo and App Name */}
          <div className="flex items-center gap-2 md:mr-8">
            <Puzzle className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold hidden md:inline">Scramble</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <NavLinks items={desktopNavItems} />
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
          </div>

          {/* User Profile Dropdown */}
          <Link to={"/profile"}>
          <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
               <p className='text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent'>{user.username}</p>
          </div>
        </Link>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div>
        </div>
      </header>


      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="flex justify-around items-center h-16">
          {mobileBottomNavItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex-1 flex flex-col items-center justify-center gap-1 h-full relative"
              onClick={() => {}}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="h-5 w-5 flex items-center justify-center rounded-full absolute top-2 right-1/4"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}
