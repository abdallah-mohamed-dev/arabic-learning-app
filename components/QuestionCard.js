export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelect,
}) {
  const progress = (questionNumber / totalQuestions) * 100;
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="bg-white/90 rounded-3xl border border-white/70 shadow-2xl p-6 md:p-8 max-w-2xl mx-auto backdrop-blur-sm">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-500 mb-1">
          <span>
            السؤال {questionNumber} من {totalQuestions}
          </span>
          <span className="font-bold text-blue-700">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-gradient-to-l from-blue-700 to-violet-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="font-cairo text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => (
          (() => {
            const isCorrect = index === question.answer;
            const isSelected = selectedAnswer === index;
            const isWrongSelected = isAnswered && isSelected && !isCorrect;
            const isCorrectAfterWrong = isAnswered && isCorrect && selectedAnswer !== question.answer;

            let optionClass =
              'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700';
            if (isAnswered && isCorrect) {
              optionClass = 'border-green-600 bg-green-50 text-green-800';
            } else if (isWrongSelected) {
              optionClass = 'border-red-500 bg-red-50 text-red-700';
            } else if (isSelected) {
              optionClass = 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm';
            }

            return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            disabled={isAnswered}
            className={`text-right py-3.5 px-5 rounded-2xl border-2 font-semibold transition-all text-sm
              ${optionClass}
              ${isAnswered ? 'cursor-default' : ''}`}
          >
            <span className="flex items-center justify-between gap-3">
              <span>{option}</span>
              {isCorrectAfterWrong && <span className="font-bold">✅</span>}
              {isWrongSelected && <span className="font-bold">❌</span>}
            </span>
          </button>
            );
          })()
        ))}
      </div>
    </div>
  );
}
