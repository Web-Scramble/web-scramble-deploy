import Layout from "@/components/ui/shared/layout";
import {
  ChevronRight,
  User,
  MapPin,
  Flag,
  CheckSquare,
  Lock,
  HelpCircle,
  Mail,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SettingsItem = ({ icon: Icon, label, onClick }) => (
  <Button
    variant="ghost"
    className="w-full justify-between hover:bg-gray-50 border rounded-lg p-3 h-auto"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-gray-600" />
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </Button>
);

const SettingsSection = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-gray-900 px-1">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const SettingsScreen = () => {
  return (
    <Layout>
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-6">
          <SettingsSection title="General">
            <SettingsItem icon={User} label="Personal Details" />
            <SettingsItem icon={MapPin} label="Location" />
            <SettingsItem icon={Flag} label="Created Challenges" />
            <SettingsItem icon={CheckSquare} label="Completed" />
            <SettingsItem icon={Lock} label="Change Password" />
          </SettingsSection>

          <SettingsSection title="Support">
            <SettingsItem icon={HelpCircle} label="Need help? Let's connect" />
            <SettingsItem icon={Mail} label="Email Us" />
            <SettingsItem icon={Shield} label="Privacy Policy" />
          </SettingsSection>

          <Button
            variant="ghost"
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 mt-6 border border-red-200 rounded-lg"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SettingsScreen;
