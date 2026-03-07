const joinHtml = (arr) => {
  const htmlElements = arr.map(
    (item) =>
      `<span class="uppercase">${
        item === "bug"
          ? `<span><i class="fa-solid fa-bug"></i> ${item}</span>`
          : item === "help wanted"
          ? `<span><i class="fa-regular fa-life-ring"></i>${item}</span>`
          : `<span><i class="fa-solid fa-hashtag"></i>${item}</span>`
      }</span>`
  );
  return htmlElements.join("");
};

// All data fetch
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const issue = document.getElementById("issue");
const loadData = async () => {
  loading(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const result = await res.json();
  const data = result.data;
  issue.innerText = data.length;
  displayData(data);
  loading(false);
};

const loading = (status) => {
  const loading = document.getElementById("loading");
  const cardContainer = document.getElementById("card-container");
  if (status === true) {
    loading.classList.remove("hidden");
    cardContainer.classList.add("hidden");
  } else {
    cardContainer.classList.remove("hidden");
    loading.classList.add("hidden");
  }
};
// active button
const activeButton = (id) => {
  // remove color
  allBtn.classList.remove("bg-blue-700", "text-white");
  openBtn.classList.remove("bg-blue-700", "text-white");
  closeBtn.classList.remove("bg-blue-700", "text-white");

  // add color
  allBtn.classList.add("bg-white", "text-black");
  openBtn.classList.add("bg-white", "text-black");
  closeBtn.classList.add("bg-white", "text-black");

  // add active color at selected button
  const selected = document.getElementById(id);
  selected.classList.add("bg-blue-700", "text-white");
  selected.classList.remove("bg-white", "text-black");
};
// all data
allBtn.addEventListener("click", () => {
  loadData();
});
// open data
openBtn.addEventListener("click", async () => {
  loading(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const result = await res.json();
  const openData = result.data.filter((item) => item.status === "open");
  console.log(openData);
  issue.innerText = openData.length;
  displayData(openData);
  loading(false);
});

// closed data
closeBtn.addEventListener("click", async () => {
  loading(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues"
  );
  const result = await res.json();
  const closeData = result.data.filter((item) => item.status === "closed");
  issue.innerText = closeData.length;
  displayData(closeData);
  loading(false);
});

// display data
const displayData = (data) => {
  console.log("from display", data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.map((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    const card = document.createElement("div");
    card.innerHTML = `
     <div ${
       item.status === "open"
         ? `class="border-t-4 border-[#00A96E]  p-4 shadow space-y-4 h-[340px] bg-white rounded-[10px]"`
         : `class="border-t-4 border-[#A855F7]  p-4 shadow space-y-4 h-[340px] bg-white rounded-[10px]"`
     } >
          <div class="flex justify-between items-center">
            <div>${
              item.status === "open"
                ? `<img src="../assets/Ellipse 3.png" alt="Ellipse 3.png" >`
                : `<img src="../assets/Closed- Status .png" alt="Closed- Status" >`
            }</div>
            <div >
              <h5 ${
                item.priority === "high"
                  ? `class="bg-[#FEECEC] text-[#EF4444] uppercase rounded-full px-3 py-2"`
                  : item.priority === "medium"
                  ? `class="bg-[#FEF3C7] text-[#F59E0B] uppercase rounded-full px-3 py-2"`
                  : `class="bg-[#EDE9FE] text-[#9CA3AF] uppercase rounded-[20px] px-3 py-2"`
              }>
              ${item.priority}
              </h5>
            </div>
          </div>
          <h4 class="font-semibold"> ${item.title}</h4>
          <p class="line-clamp-2 font-[12px] text-[#647488]">${
            item.description
          }</p>
          <div class="flex gap-3">
           ${joinHtml(item.labels)}
          </div>
          <hr class="opacity-15">
          <div>
            <p class=" mb-3 text-[#647488] font-semibold">#${item.author}</p>
            <p class=" text-[#647488] font-semibold">${date}</p>
          </div>
        </div>

    `;
    cardContainer.appendChild(card);
  });
};

loadData();

// Search functionality
