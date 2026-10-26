import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const labels: Record<string, string> = {
  requested: "신규 접수",
  contacted: "담당자 연락",
  awaiting_deposit: "계약금 대기",
  confirmed: "예약 확정",
  cancelled: "취소",
};
const mailLabels: Record<string, string> = {
  pending: "발송 대기",
  sent: "발송 완료",
  failed: "발송 실패",
};
const serviceLabels: Record<string, string> = {
  custom: "맞춤여행",
  group: "단체여행",
  vehicle: "차량",
  guide: "가이드",
  hotel: "숙박",
  event: "현지 행사",
  incentive: "인센티브",
  business: "출장",
  interpreter: "통역",
  protocol: "의전",
};
export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false),
    [checking, setChecking] = useState(true),
    [password, setPassword] = useState(""),
    [rows, setRows] = useState<any[]>([]),
    [selected, setSelected] = useState<any>(null),
    [filter, setFilter] = useState(""),
    [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [mailReady, setMailReady] = useState(false),
    [status, setStatus] = useState("requested"),
    [notes, setNotes] = useState(""),
    [deposit, setDeposit] = useState({
      amount: "",
      currency: "KRW",
      reference: "",
      verified: false,
    });
  async function load() {
    try {
      const response = await fetch(
        `/api/admin/inquiries/?status=${filter}&page=${page}`,
      );
      if (response.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!response.ok) throw new Error();
      const data = await response.json();
      setRows(data.rows);
      setTotal(data.total);
      setMailReady(data.mailConfigured);
    } catch {
      setError("목록을 불러오지 못했습니다. 다시 시도해 주세요.");
    }
  }
  useEffect(() => {
    document.documentElement.lang = "ko";
    fetch("/api/admin/session/")
      .then((r) => setAuthenticated(r.ok))
      .catch(() => setError("서버에 연결할 수 없습니다."))
      .finally(() => setChecking(false));
  }, []);
  useEffect(() => {
    if (authenticated) void load();
  }, [authenticated, filter, page]);
  function select(row: any) {
    setSelected(row);
    setStatus(row.status);
    setNotes(row.notes);
    setDeposit({
      amount: row.deposit?.amount?.toString() || "",
      currency: row.deposit?.currency || "KRW",
      reference: row.deposit?.reference || "",
      verified: false,
    });
    setError("");
  }
  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!r.ok) throw new Error();
      setAuthenticated(true);
      setPassword("");
    } catch {
      setError(
        "로그인 정보를 확인해 주세요. 반복 실패 시 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    await fetch("/api/admin/session/", { method: "DELETE" });
    setAuthenticated(false);
    setRows([]);
    setSelected(null);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          version: selected.version,
          status,
          notes,
          deposit: { ...deposit, amount: Number(deposit.amount) },
        }),
      });
      const d = await r.json();
      if (!r.ok) {
        if (d.error === "CONFLICT")
          throw new Error(
            "다른 변경이 있습니다. 목록을 새로고침하고 다시 선택해 주세요.",
          );
        if (d.error === "DEPOSIT_REQUIRED")
          throw new Error(
            "계약금 금액, 통화, 입금 확인 내역과 확인 체크가 필요합니다.",
          );
        if (d.error === "INVALID_TRANSITION")
          throw new Error(
            "신규 접수 → 담당자 연락 → 계약금 대기 → 예약 확정 순서로 처리해 주세요.",
          );
        throw new Error("변경을 저장하지 못했습니다.");
      }
      select(d.row);
      await load();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function retry() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/admin/inquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry-mail" }),
      });
      if (!r.ok) throw new Error();
      await load();
    } catch {
      setError(
        "이메일 설정과 연결을 확인해 주세요. 접수 내용은 저장되어 있습니다.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="kz-admin">
      <Head>
        <title>접수 관리 | 트립소다 카자흐스탄</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <header>
        <Link href="/">
          <a>
            <img src="/images/logo.png" alt="TripSoda Kazakhstan LLP" />
          </a>
        </Link>
        <span>문의·예약 관리</span>
        {authenticated && <button onClick={logout}>로그아웃</button>}
      </header>
      {error && (
        <p className="admin-error" role="alert">
          {error}
        </p>
      )}
      {checking ? (
        <p>로그인 상태 확인 중…</p>
      ) : !authenticated ? (
        <form className="admin-login" onSubmit={login}>
          <h1>담당자 로그인</h1>
          <p>접수 내용은 인증된 담당자만 확인할 수 있습니다.</p>
          <label>
            관리자 비밀번호
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button disabled={busy}>{busy ? "확인 중…" : "로그인"}</button>
        </form>
      ) : (
        <>
          <div className="admin-toolbar">
            <div>
              <h1>문의·예약 접수</h1>
              <p>총 {total}건 · 계좌 입금은 담당자가 직접 확인합니다.</p>
            </div>
            <div>
              <button onClick={load}>새로고침</button>
              <button disabled={busy || !mailReady} onClick={retry}>
                미발송 알림 재전송
              </button>
            </div>
          </div>
          {!mailReady && (
            <p className="admin-notice">
              이메일 발송 설정이 아직 연결되지 않았습니다. 접수 내용은 저장되며,
              설정 후 대기 중인 알림을 재전송할 수 있습니다.
            </p>
          )}
          <label className="admin-filter">
            상태{" "}
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(0);
              }}
            >
              <option value="">전체</option>
              {Object.entries(labels).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <div className="admin-columns">
            <section className="admin-list">
              {rows.length === 0 ? (
                <p>해당 접수가 없습니다.</p>
              ) : (
                rows.map((row) => (
                  <button
                    key={row.id}
                    className={selected?.id === row.id ? "selected" : ""}
                    onClick={() => select(row)}
                  >
                    <span>
                      {labels[row.status]} ·{" "}
                      {row.payload.intent === "booking" ? "예약 신청" : "문의"}
                    </span>
                    <strong>
                      {row.payload.name}
                      {row.payload.company && ` · ${row.payload.company}`}
                    </strong>
                    <p>
                      {row.payload.date || "일정 협의"} · {row.payload.people}명
                      ·{" "}
                      {row.payload.audience === "business"
                        ? "기업·여행사"
                        : "개인·그룹"}
                    </p>
                    <small>
                      {new Date(row.created_at).toLocaleString("ko-KR", {
                        timeZone: "Asia/Seoul",
                      })}{" "}
                      KST · 이메일 {mailLabels[row.notification]}
                    </small>
                  </button>
                ))
              )}
              <div className="admin-pagination">
                <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                  이전
                </button>
                <span>{page + 1}페이지</span>
                <button
                  disabled={(page + 1) * 50 >= total}
                  onClick={() => setPage(page + 1)}
                >
                  다음
                </button>
              </div>
            </section>
            <section className="admin-detail">
              {selected ? (
                <>
                  <h2>{selected.payload.name}</h2>
                  <small>{selected.id}</small>
                  <dl>
                    <dt>고객 구분</dt>
                    <dd>
                      {selected.payload.audience === "business"
                        ? "기업·여행사"
                        : "개인·그룹"}{" "}
                      /{" "}
                      {selected.payload.intent === "booking"
                        ? "예약 신청"
                        : "견적 문의"}
                    </dd>
                    <dt>회사</dt>
                    <dd>{selected.payload.company || "—"}</dd>
                    <dt>이메일</dt>
                    <dd>
                      <a href={`mailto:${selected.payload.email}`}>
                        {selected.payload.email}
                      </a>
                    </dd>
                    <dt>희망 일정·인원</dt>
                    <dd>
                      {selected.payload.date || "협의"} /{" "}
                      {selected.payload.people}명
                    </dd>
                    <dt>예산</dt>
                    <dd>{selected.payload.budget || "협의"}</dd>
                    <dt>언어</dt>
                    <dd>{selected.payload.language}</dd>
                    <dt>요청 서비스</dt>
                    <dd>
                      {selected.payload.services
                        .map((v: string) => serviceLabels[v] || v)
                        .join(", ") || "협의"}
                    </dd>
                    <dt>참고 코스</dt>
                    <dd>{selected.payload.example || "자유 요청"}</dd>
                    <dt>요청 사항</dt>
                    <dd className="preserve-lines">
                      {selected.payload.message}
                    </dd>
                  </dl>
                  {selected.deposit && (
                    <p className="admin-notice">
                      입금 확인: {selected.deposit.amount}{" "}
                      {selected.deposit.currency} · {selected.deposit.reference}{" "}
                      ·{" "}
                      {new Date(selected.deposit.verified_at).toLocaleString(
                        "ko-KR",
                        { timeZone: "Asia/Seoul" },
                      )}{" "}
                      KST
                    </p>
                  )}
                  <form onSubmit={save}>
                    <label>
                      처리 상태
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {Object.entries(labels).map(([v, l]) => (
                          <option key={v} value={v}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </label>
                    {status === "confirmed" &&
                      selected.status !== "confirmed" && (
                        <fieldset>
                          <legend>계약금 입금 확인</legend>
                          <label>
                            입금 금액
                            <input
                              required
                              type="number"
                              min="0.01"
                              step="0.01"
                              value={deposit.amount}
                              onChange={(e) =>
                                setDeposit({
                                  ...deposit,
                                  amount: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label>
                            통화
                            <select
                              value={deposit.currency}
                              onChange={(e) =>
                                setDeposit({
                                  ...deposit,
                                  currency: e.target.value,
                                })
                              }
                            >
                              {["KRW", "USD", "KZT", "EUR"].map((v) => (
                                <option key={v}>{v}</option>
                              ))}
                            </select>
                          </label>
                          <label>
                            입금 확인 메모 / 거래번호
                            <input
                              required
                              minLength={3}
                              maxLength={150}
                              value={deposit.reference}
                              onChange={(e) =>
                                setDeposit({
                                  ...deposit,
                                  reference: e.target.value,
                                })
                              }
                            />
                          </label>
                          <label className="admin-check">
                            <input
                              type="checkbox"
                              required
                              checked={deposit.verified}
                              onChange={(e) =>
                                setDeposit({
                                  ...deposit,
                                  verified: e.target.checked,
                                })
                              }
                            />
                            실제 입금을 확인했습니다.
                          </label>
                        </fieldset>
                      )}
                    <label>
                      담당자 메모
                      <textarea
                        rows={5}
                        maxLength={5000}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </label>
                    <button disabled={busy} type="submit">
                      {busy ? "저장 중…" : "변경 저장"}
                    </button>
                  </form>
                </>
              ) : (
                <p>왼쪽에서 접수를 선택하세요.</p>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
