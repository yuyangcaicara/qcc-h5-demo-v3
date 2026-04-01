/* ===== 场景化题目（去问卷感） ===== */
const questionBank = [
  {
    id: "business",
    context: "先了解一下你的生意",
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
    context: "门店规模会影响推荐",
    title: "目前几家店？",
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
    id: "currentMethod",
    context: "接下来聊聊获客",
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
    id: "participation",
    context: "最后一步",
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
  }
];

/* ===== 结果数据（前台不出现"广告""投放""代投"） ===== */
const resultProfiles = {
  ad: {
    shortLabel: "精准获客",
    emoji: "🎯",
    title: "让感兴趣的客户主动来找你",
    how: "按行业、地区、兴趣精准触达，启动快、见效快。",
    howGap: "预算分配、同行效果——报告里都有。",
    schemeLabel: "精准获客方案"
  },
  agency: {
    shortLabel: "省心获客",
    emoji: "🤝",
    title: "专业团队执行，你只管看结果",
    how: "从策略到执行全托管，你盯线索质量就行。",
    howGap: "合作模式、费用参考——报告里有说明。",
    schemeLabel: "省心获客方案"
  },
  content: {
    shortLabel: "长效获客",
    emoji: "🌱",
    title: "用内容吸引客户，越做成本越低",
    how: "搭好内容 + 客户承接体系，配合推广持续获客。",
    howGap: "内容形式、推广配合——报告里有拆解。",
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
  history: [],  // 用于回退：每步记录 { questionId, optionId, primary, scores }
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

  // 上一步按钮：第一题时隐藏
  const btnPrev = document.getElementById("btn-prev");
  if (btnPrev) {
    btnPrev.style.display = state.currentQuestionIndex === 0 ? "none" : "block";
  }

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
  // 记录历史以便回退
  state.history.push({
    questionId: question.id,
    optionId: option.id,
    primary: option.primary,
    scores: { ...option.scores }
  });

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

function goBack() {
  if (state.currentQuestionIndex === 0) {
    // 第一题回退到首页
    showScreen("intro");
    return;
  }

  // 撤销当前 index 对应的上一题的答案
  const lastEntry = state.history.pop();
  if (lastEntry) {
    delete state.answers[lastEntry.questionId];
    delete state.answerPrimaries[lastEntry.questionId];
    Object.entries(lastEntry.scores).forEach(([type, value]) => {
      state.scores[type] -= value;
    });
  }

  state.currentQuestionIndex -= 1;
  renderQuestion();
}

/* ===== 结果计算 ===== */
function resolveResultType() {
  const entries = Object.entries(state.scores);
  const maxScore = Math.max(...entries.map(([, s]) => s));
  const candidates = entries.filter(([, s]) => s === maxScore).map(([t]) => t);

  if (candidates.length === 1) return candidates[0];

  const tieBreakOrder = [
    state.answerPrimaries.business,
    state.answerPrimaries.stores,
    state.answerPrimaries.contentAbility,
    state.answerPrimaries.currentMethod,
    state.answerPrimaries.goal,
    state.answerPrimaries.participation
  ];

  for (const t of tieBreakOrder) {
    if (t && candidates.includes(t)) return t;
  }

  return candidates[0];
}

function buildMethodComparison(type) {
  const method = state.answers.currentMethod;
  if (method === "coldcall") {
    if (type === "ad") return "比一个个打电话高效得多——让客户主动找上门。";
    if (type === "agency") return "不再靠人力硬扛，让专业团队系统化帮你获客。";
    return "一条好内容可能带来一批客户，比一对一效率高很多。";
  }
  if (method === "referral") {
    if (type === "ad") return "转介绍量有限，这能帮你打开全新客源。";
    if (type === "agency") return "转介绍不稳定，专业团队能持续补充新客源。";
    return "转介绍 + 内容经营，让更多人主动关注你。";
  }
  if (method === "content") {
    if (type === "ad") return "内容见效慢，先快速验证哪些客户愿意买单。";
    if (type === "agency") return "内容不错但转化不稳，让专业团队把链路串起来。";
    return "你有内容基础，下一步是串成完整获客链路。";
  }
  if (method === "ads") {
    if (type === "ad") return "方向对，下一步是优化效率，让每块钱更值。";
    if (type === "agency") return "效果不稳定，交给有经验的团队做精细化运营。";
    return "推广 + 内容结合，能降低长期获客成本。";
  }
  return "";
}

function buildBusinessInsight() {
  if (state.answers.business === "online") return "线上经营，重点跑顺咨询入口";
  if (state.answers.business === "offline") {
    if (state.answers.stores === "single") return "单店，动作越简单越好执行";
    if (state.answers.stores === "small") return "多店，关键是动作能复制";
    return "门店多，短期线索和长期放大都要顾";
  }
  if (state.answers.business === "mixed") return "线上线下都做，重点是整体承接";
  return "";
}

function buildAnalysisList(type) {
  const businessInsight = buildBusinessInsight();
  const ca = state.answers.contentAbility;

  if (type === "ad") {
    return [
      "现阶段启动速度 > 完整打法",
      ca === "none" ? "没内容基础，先用直接方式验证需求" : ca === "weak" ? "内容不成体系，先跑通有效入口" : "有经验，但先验证线索转化效率",
      businessInsight
    ].filter(Boolean);
  }

  if (type === "agency") {
    return [
      "自己扛执行容易断档",
      ca === "none" ? "内容和执行都不稳，借助成熟团队更现实" : ca === "weak" ? "有基础没章法，让专业团队带起来" : "有经验但缺稳定机制，交给团队更快",
      businessInsight
    ].filter(Boolean);
  }

  return [
    "适合把整条获客链路一起搭",
    ca === "experienced" ? "有内容经验，迁移到微信可以放大" : ca === "weak" ? "有基础，重点让动作稳定下来" : "内容能力还弱，但链路需要先搭起来",
    businessInsight
  ].filter(Boolean);
}

function buildActionList(type) {
  if (type === "ad") {
    return [
      state.answers.business === "online"
        ? "整理好咨询入口和跟进话术"
        : state.answers.business === "offline"
          ? "按门店范围设计第一轮获客动作"
          : "分清线上咨询和线下到店两个目标",
      "小范围测试，看哪些人群转化好",
      "有反馈后再决定加量还是补环节"
    ];
  }

  if (type === "agency") {
    return [
      state.answers.business === "offline"
        ? "把门店区域和跟进流程整理给团队"
        : state.answers.business === "mixed"
          ? "线上线下目标拆开，让团队分口径推"
          : "定清线索标准和预算范围",
      "你盯线索质量和成交，执行交给团队",
      "先跑一轮测试，再决定是否放大"
    ];
  }

  return [
    state.answers.business === "online"
      ? "把内容、咨询承接和客户管理连起来"
      : state.answers.business === "offline"
        ? "把门店内容、到店承接和转化串起来"
        : "分清线上内容和线下承接的分工",
    "用轻量内容验证什么最吸引目标客户",
    "稳定后配合推广放大效果"
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

  // 更新 hero emoji
  const heroEmoji = document.getElementById("result-hero-emoji");
  if (heroEmoji) heroEmoji.textContent = profile.emoji;

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
    try {
      renderResult();
    } catch (e) {
      console.error("renderResult error:", e);
    }
    showScreen("result");
  }, 2200);
}

/* ===== Reset ===== */
function resetState() {
  state.currentQuestionIndex = 0;
  state.scores = { ad: 0, agency: 0, content: 0 };
  state.answers = {};
  state.answerPrimaries = {};
  state.history = [];
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

  // 上一步
  document.getElementById("btn-prev").addEventListener("click", goBack);

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
