const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

let startGame = () => {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

let setNextQuestion = () => {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

let showQuestion = (question) => {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn-outline-dark')
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

let resetState = () => {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

let selectAnswer = (e) => {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

let setStatusClass = (element, correct) => {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    element.classList.remove('btn-outline-dark')
    element.classList.add('btn-outline-success')
  } else {
    element.classList.add('wrong')
    element.classList.remove('btn-outline-dark')
    element.classList.add('btn-outline-danger')
  }
}

let clearStatusClass = (element) => {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  element.classList.remove('btn-outline-success')
  element.classList.remove('btn-outline-danger')
}

const questions = [
  {
    question: 'What city am I from?',
    answers: [
      { text: 'Perth', correct: false },
      { text: 'Canberra', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Adelaide', correct: true }
    ]
  },
  {
    question: 'When did I move to Berlin?',
    answers: [
      { text: 'October', correct: false },
      { text: 'September', correct: false },
      { text: 'November', correct: false },
      { text: 'December', correct: true }
    ]
  },
  {
    question: 'What was my job in London?',
    answers: [
      { text: 'Bartender', correct: true },
      { text: 'Supermodel', correct: false },
      { text: 'Retail', correct: false },
      { text: 'Journalist', correct: false }
    ]
  }
]

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})