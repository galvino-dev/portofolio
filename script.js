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

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--x", x + "%");
    card.style.setProperty("--y", y + "%");
  });

});

const nav = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const highlight = document.querySelector(".nav-highlight");

let activeLink = links[0];
let targetLeft = 0;
let targetWidth = 0;

let currentLeft = 0;
let currentWidth = 0;

/* ambil target posisi */
function setTarget(el){
  targetLeft = el.offsetLeft;
  targetWidth = el.offsetWidth;
}

/* animasi smooth (LERP) */
function animate(){
  currentLeft += (targetLeft - currentLeft) * 0.15;
  currentWidth += (targetWidth - currentWidth) * 0.15;

  highlight.style.left = currentLeft + "px";
  highlight.style.width = currentWidth + "px";

  requestAnimationFrame(animate);
}
animate();

/* hover stabil (pakai mouseover, bukan mousemove) */
nav.addEventListener("mouseover", (e)=>{
  const link = e.target.closest("a");
  if(link){
    setTarget(link);
  }
});

/* keluar nav → balik ke active */
nav.addEventListener("mouseleave", ()=>{
  setTarget(activeLink);
});

/* klik */
links.forEach(link=>{
  link.addEventListener("click", function(){
    links.forEach(l=>l.classList.remove("active"));
    this.classList.add("active");

    activeLink = this;
    setTarget(this);
  });
});

/* init */
window.addEventListener("load", ()=>{
  activeLink.classList.add("active");
  setTarget(activeLink);
});