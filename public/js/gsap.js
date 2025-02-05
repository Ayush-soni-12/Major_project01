
// import { gsap } from "https://cdn.skypack.dev/gsap";

import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animate the .Error element with a combination of effects
gsap.from(".Error", {
    y: -50, // Start from 50px above
    opacity: 0, // Start with 0 opacity
    scale: 0.5, // Start with half the size
    rotation: 360, // Start with a full rotation
    duration: 1.5, // Duration of the animation
    delay: 0.5, // Delay before the animation starts
    ease: "elastic.out(1, 0.3)", // Elastic easing for a bouncy effect
    stagger: 1 // Stagger the animation for multiple elements
});

// Animate the navbar for a slide-in effect
gsap.timeline().from(".navbar", {
    x: -100, // Start from 100px to the left
    opacity: 0, // Start with 0 opacity
    duration: 1, // Duration of the animation
    ease: "power2.out" // Easing for a smooth effect
});

gsap.timeline().from(".navbar h4", {
    y: 50,
    opacity: 0,
    delay: 1,
    duration: 1,
      ease: "elastic.out(1, 0.3)",
    stagger: 0.3
});

gsap.from("h1", {
    y: 50, // Start from 50px below
    opacity: 0, // Start with 0 opacity
    rotate:360,
    duration: 1, // Duration of the animation
    ease: "elastic.out(1, 0.3)",// Easing for a smooth effect
});

// Animate individual items in the listings with a scroll trigger
gsap.from(".listing-item", {
    y: 20, // Start from 20px below
    opacity: 0, // Start with 0 opacity
    duration: 0.5, // Duration of the animation
    ease: "power2.out", // Easing for a smooth effect
    stagger: 0.1, // Stagger the animation for multiple elements
   
});

gsap.from(".footer a", {
    y: 50, // Start from 50px below
    opacity: 0, // Start with 0 opacity
    duration: 1, // Duration of the animation
    ease: "power2.out", // Easing for a smooth effect
    delay: 1, // Delay before the animation starts
    stagger: 0.3
});
// ........................ new.ejs .........................

document.addEventListener("DOMContentLoaded", () => {
    // Animate form elements
    gsap.from("form", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
    });
})





    // Animate ul element in detail.ejs
    gsap.from("ul", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",

    });

    gsap.from("button",{
        opacity:0,
        delay:1.5
    })
  
