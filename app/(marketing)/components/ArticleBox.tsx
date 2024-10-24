import React from "react"
import Image from "next/image"
import Link from "next/link"

function ArticleBox() {
  const dummyArticle = {
    title: "How to spot a phishing email",
    description:
      "Phishing emails are a common way for hackers to gain access to your personal information. Learn how to spot them and protect yourself.",
    image: "/images/articleDummy.jpg",
    date: "June 1, 2021",
    href: "/articles/how-to-spot-a-phishing-email",
  }
  return (
    <Link href={dummyArticle.href}>
      <div className="flex rounded-lg border text-left duration-200 ease-in-out hover:bg-gray-200 dark:border-gray-600 dark:bg-transparent dark:hover:bg-gray-800">
        <div className="relative h-auto md:w-32">
          <Image
            src={dummyArticle.image}
            alt="article"
            className="rounded-l-lg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="ml-1 flex flex-col p-1.5 sm:ml-3.5 sm:py-3 sm:pr-3.5">
          <div className="flex items-center">
            <h3 className="text-base font-semibold sm:text-lg">
              {dummyArticle.title}
            </h3>
            <p className="ml-auto text-xs sm:text-sm">{dummyArticle.date}</p>
          </div>
          <div>
            <p className="pt-4 text-xs font-normal sm:text-sm">
              {dummyArticle.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleBox
