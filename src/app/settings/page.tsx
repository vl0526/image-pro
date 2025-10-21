
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
      <header className="flex h-16 items-center border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ArrowLeft />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="font-headline text-xl font-bold text-white">
            Settings
            </h1>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Theme</Label>
                        <RadioGroup defaultValue="dark" className="flex items-center gap-4">
                            <Label htmlFor="theme-light" className="flex items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="light" id="theme-light" />
                                Light
                            </Label>
                            <Label htmlFor="theme-dark" className="flex items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="dark" id="theme-dark" />
                                Dark
                            </Label>
                             <Label htmlFor="theme-system" className="flex items-center gap-2 cursor-pointer">
                                <RadioGroupItem value="system" id="theme-system" />
                                System
                            </Label>
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>Set your preferred language and region.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en-us">
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en-us">English (United States)</SelectItem>
                                <SelectItem value="vi-vn">Tiếng Việt (Việt Nam)</SelectItem>
                                <SelectItem value="ja-jp">日本語 (日本)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                            <span>Email Notifications</span>
                             <span className="font-normal leading-snug text-muted-foreground">
                                Receive emails about your account activity.
                            </span>
                        </Label>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                            <span>Push Notifications</span>
                             <span className="font-normal leading-snug text-muted-foreground">
                                Get push notifications on your devices.
                            </span>
                        </Label>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
