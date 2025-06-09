function logScreenTime() {
    const input = document.getElementById("screenTimeInput").value;
    const feedback = document.getElementById("feedback");
  
    if (input <= 2) {
      feedback.textContent = "Nice! You're keeping it low-key 📵✨";
    } else if (input <= 5) {
      feedback.textContent = "Hmm... maybe take a walk or read a book? 👀";
    } else {
      feedback.textContent = "Whoa, time to unplug and chill 💀🔌";
    }
  }
// Load saved logs on page load
window.onload = function() {
  displayLogs();
};

function saveLog() {
  const entry = document.getElementById("logEntry").value;
  if (entry.trim() === "") return;

  const logs = JSON.parse(localStorage.getItem("detoxLogs")) || [];
  const date = new Date().toLocaleDateString();

  logs.unshift({ date: date, text: entry }); // add newest at top

  localStorage.setItem("detoxLogs", JSON.stringify(logs));
  document.getElementById("logEntry").value = "";
  displayLogs();
}

function displayLogs() {
  const logList = document.getElementById("logList");
  const logs = JSON.parse(localStorage.getItem("detoxLogs")) || [];

  logList.innerHTML = ""; // clear list

  logs.forEach((log) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${log.date}:</strong> ${log.text}`;
    logList.appendChild(li);
  });
}
const activities = [
  "Go for a walk 🚶‍♀️",
  "Read a book 📚",
  "Do yoga 🧘",
  "Call a friend ☎️",
  "Draw or paint 🎨",
  "Cook something new 🍳",
  "Write in a journal ✍️",
  "Declutter a space 🧹"
];

function getRandomActivity() {
  const list = document.getElementById("activityList");
  list.innerHTML = ""; // clear previous
  const random = activities[Math.floor(Math.random() * activities.length)];
  const li = document.createElement("li");
  li.textContent = random;
  list.appendChild(li);
}
let screenTimeData = [];

function logScreenTime() {
  const input = document.getElementById("screenTimeInput");
  const hours = parseFloat(input.value);
  if (isNaN(hours)) return;

  screenTimeData.push(hours);
  localStorage.setItem("screenTimeData", JSON.stringify(screenTimeData));
  updateChart();
  input.value = "";
}

function updateChart() {
  const ctx = document.getElementById("progressChart").getContext("2d");
  if (window.chart) window.chart.destroy(); // destroy old one if exists

  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: screenTimeData.map((_, i) => `Day ${i + 1}`),
      datasets: [{
        label: 'Hours of Screen Time',
        data: screenTimeData,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2
      }]
    }
  });
}

// Load existing data on refresh
window.onload = function () {
  const saved = localStorage.getItem("screenTimeData");
  if (saved) screenTimeData = JSON.parse(saved);
  updateChart();
};
  