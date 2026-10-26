import type { NextApiRequest, NextApiResponse } from "next";
import {
  sameOrigin,
  throttle,
  validPassword,
  setSession,
  isAdmin,
  origin,
} from "../../../lib/server/auth";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET")
    return res
      .status(isAdmin(req) ? 200 : 401)
      .json({ authenticated: isAdmin(req) });
  if (!sameOrigin(req, res)) return;
  if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      `kz_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${origin().startsWith("https:") ? "; Secure" : ""}`,
    );
    return res.status(200).json({ ok: true });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).end();
  }
  if (!throttle(req, res, "login", 10, 900)) return;
  if (
    !validPassword(
      typeof req.body?.password === "string" ? req.body.password : "",
    )
  )
    return res.status(401).json({ error: "INVALID_LOGIN" });
  try {
    setSession(res);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(503).json({ error: "ADMIN_NOT_CONFIGURED" });
  }
}
