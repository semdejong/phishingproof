import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoginButton from "@/components/ui/login-button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MailboxLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-transparent">
        <div className="flex h-20 items-center justify-between p-6">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <LoginButton />
          </nav>
        </div>
      </header>
      <main className="">{children}</main>
      <SiteFooter />
    </div>
  )
}
