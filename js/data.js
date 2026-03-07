// All data fetch
let data = [];
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const issue = document.getElementById("issue");
const loadData = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const result = await res.json();
  data = result.data;
  issue.innerText = data.length;
  displayData(data);
};
// active button
// const activeButton = (id) => {
//   // remove color
//   allBtn.classList.remove("bg-blue-700", "text-white");
//   openBtn.classList.remove("bg-blue-700", "text-white");
//   closeBtn.classList.remove("bg-blue-700", "text-white");

//   // add color
//   allBtn.classList.add("bg-white", "text-black");
//   openBtn.classList.add("bg-white", "text-black");
//   closeBtn.classList.add("bg-white", "text-black");

//   // add active color at selected button
//   const selected = document.getElementById(id);
//   selected.classList.add("bg-blue-700", "text-white");
//   selected.classList.remove("bg-white", "text-black");
// };

openBtn.addEventListener("click", () => {
  const openData = data.filter((item) => item.status === "open");
  issue.innerText = openData.length;
  displayData(openData);
});

allBtn.addEventListener("click", () => {
  loadData();
});

closeBtn.addEventListener("click", () => {
  const closeData = data.filter((item) => item.status === "closed");
  issue.innerText = closeData.length;
  displayData(closeData);
});

// display data
// const displayData = (data) => {
//   const cardContainer = document.getElementById("card-container");
//   cardContainer.innerHTML = "";
//   data.map((item) => {
//     const card = document.createElement("div");
//     card.innerHTML = `
//      <div ${
//        item.status === "open"
//          ? `class="border-t-4 border-[#00A96E] px-6 py-4 shadow space-y-4 h-[340px] bg-white rounded"`
//          : `class="border-t-4 border-[#A855F7] px-6 py-4 shadow space-y-4 h-[340px] bg-white rounded"`
//      } >
//           <div class="flex justify-between items-center">
//             <div><img src="./assets/Open-Status.png" alt="Open-Status.png"></div>
//             <div class="bg-[#FEECEC]  rounded-full">
//               <h5 class="font-bold uppercase py-2 px-4 text-[#EF4444]">${
//                 item.priority
//               }</h5>
//             </div>
//           </div>
//           <h4 class="font-semibold">Fix ${item.title}</h4>
//           <p class="line-clamp-2 font-[12px] text-[#647488]">${
//             item.description
//           }</p>
//           <div>
//             <span class="bg-[#FECACA] py-1 px-2 rounded-full text-[#EF4444]"><i class="fa-solid fa-bug"></i> Bug</span>
//             <span class="bg-[#FECACA] py-1 px-2 rounded-full text-[#EF4444]"><i class="fa-regular fa-life-ring"></i>
//               help wanted</span>
//           </div>
//           <hr class="opacity-15">
//           <div>
//             <p class="font-[12px] text-[#647488]">${item.author}</p>
//             <p class="font-[12px] text-[#647488]">${item.createdAt}</p>
//           </div>
//         </div>

//     `;
//     cardContainer.appendChild(card);
//   });
// };

loadData();
