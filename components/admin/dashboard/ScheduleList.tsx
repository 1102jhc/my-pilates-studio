import React from 'react';

// 일정 데이터 타입 정의 (나중에 API 연결 시 사용)
interface Schedule {
  id: number;
  time: string;
  room: string;
  title: string;
  instructor: string;
  currentStudents: number;
  maxStudents: number;
}

export default function ScheduleList() {
  // 샘플 데이터 (나중에 Supabase DB에서 가져올 부분)
  const schedules: Schedule[] = [
    { id: 1, time: "18:00", room: "A룸", title: "그룹 필라테스", instructor: "이미나 강사", currentStudents: 6, maxStudents: 6 },
    { id: 2, time: "19:00", room: "B룸", title: "1:1 개인레슨", instructor: "최윤서 강사", currentStudents: 1, maxStudents: 1 },
    { id: 3, time: "20:00", room: "A룸", title: "그룹 필라테스", instructor: "박소연 강사", currentStudents: 4, maxStudents: 6 },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 헤더 영역 */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900">오늘의 레슨 일정</h3>
          <p className="text-xs text-gray-400 mt-1">2026. 05. 05 (화)</p>
        </div>
        <button className="text-xs text-indigo-600 font-semibold hover:underline">일정 추가</button>
      </div>

      {/* 일정 리스트 영역 */}
      <div className="p-6 space-y-6">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="flex items-start gap-4 border-l-4 border-indigo-500 pl-4 py-1">
            {/* 시간 */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{schedule.time}</span>
              <span className="text-[10px] text-gray-400 uppercase font-medium">{schedule.room}</span>
            </div>

            {/* 레슨 정보 */}
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 leading-tight">{schedule.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{schedule.instructor}</p>
            </div>

            {/* 인원 현황 (Full일 때 강조) */}
            <div className="text-right">
              <div className={`text-xs font-bold ${schedule.currentStudents >= schedule.maxStudents ? 'text-red-500' : 'text-indigo-600'}`}>
                {schedule.currentStudents} / {schedule.maxStudents}
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5">예약중</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}