import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
// Read a password through stdin, never as a command-line argument.
let input = "";
for await (const chunk of process.stdin) input += chunk;
const password = input.trim();
if (password.length < 16)
  throw new Error("Use a unique password of at least 16 characters.");
const salt = randomBytes(32).toString("hex");
const content = existsSync(".env.local")
  ? readFileSync(".env.local", "utf8")
  : "";
const values = {
  ADMIN_PASSWORD_HASH: `${salt}:${scryptSync(password, salt, 64).toString("hex")}`,
  ADMIN_SESSION_SECRET: randomBytes(48).toString("hex"),
};
let result = content;
for (const [key, value] of Object.entries(values)) {
  result = result.replace(new RegExp(`^${key}=.*$`, "gm"), "");
  result += `\n${key}=${value}\n`;
}
writeFileSync(".env.local", result, { mode: 0o600 });
console.log(
  "Administrator credentials configured. No password was printed. Restart the server.",
);
