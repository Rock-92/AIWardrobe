const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "Dataset", "Description_example.json");
const outputPath = path.join(root, "Dataset", "example_embeddings.json");
const dashscopeBaseUrl = (process.env.DASHSCOPE_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1").replace(
  /\/+$/,
  ""
);

loadEnv(path.join(root, ".env"));

function loadEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const clean = line.trim();
    if (!clean || clean.startsWith("#")) return;
    const match = clean.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) return;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  });
}

function flattenTags(tags = {}) {
  return Object.values(tags)
    .flat()
    .filter(Boolean)
    .join("、");
}

function buildEmbeddingText(example) {
  return [
    `样例编号：${example.id}`,
    `描述：${example.description}`,
    `标签：${flattenTags(example.tags)}`
  ].join("\n");
}

async function createEmbeddings(inputs) {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey || apiKey.includes("请替换")) throw new Error("DASHSCOPE_API_KEY is not configured. Create .env first.");

  const model = process.env.DASHSCOPE_EMBEDDING_MODEL || "text-embedding-v4";
  const response = await fetch(`${dashscopeBaseUrl}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: inputs,
      encoding_format: "float"
    })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || "Embedding API request failed");
  return payload.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
}

async function createAllEmbeddings(inputs, batchSize = 10) {
  const embeddings = [];
  for (let index = 0; index < inputs.length; index += batchSize) {
    const batch = inputs.slice(index, index + batchSize);
    const batchEmbeddings = await createEmbeddings(batch);
    embeddings.push(...batchEmbeddings);
    console.log(`embedded=${embeddings.length}/${inputs.length}`);
  }
  return embeddings;
}

async function main() {
  const examples = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const inputs = examples.map(buildEmbeddingText);
  const embeddings = await createAllEmbeddings(inputs);
  const model = process.env.DASHSCOPE_EMBEDDING_MODEL || "text-embedding-v4";

  const records = examples.map((example, index) => ({
    id: example.id,
    pic: example.pic,
    image_path: example.image_path,
    description: example.description,
    tags: example.tags,
    embedding_text: inputs[index],
    embedding_model: model,
    embedding: embeddings[index]
  }));

  fs.writeFileSync(outputPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  console.log(`examples=${records.length}`);
  console.log(`model=${model}`);
  console.log(`output=${path.relative(root, outputPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
