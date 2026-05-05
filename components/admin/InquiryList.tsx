export default function InquiryList() {
  const inquiries = [
    { id: 1, name: "김민지", phone: "010-1234-5678", program: "1:1 개인레슨", time: "14:00", isNew: true },
    { id: 2, name: "이준호", phone: "010-9876-5432", program: "6:1 그룹 필라테스", time: "11:30", isNew: true },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 className="font-bold text-gray-900">신규 상담 신청</h3>
        <button className="text-xs text-indigo-600 font-semibold">전체보기</button>
      </div>
      <div className="divide-y divide-gray-50">
        {inquiries.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{item.name}</span>
                {item.isNew && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
              </div>
              <p className="text-xs text-gray-500 mt-1">{item.program} · {item.phone}</p>
            </div>
            <p className="text-xs font-medium text-gray-400">{item.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}