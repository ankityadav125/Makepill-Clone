function loco() {
  gsap.registerPlugin(ScrollTrigger);
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)

  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

window.addEventListener("mousemove", function (dets) {
  document.querySelector(
    "#cursor"
  ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
});

gsap.to("#scroller-page5", {
  scrollTrigger: {
    trigger: "#page5",
    scroller: "#main",
    pin: true,
    scrub: 2,
    // markers:true,
    start: "top 0%",
    end: "200% 0%",
  },
});

var crsri = document.querySelector("#cursor i");
var crsr = document.querySelector("#cursor");
document.querySelector("#page2").addEventListener("mouseenter", () => {
  crsri.style.display = `initial`;
  crsr.style.width = `${150}px`;
  crsr.style.height = `${150}px`;
});
document.querySelector("#page2").addEventListener("mouseleave", () => {
  crsri.style.display = `none`;
  crsr.style.width = `${20}px`;
  crsr.style.height = `${20}px`;
});
document.querySelector("#page3").addEventListener("mouseenter", () => {
  crsr.style.backgroundColor = `black`;
});
document.querySelector("#page3").addEventListener("mouseleave", () => {
  crsr.style.backgroundColor = `white`;
});
document.querySelector("#page4").addEventListener("mouseenter", () => {
  crsr.style.backgroundColor = `black`;
});
document.querySelector("#page4").addEventListener("mouseleave", () => {
  crsr.style.backgroundColor = `white`;
});

var tags = document.querySelectorAll(".tags");

var attri = "";

tags.forEach(function (dets) {
  dets.addEventListener("mouseenter", function () {
    attri = dets.getAttribute("data-video");
    document.querySelector("#page5 video").setAttribute("src", attri);
    dets.style.opacity = 1;
    dets.lastElementChild.style.display = `initial`;
  });
  dets.addEventListener("mouseleave", function () {
    document.querySelector("#page5").style.backgroundColor = `black`;
    dets.style.opacity = 0.4;
    document.querySelector("#page5 video").setAttribute("src", "black");
    dets.lastElementChild.style.display = `none`;
  });
});

gsap.to("#page6", {
  backgroundColor: `white`,
  color: "black",
  scrollTrigger: {
    trigger: "#page6",
    scroller: "#main",
    scrub: 2,
    // markers:true,
    start: "top 10%",
    end: "top 8%",
  },
});
