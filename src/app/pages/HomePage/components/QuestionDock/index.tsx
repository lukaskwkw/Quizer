/**
 *
 * QuestionDock
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Option, Question } from '../../slice/types';

interface Props {
  question: Question;
  onClick: (id: string) => void;
}

export function QuestionDock({ question, onClick }: Props) {
  if (!question) {
    return <p>No question!</p>;
  }
  const type = question.isMultiAnswer ? 'checkbox' : 'radio';
  const shouldBeChecked = (option: Option): boolean => {
    if (question.showAnswers) {
      return Boolean(question.answers.find(answer => answer === option.id));
    }
    return Boolean(
      question.currentSelectionOfOptionIds?.find(
        selected => selected === option.id,
      ),
    );
  };

  return (
    <Div>
      <Header>{question.question}</Header>
      <ul>
        {question.options.map((option, i) => (
          <li key={option.id}>
            <label>
              <input
                onClick={() => onClick(option.id)}
                checked={shouldBeChecked(option)}
                type={type}
                name="option"
              />
              {option.option}
            </label>
          </li>
        ))}
      </ul>
    </Div>
  );
}

const Div = styled.div`
  background-color: #fff;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
