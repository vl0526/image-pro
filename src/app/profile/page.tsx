
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground">
       {/* We can add a shared header component later */}
       <header className="flex h-16 items-center border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
                <Link href="/">
                    <ArrowLeft />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </Button>
            <h1 className="font-headline text-xl font-bold text-white">
            Profile
            </h1>
        </div>
       </header>
       <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                    <CardDescription>Update your personal information and profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src="https://picsum.photos/seed/user/200/200" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1.5">
                            <Label htmlFor="picture">Profile Picture</Label>
                            <Input id="picture" type="file" />
                             <p className="text-xs text-muted-foreground">PNG, JPG, or GIF up to 5MB.</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
       </main>
    </div>
  );
}
