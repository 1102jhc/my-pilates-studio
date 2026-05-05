// components/admin/dashboard/StatsGrid.tsx
import StatCard from '../StatCard';

export default function StatsGrid() {
  // 여기서 DB 데이터를 fetch해서 넘겨줌
  const stats = [
    { title: "미확인 문의", value: "3", unit: "건", color: "text-red-500" },
    { title: "오늘 남은 수업", value: "8", unit: "타임", color: "text-indigo-600" },
    { title: "이번 주 신규 등록", value: "12", unit: "명" },
    { title: "이번 달 예상 매출", value: "1,250", unit: "만원" },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </section>
  );
}