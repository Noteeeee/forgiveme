const storySteps = [
  "Once upon a time, there was a confused boy (me) who didn’t know how to handle his own thoughts. He let his brain play ping-pong with his emotions and ended up saying the wrong thing to the most amazing girl (you)",
  "The boy knew one thing for sure—this girl was special. She had a smile that could make him forget his worries, and her laugh was like his favorite song on repeat.",
  "But one day, the boy got so caught up in his overthinking that he said something silly. He felt terrible because he never wanted to hurt the girl who meant so much to him.",
  "So, the boy decided to make things right. He promised to stop overthinking and focus on making her smile instead. And he hoped that she’d forgive him because she was the best thing to ever happen to his story",
  "Will you forgive this silly boy?",
];

const storyParagraph = document.getElementById("story");
const h1 = document.querySelector("h1");

// Animate button on hover
const button = document.querySelector("#next-btn");
gsap.set(button, { opacity: 0, scale: 0.8 }); // Initial state
gsap.to(button, {
  opacity: 1,
  scale: 1,
  duration: 1,
  ease: "back.out(1.7)",
  delay: 1,
});

button.addEventListener("mouseenter", () => {
  gsap.to(button, { scale: 1.1, duration: 0.3, ease: "power1.out" });
});

button.addEventListener("mouseleave", () => {
  gsap.to(button, { scale: 1, duration: 0.3, ease: "power1.out" });
});

const text = storyParagraph.textContent;
storyParagraph.textContent = ""; // Clear the paragraph

// Split text into characters and wrap them in spans
text.split("").forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char; // Add non-breaking space for spaces
  storyParagraph.appendChild(span);
});

// Animate the spans using GSAP
const spans = storyParagraph.querySelectorAll("span");
gsap.fromTo(
  spans,
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.05, // Stagger each character
    ease: "power2.out",
  }
);
// Text Animation for h1
gsap.fromTo(
  h1,
  { opacity: 0, scale: 0.8, y: -50 },
  { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power2.out" }
);

// Text Animation for Paragraphs
gsap.fromTo(
  storyParagraph,
  { opacity: 0, x: -50 },
  { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", delay: 0.5 }
);

// Function to create a floating heart
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = `
            <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>`;
  heart.style.position = "absolute";
  heart.style.bottom = "0";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.pointerEvents = "none";
  document.body.appendChild(heart);

  gsap.to(heart, {
    y: -700,
    opacity: 0,
    duration: 5 + Math.random() * 2,
    ease: "power1.out",
    onComplete: () => heart.remove(),
  });
}

// Generate hearts at intervals
setInterval(createFloatingHeart, 500);

const finalImageContainer = document.querySelector(".final-image-container");
const finalImage = document.querySelector(".final-image");

let currentStep = 0;

button.addEventListener("click", () => {
  if (currentStep < storySteps.length) {
    gsap.fromTo(
      storyParagraph,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
    storyParagraph.textContent = storySteps[currentStep];
    currentStep++;

    // Change button text before the final step
    if (currentStep === storySteps.length) {
      button.textContent = "Please Forgive Me ❤️";
      gsap.to(button, { className: "+=enlarged", duration: 0.5 });
    }
  } else {
    // Hide text and button, show the final image
    gsap.to([storyParagraph, button], { opacity: 0, duration: 0.5 });
    gsap.to(finalImageContainer, { display: "flex", duration: 0 });
    gsap.to(finalImage, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }
});

// Preloader Animation
gsap.fromTo(
  ".heart-loader svg",
  { scale: 0.8, opacity: 0.7 },
  {
    scale: 1.2,
    opacity: 1,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
  }
);

gsap.fromTo(
  "#preloader p",
  { opacity: 0 },
  { opacity: 1, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" }
);

// Ensure the preloader fades out and reveals the main content
window.addEventListener("load", () => {
  gsap.to("#preloader", {
    opacity: 0,
    duration: 1.5,
    onComplete: () => {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      gsap.fromTo(
        "#main-content",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    },
  });
});
