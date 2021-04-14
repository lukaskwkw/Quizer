/* --- STATE --- */

export interface Option {
  id: string;
  option: string;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
  answers: string[]; //list of ids
  imageUrl?: string; // mian image url location
  positionOfQuestionDock?: string; //position in grid
  additionalSlides?: string[]; //additional slides for current question also can be embedded video
  currentAdditionalSlide?: number; //current slide that is displayed
  showAnswers: boolean;
  isMultiAnswer: boolean;
  currentSelectionOfOptionIds?: string[]; //id
}

export interface QuizState {
  questions: Question[];
  currentQuestionNumber: 0;
  currentQuestionId: string; //id
  showQuestionDock: boolean;
}
