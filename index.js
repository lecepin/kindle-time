const dIns = lunisolar();
const urlQuery = new URLSearchParams(window.location.search);
const config = {
  fontSize: +(urlQuery.get("fs") || 7),
  rotate: urlQuery.get("r"),
};
const domApp = document.querySelector(".app");
const domTime = document.querySelector(".time");
const domDate = document.querySelector(".date");
const domCnDate = document.querySelector(".cn-date");

const render = (dIns) => {
  domDate.innerHTML =
    dIns.format("YYYY.M.D") +
    " " +
    "星期" +
    ["日", "一", "二", "三", "四", "五", "六"][dIns._date.getDay()];

  domTime.innerHTML = dIns.format("H:m");
  domCnDate.innerHTML = dIns.format("lDlM cZ年");
  console.log(dIns.format("H:m"));
};

domTime.style.fontSize = config.fontSize + "rem";
domDate.style.fontSize = config.fontSize / 2.5 + "rem";
domCnDate.style.fontSize = config.fontSize / 4 + "rem";
domApp.style.cssText = `transform: rotate(${config.rotate || 0}deg)`;

render(dIns);
setInterval(() => {
  render(dIns);
}, 1000);
