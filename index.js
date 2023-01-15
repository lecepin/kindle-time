const domApp = document.querySelector(".app");
const domTime = document.querySelector(".time");
const domDate = document.querySelector(".date");
const domCnDate = document.querySelector(".cn-date");

function geturl(url) {
  const arr = url.split("?");

  if (!arr[1]) {
    return {};
  }

  const res = arr[1].split("&");
  const items = {};
  for (let i = 0; i < res.length; i++) {
    const a = res[i].split("=");
    items[a[0]] = a[1];
  }
  return items;
}
function formatDate(date, fmt = "yyyy-MM-dd") {
  if (!date) {
    return "";
  }
  if (typeof date === "number" || typeof date === "string") {
    date = new Date(Number(date));
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  return fmt;
}
function render() {
  // 保证 中国时区显示时间。不设置在一些 kindle 会出现时区问题
  const time = new Date();
  const len = time.getTime();
  const offset = time.getTimezoneOffset() * 60000; //本地时间与GMT时间差值
  const utcTime = len + offset; //格林尼治时间
  const date = new Date(utcTime + 3600000 * 8);

  const lunar = calendar.solar2lunar(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  );
  const dateText = `${formatDate(date, "yyyy.M.d")} ${
    urlQuery.l == "en"
      ? ["SUN", "MON", "TUES", "WED", "THUR", "FRI", "SAT"][date.getDay()]
      : "星期" + ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]
  }`;
  const timeText = `${date.getHours()}:${date.getMinutes()}`;
  const cnDateText = `${lunar.IMonthCn}${lunar.IDayCn} ${lunar.Animal}年`;

  if (domDate.innerHTML != dateText) domDate.innerHTML = dateText;
  if (domTime.innerHTML != timeText) domTime.innerHTML = timeText;
  if (domCnDate.innerHTML != cnDateText) domCnDate.innerHTML = cnDateText;
}

const urlQuery = geturl(location.href);
const config = {
  fontSize: +(urlQuery.fs || 7),
  rotate: urlQuery.r,
  lang: urlQuery.l,
};

domTime.style.fontSize = config.fontSize + "rem";
domDate.style.fontSize = config.fontSize / 2.5 + "rem";
domCnDate.style.fontSize = config.fontSize / 4 + "rem";
domApp.style.cssText = `-webkit-transform: rotate(${
  config.rotate || 0
}deg) translate3d(-50%,-50%,0)`;

render();
setInterval(() => {
  render();
}, 1000);
