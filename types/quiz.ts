import { Question } from "./question";

export type Quiz = {
    title: string;
    description: string;
    questions: Question[];
}