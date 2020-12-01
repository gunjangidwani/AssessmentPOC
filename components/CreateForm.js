import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';


const CreateForm = () => {
    const [questionCount, setQuestionCount] = useState(0);
    const [assessment_title, setAssessment_title] = useState(null);
    const [assessment_Instructions, setAssessment_Instructions] = useState(null);
    const [assessment_paragraph, setAssessment_paragraph] = useState(null);
    const [assessment_questions, setAssessment_questions] = useState([]);
    const [finalAssesment, setFinalAssesment] = useState();

    const increaseQuestionCount = () => {
        const questionObj = {
            "id": assessment_questions.length + 1,
            "answer_option": [
                {
                    "id": 1,
                    "value": "",
                    "score": 0
                },
                {
                    "id": 2,
                    "value": "",
                    "score": 0
                },
                {
                    "id": 3,
                    "value": "",
                    "score": 0
                }
            ],
            "question_type": "Checkbox"
        };
        setAssessment_questions(oldArray => [...oldArray, questionObj])
        setQuestionCount(questionCount + 1);
    };

    const updateQuestionType = (key, value) => {
        const changedArray = [...assessment_questions];
        changedArray[key-1].question_type = value;
        setAssessment_questions(changedArray);
        console.log(assessment_questions);
    };

    const updateQuestionText = (key, value) => {
        const changedArray = [...assessment_questions];
        changedArray[key-1].question_text = value;
        setAssessment_questions(changedArray);
        console.log(assessment_questions);
    };

    const updateAnswerOption = (firstKey, secondKey, value, item) => {
        const changedArray = [...assessment_questions];
        item === "option_value" ? changedArray[firstKey-1].answer_option[secondKey-1].value = value : changedArray[firstKey-1].answer_option[secondKey-1].score = value; 
        console.log(assessment_questions);

    };

    const deleteQuestion = (key) => {
        console.log(key)
    }

    const saveFinalAssessment = () => {
        const finalObj = {
            "assessment_title": assessment_title,
            "assessment_image": "https://www.directive.com/images/easyblog_shared/January_2020/1-20-20/b2ap3_large_112329157_consulation_assessment_400.jpg",
            "assessment_id": "1",
            "assessment_Instructions": assessment_Instructions,
            "assessment_paragraph": assessment_paragraph,
            "assessment_questions": assessment_questions
        } 
        setFinalAssesment(finalObj)
        console.log(finalAssesment);
        localStorage.setItem("assessment_object", JSON.stringify(finalObj));
    }

    const renderQuestionFormat = (key) => {
        return (
            <div key={key} className="questRoot">
                <div className="questionTypeDiv">
                    <label htmlFor="question_type"> <strong>{key}#</strong> Choose a question type:</label>
                    <select name="questionType" htmlFor="question_type" placeholder="select que" onChange={(e) => updateQuestionType(key, e.target.value)}>
                        <option disabled value=''>Select Question type</option>
                        <option value="Checkbox">Checkbox</option>
                        <option value="Dropdown">Drop Down</option>
                        <option value="Radio">Radio Button</option>
                    </select>
                </div>
                <div className="questext">
                    <label htmlFor="question_text">Question Text:</label>
                    <textarea rows="3" cols="50" type="text" id="question_text" name="question_text" onChange={e => updateQuestionText(key, e.target.value)} />
                </div>
                <div className="optionContainer">
                    <div id="answer_option">
                        <textarea  rows="3" placeholder="option value 1" onChange={(e) => updateAnswerOption(key, 1, e.target.value, "option_value")} type="text" id="answer_option_value" name="answer_option_value" />
                        <input placeholder="score" onChange={(e) => updateAnswerOption(key, 1, e.target.value, "option_score")} type="number" id="answer_option_score" name="answer_option_score" />
                    </div>
                    <div id="answer_option">
                        <textarea rows="3" placeholder="option value 2" onChange={(e) => updateAnswerOption(key, 2, e.target.value, "option_value")} type="text" id="answer_option_value" name="answer_option_value" />
                        <input placeholder="score" onChange={(e) => updateAnswerOption(key, 2, e.target.value, "option_score")} type="number" id="answer_option_score" name="answer_option_score" />
                    </div>
                    <div id="answer_option">
                        <textarea rows="3" placeholder="option value 3" onChange={(e) => updateAnswerOption(key, 3, e.target.value, "option_value")} type="text" id="answer_option_value" name="answer_option_value" />
                        <input placeholder="score" onChange={(e) => updateAnswerOption(key, 3, e.target.value, "option_score")} type="number" id="answer_option_score" name="answer_option_score" />
                    </div>
                </div>
                <button onClick={() => deleteQuestion(key)} type="button">Delete</button>
            </div>
        )
    }
    console.log(questionCount, Array.from(Array(questionCount)), ": count")
    
    return (
        <Card>
        <div className="quizContainer">
            <h3> Fill below details to create assessmnet</h3>
            <div className="formContainer">
                <label htmlFor="assessment_title">Assessment Title:</label>
                <input type="text" id="assessment_title" name="assessment_title" onChange={e => {setAssessment_title(e.target.value)}} />
            </div>
            <div className="formContainer">
                <label htmlFor="assessment_Instructions">Assessment Instruction:</label>
                <textarea rows="6" cols="100" type="text" id="assessment_Instructions" name="assessment_Instructions" onChange={e => setAssessment_Instructions(e.target.value)} />
            </div>
            <div className="formContainer">
                <label htmlFor="assessment_paragraph">Assessment Reading Text:</label>
                <textarea rows="6" cols="100" type="text" id="assessment_paragraph" name="assessment_paragraph" onChange={e => setAssessment_paragraph(e.target.value)} />
            </div>
            <div className="QuestionContainer">
                <label htmlFor="assessment_questions">Assessment Questions:</label>
                <div>
                  {Array.from({length: questionCount}, (v, k) => k+1).map((e, value) => (
                    renderQuestionFormat(value+1)
                    ))}  
                </div>
            </div>
                <button type="button" onClick={() => {increaseQuestionCount()}} >+ Add Question</button>
            <button onClick={() => saveFinalAssessment()}>
                Save Assessment
            </button>
            <div>
                {finalAssesment ? JSON.stringify(finalAssesment): null}
            </div>
        </div>
      </Card>
    )
};

const Card = styled.div`
  margin: auto;
  margin-bottom: 25px;
  width: 100%;
  .card-title {
    font-weight: 600;
    color: indigo;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default CreateForm;
