"use client"

import React from "react"
import { Link } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import QuizContainer from "../components/QuizContainer"
import TypingHero from "../components/TypingHero"

const GetStartedButton = () => {
  const scrollToQuizOverview = () => {
    const element = document.getElementById("quiz-overview-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      onClick={scrollToQuizOverview}
      className="rounded-full bg-[#ff4545] px-8 py-5 text-lg font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#8d3b3b] "
    >
      Get started
    </Button>
  )
}

export default function QuizOverview() {
  //To-do: Fetch quizzes from the database and iterate over them to generate the quiz containers.

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.linkedIn}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on LinkedIn
          </Link>
          <div className="container relative flex max-w-5xl flex-col items-center gap-4 text-center">
            <div className="absolute -top-16 z-10 -ml-2 lg:-left-64 lg:-top-72">
              <Icons.logo className="size-48 lg:size-[680px] z-0 text-red-500 opacity-30" />
            </div>
            <div className="absolute -right-24 -top-12 z-10">
              <Icons.email className="size-48 lg:size-[200px] z-0 hidden rotate-12 text-red-500 opacity-30 lg:flex" />
            </div>
            <div
              className="size-6 absolute -right-24 -top-5 z-10 hidden animate-ping items-center justify-center rounded-full bg-red-500 font-bold text-white lg:flex"
              style={{ animationDuration: "2000ms" }}
            >
              <span>!</span>
            </div>
            <h1 className="z-20 font-heading text-3xl leading-10 sm:text-5xl md:text-6xl lg:text-7xl">
              Quiz Overview
              <br /> All the quizzes which keep you <TypingHero />
            </h1>
            <p className="z-20 max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Here are all the quizzes to educate you on the various types of
              phishing attacks.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <GetStartedButton />
        </div>
      </section>

      <section
        id="quiz-overview-section"
        className="container relative space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="absolute -left-24 top-44 z-10">
          <Icons.email className="size-48 lg:size-[200px] z-0 hidden -rotate-12 text-red-500 opacity-30 lg:flex" />
        </div>
        <div className="absolute z-10 -ml-2 hidden rotate-12 -scale-x-100 lg:-bottom-10 lg:-right-56 lg:flex">
          <Icons.fish className="size-48 lg:size-[300px] z-0 text-red-500 opacity-30" />
        </div>
        <div
          className="size-6 absolute left-12 top-40 z-10 hidden animate-ping items-center justify-center rounded-full bg-red-500 font-bold text-white lg:flex"
          style={{ animationDuration: "2000ms" }}
        >
          <span>!</span>
        </div>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Quizzes
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Social engineering attacks are on the rise. Phishing is the most
            common form of social engineering attack. Here are some facts about
            phishing.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
          {/* Fetch quizzes and iterate over it to generate them in the grid.*/}
          <QuizContainer
            title="Phishing 101"
            description="Learn the basics of phishing attacks. 95% of cybersecurity breaches are due to human mistakes, such as clicking malicious "
            Icon={Icons.fish}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          <QuizContainer
            title="Phishing 102"
            description="95% of cybersecurity breaches are due to human mistakes, such as clicking malicious links, which phishing exploits. "
            Icon={Icons.humanError}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          <QuizContainer
            title="Phishing 103"
            description="Modern phishing techniques are more sophisticated, using fake websites, personalized emails, to deceive victims."
            Icon={Icons.evolve}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          <QuizContainer
            title="Phishing 104"
            description="Companies that provide interactive phishing awareness training reduce their risk of a phishing attack by up to 70%."
            Icon={Icons.evolve}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          <QuizContainer
            title="Phishing 105"
            description="From healthcare to finance. Attackers often target industries with valuable data, but no company is immune."
            Icon={Icons.evolve}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          <QuizContainer
            title="Phishing 106"
            description="Companies that provide interactive phishing awareness training reduce their risk of a phishing attack by up to 70%."
            Icon={Icons.evolve}
            buttonText="Start quiz"
            quizId="cm2t35z7a00029u2ggsbjqdfi"
          />
          {/*             
          <div className="bg-background relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[180px] flex-col items-center justify-between rounded-md p-4">
              <Icons.safe className="size-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold">Phishing damages trust</h3>
                <p className="text-muted-foreground text-center text-sm">
                  
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <div className="mx-auto text-center md:max-w-[58rem]">
          <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Phishing<span className="text-red-500">Proof</span> also includes a
            full-featured documentation site built using Contentlayer and MDX
            for easy adjustments.
          </p>
        </div>
      </section>
    </>
  )
}
