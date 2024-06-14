import { createContext, useReducer } from "react";
import questions from "../data";
import { shuffleAnswers } from "../components/helpers";

const initialState = {
    currentQuestionIndex: 0,
    questions,
    showResult: false,
    answers: shuffleAnswers(questions[0]),
};

const reducer = (state, action) => {
    if(action.type === "NEXT_QUESTION"){
        const showResult = state.currentQuestionIndex ===state.questions.length - 1;
        const currentQuestionIndex = showResult 
            ? state.currentQuestionIndex 
            : state.currentQuestionIndex + 1;
        const answers = showResult 
            ? [] 
            : shuffleAnswers(state.questions[currentQuestionIndex])
        return{...state, 
                currentQuestionIndex: state.currentQuestionIndex + 1,
                showResult,
                answers,

        };
    }
    if(action.type === "RESTART"){
        return initialState
    }
    return state;
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    console.log("state", value);
    return  <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;

    }