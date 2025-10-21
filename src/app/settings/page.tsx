"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("en-us");

  // To avoid hydration mismatch, we need to wait for the component to mount
  // before we can safely access the theme.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null; // or a loading spinner
  }

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
                        <RadioGroup 
                            defaultValue={theme} 
                            onValueChange={setTheme}
                            className="flex items-center gap-4"
                        >
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
                        <Select value={language} onValueChange={setLanguage}>
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
        </div>
      </main>
    </div>
  );
}
