import { teamMembers, type TeamLanguage } from "../lib/team";

export default function LocalTeam({ lang = "ko" }: { lang?: TeamLanguage }) {
  const ko = lang === "ko";
  const copy = {
    ko: ["현지에서 만나는 사람들.", "운영팀", "문의와 일정 설계부터 현장 운영까지, 여행의 앞뒤를 함께 챙깁니다.", "가이드팀", "카자흐스탄의 풍경과 문화를 안내하는 현지 가이드팀입니다."],
    en: ["Meet your team on the ground.", "Operations Team", "From your first enquiry and itinerary planning to local coordination.", "Guide Team", "Meet the local guides who introduce Kazakhstan’s landscapes and culture."],
    ru: ["Ваша команда на месте.", "Организация поездок", "От первого обращения и планирования маршрута до координации на месте.", "Команда гидов", "Местные гиды знакомят гостей с природой и культурой Казахстана."],
    kk: ["Жергілікті командамен танысыңыз.", "Ұйымдастыру тобы", "Алғашқы сұраудан бастап маршрутты жоспарлау мен жергілікті үйлестіруге дейін көмектесеміз.", "Гидтер тобы", "Жергілікті гидтер Қазақстанның табиғаты мен мәдениетін таныстырады."],
  }[lang];
  const assignment = {
    ko: { title: "가이드 배정 안내", intro: "소개된 멤버 외에도 선별된 현지 가이드들이 함께합니다.", timingLabel: "담당자 배정", timing: "행사 성격에 맞춰 배정하며, 예약 확정 시 안내합니다.", languageLabel: "안내 언어", language: "개인 자유여행은 영어 가이드가 기본입니다. 모든 가이드가 한국어를 구사하지는 않으므로, 한국어 안내는 예약 전에 요청해 주세요." },
    en: { title: "Your guide assignment", intro: "Additional selected local guides work with our team.", timingLabel: "Your coordinator & guide", timing: "Assigned to suit your trip or event, with details shared at booking confirmation.", languageLabel: "Guide language", language: "English is the default for individual independent travellers. Not all guides speak Korean; request Korean-language guidance before booking." },
    ru: { title: "Назначение гида", intro: "С нами работают и другие отобранные местные гиды.", timingLabel: "Координатор и гид", timing: "Назначаются с учётом формата поездки. Подробности — при подтверждении бронирования.", languageLabel: "Язык гида", language: "Для индивидуальных самостоятельных поездок по умолчанию предоставляется англоговорящий гид. Не все гиды говорят по-корейски; запросите корейский язык до бронирования." },
    kk: { title: "Гидті тағайындау", intro: "Бізбен басқа да іріктелген жергілікті гидтер жұмыс істейді.", timingLabel: "Жауапты маман мен гид", timing: "Сапар сипатына қарай тағайындалып, брондау расталғанда хабарланады.", languageLabel: "Гидтің тілі", language: "Жеке еркін саяхатшыларға әдетте ағылшын тіліндегі гид тағайындалады. Барлық гид корей тілінде сөйлемейді; корей тіліндегі гидті брондаудан бұрын сұраңыз." },
  }[lang];
  const groups = [
    { id: "operations", title: copy[1], text: copy[2] },
    { id: "guides", title: copy[3], text: copy[4] },
  ] as const;
  return (
    <section className="kz-section local-team" id="local-team" aria-labelledby="local-team-title">
      <span className="kz-eyebrow green">YOUR LOCAL TEAM</span>
      <h2 id="local-team-title">{copy[0]}</h2>
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
      <aside className="team-assignment-note" aria-label={assignment.title}>
        <h3>{assignment.title}</h3>
        <p>{assignment.intro}</p>
        <dl>
          <div><dt>{assignment.timingLabel}</dt><dd>{assignment.timing}</dd></div>
          <div><dt>{assignment.languageLabel}</dt><dd>{assignment.language}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
