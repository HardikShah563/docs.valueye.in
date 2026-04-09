import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactUsPage() {
    return (
        <div className="mx-auto w-full max-w-5xl px-4">

            {/* Page Header */}
            <div className="mb-12 text-center md:mb-16">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                    Get in Touch
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have a question about our modules or need custom support? We're here to help.
                </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

                {/* Left Column: Contact Information */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Fill out the form, and our team will get back to you within 24 hours. Alternatively, you can reach us directly using the information below.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">Email</p>
                                <p className="text-sm text-muted-foreground">info@valueye.in</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">Phone</p>
                                <p className="text-sm text-muted-foreground">+91 93210 12106</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">Office</p>
                                <p className="text-sm text-muted-foreground">Mulund West, Mumbai,<br />Maharashtra, 400080</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <Card className="border-border/60 bg-card/50 shadow-sm backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>
                            We'll get back to you as soon as possible.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        First name
                                    </label>
                                    <Input id="first-name" placeholder="John" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Last name
                                    </label>
                                    <Input id="last-name" placeholder="Doe" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input id="email" type="email" placeholder="john@example.com" required />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    placeholder="How can we help you?"
                                    className="min-h-[120px] resize-none"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}