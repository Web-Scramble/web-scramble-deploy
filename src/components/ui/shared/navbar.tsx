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
  LogOut,
  X
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

// Previous mock data and navigation items remain the same...

export default function Preview() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const {user} = authStore();

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };
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
                {/* Sheet content remains the same... */}
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

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
          </div>

          {/* Mobile Search Icon and User Profile */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMobileSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to={"/profile"}>
              <div className="flex items-center gap-2">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar - Animated */}
        <div className={`md:hidden px-4 pb-4 transition-all duration-300 ${
          showMobileSearch ? 'h-16 opacity-100' : 'h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="relative w-full flex items-center">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="w-full pl-8 pr-8"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2"
              onClick={toggleMobileSearch}
            >
              <X className="h-4 w-4 mb-4" />
            </Button>
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