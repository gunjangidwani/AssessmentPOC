import React, {useEffect, useState} from "react";
import {data} from '../components/data.js';
// import './../styles/globals.css';

const Test = () => {
    const [assessment_data, setAssessment_data] = useState();
    const [total_score, setTotal_score] = useState(0);
    const [user_score, setUser_score] = useState(0);
    const [answerArray, setAnswerArray] = useState([]);
    useEffect(() => {
        if(localStorage.getItem("assessment_object")) { 
            setAssessment_data(JSON.parse(localStorage.getItem("assessment_object")));
            createAnswerArray(JSON.parse(localStorage.getItem("assessment_object")).assessment_questions);
        } else {
            setAssessment_data(data);
            createAnswerArray(data.assessment_questions);
        };
        console.log(answerArray, "answerArray")
    }, []);

    const createAnswerArray = (answerOption) => {
        const tempArray = [];
        answerOption.forEach(element => {
            const tempAnswerObj = {
                id: element.id,
                score_counted: 0
            };
            if(element.question_type === "Checkbox") {
                tempAnswerObj.selected_value = []; 
            } else if(element.question_type === "Dropdown") {
                tempAnswerObj.selected_value = ""; 
            } else if(element.question_type === "Radio") {
                tempAnswerObj.selected_value = "";
            };
            tempArray.push(tempAnswerObj);
        });
        setAnswerArray(tempArray);
    };

    const handleValueChange = (key, target, changeFor) => {
        const {name, value} = target
        const arr = answerArray;
        if(changeFor === "Checkbox") {
            if(arr[key-1].selected_value.includes(value)) {

            } else {
                console.log(Number(arr[key-1].score_counted), arr[key-1].score_counted, "calcu")
                arr[key-1].selected_value.push(value);
                arr[key-1].score_counted = Number(arr[key-1].score_counted) + Number(name);
                setAnswerArray(arr)
            }
            console.log(answerArray, ":updatedanswerArray")
        } else {
            arr[key-1].selected_value = value ;
            arr[key-1].score_counted = name;
            setAnswerArray(arr)
            console.log(answerArray, ":updatedanswerArray")
        }
    }

    const renderDropDown = (data) => {
        console.log(data)
        return (
            <div>
                <label htmlFor="question_type"><strong>{data.id}#</strong> {data.question_text}</label>
                <select  htmlFor="question_type" value={answerArray.length > 0 ? answerArray[data.id]?.selected_value : ""} onChange={(e) => handleValueChange(data.id, e.target, "Dropdown")}>
                    <option disabled value=''>Select Value</option>
                    {data.answer_option.map(m => (
                        <option key={m.id} name={m.value} value={m.score}> {m.value} </option>
                    ))}
                </select>
            </div>
        );
    };

    const includesValue = (value) => {
        console.log(value)
        return value
    }

    const renderCheckbox = (data) => {
        console.log(data)
        return (
            <div>
                <label htmlFor="question_type"> <strong>{data.id}#</strong> {data.question_text}</label>
                    {data.answer_option.map(m => (
                        <div>
                            <input
                                type="checkbox"
                                onChange={(e) => handleValueChange(data.id, e.target, "Checkbox")}
                                htmlFor={m.id}
                                key={m.score}
                                name={m.score}
                                value={m.value}
                                checked={answerArray[data.id-1].selected_value.includes(m.value) === true ?true : false}
                                // checked={true}
                            />
                            <label htmlFor={m.id} className='list-label'> {m.value} </label>
                        </div>
                    ))}
            </div>
        );
    };

    const renderRadioButton = (data) => {
        console.log(data)
        return (
            <div>
                <label htmlFor="question_type"> <strong>{data.id}#</strong> {data.question_text}</label>
                    {data.answer_option.map(m => (
                      <div>
                        <input
                        type="radio"
                        onChange={(e) => handleValueChange(data.id, e.target, "Radio")}
                        key={m.score}
                        name={m.score}
                        value={m.value}
                        checked={m.value === answerArray[data.id-1].selected_value ? true : false} 
                        />
                        <label  className='list-label'> {m.value} </label>
                    </div>
                    ))}
            </div>
        );
    };

    const renderQuestions = data => {
        console.log(data)
        if(data.question_type === "Checkbox") {
            return renderCheckbox(data);
        } else if(data.question_type === "Dropdown") {
            return renderDropDown(data);
        } else if(data.question_type === "Radio") {
            return renderRadioButton(data);
        };
    };

    const calculateFinalScore = () => {
        setTotal_score(answerArray.length * 4);
        let score_count = 0
        answerArray.forEach(element =>{
            console.log( Number(element.score_counted))
            score_count = score_count + Number(element.score_counted);
        });
        setUser_score(score_count);
    }

    return (
        <div>
            { assessment_data ? <div className="testContaner">
                <img loading="lazy" src={assessment_data.assessment_image} alt="Nation" height="300" width="500"/>
                <h1>{assessment_data.assessment_title}</h1>
                <p>
                    <h2>Read the below paragraph to take test:</h2>
                    {assessment_data.assessment_paragraph}
                </p>
                <div className="instruc">
                    <h2>Instructions:</h2>
                    {assessment_data.assessment_Instructions}
                </div>
                <div className="questionC">
                    <h2> Questions: </h2>
                    {assessment_data.assessment_questions.map(data => (
                        <div key={data.id}>{renderQuestions(data)}</div>
                    ))}
                </div>
            </div> : null}
                <div>
                    <button type="button" onClick={() => calculateFinalScore()}>Calculate Score</button>
                    {user_score} / {total_score}
                </div>
        </div>
    );
};

export default Test;