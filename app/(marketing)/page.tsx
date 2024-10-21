import Link from "next/link"
import { Icon } from "@radix-ui/react-select"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import TypingHero from "./components/TypingHero"
import TypingSlogan from "./components/TypingSlogan"

async function getGitHubStars(): Promise<string | null> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/shadcn/taxonomy",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
        next: {
          revalidate: 60,
        },
      }
    )

    if (!response?.ok) {
      return null
    }

    const json = await response.json()

    return parseInt(json["stargazers_count"]).toLocaleString()
  } catch (error) {
    return null
  }
}

export default async function IndexPage() {
  const stars = await getGitHubStars()

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.linkedIn}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on LinkedIn
          </Link>
          <div className="container relative flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <div className="absolute -top-16 z-10 -ml-2 lg:-left-64 lg:-top-72">
              <Icons.logo className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[680px] lg:w-[680px]" />
            </div>
            <div className="absolute -right-24 -top-12 z-10">
              <Icons.email className="z-0 hidden h-48 w-48 rotate-12 text-red-500 opacity-30 lg:flex lg:h-[200px] lg:w-[200px]" />
            </div>
            <div
              className="absolute -right-24 -top-5 z-10 hidden h-6 w-6 animate-ping items-center justify-center rounded-full bg-red-500 font-bold text-white lg:flex"
              style={{ animationDuration: "2000ms" }}
            >
              <span>!</span>
            </div>
            <h1 className="z-20 font-heading text-3xl leading-10 sm:text-5xl md:text-6xl lg:text-7xl">
              A product that will help you become Phishing <TypingHero />
            </h1>
            <p className="z-20 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Learn how to identify phishing emails and websites. Don&apos;t get
              caught in a phishing scam!
            </p>
          </div>
          <div className="z-20 space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section
        id="what-is-phishing"
        className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        {" "}
        <div className="relative mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="absolute z-10 -ml-2 hidden  -rotate-12 lg:-left-72 lg:-top-20 lg:flex">
            <Icons.fish className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[300px] lg:w-[300px]" />
          </div>
          <div className="absolute z-10 -ml-2 hidden  rotate-12 lg:-right-80 lg:top-20 lg:flex">
            <Icons.deadFish className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[300px] lg:w-[300px]" />
          </div>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            What is Phishing<span className="text-red-500">Proof</span>?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            PhishingProof is an interactive web app designed to educate users on
            the dangers of phishing and social engineering attacks. Through
            engaging, hands-on experiences, it helps individuals and companies
            recognize and respond to phishing attempts, empowering teams to
            prevent these attacks from compromising their organization’s
            security. PhishingProof not only raises awareness but also provides
            practical knowledge to strengthen overall cybersecurity resilience.
          </p>
        </div>
      </section>

      <section
        id="facts"
        className="container relative space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="absolute -left-24 top-44 z-10">
          <Icons.email className="z-0 hidden h-48 w-48 -rotate-12 text-red-500 opacity-30 lg:flex lg:h-[200px] lg:w-[200px]" />
        </div>
        <div className="absolute z-10 -ml-2 hidden scale-x-[-1]  rotate-12 lg:-bottom-10 lg:-right-72 lg:flex">
          <Icons.fish className="z-0 h-48 w-48 text-red-500 opacity-30 lg:h-[300px] lg:w-[300px]" />
        </div>
        <div
          className="absolute left-12 top-40 z-10 hidden h-6 w-6 animate-ping items-center justify-center rounded-full bg-red-500 font-bold text-white lg:flex"
          style={{ animationDuration: "2000ms" }}
        >
          <span>!</span>
        </div>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Facts
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Social engineering attacks are on the rise. Phishing is the most
            common form of social engineering attack. Here are some facts about
            phishing.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.logo className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Phishing is the #1 cyber threat</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Over 90% of all cyberattacks start with a phishing email,
                  making it the most common attack vector for organizations.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.humanError className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Human error is a major risk</h3>
                <p className="text-center text-sm text-muted-foreground">
                  95% of cybersecurity breaches are due to human mistakes, such
                  as clicking malicious links, which phishing exploits.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.evolve className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Phishing attacks have evolved</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Modern phishing techniques are more sophisticated, using fake
                  websites, personalized emails, to deceive victims.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.brain className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">
                  Interactive training can reduce risk
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  Companies that provide interactive phishing awareness training
                  reduce their risk of a phishing attack by up to 70%.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.factory className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Every industry is at risk</h3>
                <p className="text-center text-sm text-muted-foreground">
                  From healthcare to finance. Attackers often target industries
                  with valuable data, but no company is immune.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.safe className="h-[40px] w-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Phishing damages trust</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Beyond financial losses, successful phishing attacks harm a
                  company’s reputation and trust with customers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Phishing<span className="text-red-500">Proof</span> also includes a
            full-featured documentation site built using Contentlayer and MDX
            for easy adjustments.
          </p>
        </div>
      </section>
      <section
        id="slogan"
        className="container flex justify-center space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <h2 className="text-4xl font-extrabold text-center">
          <TypingSlogan />
        </h2>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly <span className="text-red-500">Open</span> Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            PhishingProof is open source and powered by open source software.{" "}
            <br /> The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
          {stars && (
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-foreground"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                  {stars} stars on GitHub
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
