const challenges = [
  { level: "🔥 轻微诅咒", text: "对镜子说三遍“我是奶龙，我才是奶龙”。", icon: "😈" },
  { level: "💀 灵魂负债", text: "给最近联系的人发一句：“我刚刚签了生死状。”", icon: "👻" },
  { level: "⚡ 恶魔指令", text: "原地闭眼转三圈，然后大喊一声“原神启动！”", icon: "🌀" },
  { level: "🩸 血契挑战", text: "用冷语气念出你最怕的一件事，持续10秒。", icon: "🥶" },
  { level: "🖤 深渊契约", text: "用B站连续看5个猎奇琵琶曲", icon: "👁️" },
  { level: "☠️ 终极审判", text: "公开发布当前结果截图，接受围观。", icon: "⚖️" }
];

let spinning = false;
let currentRotation = 0;
window.currentResult = null;

function showContract() {
  document.getElementById("contractOverlay").classList.add("show");
}

function acceptContract(text) {
  document.getElementById("contractOverlay").classList.remove("show");
  console.log("生死状选择：", text);
  spin();
}

function spin() {
  if (spinning) return;
  spinning = true;

  const btn = document.getElementById("spinBtn");
  const wheel = document.getElementById("wheel");
  const resultArea = document.getElementById("resultArea");

  if (btn) btn.disabled = true;
  if (resultArea) resultArea.style.display = "none";

  const extra = 360 * (5 + Math.random() * 3);
  const randomAngle = Math.floor(Math.random() * 360);
  currentRotation += extra + randomAngle;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const normalized = currentRotation % 360;
    const idx = Math.floor(normalized / 60) % challenges.length;
    const result = challenges[idx];
    window.currentResult = result;

    showResult(result);
    spinning = false;
    if (btn) btn.disabled = false;
  }, 3500);
}

function showResult(r) {
  document.getElementById("resultIcon").textContent = r.icon;
  document.getElementById("resultLevel").textContent = r.level;
  document.getElementById("resultText").textContent = r.text;
  document.getElementById("resultArea").style.display = "block";
}

function acceptChallenge() {
  if (!window.currentResult) return;
  addHistory(window.currentResult, "✅ 画押认命");
  document.getElementById("resultArea").style.display = "none";
  alert("生死状已画押！挑战完成！");
}

function quitChallenge() {
  if (!window.currentResult) return;
  addHistory(window.currentResult, "🖊️ 撕毁生死状");
  document.getElementById("resultArea").style.display = "none";
  alert("生死状已撕毁，逃过一劫！");
}

function addHistory(result, action) {
  const ul = document.getElementById("historyList");
  const li = document.createElement("li");
  const time = new Date().toLocaleTimeString();
  li.textContent = `[${time}] ${result.level} ${action}：${result.text}`;
  ul.prepend(li);
}

window.onload = () => {
  console.log("devils-roulette loaded");
};
