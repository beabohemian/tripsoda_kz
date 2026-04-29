import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

// --- 가독성을 대폭 개선한 나레이션 컴포넌트 ---
const FadeText = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }}
      transition={{ duration: 1.0, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`text-xl lg:text-3xl leading-relaxed text-gray-100 font-medium whitespace-pre-line ${className}`}
      style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}
    >
      {children}
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="flex flex-col items-center justify-center text-center mb-20 pt-20">
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="text-mint-400 font-bold text-sm uppercase tracking-[0.3em] mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, delay: 0.1 }}
      className="text-4xl lg:text-6xl font-extrabold text-white"
    >
      {title}
    </motion.h2>
  </div>
);

export default function ProjectAlmatyDetailed() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      <Head>
        <title>트립소다 카자흐스탄 설립 공유의 건</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          body { font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif; word-break: keep-all; }
          .highlight { color: #fff; font-weight: 800; text-decoration: underline; text-decoration-color: #14b8a6; text-underline-offset: 8px; }
          .mint-glow { color: #14b8a6; font-weight: 800; }
          nav { display: none !important; }
        `}</style>
      </Head>

      {/* --- SCENE 1: The Next Step (플랫폼의 완성) --- */}
      <section className="relative min-h-[120vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
            style={{ backgroundImage: "url('/images/tour_charyn_1765783988719.png')" }}
            initial={{ scale: 1.1, filter: 'blur(0px)' }}
            whileInView={{ scale: 1, filter: 'blur(6px)' }}
            transition={{ duration: 2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-black/90 z-0" />

          <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center gap-16">
            <SectionTitle title="트립소다 카자흐스탄 설립 공유의 건" subtitle="온라인 플랫폼에서 온오프라인 플랫폼으로" />

            <FadeText>
              트립소다는 지속적으로 성장하며 새로운 가능성을 증명해 왔습니다.
              하지만 우리는 연결 그 이상의 가치를 고객에게 제공하고자 합니다.
            </FadeText>

            <FadeText delay={0.3}>
              단순히 여행객과 현지 업체를 연결하는 것을 넘어,
              고객이 경험하는 오프라인의 모든 순간까지 완벽하게 책임져야 한다는 결론에 도달했습니다.
            </FadeText>

            <FadeText delay={0.6}>
              우리가 선택한 다음 스텝은 명확합니다.
              <span className="highlight block mt-6">온라인 플랫폼과 현지의 물리적 인프라를 직접 결합하는 것입니다.</span>
            </FadeText>
          </div>
        </div>
      </section>

      {/* --- SCENE 1.5: The New Frontier (어드벤처의 시작) --- */}
      <section className="relative min-h-[120vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
            style={{ backgroundImage: "url('/images/tour_kaindy.png')" }}
            initial={{ scale: 1.1, filter: 'blur(0px)' }}
            whileInView={{ scale: 1, filter: 'blur(4px)' }}
            transition={{ duration: 2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-[#0a0a0a] z-0" />

          <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center gap-12">
            <SectionTitle title="어드벤처의 시작점, 중앙아시아" subtitle="The New Frontier" />

            <FadeText>
              우리의 첫 오프라인 거점으로 수많은 지역 중 왜 중앙아시아를 선택했을까요?
            </FadeText>

            <FadeText delay={0.3}>
              중앙아시아는 거대한 대자연과 미지의 탐험이 살아 숨 쉬는 글로벌 어드벤처의 최전선입니다.
              단순한 관광을 넘어선 역동적인 경험을 원하는 전 세계 여행자들의 수요가 이곳으로 쏟아지고 있습니다.
            </FadeText>

            <FadeText delay={0.6}>
              그중에서도 <span className="highlight">카자흐스탄</span>은 중앙아시아의 경제적, 지리적 중심지이자 가장 발달된 인프라를 갖춘 허브입니다.
              알마티를 거점으로 삼는 것은, 곧 키르기스스탄, 우즈베키스탄 등 타 중앙아시아 국가로 뻗어 나갈 수 있는 가장 강력하고 안정적인 교두보를 확보하는 것을 의미합니다.
            </FadeText>

            <FadeText delay={0.9}>
              <span className="mint-glow">이 거대한 미개척지를 가장 먼저 선점하는 자가, 아시아 어드벤처 투어 시장의 룰을 지배하게 됩니다.</span>
            </FadeText>
          </div>
        </div>
      </section>

      {/* --- SCENE 2: The Ground (실체의 확보) --- */}
      <section className="relative min-h-[120vh] bg-black">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-black z-0" />

          <div className="z-20 w-full max-w-4xl text-center mb-12">
            <SectionTitle title="현지의 실체가 되다" subtitle="The Ground" />
            <FadeText>
              {`트립소다는 중앙아시아의 심장, 카자흐스탄 알마티에 
              우리의 오프라인 거점을 세웠습니다.`}
            </FadeText>
          </div>

          <div className="relative w-full max-w-5xl h-[350px] lg:h-[450px] z-10 flex flex-col items-center justify-center">
            <motion.img
              src="/images/almaty/lounge_finished.jpg"
              className="absolute z-30 w-full max-w-[800px] h-[350px] object-cover shadow-[0_0_50px_rgba(20,184,166,0.2)] rounded-xl border border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.0 }}
            />
          </div>

          <div className="z-20 mt-16 text-center max-w-4xl space-y-12">
            <FadeText delay={0.4}>
              단순한 대행사 계약이나 페이퍼 컴퍼니가 아닙니다.
              카자흐스탄 현지 법인(LLP) 설립을 완료하여 독자적으로 사업을 전개할 기반을 마련했습니다.
            </FadeText>
            <FadeText delay={0.7}>
              이제 우리는 현지 랜드사를 거치지 않고,
              <span className="mint-glow">가이드부터 차량까지 모든 투어를 직접 기획하고 운영합니다.</span>
            </FadeText>
          </div>
        </div>
      </section>

      {/* --- SCENE 2.5: The Journey (실체를 향한 기록) --- */}
      <section className="relative min-h-screen bg-black py-24 border-t border-white/5">
        <div className="w-full max-w-5xl mx-auto px-6 relative">
          <SectionTitle title="오프라인 진출 타임라인" subtitle="The Journey" />

          <div className="text-center mb-24 -mt-10">
            <FadeText>
              {`현지 오퍼레이터를 거치지 않고 독자적인 생태계를 만들기 위해
              우리는 모든 비즈니스 인프라를 바닥부터 직접 설계했습니다.`}
            </FadeText>
          </div>

          <div className="relative border-l-2 border-mint-500/20 ml-12 pl-16 flex flex-col gap-32 pb-32">
            {[
              {
                date: "2025년 7월",
                title: "1차 알마티 출장",
                items: [
                  "알마티 전역의 오프라인 인프라 실사 및 현지 파트너 발굴",
                  "현지 회계 및 법무 법인 섭외 및 미팅 진행",
                  "트립소다 LLP (유한책임회사) 현지 법인 설립 완료"
                ],
                images: ["/images/IMG_9134.jpg", "/images/IMG_1883.jpg"]
              },
              {
                date: "2025년 9월",
                title: "2차 알마티 출장",
                items: [
                  "카자흐스탄 현지 신한은행 법인 계좌 개설 완료",
                  "핵심 파트너(가이드, 호텔, 차량 회사) 운영 역량 및 서비스 검증",
                  "오프라인 거점으로 활용할 최적의 라운지 입지 물색"
                ],
                images: ["/images/IMG_1761.jpg", "/images/IMG_1771.jpg"]
              },
              {
                date: "2025년 12월",
                title: "3차 알마티 출장",
                items: [
                  "나자르바예프 65번지 오프라인 라운지 최종 계약 체결",
                  "트립소다 서비스 스탠다드에 부합하는 검증된 현지 가이드 파트너십 계약 및 교육"
                ],
                images: ["/images/almaty/contract.png", "/images/almaty/inc.png"]
              },
              {
                date: "2026년 3~4월",
                title: "4차 알마티 출장 및 오픈",
                items: [
                  "알마티 라운지 인테리어 및 시설 세팅 완료 후 정식 오픈",
                  "카톤 카라가이 등 신규 핵심 코스 현장 답사 및 운영 동선 기획",
                  "현지 예약, 투어 운영, 정산에 이르는 통합 프로세스 구축"
                ],
                images: ["/images/IMG_9302.jpg", "/images/IMG_6107.jpg", "/images/almaty/lounge_finished.jpg"]
              }
            ].map((record, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative flex flex-col lg:flex-row gap-12 items-start"
              >
                <div className="absolute -left-[73px] top-2 w-4 h-4 rounded-full bg-mint-500 shadow-[0_0_15px_rgba(20,184,166,0.6)] border-2 border-black" />

                <div className="flex-1">
                  <h3 className="text-mint-400 font-bold text-xl mb-2">{record.date}</h3>
                  <h4 className="text-white text-4xl font-bold mb-6">{record.title}</h4>
                  <ul className="space-y-4 text-gray-300 text-lg">
                    {record.items.map((item, j) => (
                      <li key={j} className="flex items-start">
                        <span className="text-mint-500 mr-3 mt-1 font-bold">✔</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {record.images && (
                  <div className="flex-shrink-0 w-full lg:w-[450px] grid grid-cols-2 gap-4">
                    {record.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1) }}
                        className={`${record.images.length === 1 ? 'col-span-2' : ''}`}
                      >
                        <img
                          src={img}
                          alt={`${record.title} ${idx + 1}`}
                          className="w-full h-[180px] object-cover rounded-lg shadow-xl border border-white/10 opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SCENE 3: The System (집요한 운영의 준비) --- */}
      <section className="relative min-h-[120vh] bg-[#050505]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-20">
          <div className="absolute inset-0 bg-[#0a0a0a] z-0" />

          <div className="z-10 w-full max-w-6xl mx-auto flex flex-row items-center gap-16">

            <div className="flex-1 space-y-12">
              <div className="text-left">
                <span className="text-mint-500 font-bold uppercase tracking-widest mb-3 block text-sm">The System</span>
                <h2 className="text-5xl font-bold leading-tight text-white">빈틈 없는 <br />오퍼레이션 프로세스</h2>
              </div>

              <FadeText className="text-left !text-2xl">
                외주를 주지 않는다는 것은, 가장 밑단의 서비스 디테일까지 우리가 직접 통제한다는 뜻입니다.
                우리는 현장에 맞는 <span className="mint-glow">독자적인 업무 규칙</span>을 확립했습니다.
              </FadeText>

              <div className="space-y-8 pl-6 border-l-2 border-mint-500/20">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">01. 서비스 스탠다드 재정의</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">우리 소속 가이드들에게 깊이 있는 스토리텔링과 완벽한 고객 응대, 비상사태 대응 프로토콜을 지속적으로 교육하여 균일한 퀄리티를 보장합니다.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">02. 데이터 기반의 현장 관리</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">차량 일일 점검표, 라운지 운영 매뉴얼, 예약 및 정산 프로세스를 시스템화하여 오차 없는 현지 투어를 운영합니다.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full h-[500px]">
              <motion.img
                src="/images/guide.png"
                alt="Guide Manual"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-[0_0_40px_rgba(20,184,166,0.1)] border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SCENE 4: The Basecamp --- */}
      <section className="relative min-h-screen bg-[#050505]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center z-0 opacity-40"
            style={{ backgroundImage: "url('/images/almaty/lounge_finished.jpg')" }}
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-0" />

          <div className="z-10 max-w-5xl text-center px-6">
            <SectionTitle title="나자르바예프 65번지 라운지" subtitle="The Basecamp" />

            <FadeText>
              알마티 최중심가에 위치한 트립소다 라운지는 단순한 휴식 공간이 아닙니다.
              투어의 시작과 끝을 완벽하게 통제하기 위한 오프라인 전초기지입니다.
            </FadeText>

            <div className="my-12 flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl text-left">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-mint-400 font-bold text-lg mb-2">01. 여행자 라운지 및 베이스캠프</h3>
                  <p className="text-gray-300 text-sm">투어 출발 전후에 고객들이 편안하게 휴식을 취하고 안전하게 일정을 준비할 수 있는 쾌적한 거점 환경을 제공합니다.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-mint-400 font-bold text-lg mb-2">02. 투어 컨트롤 타워</h3>
                  <p className="text-gray-300 text-sm">모든 투어 차량의 출발 및 도착이 이곳에서 이루어지며, 가이드 미팅과 일정 브리핑이 진행됩니다.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-mint-400 font-bold text-lg mb-2">03. 현지 정보 센터</h3>
                  <p className="text-gray-300 text-sm">유심, 환전, 맛집 등 여행자가 가장 필요로 하는 필수 현지 정보를 오프라인에서 직접 제공합니다.</p>
                </div>
              </div>
            </div>

            <FadeText delay={0.3}>
              온라인 앱의 예약 데이터는 이곳 거점을 통해 <span className="mint-glow">완벽한 오프라인 여정으로 치환됩니다.</span>
            </FadeText>
          </div>
        </div>
      </section>

      {/* --- SCENE 5: The Expansion (우리가 나아갈 미래) --- */}
      <section className="relative min-h-[150vh] bg-black">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
          <SectionTitle title="현지 인프라 확장 로드맵" subtitle="The Expansion" />

          <div className="z-10 w-full max-w-4xl">
            <div className="flex flex-col gap-6">
              {[
                { step: "01", title: "압도적 랜드 서비스", desc: "가이드, 차량, 숙박을 직접 계약하고 통제하여 중간 마진을 없애고 최고의 퀄리티를 유지합니다." },
                { step: "02", title: "라운지 거점 유료화", desc: "나자르바예프 65번지 라운지를 거점으로 활용해 현지 유심, 환전 안내 및 투어 관련 오프라인 부가 수익을 창출합니다." },
                { step: "03", title: "B2B 파트너십 역영업", desc: "검증된 직영 인프라를 바탕으로 한국의 타 여행사들에게 고품질 투어 상품을 역으로 공급합니다." },
                { step: "04", title: "렌탈 등 자유여행 서비스 확장", desc: "안전하게 누적된 차량 운영 데이터와 오프라인 거점을 기반으로 렌터카 등 자유여행객을 위한 모빌리티 사업에 진출합니다." },
                { step: "05", title: "타 중앙아시아 시장으로 확장", desc: "카자흐스탄에서 검증된 성공 방정식을 키르기스스탄, 우즈베키스탄 등 타 중앙아시아 국가로 빠르게 복제하여 시장을 장악합니다." }
              ].map((node, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 flex items-center gap-6 md:gap-8 hover:border-mint-500/50 transition-colors"
                >
                  <div className="text-mint-500 font-extrabold text-3xl md:text-5xl opacity-40">{node.step}</div>
                  <div>
                    <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{node.title}</h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">{node.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SCENE 6: The Vision --- */}
      <section className="relative min-h-[120vh] bg-[#050505]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-mint-900/10 to-transparent z-0" />
          <div className="z-20 w-full max-w-5xl text-center px-6">
            <SectionTitle title="자유여행객을 위한 렌터카 모빌리티 인프라" subtitle="The Vision" />

            <FadeText className="mb-12">
              우리의 비즈니스가 왜 투어에서 멈추지 않고 모빌리티로 확장될까요?
              중앙아시아의 대자연을 자유롭게 탐험하려면, 자유여행자들이 믿고 렌트할 수 있는 '안전하고 신뢰할 수 있는 차량 인프라'가 필수적입니다.
            </FadeText>

            <FadeText delay={0.3} className="text-gray-300">
              우리가 자체 투어를 꼼꼼하게 운영하며 축적한 튼튼한 차량 네트워크와 정비/유지보수 노하우는
              패키지 투어를 넘어, 직접 운전대를 잡고 렌터카로 대자연을 누비고자 하는 수많은 '자유여행객'을 흡수하는 압도적인 무기가 됩니다.
            </FadeText>

            <FadeText delay={0.6} className="mt-16">
              트립소다는 온라인 플랫폼의 한계를 깨고 완벽한 오프라인 실체가 되었습니다.
              <span className="mint-glow block mt-6 text-2xl lg:text-4xl">우리는 투어를 넘어, 중앙아시아 자유여행 모빌리티 생태계를 장악할 것입니다.</span>
            </FadeText>
          </div>
        </div>
      </section>
    </div>
  );
}
