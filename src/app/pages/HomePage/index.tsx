import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { QuestionDock } from './components/QuestionDock';
import { selectQuiz } from './slice/selectors';
import { useQuizSlice } from './slice';

export function HomePage() {
  const { actions } = useQuizSlice();

  const quiz = useSelector(selectQuiz);
  const dispatch = useDispatch();
  const onClick = (id: string) => dispatch(actions.selectOption(id));
  console.log({ currentQuestionNumber: quiz.currentQuestionNumber });
  const question = quiz.questions[quiz.currentQuestionNumber];

  return (
    <>
      <Helmet>
        <title>Quizer</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      {/* <span>Quizer</span> */}
      <Div bgImage={question.imageUrl || ''}>
        <DockWrapper>
          <QuestionDock question={question} onClick={onClick} />
          <button onClick={() => dispatch(actions.navigate(false))}>
            Prev
          </button>
          <button onClick={() => dispatch(actions.navigate(true))}>Next</button>
          <button
            onClick={() =>
              dispatch(actions.toggleShowAnswersForCurrentQuestion(null))
            }
          >
            Show Answers
          </button>
        </DockWrapper>
      </Div>
    </>
  );
}

const Div = styled.div<{ bgImage: string }>`
  display: grid;
  grid-template-rows: repeat(8, auto);
  grid-template-columns: repeat(8, auto);
  background-image: url(${props => props.bgImage});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  height: 100vh;
`;

const DockWrapper = styled.div`
  grid-column: 2 / span 1;
  grid-row: 7 / span 2;
`;
