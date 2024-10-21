export type Question = {
    question: string;
    options: string[];
    answer: string;
    image?: string;
    variant: ["regular-mcq", "mcq-with-image", "analyze-email"]; 
};