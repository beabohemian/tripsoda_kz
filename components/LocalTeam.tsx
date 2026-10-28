import { teamMembers, type TeamLanguage } from "../lib/team";

export default function LocalTeam({ lang = "ko" }: { lang?: TeamLanguage }) {
  const ko = lang === "ko";
  const copy = {
    ko: ["현지에서 만나는 사람들.", "운영팀", "문의와 일정 설계부터 현장 운영까지, 여행의 앞뒤를 함께 챙깁니다.", "가이드팀", "한국어로 소통하며 카자흐스탄의 풍경과 문화를 안내합니다.", "소개된 구성원 외에도 현지 가이드들이 함께합니다. 일정과 언어, 행사 성격에 맞춰 담당자와 가이드를 배정하며, 배정 내용은 예약 진행 시 안내합니다."],
    en: ["Meet your team on the ground.", "Operations Team", "From your first enquiry and itinerary planning to local coordination.", "Guide Team", "Discover Kazakhstan’s landscapes and culture with Korean-speaking local guides.", "Additional local guides work with our team. Your coordinator and guide are assigned according to your itinerary, language and event requirements, with details shared during booking."],
    ru: ["Ваша команда на месте.", "Организация поездок", "От первого обращения и планирования маршрута до координации на месте.", "Команда гидов", "Знакомим с природой и культурой Казахстана на корейском языке.", "С нами работают и другие местные гиды. Координатор и гид назначаются с учётом маршрута, языка и формата мероприятия. Подробности сообщаем при бронировании."],
    kk: ["Жергілікті командамен танысыңыз.", "Ұйымдастыру тобы", "Алғашқы сұраудан бастап маршрутты жоспарлау мен жергілікті үйлестіруге дейін көмектесеміз.", "Гидтер тобы", "Қазақстанның табиғаты мен мәдениетін корей тілінде таныстырамыз.", "Бізбен басқа жергілікті гидтер де жұмыс істейді. Жауапты маман мен гид бағдарламаға, тілге және іс-шара түріне қарай тағайындалады. Мәліметтер брондау кезінде хабарланады."],
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
      <p className="team-assignment-note">{copy[5]}</p>
    </section>
  );
}
