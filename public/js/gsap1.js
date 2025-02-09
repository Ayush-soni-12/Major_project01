
// import { gsap } from "https://cdn.skypack.dev/gsap";

import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

 let wrapper = document.querySelector(".wrapper");

 let cursor = document.querySelector(".cursor")
 document.addEventListener("mousemove",(obj)=>{
    gsap.to(cursor,{
       x:obj.x,
       y:obj.y,
       ease: "power2.out",
    })
})
wrapper.addEventListener("mouseenter",(obj)=>{
    cursor.innerHTML ="View more"
    gsap.to(cursor,{
        scale:2,
        color:"#fff",
        opacity:0.9,

    })
})
wrapper.addEventListener("mouseleave",(obj)=>{
    gsap.to(cursor,{
        scale:1,
        
    })
})