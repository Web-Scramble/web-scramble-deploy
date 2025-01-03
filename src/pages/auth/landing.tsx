import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight,CircleDollarSign ,Users,SquarePen} from "lucide-react";
import { Link } from "react-router";
import { authStore } from "@/store/authstore";

const LandingPage = () => {
  const {token,updateToken} = authStore()
  const features = [
    {
      title: "Create and Customize Challenges",
      description:
        "Built with performance in mind, ensuring your application runs smoothly.",
      icon: SquarePen,
    },
    {
      title: "Join Games and Compete with Others",
      description: "Enterprise-grade security measures to protect your data.",
      icon: Users,
    },
    {
      title: "Win Rewards and Earn Money",
      description:
        "Continuous improvements and new features released regularly.",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Welcome To Scramble
            {/* <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Create. Compete. Earn.
            </span> */}
          </h1>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Create. Compete. Earn.
            </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Step into the ultimate hub for challenges and games. Create your own
            challenges, invite friends, join exciting competitions, and win cash
            rewards!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/auth"}>
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            </Link>
            <Link to={"/challenge"}>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features That Make Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied customers who have transformed their
            business.
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Create account <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 lg:px-8 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>Features</li>
              <li>Pricing</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>Community</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>Privacy</li>
              <li>Terms</li>
              <li>Security</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-muted-foreground">
          © 2024 Your Company. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
