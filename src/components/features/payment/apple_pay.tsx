import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ApplePayForm = () => {
    return (
      <div className="space-y-6">
        {/* Device Check */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Device Requirements</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• iPhone with Face ID or Touch ID</li>
              <li>• Safari browser on macOS</li>
              <li>• Apple Pay enabled device</li>
            </ul>
          </div>
        </div>
  
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
  
        {/* Shipping Address from Apple Pay */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Shipping Address</h3>
            <span className="text-sm text-gray-500">(From Apple Pay)</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Your shipping address will be provided securely through Apple Pay
            </p>
          </div>
        </div>
  
        <div className="pt-4">
          <Button 
            className="w-full bg-black hover:bg-gray-900" 
            size="lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <AppleIcon className="h-5 w-5" />
              <span>Pay with Apple Pay</span>
            </div>
          </Button>
        </div>
      </div>
    );
  };
  
  // Apple Icon Component
  const AppleIcon = ({ className = "h-6 w-6" }) => (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.41 2.865 8.138 6.84 9.466V16.5h-2.063v-2.97H6.84v-2.256c0-2.035 1.21-3.156 3.067-3.156.89 0 1.82.156 1.82.156v1.996h-1.024c-1.01 0-1.326.626-1.326 1.27v1.52h2.256l-.36 2.97h-1.896V21.5C19.135 20.172 22 16.444 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  );