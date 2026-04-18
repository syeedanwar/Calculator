let history = [];

function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function deleteLast() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let display = document.getElementById("display");

  try {
    let expression = display.value;
    if (expression === "") return;

    let result = eval(expression);
    display.value = result;

    history.push(expression + " = " + result);
    updateHistory();

  } catch {
    display.value = "Error";
  }
}

function updateHistory() {
  let list = document.getElementById("historyList");
  list.innerHTML = "";

  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function toggleHistory() {
  let box = document.getElementById("historyBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

function clearHistory() {
  history = [];
  updateHistory();
}

/* Keyboard Support */
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  } 
  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } 
  else if (key === "Backspace") {
    deleteLast();
  } 
  else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});