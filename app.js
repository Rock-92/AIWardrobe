const storageKey = "aiwardrobe-chat-prototype-v6";
const visualPromptVersion = "outfit-framing-v4";

const wardrobeCatalog = [
  {
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

const outfitExamples = [];

const catalogByName = new Map(wardrobeCatalog.map((item) => [item.name, item]));

function placeholderWardrobeImage(name, colors = ["#edf1f4", "#8b98a5"]) {
  const label = String(name || "衣物").slice(0, 5);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 256">',
    '<defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">',
    '<stop offset="0" stop-color="' + (colors[0] || "#edf1f4") + '"/>',
    '<stop offset="1" stop-color="' + (colors[1] || "#8b98a5") + '"/>',
    '</linearGradient></defs>',
    '<rect width="320" height="256" rx="18" fill="url(#bg)"/>',
    '<path d="M116 64h48l16 24 16-24h48l32 46-34 30-18-21v90H96v-90l-18 21-34-30 32-46z" fill="rgba(255,255,255,.52)" stroke="rgba(255,255,255,.78)" stroke-width="5"/>',
    '<text x="160" y="228" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="rgba(32,37,43,.78)">' + label + '</text>',
    '</svg>'
  ].join("");
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function imageForWardrobeName(name) {
  const catalogItem = catalogByName.get(name);
  return placeholderWardrobeImage(name, catalogItem?.colors || ["#edf1f4", "#8b98a5"]);
}

function normalizeWardrobeItem(item) {
  if (typeof item === "string") {
    const name = item.trim();
    return name ? { name, image: imageForWardrobeName(name) } : null;
  }
  if (!item || typeof item !== "object") return null;
  const name = String(item.name || "").trim();
  if (!name) return null;
  return {
    name,
    description: item.description || "",
    image: item.image || imageForWardrobeName(name),
    imageSource: item.imageSource || "",
    imagePath: item.imagePath || ""
  };
}

function createWardrobeItems(names) {
  return names.map((name) => normalizeWardrobeItem(name)).filter(Boolean);
}

function wardrobeItemName(item) {
  return typeof item === "string" ? item : item?.name;
}

function wardrobeEntryToRecommendationItem(entry) {
  const catalogItem = catalogByName.get(entry.name);
  return {
    ...(catalogItem || {
      name: entry.name,
      category: "衣物",
      colors: ["#edf1f4", "#8b98a5"],
      scenes: [],
      moods: [],
      temp: [0, 40],
      tags: ["用户导入"],
      formality: 3
    }),
    name: entry.name,
    description: entry.description || "",
    image: entry.image || imageForWardrobeName(entry.name),
    imageSource: entry.imageSource || "",
    imagePath: entry.imagePath || ""
  };
}

function createUserProfile({
  gender,
  preferredStyles = ["无"],
  preferredItems = ["无"],
  preferredColors = ["无"]
}) {
  return {
    gender,
    preferredStyles,
    preferredItems,
    preferredColors,
    createdAt: new Date().toISOString()
  };
}

function createPreferenceMemory() {
  return {
    likes: [],
    dislikes: [],
    contextualPreferences: [],
    updatedAt: null
  };
}

const defaultUsers = [
  {
    id: "user-1",
    name: "小美",
    profile: createUserProfile({
      gender: "女",
      preferredStyles: ["松弛", "温柔", "甜美约会"],
      preferredItems: ["针织", "半身裙"],
      preferredColors: ["浅色", "低饱和"]
    }),
    preferenceMemory: createPreferenceMemory(),
    wardrobeItems: createWardrobeItems([
      "象牙针织短袖",
      "雾蓝衬衫",
      "炭灰直筒裤",
      "浅卡其半裙",
      "鼠尾草薄风衣",
      "墨绿针织连衣裙",
      "黑色乐福鞋",
      "米白低帮鞋",
      "焦糖小肩包"
    ]),
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
          "你好！针对今天小雨、20度、晚上约会、想轻松但不要太随便的需求，我给你搭了 3 套低饱和、好落地的方案：\n\n方案一【温柔松弛约会】：使用 象牙针织短袖(#1)、浅卡其半裙(#4)、鼠尾草薄风衣(#5)、米白低帮鞋(#8)、焦糖小肩包(#9)。浅色内搭和半裙会显得柔和，薄风衣能应对小雨和晚间温差，整体轻松但不随便。\n\n方案二【一件式精致备选】：使用 墨绿针织连衣裙(#6)、鼠尾草薄风衣(#5)、米白低帮鞋(#8)、焦糖小肩包(#9)。连衣裙省心又有完整度，适合约会时想多一点精致感。\n\n方案三【利落清爽转场】：使用 雾蓝衬衫(#2)、炭灰直筒裤(#3)、黑色乐福鞋(#7)、焦糖小肩包(#9)。衬衫和直筒裤更干净利落，适合约会前后还要通勤或处理一点正式事务。\n\n参考样例：我参考了 sample-* 里低饱和、约会、轻通勤的配色和层次组合。\n\n温馨提示：鼠尾草薄风衣(#5)更适合小雨，雨势变大时记得带伞；浅卡其半裙(#4)容易被打湿，雨大可以换成长裤。"
      }
    ]
  },
  {
    id: "user-2",
    name: "ljly",
    profile: createUserProfile({
      gender: "男",
      preferredStyles: ["通勤利落", "日常休闲"],
      preferredItems: ["衬衫", "西装外套", "牛仔裤"],
      preferredColors: ["深色", "黑白灰"]
    }),
    preferenceMemory: createPreferenceMemory(),
    wardrobeItems: createWardrobeItems([
      "雾蓝衬衫",
      "条纹棉质上衣",
      "黑色修身背心",
      "炭灰直筒裤",
      "深靛牛仔裤",
      "海军蓝西装",
      "黑色乐福鞋",
      "焦糖小肩包"
    ]),
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
  lastRun: null,
  profileDialogMode: "create",
  pendingReply: null,
  requestPanelCollapsed: false,
  evidenceCollapsed: {
    examples: false,
    validation: false,
    prompt: false
  },
  memoryEditMode: false,
  profileMemoryEditMode: false,
  closetEditMode: false,
  closetSearchQuery: "",
  addingWardrobeItem: false,
  editingWardrobeIndex: null,
  pendingWardrobeImage: "",
  pendingWardrobeImageChanged: false,
  pendingWardrobeName: "",
  wardrobeGeneratedItem: null,
  wardrobeGenerationKind: "",
  wardrobeRegenerateMode: false,
  wardrobeRegeneratePrompt: "",
  wardrobeAddNotice: "",
  wardrobeAddedMessage: "",
  closetSaving: false,
  visualizingOutfit: false,
  visualResult: null,
  visualBusy: false,
  visualNotice: ""
};

const blockedMemoryTerms = ["忽略规则", "忽略之前", "系统提示", "system prompt", "越狱", "破解"];
const negativeIntentPatterns = ["不要", "不喜欢", "别", "避免", "拒绝", "不想", "讨厌"];
const maxPreferenceConfidence = 1;

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.users) && saved.users.length) {
      state.users = saved.users.map(normalizeUser);
      state.activeUserId = saved.activeUserId || saved.users[0].id;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function normalizeUser(user) {
  const migratedName =
    user.id === "user-1" && user.name === "用户1" ? "小美" : user.id === "user-2" && user.name === "用户2" ? "ljly" : user.name;
  return {
    ...user,
    name: migratedName,
    profile:
      user.profile ||
      createUserProfile({
        gender: "女",
        preferredStyles: ["无"],
        preferredItems: ["无"],
          preferredColors: ["无"]
        }),
    preferenceMemory: {
      ...createPreferenceMemory(),
      ...(user.preferenceMemory || {})
    },
    wardrobeItems: Array.isArray(user.wardrobeItems) ? user.wardrobeItems.map(normalizeWardrobeItem).filter(Boolean) : [],
    history: Array.isArray(user.history) ? user.history : []
  };
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

function resetWardrobeEditorState() {
  state.addingWardrobeItem = false;
  state.editingWardrobeIndex = null;
  state.pendingWardrobeImage = "";
  state.pendingWardrobeImageChanged = false;
  state.pendingWardrobeName = "";
  state.wardrobeGeneratedItem = null;
  state.wardrobeGenerationKind = "";
  state.wardrobeRegenerateMode = false;
  state.wardrobeRegeneratePrompt = "";
  state.wardrobeAddNotice = "";
  state.wardrobeAddedMessage = "";
  state.closetSaving = false;
}

function openWardrobeAddPanel() {
  resetWardrobeEditorState();
  state.addingWardrobeItem = true;
}

function openWardrobeEditPanel(index) {
  const item = activeUser().wardrobeItems?.[index];
  if (!item) return;
  state.addingWardrobeItem = true;
  state.editingWardrobeIndex = index;
  state.pendingWardrobeImage = item.image || "";
  state.pendingWardrobeImageChanged = false;
  state.pendingWardrobeName = wardrobeItemName(item) || "";
  state.wardrobeGeneratedItem = null;
  state.wardrobeGenerationKind = "";
  state.wardrobeRegenerateMode = false;
  state.wardrobeRegeneratePrompt = "";
  state.wardrobeAddNotice = "";
  state.wardrobeAddedMessage = "";
  state.closetSaving = false;
}

function wardrobeForUser(user) {
  return (user.wardrobeItems || [])
    .map(normalizeWardrobeItem)
    .filter(Boolean)
    .map(wardrobeEntryToRecommendationItem);
}

function activeWardrobe() {
  return wardrobeForUser(activeUser());
}

function wardrobeDisplayEntries(user) {
  return wardrobeForUser(user).map((item, index) => ({
    item,
    number: index + 1,
    displayId: `#${index + 1}`
  }));
}

function displayIdForItem(item, user) {
  if (!item) return "";
  if (item.id?.startsWith("insp-")) return item.id;
  return wardrobeDisplayEntries(user).find((entry) => entry.item.name === item.name)?.displayId || item.name;
}

function itemByDisplayId(user, id) {
  const clean = String(id || "").trim();
  const numeric = clean.replace(/^#/, "");
  if (!/^\d+$/.test(numeric)) return null;
  const index = Number(numeric) - 1;
  return wardrobeDisplayEntries(user)[index]?.item || null;
}

function wardrobeForModel(user) {
  return wardrobeDisplayEntries(user).map(({ item, displayId }) => ({
    id: displayId,
    name: item.name,
    description: item.description || `${item.name}。暂无详细描述。`,
    image: item.image ? "local_image" : ""
  }));
}

function wardrobeItemForVisual(item, user) {
  const displayId = displayIdForItem(item, user);
  const ownedItem = itemByDisplayId(user, displayId)
    || wardrobeForUser(user).find((entry) => entry.name === item.name);
  const hasOwnedImage =
    typeof ownedItem?.image === "string" &&
    (ownedItem.image.startsWith("data:image/") || ownedItem.image.startsWith("/GeneratedWardrobeImages/"));
  return {
    id: displayId,
    name: item.name,
    image: hasOwnedImage ? ownedItem.image : "",
    imageMode: hasOwnedImage ? "wardrobe_reference" : "text_generated",
    description: item.reason || (item.tags || []).join("、") || ""
  };
}


function profileSummary(user) {
  const profile = user.profile || {};
  const parts = [
    profile.gender,
    ...(profile.preferredStyles || []).filter((item) => item !== "无"),
    ...(profile.preferredItems || []).filter((item) => item !== "无"),
    ...(profile.preferredColors || []).filter((item) => item !== "无")
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "暂无特别偏好";
}

function compactProfileSummary(user) {
  const profile = user.profile || {};
  const styles = (profile.preferredStyles || []).filter((item) => item && item !== "无").slice(0, 2);
  const items = (profile.preferredItems || []).filter((item) => item && item !== "无").slice(0, 2);
  const parts = [...styles, ...items];
  return parts.length ? parts.join(" · ") : "暂无特别偏好";
}

function realHistoryCount(user) {
  return (user.history || []).filter((message) => message.role === "user").length;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizePreferenceKeyword(value) {
  const clean = String(value || "").trim().replace(/\s+/g, " ");
  if (!clean || clean === "无" || clean.length > 16) return "";
  return clean;
}

const fallbackPreferenceKeywords = [
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

function modelPreferenceKeywords(user) {
  const memory = user.preferenceMemory || createPreferenceMemory();
  return [...new Set([
    ...(memory.likes || []).map((item) => item.value),
    ...(memory.contextualPreferences || []).flatMap((item) => item.likes || [])
  ].map(normalizePreferenceKeyword).filter(Boolean))];
}

function preferenceKeywordCandidates(user, extra = []) {
  return [...modelPreferenceKeywords(user), ...extra, ...fallbackPreferenceKeywords]
    .map(normalizePreferenceKeyword)
    .filter((word, index, list) => word && list.indexOf(word) === index);
}

function countPreferenceWords(text, candidates, limit = 8) {
  return candidates
    .map(normalizePreferenceKeyword)
    .filter((word, index, list) => word && list.indexOf(word) === index)
    .map((word) => ({
      word,
      count: (text.match(new RegExp(escapeRegExp(word), "g")) || []).length
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, limit);
}
function selectedValues(form, name) {
  const values = [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
  return values.length ? values : ["无"];
}

function setCheckedValues(form, name, values) {
  const selected = new Set(values?.length ? values : ["无"]);
  form.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function renderMemoryPreview(user) {
  const memory = user?.preferenceMemory || createPreferenceMemory();
  const likes = (memory.likes || []).slice(0, 8);
  const dislikes = (memory.dislikes || []).slice(0, 8);
  const editEnabled = Boolean(user && state.profileDialogMode === "edit" && state.profileMemoryEditMode);
  const renderTag = (item) =>
    editEnabled
      ? `<button type="button" class="match-tag preference-tag is-deletable" data-delete-profile-memory="${escapeHtml(item.value)}" aria-label="删除历史偏好 ${escapeHtml(item.value)}"><span>${escapeHtml(item.value)}</span></button>`
      : `<span class="match-tag preference-tag"><span>${escapeHtml(item.value)}</span></span>`;
  document.querySelector("#memoryUpdatedAt").textContent = memory.updatedAt ? "已更新" : "暂无";
  document.querySelector("#memoryLikes").innerHTML = likes.length
    ? likes.map(renderTag).join("")
    : `<span class="match-tag">暂无</span>`;
  document.querySelector("#memoryDislikes").innerHTML = dislikes.length
    ? dislikes.map(renderTag).join("")
    : `<span class="match-tag">暂无</span>`;
  const editButton = document.querySelector("#profileMemoryEditButton");
  if (editButton) {
    editButton.textContent = editEnabled ? "完成" : "编辑";
    editButton.setAttribute("aria-pressed", String(editEnabled));
    editButton.disabled = !user || state.profileDialogMode !== "edit";
  }
}

function openProfileDialog(mode, user = null) {
  state.profileDialogMode = mode;
  state.profileMemoryEditMode = false;
  const dialog = document.querySelector("#userProfileDialog");
  const form = document.querySelector("#userProfileForm");
  const nextIndex = state.users.length + 1;
  form.reset();

  const profile = user?.profile || createUserProfile({ gender: "女" });
  document.querySelector("#profileNameInput").value = user?.name || `用户${nextIndex}`;
  form.querySelector(`input[name="profileGender"][value="${profile.gender || "女"}"]`).checked = true;
  setCheckedValues(form, "profileStyles", profile.preferredStyles || ["无"]);
  setCheckedValues(form, "profileItems", profile.preferredItems || ["无"]);
  setCheckedValues(form, "profileColors", profile.preferredColors || ["无"]);
  form.querySelectorAll("[data-none-option]").forEach((input) => {
    const groupChecked = [...input.closest("fieldset").querySelectorAll('input[type="checkbox"]:checked')];
    if (!groupChecked.length) input.checked = true;
  });
  renderMemoryPreview(user);
  document.querySelector("#submitProfileButton").textContent = mode === "edit" ? "保存资料" : "创建用户";
  dialog.showModal();
}

function syncNoneOption(changedInput) {
  const fieldset = changedInput.closest("fieldset");
  if (!fieldset) return;
  const checkboxes = [...fieldset.querySelectorAll('input[type="checkbox"]')];
  const noneOption = checkboxes.find((input) => input.dataset.noneOption !== undefined);
  if (!noneOption) return;

  if (changedInput === noneOption && noneOption.checked) {
    checkboxes.forEach((input) => {
      if (input !== noneOption) input.checked = false;
    });
    return;
  }

  if (changedInput !== noneOption && changedInput.checked) {
    noneOption.checked = false;
  }

  if (!checkboxes.some((input) => input.checked)) {
    noneOption.checked = true;
  }
}

async function analyzeUserMessage(message, user) {
  const response = await fetch("/api/analyze-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      rawUserInput: message,
      currentIntent: getIntent(),
      userProfile: user.profile || {},
      recentHistory: (user.history || []).slice(-6).map((item) => ({
        role: item.role,
        text: item.text
      }))
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "需求解析失败");
  return payload;
}

async function retrieveExamplesByRag(query, topK = 8) {
  const response = await fetch("/api/retrieve-examples", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, topK })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "样例检索失败");
  return payload;
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片读取失败"));
    image.src = src;
  });
}

async function compressImageForVisual(src, maxSize = 768, minSize = 320) {
  if (!src) return src;
  if (!src.startsWith("data:image/") && !src.startsWith("/GeneratedWardrobeImages/")) return src;
  const image = await loadImageElement(src);
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const drawWidth = Math.max(1, Math.round(sourceWidth * scale));
  const drawHeight = Math.max(1, Math.round(sourceHeight * scale));
  const width = Math.max(minSize, drawWidth);
  const height = Math.max(minSize, drawHeight);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, Math.round((width - drawWidth) / 2), Math.round((height - drawHeight) / 2), drawWidth, drawHeight);
  return canvas.toDataURL("image/jpeg", 0.82);
}

async function prepareVisualItems(items) {
  const prepared = [];
  for (const item of items.slice(0, 9)) {
    try {
      prepared.push({
        ...item,
        image: await compressImageForVisual(item.image)
      });
    } catch {
      prepared.push(item);
    }
  }
  return prepared;
}

function compactVisualErrorMessage(message) {
  const text = String(message || "上身效果生成失败").replace(/\s+/g, " ").trim();
  if (text.includes("resolution must be at least 240x240")) {
    return "参考图片尺寸过小，已调整生成流程；请重新点击该方案生成。";
  }
  return text
    .replace(/https?:\/\/\S+/g, "[图片链接]")
    .slice(0, 180);
}

async function visualizeOutfitByApi({ user, outfit, schemeIndex }) {
  const items = await prepareVisualItems((outfit.items || []).map((item) => wardrobeItemForVisual(item, user)));
  const visualIntent = state.lastRun?.intent || getIntent();
  const response = await fetch("/api/visualize-outfit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        id: user.id,
        name: user.name,
        profile: {
          ...(user.profile || {}),
          currentHeightCm: visualIntent.heightCm,
          currentBodyType: visualIntent.bodyType,
          currentAge: visualIntent.age,
          currentWeather: visualIntent.weather
        }
      },
      scheme: {
        index: schemeIndex + 1,
        title: outfit.title,
        reason: outfit.reason || outfitReasonText(outfit, state.lastRun?.intent || getIntent(), schemeIndex),
        text: describeOutfitItems(outfit.items || [], user)
      },
      items
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "上身效果生成失败");
  return payload;
}

async function generateOutfitsByApi({ user, intent, wardrobe, examples, preferences }) {
  const response = await fetch("/api/generate-outfits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        id: user.id,
        name: user.name,
        profile: user.profile || {},
        preferenceMemory: user.preferenceMemory || createPreferenceMemory(),
        recentHistory: (user.history || []).slice(-6).map((item) => ({
          role: item.role,
          text: item.text,
          auditStatus: item.auditStatus,
          weight: item.weight
        }))
      },
      intent,
      wardrobe,
      retrievedExamples: examples,
      preferences
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "搭配生成失败");
  return payload;
}

async function deleteGeneratedWardrobeImage(item) {
  if (!item || item.imageSource !== "generated" || !item.imagePath) return;
  await fetch("/api/delete-generated-wardrobe-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imagePath: item.imagePath })
  }).catch(() => {});
}

async function deleteGeneratedWardrobeImages(items) {
  await Promise.all((items || []).map((item) => deleteGeneratedWardrobeImage(item)));
}

async function analyzeWardrobeItemByApi({ name, image, instruction = "" }) {
  const response = await fetch("/api/analyze-wardrobe-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, image, instruction })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "衣物分析失败");
  return payload;
}

function localWardrobeItemAnalysis({ name, image, errorMessage = "" }) {
  const cleanName = (name || "").trim();
  const finalName = cleanName || `未命名衣物${(activeUser().wardrobeItems || []).length + 1}`;
  const hasImage = typeof image === "string" && image.startsWith("data:image/");
  return {
    name: finalName,
    description: `${finalName}。${hasImage ? "已保留用户上传的衣物图片。" : "由名称创建的衣柜条目。"}AI 分析暂时不可用，后续搭配会优先参考名称${hasImage ? "和图片" : ""}。`,
    image: image || "",
    _meta: {
      provider: "local_fallback",
      error: errorMessage || null
    }
  };
}

function saveWardrobeItemToUser({ item, editingIndex = null }) {
  const user = activeUser();
  const editingItem = editingIndex !== null ? user.wardrobeItems?.[editingIndex] : null;
  const finalName = (item.name || `未命名衣物${(user.wardrobeItems || []).length + 1}`).trim();
  const nextItem = {
    name: finalName,
    description: item.description || `${finalName}。暂无详细描述。`,
    image: item.image || "",
    imageSource: item.imageSource || "",
    imagePath: item.imagePath || ""
  };
  if (
    editingItem &&
    editingItem.imageSource === "generated" &&
    editingItem.imagePath &&
    editingItem.imagePath !== nextItem.imagePath
  ) {
    deleteGeneratedWardrobeImage(editingItem);
  }
  if (editingIndex !== null && editingItem) {
    user.wardrobeItems = (user.wardrobeItems || []).map((entry, index) => (index === editingIndex ? nextItem : entry));
  } else {
    user.wardrobeItems = [...(user.wardrobeItems || []), nextItem];
  }
  const displayId = `#${editingIndex !== null && editingItem ? editingIndex + 1 : user.wardrobeItems.length}`;
  state.lastRun = null;
  saveState();
  return {
    name: finalName,
    displayId,
    action: editingIndex !== null && editingItem ? "已更新" : "已添加"
  };
}

function memoryKey(item) {
  return normalizePreferenceKeyword(item?.value);
}

function mergePreferenceList(current, incoming) {
  const merged = new Map();
  (current || []).forEach((item) => {
    const key = memoryKey(item);
    if (!key) return;
    const existing = merged.get(key);
    merged.set(key, existing && existing.confidence >= item.confidence ? existing : item);
  });
  (incoming || []).forEach((item) => {
    if (!item?.value) return;
    const key = memoryKey(item);
    if (!key) return;
    const existing = merged.get(key);
    merged.set(key, existing && existing.confidence >= item.confidence ? existing : item);
  });
  return [...merged.values()].sort((a, b) => b.confidence - a.confidence).slice(0, 24);
}

function mergeContextualPreferences(current, incoming) {
  const merged = new Map();
  [...(current || []), ...(incoming || [])].forEach((item) => {
    const condition = normalizePreferenceKeyword(item?.condition);
    const likes = [...new Set((item?.likes || []).map(normalizePreferenceKeyword).filter(Boolean))];
    const dislikes = [...new Set((item?.dislikes || []).map(normalizePreferenceKeyword).filter(Boolean))];
    if (!condition && !likes.length && !dislikes.length) return;
    const key = `${condition}|${likes.join(",")}|${dislikes.join(",")}`;
    merged.set(key, { condition, likes, dislikes });
  });
  return [...merged.values()].slice(-20);
}

function mergePreferenceMemory(user, preferenceDelta) {
  if (!preferenceDelta) return;
  const memory = user.preferenceMemory || createPreferenceMemory();
  memory.likes = mergePreferenceList(memory.likes, preferenceDelta.likes);
  memory.dislikes = mergePreferenceList(memory.dislikes, preferenceDelta.dislikes);
  memory.contextualPreferences = mergeContextualPreferences(memory.contextualPreferences, preferenceDelta.contextual_preferences);
  delete memory.suppressed;
  memory.updatedAt = new Date().toISOString();
  user.preferenceMemory = memory;
}

function memoryWords(user) {
  const memory = user.preferenceMemory || createPreferenceMemory();
  return [...new Set([
    ...(memory.likes || []).map((item) => item.value),
    ...(memory.contextualPreferences || []).flatMap((item) => item.likes || [])
  ].map(normalizePreferenceKeyword).filter(Boolean))];
}

function memoryWordOccurrences(user) {
  const memory = user.preferenceMemory || createPreferenceMemory();
  return [
    ...(memory.likes || []).map((item) => item.value),
    ...(memory.contextualPreferences || []).flatMap((item) => item.likes || [])
  ].map(normalizePreferenceKeyword).filter(Boolean);
}

function includesNegativeContext(text, value) {
  if (!text || !value) return false;
  const index = text.indexOf(value);
  if (index < 0) return false;
  const windowText = text.slice(Math.max(0, index - 12), index + value.length + 12);
  return negativeIntentPatterns.some((pattern) => windowText.includes(pattern));
}

function validatePreferenceItems(items, rawText, polarity) {
  const errors = [];
  const accepted = [];
  (items || []).forEach((item, index) => {
    if (!item || typeof item.value !== "string" || !item.value.trim()) {
      errors.push(`${polarity}[${index}] missing value`);
      return;
    }
    if (blockedMemoryTerms.some((term) => item.value.includes(term))) {
      errors.push(`${polarity}[${index}] contains unsafe memory term`);
      return;
    }
    if (typeof item.confidence !== "number" || item.confidence < 0 || item.confidence > maxPreferenceConfidence) {
      errors.push(`${polarity}[${index}] invalid confidence`);
      return;
    }
    if (polarity === "likes" && includesNegativeContext(rawText, item.value)) {
      errors.push(`${polarity}[${index}] appears in negative context`);
      return;
    }
    accepted.push(item);
  });
  return { errors, accepted };
}

function mechanicalAuditAnalysis(analysis, rawText) {
  const errors = [];
  const warnings = [];
  if (!analysis || typeof analysis !== "object") {
    return {
      ok: false,
      errors: ["analysis_missing"],
      warnings: [],
      safeForPrompt: false,
      safeForMemory: false,
      sanitizedPreferenceDelta: null,
      historyPolicy: "skip"
    };
  }

  const guard = analysis.guard || {};
  const intent = analysis.intent || {};
  const delta = analysis.preference_delta || {};

  if (typeof guard.safe !== "boolean") errors.push("guard.safe_missing");
  if (!Array.isArray(guard.risk_types)) errors.push("guard.risk_types_missing");
  if (guard.safe && !String(guard.sanitized_input || "").trim()) errors.push("sanitized_input_empty");
  if (intent.mode && !["inspiration", "closet"].includes(intent.mode)) errors.push("intent.mode_invalid");
  if (intent.retrieval_query && intent.retrieval_query.length > 240) warnings.push("retrieval_query_too_long");
  if (intent.needs_clarification && !intent.clarifying_question) errors.push("clarifying_question_missing");

  const highRiskTypes = ["prompt_injection", "privacy", "cross_user_data", "sexualized_or_overexposed", "unsafe_context"];
  const hasHighRisk = (guard.risk_types || []).some((type) => highRiskTypes.includes(type));
  if (hasHighRisk) warnings.push("high_risk_input");

  const likeCheck = validatePreferenceItems(delta.likes, rawText, "likes");
  const dislikeCheck = validatePreferenceItems(delta.dislikes, rawText, "dislikes");
  const preferenceErrors = [...likeCheck.errors, ...dislikeCheck.errors];
  warnings.push(...preferenceErrors.map((error) => `preference_ignored: ${error}`));

  const sanitizedPreferenceDelta = {
    likes: likeCheck.accepted,
    dislikes: dislikeCheck.accepted,
    contextual_preferences: Array.isArray(delta.contextual_preferences) ? delta.contextual_preferences.slice(0, 8) : [],
    do_not_store: Array.isArray(delta.do_not_store) ? delta.do_not_store : [],
    summary: typeof delta.summary === "string" ? delta.summary : ""
  };

  const ok = errors.length === 0;
  return {
    ok,
    errors,
    warnings,
    safeForPrompt: ok && (guard.safe || Boolean(guard.sanitized_input)),
    safeForMemory: ok && guard.safe && !hasHighRisk && preferenceErrors.length === 0,
    sanitizedPreferenceDelta,
    historyPolicy: ok && guard.safe && !hasHighRisk ? "normal" : ok && guard.sanitized_input ? "low_weight" : "skip"
  };
}

function pushHistory(user, role, text, { weight = 1, auditStatus = "ok", createdAt = new Date().toISOString() } = {}) {
  const entry = {
    role,
    text,
    weight,
    auditStatus,
    createdAt
  };
  user.history.push(entry);
  return entry;
}

function setPendingReply(text) {
  if (!state.pendingReply) return;
  state.pendingReply.text = text;
  renderChat();
}

function normalizeValue(value) {
  const clean = String(value ?? "").trim();
  return clean || "无";
}

function getIntent() {
  const heightRaw = document.querySelector("#heightInput").value;
  const ageRaw = document.querySelector("#ageInput").value;
  return {
    heightCm: heightRaw === "" ? null : Number(heightRaw),
    bodyType: normalizeValue(document.querySelector("#bodyTypeInput").value),
    age: ageRaw === "" ? null : Number(ageRaw),
    temp: null,
    weather: normalizeValue(document.querySelector("#weatherInput").value),
    occasion: normalizeValue(document.querySelector("#occasionInput").value),
    mood: normalizeValue(document.querySelector("#moodInput").value),
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
  const heightMatch = text.match(/(?:身高|高)\s*(1[2-9]\d|2[0-2]\d)\s*(cm|厘米|公分)?/i);
  if (next.heightCm === null && heightMatch) next.heightCm = Number(heightMatch[1]);
  const ageMatch = text.match(/(?:年龄\s*)?((?:[1-9]\d?)|1[01]\d|120)\s*岁|年龄\s*((?:[1-9]\d?)|1[01]\d|120)/);
  if (next.age == null && ageMatch) next.age = Number(ageMatch[1] || ageMatch[2]);
  if (next.bodyType === "无") {
    ["偏瘦", "匀称", "微胖", "高大壮实", "丰满", "体型较大", "比较大", "壮"].some((item) => {
      if (text.includes(item)) {
        next.bodyType = item === "体型较大" || item === "比较大" || item === "壮" ? "高大壮实" : item;
        return true;
      }
      return false;
    });
  }
  return next;
}

function createLocalAnalysis(message) {
  const localIntent = mergeIntentWithMessage(getIntent(), message);
  const queryParts = [
    localIntent.heightCm === null ? null : `身高${localIntent.heightCm}cm`,
    localIntent.bodyType,
    localIntent.age === null ? null : `${localIntent.age}岁`,
    localIntent.weather,
    localIntent.temp === null ? null : `${localIntent.temp}度`,
    localIntent.occasion,
    localIntent.mood,
    localIntent.freeText
  ].filter((item) => item && item !== "无");

  return {
    local_fallback: true,
    guard: {
      safe: true,
      risk_types: [],
      sanitized_input: message,
      blocked_reason: null,
      user_message: null
    },
    intent: {
      mode: localIntent.mode,
      occasion: localIntent.occasion === "无" ? null : localIntent.occasion,
      weather: localIntent.weather === "无" ? null : localIntent.weather,
      temperature: localIntent.temp,
      season: null,
      time_of_day: null,
      gender_presentation: null,
      style_keywords: localIntent.mood === "无" ? [] : [localIntent.mood],
      color_preferences: [],
      item_preferences: [],
      avoid: [],
      formality: null,
      comfort_priority: localIntent.mood === "松弛" ? "high" : null,
      body_or_fit_preferences: [
        localIntent.heightCm === null ? null : `身高${localIntent.heightCm}cm`,
        localIntent.bodyType === "无" ? null : `体型${localIntent.bodyType}`,
        localIntent.age === null ? null : `年龄${localIntent.age}岁`
      ].filter(Boolean),
      needs_clarification: false,
      clarifying_question: null,
      retrieval_query: queryParts.join(" ") || message
    },
    preference_delta: {
      likes: [],
      dislikes: [],
      contextual_preferences: [],
      do_not_store: [],
      summary: "本地规则解析，未调用外部 API。"
    }
  };
}
function withinTemp(range, temp) {
  if (temp === null || Number.isNaN(temp)) return false;
  return temp >= range[0] && temp <= range[1];
}

function derivePreferenceSignals(user) {
  const profile = user.profile || {};
  const profileText = [
    profile.gender,
    ...(profile.preferredStyles || []),
    ...(profile.preferredItems || []),
    ...(profile.preferredColors || []),
    ...memoryWords(user)
  ]
    .filter(Boolean)
    .join(" ");
  const text = profileText;
  const profileKeywords = [
    profile.gender,
    ...(profile.preferredStyles || []),
    ...(profile.preferredItems || []),
    ...(profile.preferredColors || [])
  ];
  return countPreferenceWords(text, preferenceKeywordCandidates(user, profileKeywords), 12);
}
function deriveLearnedPreferenceSignals(user) {
  const text = memoryWordOccurrences(user).join(" ");
  return countPreferenceWords(text, preferenceKeywordCandidates(user), 12);
}

function visiblePreferenceSignals(preferences, { maxVisible = 8, minVisible = 4 } = {}) {
  const highFrequency = preferences.filter((pref) => pref.count >= 2).slice(0, maxVisible);
  if (highFrequency.length >= minVisible) return highFrequency;
  const used = new Set(highFrequency.map((pref) => pref.word));
  const supplements = preferences
    .filter((pref) => pref.count > 0 && !used.has(pref.word))
    .slice(0, minVisible - highFrequency.length);
  return [...highFrequency, ...supplements].slice(0, maxVisible);
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
    .filter((item) => item.category === category && !excluded.includes(item.name))
    .map((item) => ({ item, score: scoreEntity(item, intent, preferences) }))
    .sort((a, b) => b.score - a.score)[0]?.item;
}

function pickAlt(category, wardrobe, intent, preferences, excluded = []) {
  const ranked = wardrobe
    .filter((item) => item.category === category && !excluded.includes(item.name))
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

  const altTop = pickAlt("上装", wardrobe, intent, preferences, [top?.name]);
  const altBottom = pickAlt("下装", wardrobe, intent, preferences, [bottom?.name]);
  const casualShoes = pickAlt("鞋", wardrobe, intent, preferences, [shoes?.name]);

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
  const ownedNames = new Set((user.wardrobeItems || []).map(wardrobeItemName));
  const missing = outfit.items.filter((item) => !ownedNames.has(item.name) && !item.id?.startsWith("insp-"));
  const inspiration = outfit.items.filter((item) => item.id?.startsWith("insp-"));
  const unknownOwned = outfit.source === "owned" && inspiration.length > 0;
  return {
    ok: missing.length === 0 && !unknownOwned,
    missing,
    inspiration
  };
}

function itemIds(items, user) {
  return items.map((item) => `${displayIdForItem(item, user)} ${item.name}`).join("、");
}

function formatOutfitItem(item, user) {
  if (!item) return "未知衣物";
  return `${item.name}(${displayIdForItem(item, user)})`;
}

function describeOutfitItems(items, user) {
  return items.map((item) => formatOutfitItem(item, user)).join("、");
}

function outfitReferenceIds(outfit, examples, index) {
  const refs = Array.isArray(outfit.referenceExamples) ? outfit.referenceExamples.filter(Boolean) : [];
  if (refs.length) return refs.slice(0, 2);
  if (!examples.length) return [];
  return examples.slice(index, index + 2).map((example) => example.id).filter(Boolean);
}

function exampleLabel(example) {
  const tags = exampleTags(example).slice(0, 4).join("、");
  return tags ? `${example.id}(${tags})` : example.id;
}

function referenceSummary(examples) {
  if (!examples.length) return "这次没有检索到可用 sample，所以主要按你的衣柜和当前需求来判断。";
  return `我参考了 ${examples.slice(0, 4).map(exampleLabel).join("、")}，主要借鉴它们的场景、色彩和层次组合。`;
}

function outfitReasonText(outfit, intent, index) {
  if (outfit.reason) return outfit.reason;
  const starters = [
    "这套先把天气、温度和场合稳稳照顾到，适合作为最不出错的主方案。",
    "这套会更柔和一点，适合想保留轻松感、但看起来更完整的时候。",
    "这套线条更清爽，适合通勤、转场或想看起来更利落的时候。"
  ];
  const weatherHint = intent.weather.includes("雨") ? "鞋子和外套也尽量选择更稳定、能应对雨天的单品。" : "";
  const tempHint = intent.temp !== null && intent.temp <= 18 ? "叠穿和外套能多给一点保暖余量。" : "";
  return [starters[index] || starters[0], weatherHint, tempHint].filter(Boolean).join("");
}

function buildOutfitWarnings(intent, outfits, user) {
  const warnings = [];
  const allItems = outfits.flatMap((outfit) => outfit.items || []);
  const hasRain = intent.weather.includes("雨");
  const hasLightRainOuter = allItems.some((item) => item.name === "鼠尾草薄风衣");
  const hasSkirt = allItems.some((item) => item.name === "浅卡其半裙");
  const hasWaterproofShoes = allItems.some((item) => (item.tags || []).some((tag) => tag.includes("防水")));

  if (hasRain && hasLightRainOuter) {
    warnings.push(`${formatOutfitItem(catalogByName.get("鼠尾草薄风衣"), user)} 更适合小雨或短时间通勤，雨势大时记得带结实雨伞。`);
  }
  if (hasRain && !hasWaterproofShoes) {
    warnings.push("当前衣柜里没有明确防水鞋靴，雨天出门建议避开积水路段，后续可以补一双防水鞋。");
  }
  if (hasRain && hasSkirt) {
    warnings.push(`${formatOutfitItem(catalogByName.get("浅卡其半裙"), user)} 在雨天容易被打湿，雨势大时可以换成长裤，或者搭配长筒袜保暖。`);
  }
  if (intent.temp !== null && intent.temp <= 15 && !allItems.some((item) => (item.tags || []).some((tag) => tag.includes("厚")))) {
    warnings.push("如果体感偏冷，当前衣柜的外套厚度可能不够，建议额外加保暖内搭。");
  }
  return warnings;
}

function normalizeApiItem(item, user) {
  const id = String(item?.id || "").trim();
  const displayOwned = itemByDisplayId(user, id);
  const owned = displayOwned || catalogByName.get(id) || catalogByName.get(String(item?.name || "").trim());
  if (owned && (user.wardrobeItems || []).some((entry) => wardrobeItemName(entry) === owned.name)) {
    return {
      ...owned,
      reason: item.reason || ""
    };
  }
  if (id.startsWith("insp-")) {
    return {
      id,
      name: item.name || id,
      category: item.category || "灵感单品",
      colors: item.colors || ["#efe5d4", "#7d9a89"],
      scenes: [],
      moods: [],
      temp: [0, 40],
      tags: ["非衣柜", item.reason].filter(Boolean),
      formality: Number(item.formality || 3),
      reason: item.reason || ""
    };
  }
  return {
    id: id || "unknown-item",
    name: item?.name || id || "未知衣物",
    category: item?.category || "未知",
    colors: ["#dddddd", "#888888"],
    scenes: [],
    moods: [],
    temp: [0, 40],
    tags: [item?.reason || "模型输出未匹配当前衣柜"],
    formality: 0,
    reason: item?.reason || ""
  };
}

function normalizeApiOutfits(result, user) {
  return (result?.outfits || [])
    .slice(0, 3)
    .map((outfit, index) => ({
      id: outfit.id || `look-${index + 1}`,
      title: outfit.title || `方案${index + 1}`,
      source: outfit.source === "mixed" ? "mixed" : "owned",
      items: (outfit.items || []).map((item) => normalizeApiItem(item, user)).filter((item) => item.name || item.id),
      confidence: Number(outfit.confidence || 0.75),
      referenceExamples: outfit.reference_examples || [],
      reason: outfit.reason || ""
    }))
    .filter((outfit) => outfit.items.length);
}

function exampleTags(example) {
  if (Array.isArray(example.tags)) return example.tags;
  if (example.tags && typeof example.tags === "object") {
    return Object.values(example.tags).flat().filter(Boolean);
  }
  return [];
}

function sampleDisplayTags(example) {
  const tags = example.tags && typeof example.tags === "object" && !Array.isArray(example.tags)
    ? [
        ...(example.tags.season || []),
        ...(example.tags.occasion || []),
        ...(example.tags.style || [])
      ]
    : exampleTags(example);
  return [...new Set(tags)]
    .filter((tag) => tag && !["男", "女", "中性"].includes(tag))
    .slice(0, 3);
}

function sampleImageSrc(example) {
  const imagePath = example?.image_path || example?.pic || "";
  if (!imagePath) return "";
  return imagePath.startsWith("/") ? imagePath : `/${imagePath.replace(/\\/g, "/")}`;
}

function referencedEvidenceExamples(examples, outfits) {
  if (!state.lastRun) return [];
  const byId = new Map((examples || []).map((example) => [example.id, example]));
  const ids = [];
  (outfits || []).forEach((outfit) => {
    (outfit.referenceExamples || []).forEach((id) => {
      if (id && !ids.includes(id)) ids.push(id);
    });
  });
  const answerText = state.lastRun?.generationResult?.answer || "";
  [...String(answerText).matchAll(/sample-\d{4}/g)].forEach((match) => {
    if (!ids.includes(match[0])) ids.push(match[0]);
  });
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

function preferenceWordMatches(value, target) {
  const cleanValue = normalizePreferenceKeyword(value);
  const cleanTarget = normalizePreferenceKeyword(target);
  return cleanValue && cleanTarget && (cleanValue === cleanTarget || cleanValue.includes(cleanTarget));
}

function removePreferenceWord(user, word) {
  const memory = user.preferenceMemory || createPreferenceMemory();
  const target = normalizePreferenceKeyword(word);
  memory.likes = (memory.likes || []).filter((item) => !preferenceWordMatches(item.value, target));
  memory.dislikes = (memory.dislikes || []).filter((item) => !preferenceWordMatches(item.value, target));
  memory.contextualPreferences = (memory.contextualPreferences || []).map((item) => ({
    ...item,
    likes: (item.likes || []).filter((value) => !preferenceWordMatches(value, target)),
    dislikes: (item.dislikes || []).filter((value) => !preferenceWordMatches(value, target))
  })).filter((item) => item.condition || (item.likes || []).length || (item.dislikes || []).length);
  delete memory.suppressed;
  memory.updatedAt = new Date().toISOString();
  user.preferenceMemory = memory;
}

function naturalLanguageAnswer(intent, outfits, user, examples, preferences) {
  const weatherPart = intent.weather === "无" ? "没有指定天气" : `${intent.weather}`;
  const tempPart = intent.temp === null ? "没有指定温度" : `${intent.temp}度`;
  const bodyPart = [
    intent.heightCm === null ? null : `身高${intent.heightCm}cm`,
    intent.bodyType === "无" ? null : `体型${intent.bodyType}`,
    intent.age === null ? null : `年龄${intent.age}岁`
  ].filter(Boolean).join("、") || "没有指定身高、体型和年龄";
  const occasionPart = intent.occasion === "无" ? "日常场景" : intent.occasion;
  const moodPart = intent.mood === "无" ? "不过度限定风格" : intent.mood;
  const prefText = preferences.length ? `，也顺手照顾了你之前提到的 ${preferences.map((p) => p.word).join("、")}` : "";
  const schemeNames = ["方案一", "方案二", "方案三"];
  const safeOutfits = outfits.slice(0, 3);
  const lines = [
    `你好！针对 ${weatherPart}、${tempPart}、${bodyPart}、${occasionPart}、${moodPart} 的需求${prefText}，我给你搭了 3 套更好落地的方案：`
  ];

  safeOutfits.forEach((outfit, index) => {
    const refs = outfitReferenceIds(outfit, examples, index);
    const refText = refs.length ? `参考 ${refs.join("、")} 的配色和场景感，` : "";
    const inspirationText =
      outfit.source === "mixed" ? "其中 insp-* 是灵感单品，不在当前衣柜里，我已经单独标出来。" : "";
    lines.push(
      "",
      `${schemeNames[index]}【${outfit.title}】：使用 ${describeOutfitItems(outfit.items, user)}。${refText}${outfitReasonText(outfit, intent, index)}${inspirationText}`
    );
  });

  lines.push("", `参考样例：${referenceSummary(examples)}`);
  const warnings = buildOutfitWarnings(intent, safeOutfits, user);
  if (warnings.length) {
    lines.push("", `温馨提示：${warnings.join(" ")}`);
  }
  return lines.join("\n");
}

async function runRecommendation(message, userMessageEntry = null) {
  const user = activeUser();
  let analysis = null;
  let mechanicalAudit = null;
  let usedLocalFallback = false;
  try {
    setPendingReply("正在调用千问解析需求，请稍候");
    analysis = await analyzeUserMessage(message, user);
    mechanicalAudit = mechanicalAuditAnalysis(analysis, message);
    if (!mechanicalAudit.safeForPrompt) {
      if (userMessageEntry) {
        userMessageEntry.weight = 0.2;
        userMessageEntry.auditStatus = "failed_audit";
      } else if (mechanicalAudit.historyPolicy !== "skip") {
          pushHistory(user, "user", message, { weight: 0.2, auditStatus: "failed_audit" });
      }
      pushHistory(user, "assistant", "这条需求没有通过审核，暂时不会进入推荐或偏好记忆。你可以换一种穿搭需求描述。", {
        weight: 0,
        auditStatus: "system_notice"
      });
      saveState();
      state.lastRun = { analysis, mechanicalAudit };
      state.pendingReply = null;
      render();
      return;
    }
    if (mechanicalAudit.safeForMemory) {
      mergePreferenceMemory(user, mechanicalAudit.sanitizedPreferenceDelta);
    }
  } catch (error) {
    usedLocalFallback = true;
    setPendingReply("千问解析暂时不可用，正在用本地规则继续");
    analysis = createLocalAnalysis(message);
    mechanicalAudit = {
      ok: true,
      errors: [],
      warnings: [`api_unavailable: ${error.message}`],
      safeForPrompt: true,
      safeForMemory: false,
      sanitizedPreferenceDelta: analysis.preference_delta,
      historyPolicy: "normal"
    };
  }

  const sanitizedMessage = analysis.guard?.sanitized_input || message;
  const parsedIntent = analysis.intent || {};
  const mergedIntent = mergeIntentWithMessage(getIntent(), sanitizedMessage);
  const frontendQueryParts = [
    mergedIntent.age === null ? null : `${mergedIntent.age}岁`,
    mergedIntent.heightCm === null ? null : `身高${mergedIntent.heightCm}cm`,
    mergedIntent.bodyType === "无" ? null : `体型${mergedIntent.bodyType}`,
    mergedIntent.weather === "无" ? null : mergedIntent.weather,
    mergedIntent.occasion === "无" ? null : mergedIntent.occasion,
    mergedIntent.mood === "无" ? null : mergedIntent.mood
  ].filter(Boolean);
  const intent = {
    ...mergedIntent,
    parsed: parsedIntent,
    retrievalQuery: [parsedIntent.retrieval_query || sanitizedMessage, ...frontendQueryParts].filter(Boolean).join(" ")
  };
  const preferences = derivePreferenceSignals(user);
  let ragResult = null;
  let examples = [];
  try {
    setPendingReply("正在检索 RAG 参考样例，请稍候");
    ragResult = await retrieveExamplesByRag(intent.retrievalQuery, 8);
    examples = (ragResult.examples || []).map((example) => ({
      ...example,
      title: example.description,
      temp: example.tags?.season?.includes("夏") ? [22, 35] : undefined,
      scenes: example.tags?.occasion || [],
      moods: example.tags?.style || [],
      weather: [],
      score: example.score
    }));
  } catch (error) {
    ragResult = { mode: "failed", error: error.message };
    examples = retrieveExamples(intent, preferences);
  }
  let generationResult = null;
  let outfits = [];
  let answer = "";
  try {
    setPendingReply("正在调用千问生成搭配，请稍候");
    generationResult = await generateOutfitsByApi({
      user,
      intent,
      wardrobe: wardrobeForModel(user),
      examples,
      preferences
    });
    outfits = normalizeApiOutfits(generationResult, user);
    if (!outfits.length) throw new Error("API 没有返回可用方案");
    if (outfits.length < 3) throw new Error("API 返回的方案不足 3 套");
    const apiValidation = outfits.map((outfit) => validateOutfit(outfit, user));
    if (apiValidation.some((result) => !result.ok)) throw new Error("API 输出包含当前用户衣柜外编号");
    answer = generationResult.answer || naturalLanguageAnswer(intent, outfits, user, examples, preferences);
    if (generationResult._meta?.model) {
      answer = `${answer}\n\n生成来源：千问 ${generationResult._meta.model}，耗时 ${(generationResult._meta.elapsedMs / 1000).toFixed(1)} 秒。`;
    }
    generationResult = { ...generationResult, mode: "qwen" };
  } catch (error) {
    outfits = buildOutfits(intent, user);
    answer = `千问生成没有返回可用结果（${error.message}），下面先用本地规则给你兜底：\n\n${naturalLanguageAnswer(intent, outfits, user, examples, preferences)}`;
    generationResult = { mode: "local_fallback", error: error.message };
  }
  const validation = outfits.map((outfit) => validateOutfit(outfit, user));

  const historyWeight = mechanicalAudit.historyPolicy === "low_weight" ? 0.2 : 1;
  const auditStatus = usedLocalFallback ? "local_fallback" : mechanicalAudit.historyPolicy === "low_weight" ? "low_weight_audit" : "ok";
  if (userMessageEntry) {
    userMessageEntry.weight = historyWeight;
    userMessageEntry.auditStatus = auditStatus;
  } else {
    pushHistory(user, "user", message, { weight: historyWeight, auditStatus });
  }
  pushHistory(user, "assistant", answer, { weight: historyWeight, auditStatus });
  state.lastRun = { intent, examples, outfits, validation, preferences, analysis, mechanicalAudit, ragResult, generationResult, visualResults: {} };
  state.pendingReply = null;
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
  document.querySelector("#activeUserBadge").textContent = `资料偏好：${compactProfileSummary(user)} · ${realHistoryCount(user)} 条对话`;
  const deleteButton = document.querySelector("#deleteUserButton");
  if (deleteButton) deleteButton.disabled = state.users.length <= 1;
}

function renderCloset() {
  const wardrobe = activeWardrobe();
  const generationBusy = Boolean(state.pendingReply);
  const closetEditEnabled = state.closetEditMode && !generationBusy;
  const query = state.closetSearchQuery.trim().toLowerCase();
  const numberedWardrobe = wardrobe.map((item, index) => ({
    item,
    number: index + 1,
    displayId: `#${index + 1}`,
    wardrobeIndex: index
  }));
  const visibleWardrobe = query
    ? numberedWardrobe.filter(({ item, number, displayId }) => {
        const numericQuery = query.replace(/^#/, "");
        return (
          displayId.toLowerCase().includes(query) ||
          String(number) === numericQuery ||
          item.name.toLowerCase().includes(query)
        );
      })
    : numberedWardrobe;

  document.querySelector("#closetRail").innerHTML = visibleWardrobe.length
    ? visibleWardrobe
        .map(
          ({ item, displayId, wardrobeIndex }) => `
        <div class="closet-tile${closetEditEnabled ? " is-editing" : ""}" role="button" tabindex="0" data-edit-wardrobe-index="${wardrobeIndex}" aria-label="编辑 ${escapeHtml(displayId)} ${escapeHtml(item.name)}" title="编辑这件衣服">
          <button class="closet-delete" type="button" data-delete-wardrobe-index="${wardrobeIndex}" aria-label="删除 ${escapeHtml(displayId)} ${escapeHtml(item.name)}" title="删除这件衣服">×</button>
          <img class="closet-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" />
          <small>${escapeHtml(displayId)}</small>
          <strong>${escapeHtml(item.name)}</strong>
        </div>
      `
        )
        .join("")
    : `<div class="closet-empty">没有找到匹配衣物</div>`;
  document.querySelector("#closetCount").textContent = wardrobe.length;
  const searchInput = document.querySelector("#closetSearchInput");
  if (searchInput && searchInput.value !== state.closetSearchQuery) {
    searchInput.value = state.closetSearchQuery;
  }
  const editButton = document.querySelector("#closetEditButton");
  if (editButton) {
    editButton.textContent = state.closetEditMode ? "完成" : "编辑";
    editButton.setAttribute("aria-pressed", String(closetEditEnabled));
    editButton.disabled = generationBusy;
    editButton.title = generationBusy ? "生成搭配时不能编辑衣柜" : "";
  }
  const addButton = document.querySelector("#closetAddButton");
  if (addButton) {
    addButton.hidden = !closetEditEnabled;
    addButton.disabled = generationBusy;
  }
}

function renderOutfitVisualPanel() {
  const user = activeUser();
  const outfits = state.lastRun?.outfits || [];
  const visualResults = state.lastRun?.visualResults || {};
  const resultImage = state.visualResult?.images?.[0];
  return `
    <section class="outfit-visual-panel">
      <div class="outfit-visual-header">
        <div>
          <p class="eyebrow">Try On Preview</p>
          <h2>看看搭配上身</h2>
        </div>
        <button id="backToChatButton" type="button">返回聊天</button>
      </div>
      <div class="visual-scheme-grid">
        ${outfits.slice(0, 3).map((outfit, index) => `
          <button class="visual-scheme-button${visualResults[index] ? " is-generated" : ""}" type="button" data-visual-scheme="${index}" ${state.visualBusy ? "disabled" : ""}>
            <span>方案${index + 1}${visualResults[index] ? " · 已生成" : ""}</span>
            <strong>${escapeHtml(outfit.title || `方案${index + 1}`)}</strong>
            <small>${escapeHtml(describeOutfitItems(outfit.items || [], user))}</small>
          </button>
        `).join("")}
      </div>
      <div class="visual-result-box">
        ${state.visualBusy ? `<div class="visual-loading">正在生成上身效果，请稍候</div>` : ""}
        ${resultImage ? `<img src="${escapeHtml(resultImage)}" alt="生成的搭配上身效果图" />` : ""}
        ${!state.visualBusy && !resultImage ? `<div class="visual-empty">选择一个方案后生成效果图</div>` : ""}
      </div>
      <p class="visual-notice">${escapeHtml(state.visualNotice || "使用万相生成虚拟模特效果图，不代表真实试穿结果。")}</p>
    </section>
  `;
}
function renderAddWardrobePanel() {
  const isEditing = Number.isInteger(state.editingWardrobeIndex);
  const generated = state.wardrobeGeneratedItem;
  const displayImage = generated?.image || state.pendingWardrobeImage;
  const displayName = generated?.name || state.pendingWardrobeName || "";
  const preview = displayImage
    ? `<img src="${escapeHtml(displayImage)}" alt="已导入衣物图片" />`
    : `<span>选择本地图片</span>`;
  const generatedDescription = "";
  const generatedActions = generated
    ? `
      <div class="wardrobe-generated-confirm">
        <p>${escapeHtml(state.wardrobeAddedMessage || "相应内容已生成。是否添加到衣柜？")}</p>
        ${
          state.wardrobeRegenerateMode && !state.wardrobeAddedMessage
            ? `<label class="wardrobe-regenerate-field">
                <span>补充生成条件</span>
                <textarea id="wardrobeRegeneratePromptInput" rows="3" placeholder="比如：更像真实商品图、颜色更浅、保留圆领短袖特征">${escapeHtml(state.wardrobeRegeneratePrompt || "")}</textarea>
              </label>`
            : ""
        }
        <div class="wardrobe-add-actions">
          <button id="cancelWardrobeAddButton" type="button" ${state.closetSaving ? "disabled" : ""}>取消</button>
          ${
            state.wardrobeAddedMessage
              ? ""
              : `<button id="regenerateWardrobeButton" type="button" ${state.closetSaving ? "disabled" : ""}>${state.wardrobeRegenerateMode ? "再次生成" : "重新生成"}</button>
                 <button id="confirmWardrobeAddButton" class="send-button compact" type="button" ${state.closetSaving ? "disabled" : ""}>添加</button>`
          }
        </div>
      </div>
    `
    : "";
  return `
    <form id="wardrobeAddForm" class="wardrobe-add-panel">
      <div class="wardrobe-add-header">
        <p class="eyebrow">${isEditing ? "Edit Item" : "Add Item"}</p>
        <h2>${isEditing ? "编辑衣物" : "添加衣物"}</h2>
      </div>
      <label class="wardrobe-image-import">
        <input id="wardrobeImageInput" type="file" accept="image/*" />
        <div class="wardrobe-image-preview">${preview}</div>
        <strong>${isEditing ? "更换本地图片" : "本地导入图片"}</strong>
      </label>
      <label class="wardrobe-name-field">
        <span>衣物名称</span>
        <input id="wardrobeNameInput" type="text" maxlength="28" placeholder="比如：白色短袖" autocomplete="off" value="${escapeHtml(displayName)}" ${state.wardrobeAddedMessage ? "disabled" : ""} />
      </label>
      ${generatedDescription}
      <p id="wardrobeAddNotice" class="wardrobe-add-notice" aria-live="polite">${escapeHtml(state.wardrobeAddNotice || "")}</p>
      ${
        generated
          ? generatedActions
          : `<div class="wardrobe-add-actions">
              <button id="cancelWardrobeAddButton" type="button" ${state.closetSaving ? "disabled" : ""}>取消</button>
              <button id="completeWardrobeAddButton" class="send-button compact" type="submit" ${state.closetSaving ? "disabled" : ""}>${state.closetSaving ? "处理中" : isEditing ? "保存" : "完成"}</button>
            </div>`
      }
    </form>
  `;
}

function renderChat() {
  const user = activeUser();
  const chatForm = document.querySelector("#chatForm");
  if (state.visualizingOutfit) {
    document.querySelector("#chatMessages").innerHTML = renderOutfitVisualPanel();
    if (chatForm) chatForm.hidden = true;
    return;
  }
  if (state.addingWardrobeItem) {
    document.querySelector("#chatMessages").innerHTML = renderAddWardrobePanel();
    if (chatForm) chatForm.hidden = true;
    return;
  }
  if (chatForm) chatForm.hidden = false;
  const messages = [...user.history];
  if (state.pendingReply?.userId === user.id) {
    messages.push({
      role: "assistant",
      text: state.pendingReply.text,
      pending: true
    });
  }
  document.querySelector("#chatMessages").innerHTML = messages
    .map((message, index) => {
      const canVisualize =
        message.role === "assistant" &&
        !message.pending &&
        index === messages.length - 1 &&
        (state.lastRun?.outfits || []).length >= 3;
      return `
        <article class="message ${message.role}${message.pending ? " pending" : ""}">
          <div class="message-role">${message.role === "user" ? user.name : "AIWardrobe"}</div>
          ${
            message.pending
              ? `<p><span>${escapeHtml(message.text)}</span><span class="typing-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span></p>`
              : `<p>${escapeHtml(message.text).replace(/\n/g, "<br>")}</p>`
          }
          ${canVisualize ? `<button class="visualize-entry-button" type="button" data-open-visualizer>看看搭配上身</button>` : ""}
        </article>
      `;
    })
    .join("");
  const box = document.querySelector("#chatMessages");
  box.scrollTop = box.scrollHeight;
  const busy = Boolean(state.pendingReply);
  const input = document.querySelector("#messageInput");
  const button = document.querySelector("#sendButton");
  if (input) input.disabled = busy;
  if (button) {
    button.disabled = busy;
    button.textContent = busy ? "生成中" : "生成搭配";
  }
}

function renderEvidence() {
  const user = activeUser();
  const preferences = state.lastRun?.preferences || derivePreferenceSignals(user);
  const learnedPreferences = deriveLearnedPreferenceSignals(user);
  const visibleLearnedPreferences = visiblePreferenceSignals(learnedPreferences);
  const latestUserMessage = [...user.history].reverse().find((message) => message.role === "user")?.text || "";
  const previewIntent = latestUserMessage ? mergeIntentWithMessage(getIntent(), latestUserMessage) : getIntent();
  const intent = state.lastRun?.intent || previewIntent;
  const examples = state.lastRun?.examples || [];
  const outfits = state.lastRun?.outfits || [];
  const evidenceExamples = referencedEvidenceExamples(examples, outfits);
  const validation =
    state.lastRun?.validation || (outfits.length ? outfits.map((outfit) => validateOutfit(outfit, user)) : []);

  document.querySelector("#preferenceList").innerHTML = visibleLearnedPreferences.length
    ? visibleLearnedPreferences.map((pref) => `
        ${
          state.memoryEditMode
            ? `<button type="button" class="match-tag preference-tag is-deletable" data-delete-memory="${escapeHtml(pref.word)}" aria-label="删除偏好 ${escapeHtml(pref.word)}"><span>${escapeHtml(pref.word)}</span></button>`
            : `<span class="match-tag preference-tag"><span>${escapeHtml(pref.word)}</span></span>`
        }
      `).join("")
    : `<span class="match-tag">暂无历史偏好</span>`;
  const memoryEditButton = document.querySelector("#memoryEditButton");
  if (memoryEditButton) {
    memoryEditButton.textContent = state.memoryEditMode ? "完成" : "编辑";
    memoryEditButton.setAttribute("aria-pressed", String(state.memoryEditMode));
  }

  document.querySelector("#exampleList").innerHTML = state.lastRun
    ? evidenceExamples.length
      ? evidenceExamples
          .map((example) => {
            const imageSrc = sampleImageSrc(example);
            return `
        <div class="example-row compact-example-row">
          <div>
            <strong>${escapeHtml(example.id)}</strong>
            <div class="tag-row">
              ${sampleDisplayTags(example)
                .map((tag) => `<span class="match-tag">${escapeHtml(tag)}</span>`)
                .join("")}
            </div>
          </div>
          <button class="sample-preview-button" type="button" data-sample-preview="${escapeHtml(imageSrc)}" data-sample-title="${escapeHtml(example.id)}" ${imageSrc ? "" : "disabled"}>预览</button>
        </div>
      `;
          })
          .join("")
      : `<div class="example-row evidence-placeholder">本次模型没有返回可展示的参考样例。</div>`
    : `<div class="example-row evidence-placeholder">调用模型生成搭配后会显示参考样例。</div>`;

  document.querySelector("#validationList").innerHTML = state.lastRun
    ? outfits.length
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
    : `<div class="validation-row"><span class="check-dot">i</span><div><strong>等待输出</strong><p>模型生成后会校验衣物编号。</p></div></div>`
    : `<div class="validation-row"><span class="check-dot">i</span><div><strong>等待模型调用</strong><p>调用模型生成搭配后会显示校验结果。</p></div></div>`;

  const context = {
    user: {
      id: user.id,
      name: user.name,
      profile: user.profile,
      wardrobe_items: wardrobeDisplayEntries(user).map((entry) => entry.displayId),
      profile_preference_summary: profileSummary(user),
      learned_preferences: visibleLearnedPreferences.map((pref) => pref.word),
      recommendation_signals: preferences.map((pref) => pref.word),
      preference_memory: user.preferenceMemory || createPreferenceMemory()
    },
    intent,
    api_analysis: state.lastRun?.analysis || null,
    mechanical_audit: state.lastRun?.mechanicalAudit || null,
    rag: {
      mode: state.lastRun?.ragResult?.mode || "mock_preview",
      retrieval_query: intent.retrievalQuery || intent.parsed?.retrieval_query || null
    },
    generation: state.lastRun?.generationResult || null,
    retrieved_examples: evidenceExamples.map((example) => example.id),
    output_contract: {
      style: "自然语言 + 具体衣物编号",
      closet_mode: "只能使用当前用户 wardrobe_items（#编号）",
      inspiration_mode: "非衣柜单品必须标为 insp-*"
    }
  };
  document.querySelector("#promptPreview").textContent = JSON.stringify(context, null, 2);
  renderEvidenceCollapsedState();
}

function renderEvidenceCollapsedState() {
  [
    ["examples", "#exampleList"],
    ["validation", "#validationList"],
    ["prompt", "#promptPreview"]
  ].forEach(([key, selector]) => {
    const collapsed = Boolean(state.evidenceCollapsed[key]);
    const content = document.querySelector(selector);
    const button = document.querySelector(`button[data-evidence-toggle="${key}"]`);
    if (content) content.hidden = collapsed;
    if (button) {
      button.textContent = collapsed ? "展开" : "收起";
      button.setAttribute("aria-expanded", String(!collapsed));
    }
  });
}

function renderRequestPanelState() {
  const form = document.querySelector("#intentForm");
  const toggle = document.querySelector("#requestToggleButton");
  if (!form || !toggle) return;
  const collapsed = Boolean(state.requestPanelCollapsed);
  form.hidden = collapsed;
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.setAttribute("aria-label", collapsed ? "展开需求" : "收起需求");
  toggle.title = collapsed ? "展开需求" : "收起需求";
  toggle.querySelector("span").textContent = collapsed ? "展开" : "收起";
}

function render() {
  document.documentElement.classList.toggle("image-mode", state.visualizingOutfit || state.addingWardrobeItem);
  document.documentElement.classList.toggle("wardrobe-edit-mode", state.addingWardrobeItem);
  document.documentElement.classList.toggle("visual-tryon-mode", state.visualizingOutfit);
  renderRequestPanelState();
  renderUsers();
  renderCloset();
  renderChat();
  renderEvidence();
}

async function refreshApiStatus() {
  const badge = document.querySelector("#apiStatusBadge");
  if (!badge) return;
  if (window.location.protocol === "file:") {
    badge.textContent = "需本地代理";
    badge.title = "直接打开 HTML 不能可靠调用千问；请使用 start-aiwardrobe.bat 打开页面";
    updateApiHint("直接打开 HTML 不能可靠调用千问，请使用 start-aiwardrobe.bat 打开页面。");
    return;
  }
  try {
    const response = await fetch("/api/status");
    const status = await response.json();
    if (!response.ok) throw new Error(status.error || "status failed");
    if (status.qwenConfigured) {
      badge.textContent = status.embeddingIndexReady ? "千问 API + RAG 已接入" : "千问 API 已接入";
      badge.title = status.embeddingIndexReady
        ? `生成模型：${status.generationModel}；向量模型：${status.embeddingModel}`
        : "还没有生成 example_embeddings.json，RAG 会先用关键词检索";
      updateApiHint("");
    } else {
      badge.textContent = "API 未配置";
      badge.title = "请在 .env 中填写 DASHSCOPE_API_KEY";
      updateApiHint("请在 .env 中填写 DASHSCOPE_API_KEY，或点击检测后输入 Key。");
    }
  } catch {
    badge.textContent = "API 未检测";
    badge.title = "需要通过 node server.js 访问页面才能检测 API 状态";
    updateApiHint("需要通过 start-aiwardrobe.bat 或 node server.js 打开页面，才能检测 API 状态。");
  }
}

function updateApiHint(text) {
  const hint = document.querySelector("#apiStatusHint");
  if (!hint) return;
  hint.textContent = text;
  hint.hidden = !text;
}

function updateApiBadge(text, title = "") {
  const badge = document.querySelector("#apiStatusBadge");
  if (!badge) return;
  badge.textContent = text;
  badge.title = title;
  const needsVisibleHint = ["需本地代理", "API 未配置", "API 未检测", "检测失败"].includes(text);
  updateApiHint(needsVisibleHint ? title : "");
}

async function fetchJsonOrThrow(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || payload.error || `请求失败：${response.status}`);
  return payload;
}

function promptDashscopeApiKey() {
  return window.prompt("请输入阿里云百炼 API Key。通过本地服务检测时，验证通过会写入 .env。");
}

async function runServerApiCheck() {
  return fetchJsonOrThrow("/api/quick-check");
}

async function validateAndSaveKeyWithServer(apiKey) {
  return fetchJsonOrThrow("/api/validate-and-save-key", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ apiKey })
  });
}

async function runApiCheck() {
  const button = document.querySelector("#apiCheckButton");
  if (button) {
    button.disabled = true;
    button.textContent = "检测中";
  }
  updateApiBadge("检测中", "正在快速验证本地服务、千问快测模型和向量模型");

  try {
    if (window.location.protocol === "file:") {
      updateApiBadge("需本地代理", "请双击 start-aiwardrobe.bat 打开页面后再检测");
      return;
    }
    const result = await runServerApiCheck();
    if (result.reason === "server_unconfigured") {
      const apiKey = promptDashscopeApiKey();
      if (!apiKey) {
        updateApiBadge("API 未配置", "已取消检测");
      } else {
        await validateAndSaveKeyWithServer(apiKey);
        updateApiBadge("千问 API 已保存", ".env 已写入 DASHSCOPE_API_KEY；当前服务已可直接调用千问");
      }
    } else if (result.ok) {
      const elapsed = [result.chatElapsedMs, result.embeddingElapsedMs]
        .filter((value) => Number.isFinite(value))
        .reduce((sum, value) => sum + value, 0);
      updateApiBadge(
        result.mode === "qwen_rag" ? "千问 API + RAG 已接入" : "千问 API 验证通过",
        elapsed ? `${result.message}；快测耗时 ${(elapsed / 1000).toFixed(1)} 秒` : result.message
      );
    } else {
      updateApiBadge("API 未检测", result.message);
    }
  } catch (error) {
    const message =
      error instanceof TypeError
        ? "本地代理没有响应；请双击 start-aiwardrobe.bat 打开页面后再检测"
        : error.message;
    updateApiBadge("检测失败", message);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "检测";
    }
  }
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
    state.closetEditMode = false;
    state.closetSearchQuery = "";
    state.addingWardrobeItem = false;
    state.visualizingOutfit = false;
    state.visualResult = null;
    state.visualBusy = false;
    state.visualNotice = "";
    resetWardrobeEditorState();
    state.lastRun = null;
    saveState();
    render();
  });

  document.querySelector("#closetRail").addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-delete-wardrobe-index]");
    if (button) {
      const deleteIndex = Number(button.dataset.deleteWardrobeIndex);
      const user = activeUser();
      const deletedItem = user.wardrobeItems?.[deleteIndex];
      if (!deletedItem) return;
      const displayId = `#${deleteIndex + 1}`;
      const itemName = wardrobeItemName(deletedItem) || "未命名衣物";
      if (!window.confirm(`确定要删除「${displayId}-${itemName}」这件衣服吗？`)) return;
      if (deletedItem?.imageSource === "generated") {
        await deleteGeneratedWardrobeImage(deletedItem);
      }
      user.wardrobeItems = (user.wardrobeItems || []).filter((_, index) => index !== deleteIndex);
      if (state.editingWardrobeIndex === deleteIndex) resetWardrobeEditorState();
      state.lastRun = null;
      saveState();
      render();
      return;
    }
    const tile = event.target.closest("[data-edit-wardrobe-index]");
    if (!tile) return;
    if (state.pendingReply) return;
    openWardrobeEditPanel(Number(tile.dataset.editWardrobeIndex));
    render();
  });
  document.querySelector("#closetRail").addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    if (event.target.closest("button[data-delete-wardrobe-index]")) return;
    const tile = event.target.closest("[data-edit-wardrobe-index]");
    if (!tile) return;
    if (state.pendingReply) return;
    event.preventDefault();
    openWardrobeEditPanel(Number(tile.dataset.editWardrobeIndex));
    render();
  });
  document.querySelector("#closetEditButton").addEventListener("click", () => {
    state.closetEditMode = !state.closetEditMode;
    if (!state.closetEditMode) {
      resetWardrobeEditorState();
    }
    render();
  });
  document.querySelector("#closetAddButton").addEventListener("click", () => {
    openWardrobeAddPanel();
    render();
  });
  document.querySelector("#closetSearchInput").addEventListener("input", (event) => {
    state.closetSearchQuery = event.target.value;
    renderCloset();
  });

  document.querySelector("#requestToggleButton").addEventListener("click", () => {
    state.requestPanelCollapsed = !state.requestPanelCollapsed;
    renderRequestPanelState();
  });

  document.querySelector("#newUserButton").addEventListener("click", () => {
    openProfileDialog("create");
  });

  document.querySelector("#editProfileButton").addEventListener("click", () => {
    openProfileDialog("edit", activeUser());
  });

  document.querySelector("#cancelProfileButton").addEventListener("click", () => {
    document.querySelector("#userProfileDialog").close();
  });

  document.querySelector("#profileMemoryEditButton").addEventListener("click", (event) => {
    event.preventDefault();
    if (state.profileDialogMode !== "edit") return;
    state.profileMemoryEditMode = !state.profileMemoryEditMode;
    renderMemoryPreview(activeUser());
  });

  document.querySelector("#userProfileForm").addEventListener("click", (event) => {
    const deleteButton = event.target.closest("button[data-delete-profile-memory]");
    if (!deleteButton) return;
    event.preventDefault();
    const word = deleteButton.dataset.deleteProfileMemory;
    if (!window.confirm(`确定要删除「${word}」的历史偏好吗？`)) return;
    removePreferenceWord(activeUser(), word);
    state.lastRun = null;
    saveState();
    renderMemoryPreview(activeUser());
    renderEvidence();
  });

  document.querySelector("#userProfileForm").addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
      syncNoneOption(event.target);
    }
  });

  document.querySelector("#userProfileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = document.querySelector("#profileNameInput").value.trim();
    const gender = form.querySelector('input[name="profileGender"]:checked')?.value;
    if (!name || !gender) return;

    const profile = createUserProfile({
      gender,
      preferredStyles: selectedValues(form, "profileStyles"),
      preferredItems: selectedValues(form, "profileItems"),
      preferredColors: selectedValues(form, "profileColors")
    });

    if (state.profileDialogMode === "edit") {
      const user = activeUser();
      user.name = name;
      user.profile = {
        ...profile,
        createdAt: user.profile?.createdAt || profile.createdAt,
        updatedAt: new Date().toISOString()
      };
      state.lastRun = null;
      saveState();
      document.querySelector("#userProfileDialog").close();
      render();
      return;
    }

    const id = `user-${Date.now()}`;
    const profileText = profileSummary({ profile });
    state.users.push({
      id,
      name,
      profile,
      preferenceMemory: createPreferenceMemory(),
      wardrobeItems: createWardrobeItems(["象牙针织短袖", "深靛牛仔裤", "鼠尾草薄风衣", "米白低帮鞋", "焦糖小肩包"]),
      history: [
        {
          role: "assistant",
          text: `新用户已创建。你的基础资料是：${profileText}。之后的聊天记录会自动保存为历史偏好。`,
          createdAt: new Date().toISOString()
        }
      ]
    });
    state.activeUserId = id;
    state.lastRun = null;
    saveState();
    document.querySelector("#userProfileDialog").close();
    render();
  });

  document.querySelector("#clearHistoryButton").addEventListener("click", () => {
    const user = activeUser();
    if (!window.confirm(`清空 ${user.name} 的聊天历史？`)) return;
    const clearMemory = window.confirm(
      "同时清空从聊天里提取的偏好记忆吗？\n\n确定：清空聊天历史和偏好记忆。\n取消：只清空聊天历史，保留已学习的偏好。"
    );
    user.history = [
      {
        role: "assistant",
        text: clearMemory
          ? "历史和偏好记忆已清空。新的聊天会重新形成偏好记忆。"
          : "历史已清空。已学习的偏好记忆仍会保留，你也可以再次清空并选择同时清除偏好记忆。"
      }
    ];
    if (clearMemory) {
      user.preferenceMemory = createPreferenceMemory();
    }
    state.lastRun = null;
    saveState();
    render();
  });

  document.querySelector("#deleteUserButton").addEventListener("click", async () => {
    const user = activeUser();
    if (!user || state.users.length <= 1) return;
    const confirmed = window.confirm(
      `删除用户「${user.name}」？\n\n这会永久删除该用户的资料、偏好记忆、聊天历史和衣柜。该用户衣柜中的模型生成图片也会从本地删除；本地上传图片不会被额外删除。`
    );
    if (!confirmed) return;
    await deleteGeneratedWardrobeImages(user.wardrobeItems || []);
    state.users = state.users.filter((item) => item.id !== user.id);
    state.activeUserId = state.users[0]?.id || "";
    state.lastRun = null;
    state.visualizingOutfit = false;
    resetWardrobeEditorState();
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

  ["#heightInput", "#bodyTypeInput", "#ageInput", "#weatherInput", "#occasionInput", "#moodInput"].forEach((selector) => {
    document.querySelector(selector).addEventListener("input", renderEvidence);
    document.querySelector(selector).addEventListener("change", renderEvidence);
  });

  document.querySelector(".evidence-panel").addEventListener("click", (event) => {
    const memoryButton = event.target.closest("#memoryEditButton");
    if (memoryButton) {
      state.memoryEditMode = !state.memoryEditMode;
      renderEvidence();
      return;
    }
    const memoryDeleteButton = event.target.closest("button[data-delete-memory]");
    if (memoryDeleteButton) {
      const word = memoryDeleteButton.dataset.deleteMemory;
      if (!window.confirm(`确定要删除「${word}」的历史偏好吗？`)) return;
      removePreferenceWord(activeUser(), word);
      saveState();
      renderEvidence();
      return;
    }
    const previewButton = event.target.closest("button[data-sample-preview]");
    if (previewButton && previewButton.dataset.samplePreview) {
      const dialog = document.querySelector("#samplePreviewDialog");
      document.querySelector("#samplePreviewTitle").textContent = `${previewButton.dataset.sampleTitle || "样例"} 预览`;
      document.querySelector("#samplePreviewImage").src = previewButton.dataset.samplePreview;
      dialog.showModal();
      return;
    }
    const button = event.target.closest("button[data-evidence-toggle]");
    if (button) {
      const key = button.dataset.evidenceToggle;
      state.evidenceCollapsed[key] = !state.evidenceCollapsed[key];
      renderEvidence();
    }
  });

  document.querySelector("#closeSamplePreviewButton").addEventListener("click", () => {
    document.querySelector("#samplePreviewDialog").close();
  });

  document.querySelector("#chatMessages").addEventListener("click", async (event) => {
    if (event.target.closest("[data-open-visualizer]")) {
      state.visualizingOutfit = true;
      state.visualResult = null;
      state.visualNotice = "选择一个方案后生成效果图。";
      render();
      return;
    }
    if (event.target.closest("#backToChatButton")) {
      state.visualizingOutfit = false;
      state.visualBusy = false;
      render();
      return;
    }
    const visualButton = event.target.closest("button[data-visual-scheme]");
    if (!visualButton || state.visualBusy) return;
    const schemeIndex = Number(visualButton.dataset.visualScheme);
    const outfit = state.lastRun?.outfits?.[schemeIndex];
    if (!outfit) return;
    const user = activeUser();
    state.lastRun.visualResults = state.lastRun.visualResults || {};
    const cachedResult = state.lastRun.visualResults[schemeIndex];
    if (cachedResult?.images?.length && cachedResult.promptVersion === visualPromptVersion) {
      state.visualResult = cachedResult;
      state.visualNotice = `已显示本次聊天中方案${schemeIndex + 1}生成过的效果图，没有重复调用万相。`;
      renderChat();
      return;
    }
    state.visualBusy = true;
    state.visualResult = null;
    state.visualNotice = `正在调用万相生成方案${schemeIndex + 1}的上身效果。`;
    renderChat();
    try {
      const result = await visualizeOutfitByApi({ user, outfit, schemeIndex });
      const versionedResult = { ...result, promptVersion: visualPromptVersion };
      state.lastRun.visualResults[schemeIndex] = versionedResult;
      state.visualResult = versionedResult;
      state.visualNotice = `生成完成：${result.model || "wan2.7-image-pro"}，耗时 ${((result.elapsedMs || 0) / 1000).toFixed(1)} 秒。图片链接 24 小时内有效。`;
    } catch (error) {
      state.visualNotice = `生成失败：${compactVisualErrorMessage(error.message)}`;
    } finally {
      state.visualBusy = false;
      renderChat();
    }
  });

  document.querySelector("#chatMessages").addEventListener("change", (event) => {
    if (!event.target.matches("#wardrobeImageInput")) return;
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      state.wardrobeAddNotice = "请选择图片文件。";
      renderChat();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      state.pendingWardrobeImage = String(reader.result || "");
      state.pendingWardrobeImageChanged = true;
      state.wardrobeGeneratedItem = null;
      state.wardrobeGenerationKind = "";
      state.wardrobeRegenerateMode = false;
      state.wardrobeRegeneratePrompt = "";
      state.wardrobeAddedMessage = "";
      state.wardrobeAddNotice = "图片导入成功。";
      renderChat();
    };
    reader.onerror = () => {
      state.wardrobeAddNotice = "图片导入失败，请重新选择。";
      renderChat();
    };
    reader.readAsDataURL(file);
  });

  document.querySelector("#chatMessages").addEventListener("input", (event) => {
    if (event.target.matches("#wardrobeNameInput")) {
      state.pendingWardrobeName = event.target.value;
      if (state.wardrobeGeneratedItem) {
        state.wardrobeGeneratedItem = {
          ...state.wardrobeGeneratedItem,
          name: event.target.value
        };
      }
      state.wardrobeAddedMessage = "";
      return;
    }
    if (event.target.matches("#wardrobeRegeneratePromptInput")) {
      state.wardrobeRegeneratePrompt = event.target.value;
    }
  });

  document.querySelector("#chatMessages").addEventListener("click", async (event) => {
    if (event.target.closest("#cancelWardrobeAddButton")) {
      resetWardrobeEditorState();
      render();
      return;
    }
    if (event.target.closest("#confirmWardrobeAddButton")) {
      const generated = state.wardrobeGeneratedItem;
      if (!generated || state.closetSaving) return;
      const editingIndex = Number.isInteger(state.editingWardrobeIndex) ? state.editingWardrobeIndex : null;
      const saved = saveWardrobeItemToUser({ item: generated, editingIndex });
      state.wardrobeAddedMessage = `已添加！${saved.name}，编号${saved.displayId}。`;
      state.wardrobeAddNotice = "";
      render();
      return;
    }
    if (event.target.closest("#regenerateWardrobeButton")) {
      if (!state.wardrobeRegenerateMode) {
        state.wardrobeRegenerateMode = true;
        renderChat();
        return;
      }
      if (state.closetSaving) return;
      const instruction = (document.querySelector("#wardrobeRegeneratePromptInput")?.value || state.wardrobeRegeneratePrompt).trim();
      const name = (document.querySelector("#wardrobeNameInput")?.value || state.pendingWardrobeName || state.wardrobeGeneratedItem?.name || "").trim();
      const kind = state.wardrobeGenerationKind;
      const imageForAnalysis = kind === "description" ? state.pendingWardrobeImage || state.wardrobeGeneratedItem?.image || "" : "";
      state.closetSaving = true;
      state.wardrobeAddNotice =
        kind === "description"
          ? "正在添加衣物描述，请稍候..."
          : "正在添加衣物示意图，请稍候...";
      renderChat();
      try {
        const analysis = await analyzeWardrobeItemByApi({ name, image: imageForAnalysis, instruction });
        const nextItem = {
          name: (analysis.name || name || state.wardrobeGeneratedItem?.name || "").trim(),
          description: analysis.description || state.wardrobeGeneratedItem?.description || "",
          image:
            kind === "description"
              ? state.pendingWardrobeImage || state.wardrobeGeneratedItem?.image || ""
              : analysis.image || state.wardrobeGeneratedItem?.image || "",
          imageSource:
            kind === "description"
              ? (state.pendingWardrobeImage || state.wardrobeGeneratedItem?.image || "").startsWith("/GeneratedWardrobeImages/")
                ? state.wardrobeGeneratedItem?.imageSource || "generated"
                : ""
              : analysis.imageSource || state.wardrobeGeneratedItem?.imageSource || "",
          imagePath:
            kind === "description"
              ? (state.pendingWardrobeImage || state.wardrobeGeneratedItem?.image || "").startsWith("/GeneratedWardrobeImages/")
                ? state.wardrobeGeneratedItem?.imagePath || ""
                : ""
              : analysis.imagePath || state.wardrobeGeneratedItem?.imagePath || ""
        };
        state.wardrobeGeneratedItem = nextItem;
        state.pendingWardrobeName = nextItem.name;
        if (nextItem.image) state.pendingWardrobeImage = nextItem.image;
        state.wardrobeAddNotice = "";
      } catch (error) {
        state.wardrobeAddNotice = `重新生成失败：${compactVisualErrorMessage(error.message)}`;
      } finally {
        state.closetSaving = false;
        renderChat();
      }
    }
  });

  document.querySelector("#chatMessages").addEventListener("submit", async (event) => {
    if (!event.target.matches("#wardrobeAddForm")) return;
    event.preventDefault();
    if (state.closetSaving) return;
    const name = (document.querySelector("#wardrobeNameInput")?.value || state.pendingWardrobeName).trim();
    const editingIndex = Number.isInteger(state.editingWardrobeIndex) ? state.editingWardrobeIndex : null;
    const user = activeUser();
    const editingItem = editingIndex !== null ? user.wardrobeItems?.[editingIndex] : null;
    if (!state.pendingWardrobeImage && !name) {
      state.wardrobeAddNotice = "请至少填写衣物名称或导入一张图片。";
      renderChat();
      return;
    }
    const originalName = editingItem ? wardrobeItemName(editingItem) || "" : "";
    const hasName = Boolean(name);
    const hasImage = typeof state.pendingWardrobeImage === "string" && state.pendingWardrobeImage.startsWith("data:image/");
    const needsGeneratedName = !hasName && hasImage;
    const needsGeneratedImage = hasName && !hasImage;
    const shouldRegenerateAnalysis = needsGeneratedName || needsGeneratedImage;
    const generationKind = needsGeneratedName ? "description" : needsGeneratedImage ? "image" : "";
    const imageForAnalysis = needsGeneratedName ? state.pendingWardrobeImage || "" : "";
    state.closetSaving = true;
    state.lastRun = null;
    state.wardrobeAddNotice = shouldRegenerateAnalysis
      ? imageForAnalysis
        ? "正在添加衣物描述，请稍候..."
        : "正在添加衣物示意图，请稍候..."
      : "正在保存衣物。";
    render();
    let analysis = null;
    let usedAnalysisFallback = false;
    if (shouldRegenerateAnalysis) {
      try {
        analysis = await analyzeWardrobeItemByApi({ name, image: imageForAnalysis });
        usedAnalysisFallback =
          analysis?._meta?.provider === "local_fallback" ||
          Boolean(analysis?._meta?.analysisError || analysis?._meta?.illustrationError);
      } catch (error) {
        usedAnalysisFallback = true;
        analysis = localWardrobeItemAnalysis({
          name,
          image: imageForAnalysis,
          errorMessage: error.message
        });
      }
    } else {
      analysis = {
        name: name || originalName,
        description: editingItem?.description || "",
        image: state.pendingWardrobeImage || editingItem?.image || ""
      };
    }
    const finalName = (analysis.name || name || `未命名衣物${(user.wardrobeItems || []).length + 1}`).trim();
    const finalImage = state.pendingWardrobeImageChanged
      ? state.pendingWardrobeImage || analysis.image || ""
      : shouldRegenerateAnalysis
        ? analysis.image || editingItem?.image || state.pendingWardrobeImage || ""
        : editingItem?.image || state.pendingWardrobeImage || "";
    const finalImageIsGenerated = finalImage.startsWith("/GeneratedWardrobeImages/");
    const nextItem = {
      name: finalName,
      description: analysis.description || `${finalName}。暂无详细描述。`,
      image: finalImage,
      imageSource: finalImageIsGenerated ? analysis.imageSource || editingItem?.imageSource || "generated" : "",
      imagePath: finalImageIsGenerated ? analysis.imagePath || editingItem?.imagePath || "" : ""
    };
    if (shouldRegenerateAnalysis) {
      state.wardrobeGeneratedItem = nextItem;
      state.wardrobeGenerationKind = generationKind;
      state.pendingWardrobeName = finalName;
      if (finalImage) state.pendingWardrobeImage = finalImage;
      state.wardrobeRegenerateMode = false;
      state.wardrobeRegeneratePrompt = "";
      state.wardrobeAddNotice = usedAnalysisFallback ? "部分 AI 步骤暂时失败，已使用本地兜底。" : "";
      state.closetSaving = false;
      renderChat();
      return;
    }
    const saved = saveWardrobeItemToUser({ item: nextItem, editingIndex });
    state.wardrobeGeneratedItem = nextItem;
    state.wardrobeGenerationKind = "";
    state.wardrobeAddedMessage = `已添加！${saved.name}，编号${saved.displayId}。`;
    state.wardrobeAddNotice = "";
    state.closetSaving = false;
    render();
  });

  document.querySelector("#chatForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (state.pendingReply) return;
    const input = document.querySelector("#messageInput");
    const message = input.value.trim();
    if (!message) return;
    const user = activeUser();
    const userMessageEntry = pushHistory(user, "user", message, { weight: 0, auditStatus: "pending" });
    input.value = "";
    state.closetEditMode = false;
    resetWardrobeEditorState();
    state.pendingReply = { userId: user.id, text: "正在思考，请稍候" };
    saveState();
    render();
    try {
      await runRecommendation(message, userMessageEntry);
    } catch (error) {
      userMessageEntry.auditStatus = "api_failed";
      state.pendingReply = null;
      pushHistory(user, "assistant", `生成时出现问题：${error.message}`, { weight: 0, auditStatus: "api_failed" });
      saveState();
      render();
    }
  });

  document.querySelector("#apiCheckButton")?.addEventListener("click", runApiCheck);
}

loadState();
bindControls();
render();
refreshApiStatus();


