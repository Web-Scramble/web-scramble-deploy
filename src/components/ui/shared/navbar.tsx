import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User, FileText, Menu } from "lucide-react";
import { authStore } from "@/store/authstore";
import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const navItems = [
    { icon: FileText, label: "Challenge", href: "/challenge" },
    { icon: User, label: "Profile", href: "/profile" },
  ];
  const { user } = authStore();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = ({ className = "", onClick = () => {} }) => (
    <div className="flex gap-4 sm:flex-row flex-col">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-primary"
          asChild
          onClick={onClick}
        >
          <Link to={item.href} className="flex items-center gap-2">
            <item.icon className="h-4 w-4 text-gray-500" />
            <span className="text-gray-500">{item.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );

  return (
    <header className="border-b mb-4 mt-0">
      <div className="flex h-16 items-center justify-start  px-4 md:px-6">
        {/* Mobile Navigation */}
        <div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden ml-auto">
              <Button variant="ghost" size="icon" className=" border">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col space-y-4 mt-6">
                <NavLinks onClick={() => setIsOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-20 h-8 bg-muted rounded mr-4 md:mr-8">
          <h1 className="w-24 text-xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            {user.username}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6 flex-1">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
