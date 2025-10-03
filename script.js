let data = {};
let currentQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;

fetch("mcqs.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    const chapterSelect = document.getElementById("chapterSelect");
    chapterSelect.innerHTML += "<option value='__all__'>सभी अध्याय</option>";
    Object.keys(data).forEach(ch => {
      const opt = document.createElement("option");
      opt.value = ch;
      opt.textContent = ch;
      chapterSelect.appendChild(opt);
    });
  });

function startQuiz() {
  correctCount = 0;
wrongCount = 0;
  const chapter = document.getElementById("chapterSelect").value;
  currentQuestions = [];

  if (chapter === "__all__") {
    Object.values(data).forEach(arr => currentQuestions.push(...arr));
  } else if (data[chapter]) {
    currentQuestions = [...data[chapter]];
  }

  shuffle(currentQuestions);
  currentIndex = 0;
  document.getElementById("quizArea").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = currentQuestions[currentIndex];
  document.getElementById("questionBox").innerHTML = `<b>Q${currentIndex+1}:</b> ${q.question}`;
  const box = document.getElementById("optionsBox");
  box.innerHTML = "";
  document.getElementById("resultBox").innerText = "";
  document.getElementById("nextBtn").style.display = "none";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === q.answer) {
  correctCount++;
  document.getElementById("resultBox").innerText = "✅ सही उत्तर!";
} else {
  wrongCount++;
  document.getElementById("resultBox").innerText = `❌ गलत! सही उत्तर: ${q.answer}`;
      }
      document.getElementById("nextBtn").style.display = "block";
    };
    box.appendChild(btn);
  });
}

function showNext() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    document.getElementById("questionBox").innerHTML = "🎉 आपने सभी प्रश्न हल कर लिए!";
document.getElementById("optionsBox").innerHTML = "";
document.getElementById("resultBox").innerHTML = `
✅ सही जवाब: ${correctCount}<br>
❌ गलत जवाब: ${wrongCount}<br>
📊 कुल प्रश्न: ${currentQuestions.length}
`;
document.getElementById("nextBtn").style.display = "none";
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
