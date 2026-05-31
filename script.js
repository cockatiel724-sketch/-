// ===== 要素取得 =====
const cells = document.querySelectorAll(".cell");
const songs = document.querySelectorAll(".song");
const bandInput =
document.getElementById("bandInput");
const detailInput =
document.getElementById("detailInput");
const bandPreview =
document.getElementById("bandPreview");
const detailPreview =
document.getElementById("detailPreview");
const bgInput =
document.getElementById("bgInput");
const bg =
document.getElementById("bg");
const overlay =
document.getElementById("overlay");
const overlaySlider =
document.getElementById("overlaySlider");
const cellOpacitySlider =
document.getElementById("cellOpacitySlider");
const cellHeightSlider =
document.getElementById("cellHeightSlider");
const saveBtn =
document.getElementById("saveBtn");
const captureArea =
document.getElementById("captureArea");
// ===== 曲名反映 =====
songs.forEach((input,index)=>{
  input.addEventListener("input",()=>{
    cells[index].textContent =
    input.value;
  });
});
// ===== バンド名 =====
bandInput.addEventListener(
"input",
e=>{
  bandPreview.textContent =
  e.target.value || "PEOPLE 1";
});
// ===== 日付・会場 =====
detailInput.addEventListener(
"input",
e=>{
  detailPreview.textContent =
  e.target.value;
});
// ===== 背景画像 =====
bgInput.addEventListener(
"change",
e=>{
  const file =
  e.target.files[0];
  if(!file) return;
  const reader =
  new FileReader();
  reader.onload =
  ev=>{
    bg.src =
    ev.target.result;
  };
  reader.readAsDataURL(file);
});
// ===== 背景暗さ =====
overlaySlider.addEventListener(
"input",
e=>{
  const value =
  e.target.value / 100;
  overlay.style.background =
  `rgba(0,0,0,${value})`;
});
// ===== マス透明度 =====
cellOpacitySlider.addEventListener(
"input",
e=>{
  const value =
  e.target.value / 100;
  document
  .querySelectorAll(".cell")
  .forEach(cell=>{
    cell.style.background =
    `rgba(255,255,255,${value})`;
  });
});
// ===== マス高さ =====
cellHeightSlider.addEventListener(
"input",
e=>{
  const value =
  e.target.value;
  document
  .querySelectorAll(".cell")
  .forEach(cell=>{
    cell.style.minHeight =
    value + "px";
  });
});
// ===== 初期値適用 =====
overlay.dispatchEvent(
new Event("input")
);
document
.querySelectorAll(".cell")
.forEach(cell=>{
  cell.style.background =
  `rgba(255,255,255,${
  cellOpacitySlider.value / 100
  })`;
  cell.style.minHeight =
  cellHeightSlider.value + "px";
});
// ===== PNG保存 =====
saveBtn.addEventListener(
"click",
async()=>{
  const canvas =
  await html2canvas(
    captureArea,
    {
      scale:3,
      useCORS:true,
      backgroundColor:null
    }
  );
  const link =
  document.createElement("a");
  link.download =
  "setlist-bingo.png";
  link.href =
  canvas.toDataURL(
  "image/png"
  );
  link.click();
});
