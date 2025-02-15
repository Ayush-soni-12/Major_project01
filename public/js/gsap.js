
// import { gsap } from "https://cdn.skypack.dev/gsap";

import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

 let listing = document.querySelector("li");

 let cursor = document.querySelector(".cursor")
 document.addEventListener("mousemove",(obj)=>{
    gsap.to(cursor,{
       x:obj.x,
       y:obj.y,
       ease: "power2.out",
    })
})
// listing.addEventListener("mouseenter",(obj)=>{
//     cursor.innerHTML ="View more"
//     gsap.to(cursor,{
//         scale:2,
//         color:"#fff",
//         opacity:0.9,

//     })
// })
// listing.addEventListener("mouseleave",(obj)=>{
//     gsap.to(cursor,{
//         scale:1,
        
//     })
// })

// Animate the .Error element with a combination of effects
// let gl = gsap.timeline();
  
gsap.from(".navbar", {
    x: -100, // Start from 100px to the left
    opacity: 0, // Start with 0 opacity
    // duration: 1, // Duration of the animation
    ease: "power2.out" // Easing for a smooth effect
});

gsap.from(".navbar h4", {
    y: 50,
    opacity: 0,
    // delay: 1,
    // duration: 1,
      ease: "elastic.out(1, 0.3)",
    stagger: 0.3
});


// gsap.from(".swiper-slide", {
//     scrollTrigger: {
//         trigger: ".swiper-slide",
//         start: "top 80%",
//         end: "bottom 20%",
//         toggleActions: "play none none reverse",
//     },
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     stagger: 0.3,
// });

// gsap.from(".Error", {
//     y: -50, // Start from 50px above
//     opacity: 0, // Start with 0 opacity
//     scale: 0.5, // Start with half the size
//     rotation: 360, // Start with a full rotation
//     duration: 1.5, // Duration of the animation
//     delay: 0.5, // Delay before the animation starts
//     ease: "elastic.out(1, 0.3)", // Elastic easing for a bouncy effect
//     stagger: 1 // Stagger the animation for multiple elements
// });

// Animate the navbar for a slide-in effect

// gsap.from("h1", {
//     y: 50, // Start from 50px below
//     opacity: 0, // Start with 0 opacity
//     rotate:360,
//     duration: 1, // Duration of the animation
//     ease: "elastic.out(1, 0.3)",// Easing for a smooth effect
// });

// Animate individual items in the listings with a scroll trigger
// gsap.from(".listing-item", {
//     y: 20, // Start from 20px below
//     opacity: 0, // Start with 0 opacity
//     duration: 0.5, // Duration of the animation
//     ease: "power2.out", // Easing for a smooth effect
//     stagger: 0.1, // Stagger the animation for multiple elements
   
// });

// gsap.from(".social-wrapper a", {
//     y: 50, // Start from 50px below
//     opacity: 0, // Start with 0 opacity
//     duration: 1, // Duration of the animation
//     ease: "power2.out", // Easing for a smooth effect
//     delay: 1, // Delay before the animation starts
//     stagger: 0.3
// });
// ........................ new.ejs .........................

// document.addEventListener("DOMContentLoaded", () => {
//     // Animate form elements
//     gsap.from("form", {
//         opacity: 0,
//         y: 50,
//         duration: 1,
//         stagger: 0.2,
//         ease: "power2.out"
//     });
// })





    // Animate ul element in detail.ejs
    // gsap.from("ul", {
    //     opacity: 0,
    //     y: 50,
    //     duration: 1.5,
    //     ease: "power2.out",

    // });

    // gsap.from("button",{
    //     opacity:0,
    //     delay:1
    // })




    
 let navbar = document.querySelector(".navbar i");
 let body = document.querySelector("body");

let tl = gsap.timeline();

tl.to("#full",{
    x:-400,
    duration:0.5,
    
})
tl.from("#full h4",{
    x:-30,
    opacity:0,
    duration:0.5,
    stagger:0.3,
});
tl.pause();
navbar.addEventListener("click",()=>{
    console.log("hello");
    tl.play();
});
document.addEventListener("dblclick",()=>{
    console.log("bye");
    tl.reverse();
});

let h1 = document.querySelector("h1");
let h1Text = h1.textContent;

let splittedText = h1Text.split("");
let halfValue =Math.floor(splittedText.length/2);

let clutter = " "


splittedText.forEach((elem,idx)=>{
    if(idx<halfValue){
        clutter = clutter + `<span class="a">${elem}</span>`;
    }
    else{
        clutter = clutter + `<span class="b">${elem}</span>`;
    }

})
h1.innerHTML = clutter;

gsap.from("h1 .a",{
    y:50,
    opacity: 0,
    duration:0.8,
    delay:0.3,
    stagger:0.15
    
})
gsap.from("h1 .b",{
    y:50,
    opacity: 0,
    duration:0.8,
    delay:0.3,
    stagger:-0.15
    
})