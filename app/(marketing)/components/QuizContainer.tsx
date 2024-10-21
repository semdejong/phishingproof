import { Icons } from "@/components/icons";
import Link from "next/link";
import { ElementType } from "react";

interface QuizContainerProps {
    title: string;
    description: string;
    Icon: ElementType;
    buttonText: string;
    href: string;
}

export default function QuizContainer({title, description, Icon, buttonText, href}: QuizContainerProps) {
    return(
        <div className="bg-background relative overflow-hidden rounded-lg border p-2 duration-200 ease-in-out hover:m-1 hover:scale-110 hover:bg-gray-100 ">
            <div className="flex h-[250px] flex-col items-center justify-between rounded-md p-4 ">
              <Icon className="size-[40px] text-red-500" />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="font-bold ">{title}</h3>
                <p className="text-muted-foreground text-center text-sm">
                    {description}
                </p>
              </div>
              <Link 
                href={`/quizzes/${href}`}       
                className="mt-3 rounded-full bg-[#ff4545] px-5 py-1.5 text-sm text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#8d3b3b] "
            >
                {buttonText}
            </Link>
            </div>
          
          </div>
    )
}    