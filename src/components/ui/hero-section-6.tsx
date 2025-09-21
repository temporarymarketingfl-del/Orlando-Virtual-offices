'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Menu, SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Locations', href: '/locations' },
    { name: 'Providers', href: '/providers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Pricing', href: '/pricing' },
]

export function HeroSection() {
    const [menuState, setMenuState] = useState(false)
    return (
        <>
            <header>
                <nav
                    data-state={menuState && 'active'}
                    className="group fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
                    <div className="m-auto max-w-5xl px-6">
                        <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                            <div className="flex w-full justify-between lg:w-auto">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2">
                                    <Logo />
                                </Link>

                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>

                            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                                <div className="lg:pr-4">
                                    <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm">
                                        <Link href="/contact">
                                            <span>Contact</span>
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="/get-started">
                                            <span>Get Started</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <section className="overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-20">
                        <div className="lg:flex lg:items-center lg:gap-12">
                            <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <Link
                                    href="/blog"
                                    className="rounded-lg mx-auto flex w-fit items-center gap-2 border p-1 pr-3 lg:ml-0">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">New</span>
                                    <span className="text-sm">Orlando Virtual Office Guide</span>
                                    <span className="bg-border block h-4 w-px"></span>

                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">Find Your Perfect Virtual Office in Orlando</h1>
                                <p className="mt-8">Discover professional virtual office solutions in Orlando's top business districts. From Downtown to Lake Nona, find the perfect address for your business with our comprehensive comparison platform.</p>

                                <div>
                                    <form
                                        action=""
                                        className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto">
                                        <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[1rem] border pr-1 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                                            <Mail className="text-muted-foreground pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

                                            <input
                                                placeholder="Enter your email for updates"
                                                className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                                                type="email"
                                            />

                                            <div className="md:pr-1.5 lg:pr-0">
                                                <Button
                                                    aria-label="submit"
                                                >
                                                    <span className="hidden md:block">Get Started</span>
                                                    <SendHorizonal
                                                        className="relative mx-auto size-5 md:hidden"
                                                        strokeWidth={2}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </form>

                                    <ul className="list-inside list-disc space-y-2">
                                        <li>Instant Setup</li>
                                        <li>Professional Addresses</li>
                                        <li>24/7 Support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
                            <div aria-hidden className="absolute z-[1] inset-0 bg-gradient-to-r from-background from-35%" />
                            <div className="relative">
                                <img
                                    className="hidden dark:block"
                                    src="https://tailark.com/_next/image?url=%2Fmusic.png&w=3840&q=75"
                                    alt="Virtual office illustration"
                                    width={2796}
                                    height={2008}
                                />
                                <img
                                    className="dark:hidden"
                                    src="https://tailark.com/_next/image?url=%2Fmusic-light.png&w=3840&q=75"
                                    alt="Virtual office illustration"
                                    width={2796}
                                    height={2008}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8">
                <path
                    d="M12 2L22 7V17L12 22L2 17V7L12 2Z"
                    fill="url(#logo-gradient)"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M12 8V16M8 10L16 14M16 10L8 14"
                    stroke="white"
                    strokeWidth="2"
                />
                <defs>
                    <linearGradient
                        id="logo-gradient"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                        gradientUnits="userSpaceOnUse">
                        <stop stopColor="#548ea1" />
                        <stop
                            offset="1"
                            stopColor="#4a7c95"
                        />
                    </linearGradient>
                </defs>
            </svg>
            <span className="text-xl font-bold">VirtualOffice Hub</span>
        </div>
    )
}