import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Link } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router';

const InvitationPopup = ({ isOpen, onClose, defaultType = 'judge' }) => {
  const [inviteType, setInviteType] = useState(defaultType);
  const [link, setLink] = useState('https://example.com/invite/abc123');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggle = (checked) => {
    setInviteType(checked ? 'participant' : 'judge');
  };

  return (
    <Dialog open={isOpen} onOpenChange={()=>navigate("/challenge")}>
      <DialogContent className="sm:max-w-md">
        <Card className="w-full border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Invite External {inviteType === 'judge' ? 'Judges' : 'Participants'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="invite-toggle" className="text-sm font-medium">
                Invite as {inviteType}
              </Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Judge</span>
                <Switch
                  id="invite-toggle"
                  checked={inviteType === 'participant'}
                  onCheckedChange={handleToggle}
                />
                <span className="text-sm">Participant</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-link">Invitation Link</Label>
              <div className="flex space-x-2">
                <Input
                  id="invite-link"
                  value={link}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Alert className="bg-blue-50">
              <Link className="h-4 w-4" />
              <AlertDescription>
                Share this link with {inviteType === 'judge' ? 'judges' : 'participants'} to invite them to the event.
                {inviteType === 'judge' && ' They will have access to judging tools and scoring interface.'}
                {inviteType === 'participant' && ' They will be able to submit their entries and view event details.'}
              </AlertDescription>
            </Alert>

            {copied && (
              <Alert className="bg-green-50">
                <AlertDescription>Link copied to clipboard!</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default InvitationPopup;