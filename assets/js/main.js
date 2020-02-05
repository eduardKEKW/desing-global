const pagesBtns = document.querySelectorAll(".side__list-item");
const nav = document.querySelector("#navigation");
const navBtn = document.querySelector("#navigation-btn");
const perspective = document.querySelector("#perspective");
const page = document.querySelector("#page");
const secondNav = document.querySelector('.navigation__list');
const sliderBtns = document.querySelectorAll('.slider__btn')
const slider = document.querySelector(".slider__content-slide");
const pages = document.querySelector(".page-container").children;
const hireBtn = document.querySelectorAll("#hire-btn");
const sliderContent = document.querySelector(".slider__content-slide");

let prevPage = document.querySelector("#home-page");
const onPageChange = ({ target }) => {
    if (target.classList.contains("navigation__selected")) {
      return;
    }
    
    const name = target.getAttribute("name");

    pagesBtns.forEach(p => p.classList.remove("side__list-item--focus"));
    Array.from(secondNav.children).forEach(item =>
      item.classList.remove("navigation__selected")
    );

    document.querySelector(`#${name}`).classList.toggle('side__list-item--focus');
    document.querySelector(`#${name}-nav`).classList.add("navigation__selected");

    if(!target.classList.contains('side__list-item')){
        onNavToggle();
    }

    const nextPage = document.querySelector(`#${name}-page`);

    prevPage.classList.toggle("page-container__hide");
    prevPage.classList.toggle("page-container__show");

    nextPage.classList.toggle("page-container__hide");
    nextPage.classList.toggle("page-container__show");

    prevPage = nextPage;
};

const onNavToggle = () => {
    page.classList.toggle("pages--hide");
    page.classList.toggle("pages--show");

    perspective.classList.toggle("perspective--hide");
    perspective.classList.toggle("perspective--show");

    nav.children[0].classList.toggle("navigation__content--show");
}

let i = 2;
const onSliderMove = ({ target }) => {
  const side = target.getAttribute('name');
  const size = slider.children.length;
  const node = slider.children[i - 1];
  const width = node.offsetWidth;

  var matrix = new WebKitCSSMatrix(
    window.getComputedStyle(sliderContent).webkitTransform
  );
  let total = +matrix.m41;

  total += side === "left" ? width : -width;

  if((i === 1 && side == 'left') || (i === size && side == 'right')) return;

  i += side === 'left' ? -1:1;
  //total += side === "left" ? width : -width;

  sliderContent.style.transform = `translateX(${total}px)`;

  const newNode = slider.children[i-1];

  node.classList.toggle("slider__item--selected");
  node.children[0].classList.toggle("round-selected");

  newNode.classList.toggle("slider__item--selected");
  newNode.children[0].classList.toggle("round-selected");
}

// hire button
hireBtn.forEach(b => b.addEventListener("click", () => onPageChange({ target: document.querySelector("#hire") })));

pagesBtns.forEach(p => p.addEventListener("click", onPageChange));
Array.from(secondNav.children).forEach(item => item.addEventListener('click',onPageChange) );
sliderBtns.forEach(btn => btn.addEventListener('click',onSliderMove));
navBtn.addEventListener('click', onNavToggle);

