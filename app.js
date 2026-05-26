const storageKey = "aiwardrobe-chat-prototype-v3";

const wardrobeCatalog = [
  {
    id: "top-001",
    name: "象牙针织短袖",
    category: "上装",
    colors: ["#efe5d4", "#7d9a89"],
    scenes: ["约会", "周末", "通勤"],
    moods: ["松弛", "温柔", "精致"],
    temp: [18, 28],
    tags: ["柔软", "浅色", "可叠穿"],
    formality: 3
  },
  {
    id: "top-002",
    name: "雾蓝衬衫",
    category: "上装",
    colors: ["#aebfd0", "#496b89"],
    scenes: ["通勤", "晚餐"],
    moods: ["利落", "精致"],
    temp: [16, 26],
    tags: ["挺括", "冷色", "干净"],
    formality: 4
  },
  {
    id: "top-003",
    name: "条纹棉质上衣",
    category: "上装",
    colors: ["#f7f1e8", "#3f4f66"],
    scenes: ["周末", "约会"],
    moods: ["松弛", "明亮"],
    temp: [18, 30],
    tags: ["休闲", "亲和", "轻薄"],
    formality: 2
  },
  {
    id: "top-004",
    name: "黑色修身背心",
    category: "上装",
    colors: ["#202126", "#6c6d73"],
    scenes: ["晚餐", "周末"],
    moods: ["精致", "利落"],
    temp: [22, 34],
    tags: ["显瘦", "内搭", "酷感"],
    formality: 3
  },
  {
    id: "bottom-001",
    name: "炭灰直筒裤",
    category: "下装",
    colors: ["#464950", "#22252b"],
    scenes: ["通勤", "晚餐", "约会"],
    moods: ["利落", "精致"],
    temp: [8, 27],
    tags: ["修饰腿型", "稳重", "百搭"],
    formality: 4
  },
  {
    id: "bottom-002",
    name: "浅卡其半裙",
    category: "下装",
    colors: ["#cbb993", "#836f4f"],
    scenes: ["约会", "周末"],
    moods: ["温柔", "松弛", "精致"],
    temp: [18, 30],
    tags: ["柔和", "中长款", "轻盈"],
    formality: 3
  },
  {
    id: "bottom-003",
    name: "深靛牛仔裤",
    category: "下装",
    colors: ["#28425e", "#102033"],
    scenes: ["周末", "约会"],
    moods: ["松弛", "明亮"],
    temp: [10, 28],
    tags: ["耐穿", "休闲", "显年轻"],
    formality: 2
  },
  {
    id: "outer-001",
    name: "鼠尾草薄风衣",
    category: "外套",
    colors: ["#9eaa91", "#56684e"],
    scenes: ["通勤", "约会", "周末"],
    moods: ["松弛", "利落"],
    temp: [13, 23],
    tags: ["防小雨", "轻外套", "层次"],
    formality: 3
  },
  {
    id: "outer-002",
    name: "海军蓝西装",
    category: "外套",
    colors: ["#1f314a", "#536985"],
    scenes: ["通勤", "晚餐"],
    moods: ["利落", "精致"],
    temp: [12, 22],
    tags: ["正式", "挺括", "压场"],
    formality: 5
  },
  {
    id: "dress-001",
    name: "墨绿针织连衣裙",
    category: "连衣裙",
    colors: ["#263f35", "#6f8b73"],
    scenes: ["约会", "晚餐"],
    moods: ["精致", "温柔"],
    temp: [16, 25],
    tags: ["一件式", "收腰", "气质"],
    formality: 4
  },
  {
    id: "shoes-001",
    name: "黑色乐福鞋",
    category: "鞋",
    colors: ["#222222", "#66615b"],
    scenes: ["通勤", "约会", "晚餐"],
    moods: ["利落", "精致"],
    temp: [0, 30],
    tags: ["防滑", "稳定", "轻正式"],
    formality: 4
  },
  {
    id: "shoes-002",
    name: "米白低帮鞋",
    category: "鞋",
    colors: ["#eee7d8", "#b9ab91"],
    scenes: ["周末", "约会"],
    moods: ["松弛", "明亮"],
    temp: [5, 32],
    tags: ["舒适", "浅色", "步行友好"],
    formality: 2
  },
  {
    id: "bag-001",
    name: "焦糖小肩包",
    category: "包",
    colors: ["#a85d3a", "#6d3924"],
    scenes: ["约会", "晚餐", "周末"],
    moods: ["精致", "明亮"],
    temp: [0, 35],
    tags: ["暖色点缀", "小容量", "造型感"],
    formality: 3
  }
];

const inspirationItems = [
  {
    id: "insp-001",
    name: "奶油色短款夹克",
    category: "灵感外套",
    colors: ["#f1eadc", "#c9b58f"],
    tags: ["非衣柜", "轻复古", "约会"],
    formality: 3
  },
  {
    id: "insp-002",
    name: "银灰细跟短靴",
    category: "灵感鞋",
    colors: ["#a8adb3", "#dadde0"],
    tags: ["非衣柜", "晚餐", "精致"],
    formality: 4
  }
];

const outfitExamples = [
  {
    id: "ex-014",
    title: "小雨约会的浅色针织与薄风衣",
    scenes: ["约会"],
    moods: ["松弛", "温柔"],
    weather: ["小雨", "多云"],
    temp: [17, 23],
    tags: ["浅色内搭", "轻外套", "暖色配饰"]
  },
  {
    id: "ex-027",
    title: "通勤感衬衫和直筒裤",
    scenes: ["通勤"],
    moods: ["利落", "精致"],
    weather: ["晴", "多云", "小雨"],
    temp: [16, 26],
    tags: ["冷色上衣", "深色下装", "正式度中高"]
  },
  {
    id: "ex-051",
    title: "周末条纹上衣与牛仔裤",
    scenes: ["周末", "约会"],
    moods: ["松弛", "明亮"],
    weather: ["晴", "多云"],
    temp: [18, 30],
    tags: ["亲和", "休闲", "步行友好"]
  },
  {
    id: "ex-073",
    title: "晚餐连衣裙与深色鞋包",
    scenes: ["晚餐", "约会"],
    moods: ["精致", "温柔"],
    weather: ["晴", "多云"],
    temp: [15, 24],
    tags: ["一件式", "深色基底", "小包点缀"]
  },
  {
    id: "ex-096",
    title: "降温天的西装叠穿",
    scenes: ["通勤", "晚餐"],
    moods: ["利落"],
    weather: ["降温", "多云"],
    temp: [10, 18],
    tags: ["外套", "层次", "正式"]
  },
  {
    id: "ex-118",
    title: "轻松精致的半裙组合",
    scenes: ["约会", "周末"],
    moods: ["松弛", "精致"],
    weather: ["晴", "小雨", "多云"],
    temp: [18, 27],
    tags: ["半裙", "低饱和", "柔和比例"]
  }
];

const catalogById = new Map(wardrobeCatalog.map((item) => [item.id, item]));

const defaultUsers = [
  {
    id: "user-1",
    name: "用户1",
    wardrobeIds: [
      "top-001",
      "top-002",
      "bottom-001",
      "bottom-002",
      "outer-001",
      "dress-001",
      "shoes-001",
      "shoes-002",
      "bag-001"
    ],
    history: [
      {
        role: "assistant",
        text: "欢迎回来。你之前更偏好松弛、低饱和、约会可穿的组合，我会优先用这些信号。"
      },
      {
        role: "user",
        text: "今天小雨，晚上约会，想轻松一点但不要太随便。"
      },
      {
        role: "assistant",
        text:
          "我按小雨、20度、约会、松弛来搭配，也参考了你之前偏好的低饱和和浅色组合。\n\n方案一：用 top-001 象牙针织短袖、bottom-002 浅卡其半裙、outer-001 鼠尾草薄风衣、shoes-002 米白低帮鞋、bag-001 焦糖小肩包。这套最适合小雨约会，外套解决温差，浅色内搭和半裙让整体轻松但完整。\n\n方案二：用 dress-001 墨绿针织连衣裙、outer-001 鼠尾草薄风衣、shoes-002 米白低帮鞋、bag-001 焦糖小肩包。它更省心，也更有精致感。\n\n方案三：用 top-002 雾蓝衬衫、bottom-001 炭灰直筒裤、shoes-001 黑色乐福鞋、bag-001 焦糖小肩包。这套更利落，适合约会前后还要处理一点正式事务。"
      }
    ]
  },
  {
    id: "user-2",
    name: "用户2",
    wardrobeIds: [
      "top-002",
      "top-003",
      "top-004",
      "bottom-001",
      "bottom-003",
      "outer-002",
      "shoes-001",
      "bag-001"
    ],
    history: [
      {
        role: "assistant",
        text: "欢迎回来。你之前更常选择通勤、利落、深色基底和正式度偏高的穿搭。"
      }
    ]
  }
];

const state = {
  activeUserId: "user-1",
  occasion: "无",
  mood: "无",
  mode: "closet",
  users: structuredClone(defaultUsers),
  lastRun: null
};

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.users) && saved.users.length) {
      state.users = saved.users;
      state.activeUserId = saved.activeUserId || saved.users[0].id;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      users: state.users,
      activeUserId: state.activeUserId
    })
  );
}

function activeUser() {
  return state.users.find((user) => user.id === state.activeUserId) || state.users[0];
}

function activeWardrobe() {
  return activeUser()
    .wardrobeIds.map((id) => catalogById.get(id))
    .filter(Boolean);
}

function normalizeValue(value) {
  const clean = String(value ?? "").trim();
  return clean || "无";
}

function getIntent() {
  const tempRaw = document.querySelector("#tempInput").value;
  return {
    city: normalizeValue(document.querySelector("#cityInput").value),
    temp: tempRaw === "" ? null : Number(tempRaw),
    weather: document.querySelector("#weatherInput").value,
    occasion: state.occasion,
    mood: state.mood,
    mode: state.mode,
    freeText: normalizeValue(document.querySelector("#messageInput").value)
  };
}

function mergeIntentWithMessage(intent, message) {
  const text = message || "";
  const next = { ...intent, freeText: normalizeValue(message) };
  if (next.weather === "无") {
    ["小雨", "晴", "多云", "降温", "闷热"].some((item) => {
      if (text.includes(item)) {
        next.weather = item;
        return true;
      }
      return false;
    });
  }
  if (next.occasion === "无") {
    ["通勤", "约会", "周末", "晚餐"].some((item) => {
      if (text.includes(item)) {
        next.occasion = item;
        return true;
      }
      return false;
    });
  }
  if (next.mood === "无") {
    ["松弛", "精致", "明亮", "利落", "温柔"].some((item) => {
      if (text.includes(item)) {
        next.mood = item;
        return true;
      }
      return false;
    });
  }
  const tempMatch = text.match(/(-?\d{1,2})\s*(度|℃)/);
  if (next.temp === null && tempMatch) next.temp = Number(tempMatch[1]);
  return next;
}

function withinTemp(range, temp) {
  if (temp === null || Number.isNaN(temp)) return false;
  return temp >= range[0] && temp <= range[1];
}

function derivePreferenceSignals(user) {
  const text = user.history.map((message) => message.text).join(" ");
  const candidates = [
    "松弛",
    "精致",
    "明亮",
    "利落",
    "温柔",
    "通勤",
    "约会",
    "周末",
    "晚餐",
    "浅色",
    "深色",
    "低饱和",
    "正式",
    "舒适",
    "半裙",
    "牛仔",
    "西装",
    "外套"
  ];
  const counts = candidates
    .map((word) => ({
      word,
      count: (text.match(new RegExp(word, "g")) || []).length
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word));
  return counts.slice(0, 8);
}

function scoreEntity(entity, intent, preferences) {
  let score = 0;
  if (intent.temp !== null && entity.temp && withinTemp(entity.temp, intent.temp)) score += 2.4;
  if (intent.occasion !== "无" && entity.scenes?.includes(intent.occasion)) score += 2.2;
  if (intent.mood !== "无" && entity.moods?.includes(intent.mood)) score += 1.5;
  if (intent.weather !== "无" && entity.weather?.includes(intent.weather)) score += 1;
  if (intent.weather.includes("雨") && entity.tags?.some((tag) => tag.includes("防"))) score += 1.1;
  if (intent.mood === "精致" && entity.formality >= 4) score += 0.8;
  if (intent.mood === "松弛" && entity.formality <= 3) score += 0.6;

  const haystack = [entity.name, entity.category, ...(entity.tags || []), ...(entity.scenes || []), ...(entity.moods || [])].join(" ");
  preferences.forEach((pref) => {
    if (haystack.includes(pref.word)) score += Math.min(1.2, pref.count * 0.25);
  });
  if (intent.freeText !== "无") {
    entity.tags?.forEach((tag) => {
      if (intent.freeText.includes(tag)) score += 0.35;
    });
  }
  return score;
}

function pickBest(category, wardrobe, intent, preferences, excluded = []) {
  return wardrobe
    .filter((item) => item.category === category && !excluded.includes(item.id))
    .map((item) => ({ item, score: scoreEntity(item, intent, preferences) }))
    .sort((a, b) => b.score - a.score)[0]?.item;
}

function pickAlt(category, wardrobe, intent, preferences, excluded = []) {
  const ranked = wardrobe
    .filter((item) => item.category === category && !excluded.includes(item.id))
    .map((item) => ({ item, score: scoreEntity(item, intent, preferences) }))
    .sort((a, b) => b.score - a.score);
  return ranked[1]?.item || ranked[0]?.item;
}

function retrieveExamples(intent, preferences) {
  return outfitExamples
    .map((example) => ({
      ...example,
      score: scoreEntity(example, intent, preferences)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function buildOutfits(intent, user) {
  const preferences = derivePreferenceSignals(user);
  const wardrobe = activeWardrobe();
  const top = pickBest("上装", wardrobe, intent, preferences);
  const bottom = pickBest("下装", wardrobe, intent, preferences);
  const outer = pickBest("外套", wardrobe, intent, preferences);
  const shoes = pickBest("鞋", wardrobe, intent, preferences);
  const bag = pickBest("包", wardrobe, intent, preferences);
  const dress = pickBest("连衣裙", wardrobe, intent, preferences);

  const altTop = pickAlt("上装", wardrobe, intent, preferences, [top?.id]);
  const altBottom = pickAlt("下装", wardrobe, intent, preferences, [bottom?.id]);
  const casualShoes = pickAlt("鞋", wardrobe, intent, preferences, [shoes?.id]);

  const temp = intent.temp ?? 20;
  const needOuter = temp <= 22 || intent.weather.includes("雨") || intent.weather === "降温";

  const outfits = [
    {
      id: "look-1",
      title: "衣柜优先方案",
      source: "owned",
      items: [top, bottom, needOuter ? outer : null, shoes, bag].filter(Boolean),
      confidence: 0.86
    },
    {
      id: "look-2",
      title: dress && intent.occasion !== "通勤" ? "一件式备选" : "更利落的备选",
      source: "owned",
      items:
        dress && intent.occasion !== "通勤"
          ? [dress, needOuter ? outer : null, shoes, bag].filter(Boolean)
          : [altTop, altBottom, outer, shoes].filter(Boolean),
      confidence: 0.8
    },
    {
      id: "look-3",
      title: intent.mode === "inspiration" ? "加入灵感单品" : "轻松版本",
      source: intent.mode === "inspiration" ? "mixed" : "owned",
      items:
        intent.mode === "inspiration"
          ? [altTop || top, altBottom || bottom, inspirationItems[0], casualShoes || shoes, bag].filter(Boolean)
          : [altTop || top, altBottom || bottom, casualShoes || shoes, bag].filter(Boolean),
      confidence: intent.mode === "inspiration" ? 0.74 : 0.77
    }
  ];

  return outfits.map((outfit) => ({
    ...outfit,
    items: outfit.items.filter(Boolean)
  }));
}

function validateOutfit(outfit, user) {
  const ownedIds = new Set(user.wardrobeIds);
  const missing = outfit.items.filter((item) => !ownedIds.has(item.id) && !item.id.startsWith("insp-"));
  const inspiration = outfit.items.filter((item) => item.id.startsWith("insp-"));
  const unknownOwned = outfit.source === "owned" && inspiration.length > 0;
  return {
    ok: missing.length === 0 && !unknownOwned,
    missing,
    inspiration
  };
}

function itemIds(items) {
  return items.map((item) => `${item.id} ${item.name}`).join("、");
}

function naturalLanguageAnswer(intent, outfits, user, examples, preferences) {
  const weatherPart = intent.weather === "无" ? "没有指定天气" : `${intent.weather}`;
  const tempPart = intent.temp === null ? "没有指定温度" : `${intent.temp}度`;
  const occasionPart = intent.occasion === "无" ? "日常场景" : intent.occasion;
  const moodPart = intent.mood === "无" ? "不过度限定风格" : intent.mood;
  const prefText = preferences.length ? `我也参考了 ${user.name} 历史聊天里的偏好：${preferences.map((p) => p.word).join("、")}。` : "";

  const lines = [
    `我按 ${weatherPart}、${tempPart}、${occasionPart}、${moodPart} 来搭配。${prefText}`,
    "",
    `方案一：${outfits[0].title}。建议用 ${itemIds(outfits[0].items)}。这套最稳，优先解决天气和场合，不会引入衣柜外的单品。`,
    "",
    `方案二：${outfits[1].title}。建议用 ${itemIds(outfits[1].items)}。这套更适合你想稍微精致一点的时候，整体轮廓更完整。`,
    "",
    `方案三：${outfits[2].title}。建议用 ${itemIds(outfits[2].items)}。${
      outfits[2].source === "mixed"
        ? "其中 insp-001 是灵感单品，不属于当前衣柜，我会明确标出来。"
        : "这套更轻松，适合之后还要走路或转场。"
    }`,
    "",
    `检索参考样例：${examples.map((example) => example.id).join("、")}。`
  ];
  return lines.join("\n");
}

function runRecommendation(message) {
  const user = activeUser();
  const intent = mergeIntentWithMessage(getIntent(), message);
  const preferences = derivePreferenceSignals(user);
  const examples = retrieveExamples(intent, preferences);
  const outfits = buildOutfits(intent, user);
  const answer = naturalLanguageAnswer(intent, outfits, user, examples, preferences);
  const validation = outfits.map((outfit) => validateOutfit(outfit, user));

  user.history.push({ role: "user", text: message, createdAt: new Date().toISOString() });
  user.history.push({ role: "assistant", text: answer, createdAt: new Date().toISOString() });
  state.lastRun = { intent, examples, outfits, validation, preferences };
  saveState();
  render();
}

function renderUsers() {
  document.querySelector("#userTabs").innerHTML = state.users
    .map(
      (user) => `
        <button type="button" data-user-id="${user.id}" class="${user.id === state.activeUserId ? "active" : ""}">
          ${user.name}
        </button>
      `
    )
    .join("");
  const user = activeUser();
  document.querySelector("#activeUserBadge").textContent = `${user.name} · ${user.wardrobeIds.length} 件衣柜 · ${user.history.length} 条历史`;
}

function renderCloset() {
  const wardrobe = activeWardrobe();
  document.querySelector("#closetRail").innerHTML = wardrobe
    .map(
      (item) => `
        <div class="closet-tile">
          <div class="thumb" style="--c1:${item.colors[0]}; --c2:${item.colors[1]}"></div>
          <small>${item.id}</small>
          <strong>${item.name}</strong>
        </div>
      `
    )
    .join("");
  document.querySelector("#closetCount").textContent = wardrobe.length;
}

function renderChat() {
  const user = activeUser();
  const messages = user.history;
  document.querySelector("#chatMessages").innerHTML = messages
    .map(
      (message) => `
        <article class="message ${message.role}">
          <div class="message-role">${message.role === "user" ? user.name : "AIWardrobe"}</div>
          <p>${escapeHtml(message.text).replace(/\n/g, "<br>")}</p>
        </article>
      `
    )
    .join("");
  const box = document.querySelector("#chatMessages");
  box.scrollTop = box.scrollHeight;
}

function renderEvidence() {
  const user = activeUser();
  const preferences = state.lastRun?.preferences || derivePreferenceSignals(user);
  const latestUserMessage = [...user.history].reverse().find((message) => message.role === "user")?.text || "";
  const previewIntent = latestUserMessage ? mergeIntentWithMessage(getIntent(), latestUserMessage) : getIntent();
  const intent = state.lastRun?.intent || previewIntent;
  const examples = state.lastRun?.examples || retrieveExamples(intent, preferences);
  const outfits = state.lastRun?.outfits || (latestUserMessage ? buildOutfits(intent, user) : []);
  const validation =
    state.lastRun?.validation || (outfits.length ? outfits.map((outfit) => validateOutfit(outfit, user)) : []);

  document.querySelector("#preferenceList").innerHTML = preferences.length
    ? preferences.map((pref) => `<span class="match-tag">${pref.word} ×${pref.count}</span>`).join("")
    : `<span class="match-tag">暂无历史偏好</span>`;

  document.querySelector("#exampleList").innerHTML = examples
    .map(
      (example) => `
        <div class="example-row">
          <strong>${example.id} · ${example.title}</strong>
          <div class="tag-row">
            ${example.tags.map((tag) => `<span class="match-tag">${tag}</span>`).join("")}
          </div>
        </div>
      `
    )
    .join("");

  document.querySelector("#validationList").innerHTML = outfits.length
    ? outfits
        .map((outfit, index) => {
          const result = validation[index];
          const message =
            result.inspiration.length > 0
              ? `${result.inspiration.map((item) => item.id).join("、")} 标为非衣柜灵感。`
              : "所有衣物编号都属于当前用户衣柜。";
          return `
            <div class="validation-row">
              <span class="check-dot">${result.ok ? "✓" : "!"}</span>
              <div>
                <strong>${outfit.title}</strong>
                <p>${message}</p>
              </div>
            </div>
          `;
        })
        .join("")
    : `<div class="validation-row"><span class="check-dot">i</span><div><strong>等待对话</strong><p>生成搭配后会校验衣物编号。</p></div></div>`;

  const context = {
    user: {
      id: user.id,
      name: user.name,
      wardrobe_ids: user.wardrobeIds,
      history_as_preference: preferences.map((pref) => pref.word)
    },
    intent,
    retrieved_examples: examples.map((example) => example.id),
    output_contract: {
      style: "自然语言 + 具体衣物编号",
      closet_mode: "只能使用当前用户 wardrobe_ids",
      inspiration_mode: "非衣柜单品必须标为 insp-*"
    }
  };
  document.querySelector("#promptPreview").textContent = JSON.stringify(context, null, 2);
}

function render() {
  renderUsers();
  renderCloset();
  renderChat();
  renderEvidence();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function bindControls() {
  document.querySelector("#userTabs").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-user-id]");
    if (!button) return;
    state.activeUserId = button.dataset.userId;
    state.lastRun = null;
    saveState();
    render();
  });

  document.querySelector("#newUserButton").addEventListener("click", () => {
    const nextIndex = state.users.length + 1;
    const name = window.prompt("新用户名称", `用户${nextIndex}`);
    if (!name) return;
    const id = `user-${Date.now()}`;
    state.users.push({
      id,
      name: name.trim(),
      wardrobeIds: ["top-001", "bottom-003", "outer-001", "shoes-002", "bag-001"],
      history: [{ role: "assistant", text: "新用户已创建。之后的聊天记录会作为你的偏好记忆。" }]
    });
    state.activeUserId = id;
    state.lastRun = null;
    saveState();
    render();
  });

  document.querySelector("#renameUserButton").addEventListener("click", () => {
    const user = activeUser();
    const name = window.prompt("重命名用户", user.name);
    if (!name) return;
    user.name = name.trim();
    saveState();
    render();
  });

  document.querySelector("#clearHistoryButton").addEventListener("click", () => {
    const user = activeUser();
    if (!window.confirm(`清空 ${user.name} 的聊天历史？`)) return;
    user.history = [{ role: "assistant", text: "历史已清空。新的聊天会重新形成偏好记忆。" }];
    state.lastRun = null;
    saveState();
    render();
  });

  document.querySelectorAll(".segmented").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      group.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      state[group.dataset.control] = button.dataset.value;
      renderEvidence();
    });
  });

  ["#cityInput", "#tempInput", "#weatherInput"].forEach((selector) => {
    document.querySelector(selector).addEventListener("input", renderEvidence);
    document.querySelector(selector).addEventListener("change", renderEvidence);
  });

  document.querySelector("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector("#messageInput");
    const message = input.value.trim();
    if (!message) return;
    runRecommendation(message);
    input.value = "";
  });
}

loadState();
bindControls();
render();
