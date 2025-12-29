import { Header } from "@repo/ui";
import { Sun, Moon } from "lucide-react";
import { useLayoutEffect, useState } from "react";

// TODO: Move theme logic into context provider with custom hook

type Theme = "dark" | "light";

export default function InfoPage() {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const saved = localStorage.getItem("theme");
            return (saved === "dark" || saved === "light") ? saved : "dark";
        } catch {
            return 'dark';
        }
    });

    // Enable transitions after mount
    useLayoutEffect(() => {
        document.body.classList.add("transition-colors", "duration-300", "ease-in-out");
    }, []);

    useLayoutEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div>
            <Header title="About the Envision AI Tech Assistant" className="text-4xl font-bold mb-4" />
            <p>
                <b>What it is?</b>
                <br />
                The Envision Technologist AI Assistant is a trained AI solution that answers technical questions about imaging exams.
                It provides guidance on best practices, exam technique, and other practical topics.
                It gives technologists fast, reliable guidance at the point of care, helping to produce high quality studies with fewer errors and less rework.
                Immediate answers reduce the need to interrupt radiologists for routine questions while keeping exams moving efficiently and consistently.
                <br /><br />
                <b>Is it accurate?</b>
                <br />
                The assistant was trained using thousands of instructional files and relevant medical websites.
                All training sources were curated and reviewed by Dr. Sana to ensure clinical relevance and accuracy.
                Ongoing feedback helps improve performance.
                Use thumbs down 👎 to flag responses that are unclear or incorrect, and thumbs up 👍 to confirm helpful answers.
            </p>
            <div className="fixed bottom-0 left-0 right-0 p-4 text-center">
                {theme === "dark" ? <Sun onClick={toggleTheme} /> : <Moon onClick={toggleTheme} />}
            </div>
        </div>
    );
}