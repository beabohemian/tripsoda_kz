import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
const env = {
  ...process.env,
  KZ_STATIC_EXPORT: "1",
  NEXT_PUBLIC_CONTACT_MODE: "whatsapp",
};
const next = "node_modules/next/dist/bin/next";
for (const args of [["build"], ["export"]]) {
  const result = spawnSync(process.execPath, [next, ...args], {
    env,
    stdio: "inherit",
  });
  if (result.status !== 0) process.exit(result.status || 1);
}
for (const privatePath of ["out/admin", "out/preview-medical", "out/api"]) {
  if (existsSync(privatePath))
    throw new Error(`Private route unexpectedly exported: ${privatePath}`);
}
// Build manifests are unnecessary for a static site; do not expose private route names.
rmSync("out/_next/server", { recursive: true, force: true });
console.log(
  "Static release ready: WhatsApp inquiries; no admin/API/preview routes.",
);
