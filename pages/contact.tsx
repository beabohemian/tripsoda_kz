import Head from 'next/head'
import { MapPin, Phone, Mail } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        duration: '',
        pax: '',
        destinations: '',
        accommodation: 'hotel',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus('success')
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    duration: '',
                    pax: '',
                    destinations: '',
                    accommodation: 'hotel',
                    message: ''
                })
            } else {
                throw new Error(data.message || 'Failed to send message')
            }
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <>
            <Head>
                <title>문의하기 | 트립소다 카자흐스탄</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold text-center text-tripsoda-textMain mb-12">문의하기</h1>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-tripsoda-textMain mb-4">연락처 및 위치</h2>
                            <p className="text-gray-600 mb-6">
                                여행 관련 궁금한 점은 언제든 문의해주세요. <br />
                                현지 담당자가 친절하게 답변해 드립니다.
                            </p>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-tripsoda-light p-3 rounded-full text-tripsoda-main">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">전화 / 왓츠앱</h3>
                                <p className="text-gray-600">+7 778 986 1833</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-tripsoda-light p-3 rounded-full text-tripsoda-main">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">이메일</h3>
                                <p className="text-gray-600">jinki@tripsoda.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-tripsoda-light p-3 rounded-full text-tripsoda-main">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">오시는 길</h3>
                                <p className="text-gray-600">카자흐스탄 알마티, 나자르바예프 대로 65</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        {status === 'success' && (
                            <div className="absolute inset-0 z-20 bg-white/95 flex flex-col items-center justify-center animate-fade-in text-center p-8">
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg transform scale-110">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">문의가 접수되었습니다!</h3>
                                <p className="text-gray-600 mb-8">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    확인
                                </button>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center justify-between">
                                <span>❌ 전송에 실패했습니다. 다시 시도해주시거나 이메일로 직접 문의해주세요.</span>
                                <button onClick={() => setStatus('idle')} className="text-sm underline hover:text-red-800">닫기</button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Info */}
                            <div>
                                <h3 className="text-lg font-bold text-tripsoda-main mb-4 border-b pb-2">1. 기본 정보</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">이름 (필수)</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="홍길동"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">연락처 (필수)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="010-1234-5678"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">이메일 (견적서 받으실 곳)</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="example@email.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Trip Details */}
                            <div>
                                <h3 className="text-lg font-bold text-tripsoda-main mb-4 border-b pb-2">2. 여행 계획</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">예상 여행 날짜</label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all bg-white"
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">여행 기간</label>
                                        <input
                                            type="text"
                                            name="duration"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="예: 4박 6일"
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">인원 수</label>
                                        <input
                                            type="text"
                                            name="pax"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="성인 2명, 아동 1명"
                                            value={formData.pax}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">선호 숙소 형태</label>
                                        <select
                                            name="accommodation"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all bg-white"
                                            value={formData.accommodation}
                                            onChange={handleChange}
                                        >
                                            <option value="hotel">호텔 (3~4성급)</option>
                                            <option value="luxury">럭셔리 호텔 (5성급)</option>
                                            <option value="yurt">유르트 (전통 체험)</option>
                                            <option value="guesthouse">게스트하우스 (가성비)</option>
                                            <option value="camping">캠핑/글램핑</option>
                                            <option value="mix">상담 후 결정 (믹스)</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">희망 방문지 / 액티비티</label>
                                        <input
                                            type="text"
                                            name="destinations"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all"
                                            placeholder="예: 차른캐년, 승마 체험, 스키 등"
                                            value={formData.destinations}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <h3 className="text-lg font-bold text-tripsoda-main mb-4 border-b pb-2">3. 기타 문의사항</h3>
                                <textarea
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-tripsoda-main focus:ring-2 focus:ring-tripsoda-light outline-none transition-all resize-none"
                                    placeholder="특별한 요청사항이나 궁금한 점이 있으시면 자유롭게 적어주세요."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-tripsoda-main text-white font-bold py-4 rounded-xl hover:bg-tripsoda-dark transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? '전송 중...' : '견적 요청하기'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
