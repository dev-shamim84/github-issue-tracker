const joinHtml = (arr) => {
  const htmlElements = arr.map(
    (item) =>
      `<span class="uppercase">${
        item === "bug"
          ? `<span class="bg-[#FECACA] text-[13px] text-red-500 px-3 py-1 rounded-full"><i class="fa-solid fa-bug"></i> ${item}</span>`
          : item === "help wanted"
          ? `<span class="bg-[#BBF7D0] text-[13px] text-[#00A96E] px-3 py-1 rounded-full"><i class="fa-regular fa-life-ring"></i>${item}</span>`
          : `<span class="bg-[#BBF7D0] text-[13px] text-[#00A96E] px-3 py-1 rounded-full"><i class="fa-solid fa-hashtag"></i>${item}</span>`
      }</span>`
  );
  return htmlElements.join("");
};

// All data fetch
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const issue = document.getElementById("issue");
// load all data
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
// load details data
const loadDetailsData = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.data);
};
// show displayDetails
const displayDetails = (item) => {
  const date = new Date(item.createdAt).toLocaleDateString();
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = "";
  document.getElementById("details_modal").showModal();
  modalContainer.innerHTML = `
   <div class=" p-4 space-y-4 h-[340px] bg-white rounded-[10px]" onclick="loadDetailsData(${
     item.id
   })">
          <h4 class="font-bold text-2xl"> ${item.title}</h4>
          <div class="flex items-center gap-2">
            <span class="font-bold bg-[#00A96E] text-white px-3 py-1 rounded-full">${
              item.status
            }</span>
            <span class="text-[5px] text-[#64748B]"><i class="fa-solid fa-circle"></i></span>
            <span class="font-semibold  text-[#64748B]">${item.status} by ${
    item.author
  }</span>
          <span class="text-[5px] text-[#64748B]"><i class="fa-solid fa-circle"></i></span>
          <span class="font-semibold  text-[#64748B]">${date}</span>
          </div>
          <div class="flex  gap-2">
           ${joinHtml(item.labels)}
          </div>
          <p class="line-clamp-2  text-[#647488]">${item.description}</p>
          
         <div class="bg-[#F8FAFC] p-4 flex justify-between items-center">
         <div>
          <h2 class="font-semibold  text-[#64748B]">Assignee:</h2>
            <p class=" mb-3 text-[#647488] font-semibold capitalize">${
              item.author
            }</p>
         </div>
         <div class="flex flex-col items-center ">
         <h2 class="font-semibold  text-[#64748B]">Priority</h2>
         <h5 ${
           item.priority === "high"
             ? `class="bg-[#EF4444] text-[#fff] uppercase rounded-full px-3 py-2"`
             : item.priority === "medium"
             ? `class="bg-[#FEF3C7] text-[#F59E0B] uppercase rounded-full px-3 py-2"`
             : `class="bg-[#EDE9FE] text-[#9CA3AF] uppercase rounded-[20px] px-3 py-2"`
         }>
              ${item.priority}
              </h5>
         </div>
         </div>
          
          
        </div>
  
  
  `;
};

// display data
const displayData = (data) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  data.map((item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    const card = document.createElement("div");
    card.innerHTML = `
     <div onclick="loadDetailsData(${item.id})" ${
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
          <div class="flex  gap-2">
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
document.getElementById("search-btn").addEventListener("click", async () => {
  const input = document.getElementById("search-input");
  const inputValue = input.value;
  if (!inputValue) {
    alert("search something");
    return;
  }
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications"
  );
  const data = await res.json();
  const searchData = data.data.filter(
    (item) =>
      item.title.toLowerCase().includes(inputValue.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(inputValue.trim().toLowerCase())
  );
  displayData(searchData);
  input.value = "";
});
