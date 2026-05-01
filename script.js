let isAnimating = false;

const pageOrder = [
  "homePage",
  "aboutPage",
  "certificatePage",
  "goalPage"
];

function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("show");
}

function showPage(pageId){

  if(isAnimating) return;

  const current = document.querySelector(".page.active");
  const next = document.getElementById(pageId);

  if(current === next) return;

  isAnimating = true;

  const currentIndex = pageOrder.indexOf(current.id);
  const nextIndex = pageOrder.indexOf(pageId);

  /* reset semua class animasi */
  current.classList.remove(
    "enter-right","enter-left","exit-left","exit-right"
  );

  next.classList.remove(
    "active","enter-right","enter-left","exit-left","exit-right"
  );

  next.style.display = "block";

  /* NEXT PAGE */
  if(nextIndex > currentIndex){

    current.classList.add("exit-left");
    next.classList.add("enter-right");

  }else{

    /* PREVIOUS PAGE */
    current.classList.add("exit-right");
    next.classList.add("enter-left");
  }

  current.classList.remove("active");

  setTimeout(()=>{

    current.style.display = "none";

    current.classList.remove(
      "exit-left","exit-right"
    );

    next.classList.remove(
      "enter-right","enter-left"
    );

    next.classList.add("active");

    isAnimating = false;

  },750);

  document.getElementById("navLinks").classList.remove("show");
}

/* popup */
function openModal(card){
  const img = card.querySelector("img").src;
  document.getElementById("modalImg").src = img;
  document.getElementById("modal").classList.add("show");
}

function closeModal(){
  document.getElementById("modal").classList.remove("show");
}