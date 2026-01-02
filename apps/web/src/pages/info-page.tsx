import { Header } from "@repo/ui";

export default function InfoPage() {

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
        </div>
    );
}