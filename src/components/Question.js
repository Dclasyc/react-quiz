import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../contexts/quiz";

const Question = ({ questions }) => {
    const [quizState] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    return (
    <div>
        <div className="question">{currentQuestion.question}</div>
        <div className="answers">
            {quizState.answers.map((answer, answerIndex) => (
                <Answer answerText = {answer} key={answerIndex}/>
            ))}
        </div>
    </div>
    )
};

export default Question;
