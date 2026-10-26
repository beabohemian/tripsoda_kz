import { ReactNode } from "react";
export default function GuideShell({ children }: { children: ReactNode }) {
  return (
    <div className="kz-site guide-site">
      <header className="guide-nav">
        <a href="/" aria-label="트립소다 카자흐스탄 홈">
          <img src="/images/logo.png" alt="TripSoda Kazakhstan" />
        </a>
        <nav aria-label="여행 가이드 메뉴">
          <a href="/guides/">여행 가이드</a>
          <a href="/#proposal">맞춤여행 문의</a>
        </nav>
      </header>
      {children}
      <footer className="guide-footer">
        <a href="/">트립소다 카자흐스탄</a>
        <p>
          카자흐스탄과 키르기스스탄, 직접 여행을 준비하는 사람들을 위한 안내.
        </p>
        <a href="https://tripsoda.com">트립소다에서 여행 동행 찾기 ↗</a>
      </footer>
    </div>
  );
}
