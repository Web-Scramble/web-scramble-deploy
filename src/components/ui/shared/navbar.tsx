"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import {  User, FileText,Menu } from 'lucide-react';
import { authStore } from "@/store/authstore";
import { Link } from 'react-router';



const Navbar = () => {
      const navItems = [
        // { icon: Home, label: 'Home', href: '/game' },
        { icon: FileText, label: 'Challenge', href: '/challenge' },
        { icon: User, label: 'Profile', href: '/profile' },
        // { icon: Wallet, label: 'Top Up', href: '#' },
      ];
      const {user} = authStore()
    
  return (
      <header className="border-b mb-4">
<div className="flex h-16 items-center px-4 md:px-6">
  <div className="w-20 h-8 bg-muted rounded mr-8">
    <h1 className="w-24 text-xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
      {user.username}</h1>
      </div>
  <nav className="flex items-center space-x-4 lg:space-x-6 mx-6 flex-1">
    {navItems.map((item, index) => (
      <Button
        key={index}
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link to={item.href} className="flex items-center gap-2">
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      </Button>
    ))}
  </nav>
  <Button size="icon" variant="ghost">
    <Menu className="h-6 w-6" />
  </Button>
</div>
</header>
  )
}

export default Navbar



