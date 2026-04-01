/* ===== 场景化题目（去问卷感） ===== */
const questionBank = [
  {
    id: "currentMethod",
    context: "先看一个关键问题",
    title: "你现在主要靠什么方式找客户？",
    options: [
      {
        id: "coldcall",
        main: "打电话、加微信，一个一个联系",
        sub: "效率不高但一直在用",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "referral",
        main: "靠老客户转介绍和熟人圈子",
        sub: "质量不错但量上不去",
        scores: { ad: 1, agency: 1 },
        primary: "ad"
      },
      {
        id: "content",
        main: "在朋友圈、视频号等平台发内容",
        sub: "有在做但效果不稳定",
        scores: { content: 2 },
        primary: "content"
      },
      {
        id: "ads",
        main: "已经在做一些线上推广或投放",
        sub: "想看看有没有更好的做法",
        scores: { agency: 1, content: 1 },
        primary: "agency"
      }
    ]
  },
  {
    id: "goal",
    context: "这会决定哪种方式更适合你",
    title: "获客这件事，你现在最想解决什么？",
    options: [
      {
        id: "a",
        main: "尽快有客户线索进来",
        sub: "生意等不了，先跑起来再说",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "b",
        main: "不想乱花钱，要确定有效再投入",
        sub: "试过一些方法，怕再踩坑",
        scores: { agency: 2 },
        primary: "agency"
      },
      {
        id: "c",
        main: "把获客体系搭起来，长期能用",
        sub: "不急一时，但要可持续",
        scores: { content: 2 },
        primary: "content"
      }
    ]
  },
  {
    id: "contentAbility",
    context: "不同方式对内容的要求不一样",
    title: "你目前在内容方面的情况？",
    options: [
      {
        id: "none",
        main: "基本没做过内容",
        sub: "朋友圈偶尔发发，没有系统在做",
        scores: { ad: 2, agency: 1 },
        primary: "ad"
      },
      {
        id: "weak",
        main: "有在做但没什么章法",
        sub: "发了不少，不确定有没有效果",
        scores: { ad: 1, agency: 1, content: 1 },
        primary: "agency"
      },
      {
        id: "experienced",
        main: "有一定平台运营经验",
        sub: "视频号/公众号/抖音等有在认真做",
        scores: { content: 3 },
        primary: "content"
      }
    ]
  },
  {
    id: "participation",
    context: "最后，这决定了推进节奏",
    title: "获客推广这件事，你希望怎么推进？",
    options: [
      {
        id: "a",
        main: "自己或团队来做，节奏自己把控",
        sub: "有人能执行，缺的是方法和工具",
        scores: { ad: 2 },
        primary: "ad"
      },
      {
        id: "b",
        main: "和专业团队一起，关键环节我来定",
        sub: "既要专业支持，也要参与决策",
        scores: { content: 2 },
        primary: "content"
      },
      {
        id: "c",
        main: "全部交给专业团队，我主要看结果",
        sub: "不想操心过程，要的是产出",
        scores: { agency: 2 },
        primary: "agency"
      }
    ]
  },
  {
    id: "business",
    context: "结合你的经营情况来判断",
    title: "你的生意主要在哪里做？",
    options: [
      {
        id: "online",
        main: "线上经营为主",
        scores: { ad: 1, content: 1 },
        primary: "ad"
      },
      {
        id: "offline",
        main: "线下门店为主",
        scores: { agency: 2, ad: 1 },
        primary: "agency"
      },
      {
        id: "mixed",
        main: "线上和线下都在做",
        scores: { content: 2, ad: 1 },
        primary: "content"
      }
    ]
  },
  {
    id: "stores",
    title: "目前几家店？",
    context: "门店规模会影响推荐",
    when: (answers) => answers.business && answers.business !== "online",
    options: [
      {
        id: "single",
        main: "1 家",
        scores: { agency: 1, ad: 1 },
        primary: "agency"
      },
      {
        id: "small",
        main: "2-5 家",
        scores: { ad: 2, agency: 1 },
        primary: "ad"
      },
      {
        id: "large",
        main: "6 家以上",
        scores: { content: 1, ad: 1 },
        primary: "content"
      }
    ]
  }
];

/* ===== 结果数据（前台不出现"广告""投放""代投"） ===== */
const resultProfiles = {
  ad: {
    shortLabel: "精准获客",
    title: "快速找到想买的人，让他们主动来咨询",
    how: "在微信生态里，按行业、地区、兴趣等标签精准触达潜在客户。启动后就能开始收到咨询，不用等、不用养。",
    howGap: "具体怎么设置、预算怎么分配、你的行业同行跑出了什么效果——这些在报告里都有。",
    schemeLabel: "精准获客方案"
  },
  agency: {
    shortLabel: "省心获客",
    title: "有专业团队帮你搞定，你专心做生意",
    how: "把「在微信找客户」交给有经验的团队，从策略到执行全程有人负责。你重点盯结果和线索质量就行。",
    howGap: "怎么选团队、合作模式怎么定、费用结构大概什么样——报告里有详细说明。",
    schemeLabel: "省心获客方案"
  },
  content: {
    shortLabel: "长效获客",
    title: "先让人认识你、信任你，再持续引来客户",
    how: "在微信生态搭好内容体系和客户承接，用内容吸引潜在客户关注，再配合推广放大效果。前期要耐心，但获客成本会越来越低。",
    howGap: "内容怎么做、推广怎么配合、你的行业适合什么内容形式——报告里有完整拆解。",
    schemeLabel: "长效获客方案"
  }
};

const loadingMessages = [
  "正在分析你的情况…",
  "正在匹配最适合的获客方式",
  "马上告诉你结果"
];

/* ===== 状态 ===== */
const state = {
  currentQuestionIndex: 0,
  scores: { ad: 0, agency: 0, content: 0 },
  answers: {},
  answerPrimaries: {},
  loadingTimer: null,
  loadingTextTimer: null
};

/* ===== DOM ===== */
const screens = {
  intro: document.getElementById("screen-intro"),
  quiz: document.getElementById("screen-quiz"),
  loading: document.getElementById("screen-loading"),
  result: document.getElementById("screen-result")
};

const stepDots = document.getElementById("step-dots");
const stepContext = document.getElementById("step-context");
const questionTitle = document.getElementById("question-title");
const questionOptions = document.getElementById("question-options");
const loadingText = document.getElementById("loading-text");
const resultTypeShort = document.getElementById("result-type-short");
const resultTypeTitle = document.getElementById("result-type-title");
const resultSummaryText = document.getElementById("result-summary-text");
const resultHowText = document.getElementById("result-how-text");
const traitList = document.getElementById("trait-list");
const actionList = document.getElementById("action-list");
const resultHowGap = document.getElementById("result-how-gap");

/* ===== 路由 ===== */
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  document.querySelector(".phone-frame").scrollTop = 0;
  window.scrollTo(0, 0);
}

/* ===== 答题流程 ===== */
function getActiveQuestions() {
  return questionBank.filter((q) => !q.when || q.when(state.answers));
}

function renderStepDots() {
  const questions = getActiveQuestions();
  stepDots.innerHTML = questions
    .map((_, i) => {
      let cls = "step-dot";
      if (i < state.currentQuestionIndex) cls += " done";
      else if (i === state.currentQuestionIndex) cls += " active";
      return `<div class="${cls}"></div>`;
    })
    .join("");
}

function renderQuestion() {
  const questions = getActiveQuestions();
  const q = questions[state.currentQuestionIndex];

  renderStepDots();
  stepContext.textContent = q.context || "";
  questionTitle.textContent = q.title;

  questionOptions.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    let html = `<span class="option-main">${opt.main}</span>`;
    if (opt.sub) {
      html += `<span class="option-sub">${opt.sub}</span>`;
    }
    btn.innerHTML = html;
    btn.addEventListener("click", () => {
      // 选中反馈：高亮后延迟执行
      btn.classList.add("selected");
      // 禁用其他选项防止重复点击
      questionOptions.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
      setTimeout(() => selectAnswer(q, opt), 300);
    });
    questionOptions.appendChild(btn);
  });
}

function selectAnswer(question, option) {
  state.answers[question.id] = option.id;
  state.answerPrimaries[question.id] = option.primary;

  Object.entries(option.scores).forEach(([type, value]) => {
    state.scores[type] += value;
  });

  const questions = getActiveQuestions();
  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  startLoadingAndShowResult();
}

/* ===== 结果计算 ===== */
function resolveResultType() {
  const entries = Object.entries(state.scores);
  const maxScore = Math.max(...entries.map(([, s]) => s));
  const candidates = entries.filter(([, s]) => s === maxScore).map(([t]) => t);

  if (candidates.length === 1) return candidates[0];

  const tieBreakOrder = [
    state.answerPrimaries.currentMethod,
    state.answerPrimaries.goal,
    state.answerPrimaries.contentAbility,
    state.answerPrimaries.participation,
    state.answerPrimaries.business,
    state.answerPrimaries.stores
  ];

  for (const t of tieBreakOrder) {
    if (t && candidates.includes(t)) return t;
  }

  return candidates[0];
}

function buildMethodComparison(type) {
  const method = state.answers.currentMethod;
  if (method === "coldcall") {
    if (type === "ad") return "相比一个一个打电话，这种方式能让感兴趣的客户主动找上门，效率完全不在一个量级。";
    if (type === "agency") return "相比自己打电话找客户，专业团队能帮你系统化获客，不再靠人力硬扛。";
    return "打电话只能一对一，把内容和客户承接做好后，一条内容可能带来一批客户。";
  }
  if (method === "referral") {
    if (type === "ad") return "转介绍虽然精准但量有限，这种方式能帮你打开新客源，不再只等老客户介绍。";
    if (type === "agency") return "转介绍量不稳定，让专业团队持续补充新客源，生意才不容易断档。";
    return "转介绍加上内容经营，能让更多潜在客户主动关注你，不再只靠圈子。";
  }
  if (method === "content") {
    if (type === "ad") return "内容获客见效慢，先快速验证哪些客户愿意买单，再反哺内容方向。";
    if (type === "agency") return "内容做得不错但转化不稳定，让专业团队帮你把获客链路串起来。";
    return "你已经有内容基础，下一步是把内容、承接和推广串成一套完整链路。";
  }
  if (method === "ads") {
    if (type === "ad") return "已经在做推广，说明方向对。下一步是优化效率，让每一块钱花得更值。";
    if (type === "agency") return "已经在做推广但效果不稳定，交给有经验的团队做精细化运营可能更合适。";
    return "已经有推广基础，下一步是把内容经营和推广结合起来，降低长期获客成本。";
  }
  return "";
}

function buildBusinessInsight() {
  if (state.answers.business === "online") return "线上经营，优先把咨询入口和承接跑顺。";
  if (state.answers.business === "offline") {
    if (state.answers.stores === "single") return "单店阶段，动作越清楚越容易持续。";
    if (state.answers.stores === "small") return "多店阶段，更看重动作能不能复制。";
    return "门店较多，需要兼顾短期线索和长期放大。";
  }
  if (state.answers.business === "mixed") return "线上线下都在做，更看重整体承接能力。";
  return "";
}

function buildAnalysisList(type) {
  const businessInsight = buildBusinessInsight();
  const ca = state.answers.contentAbility;

  if (type === "ad") {
    return [
      "当前更像先验证阶段，启动速度比完整打法更重要。",
      ca === "none"
        ? "内容还没起来，先用更直接的方式验证客户需求。"
        : ca === "weak"
          ? "有内容但不成体系，先把有效入口跑出来更实际。"
          : "有平台经验，但眼下优先验证线索和转化效率。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  if (type === "agency") {
    return [
      "核心不是你想不想做，而是自己扛执行容易断。",
      ca === "none"
        ? "内容和执行都不稳定，借助成熟团队更现实。"
        : ca === "weak"
          ? "有一些基础但没章法，先让专业团队把动作带起来。"
          : "有经验但缺稳定推进机制，交给团队起步更快。",
      businessInsight
    ].filter(Boolean).slice(0, 3);
  }

  return [
    "你已经适合把整条获客链路一起考虑。",
    ca === "experienced"
      ? "有平台内容经验，迁移到微信后可以一起放大。"
      : ca === "weak"
        ? "有一些基础，重点是把动作稳定下来。"
        : "内容能力还弱，但问题不只是缺线索，链路需要搭起来。",
    businessInsight
  ].filter(Boolean).slice(0, 3);
}

function buildActionList(type) {
  if (type === "ad") {
    return [
      state.answers.business === "online"
        ? "先把咨询入口和跟进话术整理清楚，再开始第一轮。"
        : state.answers.business === "offline"
          ? "先按门店范围和到店承接方式设计第一轮获客动作。"
          : "先分清线上咨询和线下到店两个目标，别混着跑。",
      "小范围验证哪些人群和内容更容易带来有效咨询。",
      "有第一轮反馈后，再决定加量还是补承接环节。"
    ];
  }

  if (type === "agency") {
    return [
      state.answers.business === "offline"
        ? "先把门店承接区域和跟进流程整理给执行团队。"
        : state.answers.business === "mixed"
          ? "先把线上和线下两类目标拆开，让团队分口径推进。"
          : "先把线索标准和预算范围定清楚，再开始推进。",
      "你重点盯线索质量和成交情况，执行交给团队。",
      "先跑一轮标准化测试，再决定是否继续放大。"
    ];
  }

  return [
    state.answers.business === "online"
      ? "先把内容、咨询承接和客户管理连起来。"
      : state.answers.business === "offline"
        ? "先把门店内容、到店承接和转化流程串起来。"
        : "先把线上内容、线下承接和后续跟进分工清楚。",
    "用轻量内容验证哪些表达和案例最能吸引目标客户。",
    "内容和承接稳定后，再配合推广放大效果。"
  ];
}

/* ===== 渲染结果 ===== */
function renderList(container, items) {
  container.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderResult() {
  const resultType = resolveResultType();
  const profile = resultProfiles[resultType];

  resultTypeShort.textContent = profile.shortLabel;
  resultTypeTitle.textContent = profile.title;
  resultSummaryText.textContent = buildMethodComparison(resultType);
  resultHowText.textContent = profile.how;

  renderList(traitList, buildAnalysisList(resultType));
  renderList(actionList, buildActionList(resultType));
  resultHowGap.textContent = profile.howGap;

  // 加微信区动态显示方案名
  const qrLabel = document.getElementById("qr-scheme-label");
  if (qrLabel) qrLabel.textContent = profile.schemeLabel;
}

/* ===== Loading ===== */
function startLoadingAndShowResult() {
  let loadingIndex = 0;
  loadingText.textContent = loadingMessages[loadingIndex];
  showScreen("loading");

  clearInterval(state.loadingTextTimer);
  clearTimeout(state.loadingTimer);

  state.loadingTextTimer = setInterval(() => {
    loadingIndex = (loadingIndex + 1) % loadingMessages.length;
    loadingText.textContent = loadingMessages[loadingIndex];
  }, 720);

  state.loadingTimer = setTimeout(() => {
    clearInterval(state.loadingTextTimer);
    renderResult();
    showScreen("result");
  }, 2200);
}

/* ===== Reset ===== */
function resetState() {
  state.currentQuestionIndex = 0;
  state.scores = { ad: 0, agency: 0, content: 0 };
  state.answers = {};
  state.answerPrimaries = {};
  clearInterval(state.loadingTextTimer);
  clearTimeout(state.loadingTimer);
  renderQuestion();
}

/* ===== 事件绑定 ===== */
function initEvents() {
  // 首页 → 答题
  document.querySelector('[data-action="start"]').addEventListener("click", () => {
    resetState();
    showScreen("quiz");
  });

  // 重新来
  document.querySelector('[data-action="restart"]').addEventListener("click", () => {
    resetState();
    showScreen("intro");
  });
}

/* ===== 初始化 ===== */
function init() {
  renderQuestion();
  initEvents();
}

init();
