import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const routes = new Set(["/", "/about-us", "/contact", "/destinations", "/faqs", "/offers", "/tour-types", "/blog"]);
const sourceFiles = ["src/app", "src/components", "data"].flatMap((relative) => {
  const directory = path.join(root, relative);
  const output = [];
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) visit(full);
      else if (/\.(tsx?|json)$/.test(entry.name)) output.push(full);
    }
  };
  visit(directory);
  return output;
});
const stale = /Distant Journeys|Feefo|ATOL|ABTOT|AITO|British Travel Awards|United Kingdom|Registered in England|UK \(GBP\)|Australia|New Zealand|Sri Lanka|Japan|China|Vietnam|Cambodia|South Africa|Kenya|USA|Canada|Latin America/gi;
const issues = [];
for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(stale)) issues.push(`${path.relative(root, file)}: stale term ${match[0]}`);
  for (const match of content.matchAll(/href=["'`]([^"'`?#]+)/g)) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("/api/") && !href.includes("[") && !routes.has(href) && !href.startsWith("/destinations/") && !href.startsWith("/tour-types/") && !href.includes("-tours/")) issues.push(`${path.relative(root, file)}: route not in registry ${href}`);
  }
}
if (issues.length) {
  console.error(issues.join("\n"));
  process.exitCode = 1;
} else console.log("Content and route validation passed.");