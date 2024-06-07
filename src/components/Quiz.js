import { useReducer } from "react";
import Question from "./Question";
import { type } from "@testing-library/user-event/dist/type";

const initialState ={
    currentQuestionIndex: 0,
    questions: [],
};

const reducer = (state, action) => {
    if(action.type === "NEXT_QUESTION"){
        return{state, currentQuestionIndex: state.currentQuestionIndex + 1}
    }
    return state;
}

const Quiz = () =>{
    const[state, dispatch] = useReducer(reducer, initialState);
    console.log("render", state);

    return (
        <div className="quiz">
            <div>
                <div className="score">Question 1/8</div>
                <Question />
                <div className="next-button" onClick={() => dispatch({type: 'NEXT_QUESTION'})}>
                    Next Question
                </div>
            </div>
        </div>
        )
};

export default Quiz;
   