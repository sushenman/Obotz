const programLevels = [
  {
    tag: "Level 1",
    title: "Funtronix",
    subtitle: "Fun with electronics",
    image: "image/levels.jpeg",
    imageAlt: "Electronic circuit board",
    stats: [
      ["50+", "Experiments"],
      ["150+", "Observations"],
      ["10+", "Applications & Projects"],
      ["10+", "Activities & Challenges"],
    ],
    learn: [
      "Series and Parallel circuits",
      "Logic Gates",
      "Sensors",
      "Motors and Concepts of STEM",
    ],
    kits: ["Battery", "Jumper wires", "LEDs", "Sensors"],
  },
  {
    tag: "Level 2",
    title: "Robotics",
    subtitle: "Machine Designing",
    image: "image/why.jpg",
    imageAlt: "Student learning robotics",
    stats: [
      ["15+", "Robot Designs & Simple Machines"],
      ["20+", "Observations & Computations"],
      ["10+", "Applications & Projects"],
      ["10+", "Activities & Challenges"],
    ],
    learn: [
      "Machine Designing",
      "Drive Systems",
      "Simple and Complex Machines",
      "Computational Mathematics",
    ],
    kits: ["Motors", "Wheels", "Chassis", "Gear parts"],
  },
  {
    tag: "Level 3",
    title: "Solarix",
    subtitle: "Solar + Wireless",
    image: "image/blogs.jpg",
    imageAlt: "Hands-on STEM activity",
    stats: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    learn: [
      "Wireless Circuits",
      "Working of a Solar Panel",
      "Encoding & Decoding",
      "Logic Building and Complex Circuits",
    ],
    kits: ["Solar panel", "Mini motor", "Switches", "Connectors"],
  },
  {
    tag: "Level 4",
    title: "Robo Vi",
    subtitle: "Autonomous Robot using Visual Programming",
    image: "image/levels.jpeg",
    imageAlt: "Digital electronics circuit",
    stats: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    learn: [
      "Control Loops",
      "Logic Gates",
      "IR Sensors",
      "Servo Motors",
      "Logic Building & Algorithm Development",
    ],
    kits: ["IR sensor", "LDR sensor", "Buzzers", "Controller board"],
  },
  {
    tag: "Level 5",
    title: "C-Robo",
    subtitle: "Autonomous Robot using Embedded C programming",
    image: "image/why.jpg",
    imageAlt: "Robotics project demonstration",
    stats: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    learn: [
      "Ultrasonic Sensor",
      "Bluetooth Technology",
      "LCD Display",
      "Accelerometer Sensor",
    ],
    kits: ["Programmable board", "USB cable", "Motor driver", "Robot frame"],
  },
  {
    tag: "Level 6",
    title: "Embetrix",
    subtitle: "Embedded systems using Embedded C programming",
    image: "image/blogs.jpg",
    imageAlt: "Electronics and robotics workshop",
    stats: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    learn: [
      "Working of : Joystick, Stepper Motor, SSD, Thermistor",
      "Writing Complex Codes and Creating Functions",
    ],
    kits: ["Microcontroller", "Breadboard", "Sensor set", "Display module"],
  },
  {
    tag: "Level 7",
    title: "Walko'botz",
    subtitle: "Walking robots & Humanoids",
    image: "image/levels.jpeg",
    imageAlt: "Advanced electronics circuit board",
    stats: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    learn: [
      "Stability of Humanoid, move them in all 4 directions, making them dance and do exercise",
    ],
    kits: ["Servo motors", "Leg assembly", "Controller", "Challenge mat"],
  },
];

const levelTabs = document.querySelectorAll(".program-level-tab");
const levelTag = document.getElementById("programLevelTag");
const levelTitle = document.getElementById("programLevelTitle");
const levelSubtitle = document.getElementById("programLevelSubtitle");
const levelImage = document.getElementById("programLevelImage");
const learnList = document.getElementById("programLearnList");
const kitList = document.getElementById("programKitList");
const statsContainer = document.querySelector(".program-level-stats");
const statValues = [
  document.getElementById("programStatOneValue"),
  document.getElementById("programStatTwoValue"),
  document.getElementById("programStatThreeValue"),
  document.getElementById("programStatFourValue"),
];
const statLabels = [
  document.getElementById("programStatOneLabel"),
  document.getElementById("programStatTwoLabel"),
  document.getElementById("programStatThreeLabel"),
  document.getElementById("programStatFourLabel"),
];

function replaceList(parent, items, tagName) {
  parent.replaceChildren();

  items.forEach((item) => {
    const element = document.createElement(tagName);
    element.textContent = item;
    parent.appendChild(element);
  });
}

function renderProgramLevel(index) {
  const data = programLevels[index];

  levelTag.textContent = data.tag;
  levelTitle.textContent = data.title;
  levelSubtitle.textContent = data.subtitle;
  levelImage.src = data.image;
  levelImage.alt = data.imageAlt;

  const visibleStats = data.stats.filter((stat) => {
    return String(stat[0]).trim() || String(stat[1]).trim();
  });

  statsContainer.classList.toggle("is-hidden", visibleStats.length === 0);
  statsContainer.setAttribute("aria-hidden", String(visibleStats.length === 0));

  statValues.forEach((value, statIndex) => {
    value.textContent = visibleStats[statIndex]?.[0] || "";
    statLabels[statIndex].textContent = visibleStats[statIndex]?.[1] || "";
  });

  replaceList(learnList, data.learn, "li");
  replaceList(kitList, data.kits, "span");

  levelTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function getLevelIndexFromHash() {
  const match = window.location.hash.match(/^#level-(\d+)$/);

  if (!match) {
    return 0;
  }

  const levelNumber = Number(match[1]);
  const levelIndex = levelNumber - 1;

  if (levelIndex < 0 || levelIndex >= programLevels.length) {
    return 0;
  }

  return levelIndex;
}

levelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const levelIndex = Number(tab.dataset.programLevel);
    renderProgramLevel(levelIndex);
    window.history.replaceState(null, "", `#level-${levelIndex + 1}`);
  });
});

if (levelTabs.length) {
  renderProgramLevel(getLevelIndexFromHash());
}

window.addEventListener("hashchange", () => {
  if (levelTabs.length) {
    renderProgramLevel(getLevelIndexFromHash());
  }
});

if (window.location.hash.match(/^#level-(\d+)$/)) {
  document.getElementById("ProgramLevels")?.scrollIntoView();
}
