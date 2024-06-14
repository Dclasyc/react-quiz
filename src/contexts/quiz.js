import { createContext, useReducer } from "react";
import questions from "../data";
import { shuffleAnswers } from "../components/helpers";

const initialState = {
    currentQuestionIndex: 0,
    questions,
    showResult: false,
    answers: shuffleAnswers(questions[0]),
    currentAnswer:  "",
    correctAnswersCount: 0,
};

const reducer = (state, action) => {
    switch(action.type){
        case "SELECT_ANSWER":{
            const correctAnswersCount = 
            action.payload === 
            state.questions[state.currentQuestionIndex].correctAnswer 
            ? state.correctAnswersCount + 1 
            : state.correctAnswersCount;
            return{
                ...state,
                currentAnswer: action.payload,
                correctAnswersCount,
            };
        }
        case "NEXT_QUESTION":{
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
                    currentAnswer:""
            };
        }
        case "RESTART":{
            return initialState
        }
        default: {
            return state
        }
    }

}

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    return  <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;

    }