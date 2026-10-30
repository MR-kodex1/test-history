const lessonReplies = {
  'المكان': 'هنحدد المكان على خريطة الرحلة، وبعدها نشوف إزاي أثّر في الأحداث.',
  'الزمن': 'هنرتب الأحداث على خط زمني عشان نعرف إيه اللي حصل الأول وإيه اللي جه بعده.',
  'الشخصيات': 'هنقابل الشخصيات المؤثرة ونعرف دور كل واحدة في الحكاية.'
};
document.querySelectorAll('.choice').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.choice').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('demoResponse').textContent = lessonReplies[button.dataset.answer];
  });
});

const questions = [
  { text: 'إيه أكتر حاجة بتساعدنا نفهم حدث تاريخي؟', answers: ['حفظ السنة بس', 'معرفة الأسباب والنتائج', 'تجاهل المكان'], correct: 1 },
  { text: 'ليه بنرتب الأحداث على خط زمني؟', answers: ['عشان نعرف تسلسلها', 'عشان نغيّر ترتيبها', 'عشان نحفظ أسماء بس'], correct: 0 },
  { text: 'إيه اللي ممكن يساعدنا نعرف عن الماضي؟', answers: ['مصدر تاريخي أو أثر', 'التخمين فقط', 'عنوان الدرس فقط'], correct: 0 }
];
let questionIndex = 0;
let answered = false;\nlet finished = false;
const questionText = document.getElementById('questionText');
const answerGrid = document.getElementById('answerGrid');
const feedback = document.getElementById('quizFeedback');
const counter = document.getElementById('quizCounter');
const nextButton = document.getElementById('nextQuestion');

function renderQuestion() {
  const question = questions[questionIndex];
  answered = false;\n  finished = false;
  questionText.textContent = question.text;
  counter.textContent = `سؤال ${['١','٢','٣'][questionIndex]} من ٣`;
  feedback.textContent = '';
  nextButton.hidden = true;
  answerGrid.replaceChildren();
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.textContent = answer;
    button.addEventListener('click', () => selectAnswer(button, index));
    answerGrid.append(button);
  });
}

function selectAnswer(button, selected) {
  if (answered) return;
  answered = true;
  const correctIndex = questions[questionIndex].correct;
  [...answerGrid.children].forEach((answer, index) => {
    answer.disabled = true;
    if (index === correctIndex) answer.classList.add('correct');
  });
  if (selected === correctIndex) {
    feedback.textContent = 'إجابة صحيحة! فهم الأحداث أهم من حفظها بس.';
  } else {
    button.classList.add('wrong');
    feedback.textContent = 'قريب! الإجابة المظللة هي الأنسب. جرّب السؤال اللي بعده.';
  }
  nextButton.hidden = false;
}

nextButton.addEventListener('click', () => {
  if (finished) { questionIndex = 0; nextButton.textContent = 'السؤال التالي ←'; renderQuestion(); return; }\n  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    questionIndex = 0;
    nextButton.textContent = 'إعادة المراجعة ↻';
    feedback.textContent = 'خلصت المراجعة! أحسنت، جاهز لدرس جديد.';
    nextButton.hidden = false;
    nextButton.onclick = () => { nextButton.textContent = 'السؤال التالي ←'; nextButton.onclick = null; renderQuestion(); };
  }
});
renderQuestion();
