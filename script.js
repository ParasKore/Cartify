function locomotiveAnimations(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimations()

//
gsap.to("#nav_part_1 svg",{
    transform:"translateY(-100%)",
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        start:"top 0",
        end:"top -5%",
        scrub:true,
    }
})
gsap.to("#nav2 #links",{
    transform:"translateY(-100%)",
    opacity:0,
    scrollTrigger:{
        trigger:"#page1",
        scroller:"#main",
        start:"top 0",
        end:"top -5%",
        scrub:true,
    }
})
function videoconAnimation(){
    var videocon=document.querySelector("#video_container")
var playbtn= document.querySelector("#play")
videocon.addEventListener("mouseenter",function(){
   gsap.to(playbtn,{
    scale:1,
    opacity:1,
   })
})
videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn,{
        scale:0,
        opacity:0, 
})
})
videocon.addEventListener("mousemove",function(dets){
    gsap.to(playbtn,{
        left:dets.x-8,
        top:dets.y-7,
    })
})

}
videoconAnimation()
gsap.from("#page1 h1",{
    y:100,
    opacity:0,
    delay:0.5,
    duration:0.5,
    stagger:0.4,
})
gsap.from("#page1 #video_container",{
    scale:0.9,
    opacity:0,
    delay:1,
    duration:0.3,
})
document.addEventListener("mousemove",function(dets){
    gsap.to("#cursor",{
      left:dets.x,
      top:dets.y,
    })
})
// document.querySelector("#child1").addEventListener("mouseenter",function(){
//     gsap.to("#cursor",{
//         transform:"translate(-50%,-50%) scale(1)"
//     })
// })
// document.querySelector("#child1").addEventListener("mouseleave",function(){
//     gsap.to("#cursor",{
//         transform:"translate(-50%,-50%) scale(0)"
//     })
// })
document.querySelectorAll(".child").forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
    gsap.to("#cursor",{
                transform:"translate(-50%,-50%) scale(1)"
            })
  })
})
document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseleave",function(){
      gsap.to("#cursor",{
                  transform:"translate(-50%,-50%) scale(0)"
              })
    })
  })
  document.querySelector(".buy_now").addEventListener("click",function(){
    console.log("this is being clicked")
  })

  function dshow() {
    document.querySelector(".content").style.userSelect = "none";
    document.getElementById("drawer").style.transform = "translateX(-100%)";
   }
   function dhide() {
    document.querySelector(".content").style.userSelect = "auto";
    document.getElementById("drawer").style.transition = "all ease-in 0.3s";
    document.getElementById("drawer").style.transform = "translateX(100%)";
   }
   
   let cart=[]
function updateCartDisplay(){
  const cartItemDiv = document.getElementById('cart-item')
  const cartTotalDiv =document.getElementById('cart-total')
  if(cart.length ===0){
    cartItemDiv.innerHTML='<p>Your Cart Is Empty </p>'
    cartTotalDiv.innerHTML=''
  } else{
    cartItemDiv.innerHTML=cart.map(item=> `<p class='cart-products'>${item.name}: $${item.price.toFixed(2)}</p>`).join('')

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    cartTotalDiv.innerHTML = `<p>Total: $${totalAmount.toFixed(2)}</p>`;
  }
}
document.querySelectorAll('.buy_now').forEach(button => {
  button.addEventListener('click', (event) => {
      const product = event.target.getAttribute('data-product');
      const price=parseFloat(event.target.getAttribute('data-price'))
      const isInCart = cart.some(item => item.name === product);
      if (!isInCart) {
        if (product && !isNaN(price)) {
            cart.push({ name: product, price: price });
            updateCartDisplay();
        } 
    } else {
        alert(`${product} is already in the cart.`);
    }
});
});

updateCartDisplay();



document.querySelector(".check_out").addEventListener("click", function() {
  window.location.href = "checkout.html";
});