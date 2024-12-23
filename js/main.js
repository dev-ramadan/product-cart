const container = document.querySelector(".container");
let x = document.querySelector(".side");
let confirmOrder = document.querySelector(".confirm");
(async function getPtoduct() {
  const request = await fetch("./js/data.json");
  const res = await request.json();
  res.forEach((element) => {
    container.innerHTML += `
        <div class='cart'>
         <div class="img-box">
            <img src="${element.image.desktop}" alt="">
          </div>
          <button class="btn" data-id='${element.id}'><div data-id='${element.id}'><img src="assets/images/icon-add-to-cart.svg" alt="" data-id='${element.id}'> <p data-id='${element.id}'>Add To Cart</p></div></button>
          <div class="desc">
            <p>${element.name}</p>
            <h4>${element.category}</h4>
            <h6>$${element.price}</h6>
          </div>
        </div>
        `;
  });
  let addCart = document.querySelectorAll(".btn");
  addCart.forEach((button) => {
    button.addEventListener("click", (e) => {
      let eleId = e.target.getAttribute("data-id");
      let chack = res.find((requst) => requst.id == eleId);
      button.classList.add("disable");
      addToCart(chack);
      carts();
      removeActive(button);
      togellCart();
      reviewOrder()
    });
  });
})();

let itemIncart;
if (JSON.parse(localStorage.getItem("cart"))) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  itemIncart = cart;
  carts();
} else {
  itemIncart = [];
}

function addToCart(e) {
  itemIncart.push({ ...e, quntity: 1 });
  localStorage.setItem("cart", JSON.stringify(itemIncart));
  carts();
  counter();
}
function carts() {
  x.innerHTML = "";
  let itemIncart = JSON.parse(localStorage.getItem("cart")) || [];
  itemIncart.forEach((item, index) => {
    x.innerHTML += ` 
              <div class='box'>
              <div>
              <h3 style='color:black;margin-bottom: 10px;font-weight: 500;margin-left:5px'>${item.name}</h3>
              <div class="p-info">
              <p style='margin-right:auto;color:red;margin-left:5px'>${item.quntity}x</p>
              <p style='margin-right:auto;color:grey'>@ $${item.price}</p>
              </div>
              </div>
              <div class='remove'><img src='assets/images/icon-remove-item.svg' data-id='${index}'></div>
              <div class='changQu'>
              <span class='plus' data-id='${index}'>+</span>
              <span class='mins' data-id='${index}'>-</span>
               </div>
               </div>
              `;
    let tot = 0;
    let total = document.querySelector('.totals')
    itemIncart.map((item)=>{
      tot += item.price * item.quntity;
      total.innerHTML = `$${tot}`
    })
    let remove = document.querySelectorAll(".remove");
    remove.forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let item = e.target.getAttribute("data-id");
        del(item);
        counter();
      });
    });
    let plus = document.querySelectorAll(".plus");
    let mins = document.querySelectorAll(".mins");

    plus.forEach((ele)=>{
      ele.addEventListener("click",(e)=>{
      let itemIndex = e.target.getAttribute("data-id");
       plusquntity(itemIndex);
       })
      });

      mins.forEach((ele)=>{
       ele.addEventListener("click",(e)=>{
         let itemIndex = e.target.getAttribute("data-id");
         minsquntity(itemIndex);
       })
      });
  });
}
function removeActive(item) {
    item.innerHTML= `
    <button class="btnt"><div><img src="assets/images/icon-order-confirmed.svg" alt="" width="20px"> <p>item in cart</p></div></button>
    `;
}
function counter() {
  let count = document.querySelector(".count");
  count.innerHTML = itemIncart.length;
}
function del(item) {
  itemIncart.splice(item, 1);
  localStorage.setItem("cart", JSON.stringify(itemIncart));
  carts();
  counter();
  togellCart();
  removeActive()
}
console.log(itemIncart);
function togellCart() {
  let cartEmpty = document.querySelector(".cart-empty");
  let total = document.querySelector(".total");
  let logo = document.querySelector(".logo");
  let confirm = document.querySelector(".confirm");

  if (itemIncart.length > 0) {
    cartEmpty.style.display = "none";
    total.style.display='flex';
    logo.style.display='flex';
    confirm.style.display='block'
  } else {
    cartEmpty.style.display = "block";
    total.style.display='none';
    logo.style.display='none';
    confirm.style.display='none'
  }
}

function plusquntity(item){
  let cart =JSON.parse(localStorage.getItem("cart")||[]);
  cart[item].quntity +=1
  localStorage.setItem("cart",JSON.stringify(cart))
  carts()
}
function minsquntity (index) {
  let cart = JSON.parse(localStorage.getItem("cart") || []);
  if(cart[index].quntity > 1){
  cart[index].quntity -=1
  localStorage.setItem("cart",JSON.stringify(cart))
  carts()
  }
}
confirmOrder.addEventListener('click',()=>{
  let back = document.querySelector(".back");
  back.style.display='flex'
})

function reviewOrder(){
let cart = JSON.parse(localStorage.getItem("cart") || []);
let order = document.querySelector(".orders");
cart.forEach((item)=>{
  order.innerHTML+=`
  <div style="display: flex;justify-content: space-around;margin-top: 15px;">
 <div style="display: flex;gap: 10px;">
   <img src="${item.image.desktop}" alt="" width="100px" style="border-radius: 20px;">
   <div><p style="margin-bottom: 25px;">${item.name}</p>
   <span style='margin-right:10px;color:red'>${item.quntity}x</span> <span><p style="display:inline">@${item.price}<p></span>
  </div>
 </div>
 <div>$${item.price * item.quntity}</div>
 </div>
 </div> 
  `
  let tot = 0;
  let total = document.querySelector('.tot')
  itemIncart.map((item)=>{
    tot += item.price * item.quntity;
    total.innerHTML = `$${tot}`
})
})
}


let newOrder = document.querySelector(".new-order");
newOrder.addEventListener('click',()=>{
    let back = document.querySelector(".back");
  back.style.display='none'
})

togellCart();
counter();
