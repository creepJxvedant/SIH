
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, KeyRound, Smartphone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SecuritySettings() {
  const [newSecret, setNewSecret] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      toast({ variant: 'destructive', title: 'Invalid Phone Number' });
      return;
    }
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
    setIsVerifying(false);
    setIsOtpSent(true);
    toast({ title: 'OTP Sent', description: 'Check your phone for the verification code.' });
  };

  const handleUpdateSecret = async () => {
     if (otp.length !== 6) {
      toast({ variant: 'destructive', title: 'Invalid OTP', description: 'OTP must be 6 digits.' });
      return;
    }
     if (!newSecret) {
      toast({ variant: 'destructive', title: 'New Secret is empty' });
      return;
    }

    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Mock API call
    setIsVerifying(false);
    toast({ title: 'Secret Key Updated', description: 'Your login secret has been changed successfully.' });
    setNewSecret('');
    setOtp('');
    setPhone('');
    setIsOtpSent(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield />
          Security
        </CardTitle>
        <CardDescription>
          Change your unique teacher secret key for login.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="new-secret">New Teacher Secret</Label>
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-muted-foreground" />
            <Input
              id="new-secret"
              type="password"
              placeholder="Enter new secret key"
              value={newSecret}
              onChange={(e) => setNewSecret(e.target.value)}
              disabled={isVerifying}
            />
          </div>
        </div>
        {!isOtpSent ? (
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number for Verification</Label>
             <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
               <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isVerifying}
              />
            </div>
             <Button onClick={handleSendOtp} disabled={isVerifying} variant="secondary" className="w-full">
              {isVerifying && <Loader2 className="mr-2 animate-spin" />}
              Send Verification Code
            </Button>
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in-0 duration-300">
            <Label htmlFor="otp">Verification Code (OTP)</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              disabled={isVerifying}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateSecret} disabled={!isOtpSent || isVerifying} className="w-full">
           {isVerifying && <Loader2 className="mr-2 animate-spin" />}
          Update Secret Key
        </Button>
      </CardFooter>
    </Card>
  );
}

