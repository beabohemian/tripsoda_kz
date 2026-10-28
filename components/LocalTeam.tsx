import { teamMembers, type TeamLanguage } from "../lib/team";

export default function LocalTeam({ lang = "ko" }: { lang?: TeamLanguage }) {
  const ko = lang === "ko";
  const groups = [
    { id: "operations", title: ko ? "운영팀" : "Operations Team", text: ko ? "문의와 일정 설계부터 현장 운영까지, 여행의 앞뒤를 함께 챙깁니다." : "From your first enquiry and itinerary planning to local coordination." },
    { id: "guides", title: ko ? "가이드팀" : "Guide Team", text: ko ? "한국어로 소통하며 카자흐스탄의 풍경과 문화를 안내합니다." : "Discover Kazakhstan’s landscapes and culture with Korean-speaking local guides." },
  ] as const;
  return (
    <section className="kz-section local-team" id="local-team" aria-labelledby="local-team-title">
      <span className="kz-eyebrow green">YOUR LOCAL TEAM</span>
      <h2 id="local-team-title">{ko ? "현지에서 만나는 사람들." : "Meet your team on the ground."}</h2>
      {groups.map(group => (
        <div className="team-group" key={group.id}>
          <div className="team-group-heading"><h3>{group.title}</h3><p>{group.text}</p></div>
          <div className="guide-grid">
            {teamMembers.filter(person => person.group === group.id).map(person => (
              <article key={person.id}>
                <img src={person.image} alt={person.name[lang]} loading="lazy" width="600" height="680" className={`team-photo team-photo-${person.id}`} />
                <div>
                  <h4>{person.name[lang]}{ko && <span className="team-name-en">{person.name.en}</span>}</h4>
                  <p className="team-role">{person.role[lang]}</p>
                  <p className="team-bio">{person.bio[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
      <p className="team-assignment-note">{ko ? "소개된 구성원 외에도 현지 가이드들이 함께합니다. 일정과 언어, 행사 성격에 맞춰 담당자와 가이드를 배정하며, 배정 내용은 예약 진행 시 안내합니다." : "Additional local guides work with our team. Your coordinator and guide are assigned according to your itinerary, language and event requirements, with details shared during booking."}</p>
    </section>
  );
}
