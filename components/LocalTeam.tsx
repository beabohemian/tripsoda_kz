import { teamMembers, type TeamLanguage } from "../lib/team";

export default function LocalTeam({ lang = "ko" }: { lang?: TeamLanguage }) {
  const ko = lang === "ko";
  const copy = {
    ko: ["현지에서 만나는 사람들.", "운영팀", "문의와 일정 설계부터 현장 운영까지, 여행의 앞뒤를 함께 챙깁니다.", "가이드팀", "카자흐스탄의 풍경과 문화를 안내하는 현지 가이드팀입니다.", "소개된 구성원 외에도 선별된 현지 가이드들이 함께합니다. 행사 성격에 맞춰 담당자 및 가이드가 배정되며, 예약 확정 시 안내합니다. 모든 가이드가 한국어 가이드는 아닙니다. 자유여행 개인 고객에게는 기본적으로 영어 가이드가 배정됩니다. 한국어 안내가 필요하다면 예약 전 요청해 주세요."],
    en: ["Meet your team on the ground.", "Operations Team", "From your first enquiry and itinerary planning to local coordination.", "Guide Team", "Meet the local guides who introduce Kazakhstan’s landscapes and culture.", "Additional selected local guides work with our team. Your coordinator and guide are assigned according to the nature of your trip or event and announced when your booking is confirmed. Not all guides speak Korean. Individual independent travellers are assigned an English-speaking guide by default. If you need a Korean-speaking guide, please request one before booking."],
    ru: ["Ваша команда на месте.", "Организация поездок", "От первого обращения и планирования маршрута до координации на месте.", "Команда гидов", "Местные гиды знакомят гостей с природой и культурой Казахстана.", "С нами работают и другие отобранные местные гиды. Координатор и гид назначаются с учётом формата поездки или мероприятия; подробности сообщаем при подтверждении бронирования. Не все гиды говорят по-корейски. Индивидуальным самостоятельным путешественникам по умолчанию назначается англоговорящий гид. Если нужен корейскоговорящий гид, сообщите об этом до бронирования."],
    kk: ["Жергілікті командамен танысыңыз.", "Ұйымдастыру тобы", "Алғашқы сұраудан бастап маршрутты жоспарлау мен жергілікті үйлестіруге дейін көмектесеміз.", "Гидтер тобы", "Жергілікті гидтер Қазақстанның табиғаты мен мәдениетін таныстырады.", "Бізбен басқа да іріктелген жергілікті гидтер жұмыс істейді. Жауапты маман мен гид сапардың немесе іс-шараның сипатына қарай тағайындалып, брондау расталған кезде хабарланады. Барлық гид корей тілінде сөйлемейді. Жеке еркін саяхатшыларға әдетте ағылшын тілінде сөйлейтін гид тағайындалады. Корей тіліндегі гид қажет болса, брондаудан бұрын хабарлаңыз."],
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
