import { useState } from 'react';
import {
  Target, Calendar, MapPin, Clock, CheckCircle2, Circle,
  TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp,
  Zap, Trophy, Flag,
} from 'lucide-react';
import { ATHLETES } from '../../lib/mockData';
import PageLayout from '../../components/layout/PageLayout';
import {
  UPCOMING_EVENTS, COMBINE_BENCHMARKS, TRAINING_PLAN,
  getEventTypeColor, getEventTypeLabel,
} from '../../lib/combineData';

export default function CombinePrepPage() {
  const athlete = ATHLETES[0];
  const [expandedWeek, setExpandedWeek] = useState<string | null>('plan-3');

  const totalSessions = TRAINING_PLAN.flatMap(w => w.sessions).length;
  const completedSessions = TRAINING_PLAN.flatMap(w => w.sessions).filter(s => s.completed).length;
  const overallProgress = Math.round((completedSessions / totalSessions) * 100);

  const nextEvent = UPCOMING_EVENTS[0];

  return (
    <PageLayout
      role="athlete"
      title="Combine Prep"
      userName={athlete.name}
      userPhoto={athlete.photoUrl}
      notificationCount={3}
    >
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Target size={22} className="text-gold-primary" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Combine Prep</h2>
        </div>
        <p className="text-gray-500 text-xs md:text-sm">Track your benchmarks, training plan, and upcoming events.</p>
      </div>

      {/* Countdown hero */}
      <div className="bg-gradient-to-r from-gold-primary/[0.08] to-transparent border border-gold-primary/20 rounded-xl p-4 md:p-5 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Next Event</p>
            <h3 className="text-white font-bold text-base md:text-lg">{nextEvent.name}</h3>
            <div className="flex items-center gap-3 mt-1 text-gray-500 text-xs">
              <span className="flex items-center gap-1"><MapPin size={10} />{nextEvent.location}</span>
              <span className="flex items-center gap-1"><Calendar size={10} />{new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-gold-primary font-mono text-3xl md:text-4xl font-black">{nextEvent.daysUntil}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Days Until</p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left: Benchmarks */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Target Benchmarks</h3>
          <div className="space-y-2">
            {COMBINE_BENCHMARKS.map(bench => {
              const isTimeBased = bench.unit === 's';
              return (
                <div key={bench.metric} className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-xs md:text-sm font-medium">{bench.metric}</span>
                    <div className="flex items-center gap-2">
                      {bench.trend === 'up' && <TrendingUp size={12} className="text-gold-primary" />}
                      {bench.trend === 'down' && <TrendingDown size={12} className="text-gold-primary" />}
                      {bench.trend === 'flat' && <Minus size={12} className="text-gold-bronze" />}
                      <span className="text-gold-primary font-mono text-xs font-bold">
                        {bench.current}{bench.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${bench.percentToTarget}%`,
                          backgroundColor: bench.percentToTarget >= 90 ? '#FFD700' : bench.percentToTarget >= 70 ? '#D4AF37' : '#CD7F32',
                        }}
                      />
                    </div>
                    <span className="text-gray-500 text-[10px] font-mono shrink-0">
                      {isTimeBased ? '→' : '→'} {bench.target}{bench.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Training Plan */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Training Plan</h3>
            <span className="text-gold-primary text-xs font-mono font-bold">{overallProgress}% Complete</span>
          </div>

          {/* Overall progress */}
          <div className="mb-3">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-primary to-gold-bright rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-gray-600">
              <span>{completedSessions}/{totalSessions} sessions</span>
              <span>4-week plan</span>
            </div>
          </div>

          {/* Week cards */}
          <div className="space-y-2">
            {TRAINING_PLAN.map(week => {
              const weekCompleted = week.sessions.filter(s => s.completed).length;
              const weekTotal = week.sessions.length;
              const isExpanded = expandedWeek === week.id;

              return (
                <div key={week.id} className="bg-black-card border border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                    className="w-full flex items-center justify-between p-3 md:p-4 hover:bg-black-elevated/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 ${
                        week.completed ? 'bg-gold-primary/10' : weekCompleted > 0 ? 'bg-gold-bronze/10' : 'bg-gray-800'
                      }`}>
                        {week.completed ? (
                          <CheckCircle2 size={14} className="text-gold-primary" />
                        ) : (
                          <span className="text-gray-500 text-[10px] font-mono font-bold">W{week.week}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-white text-xs md:text-sm font-medium">Week {week.week}: {week.focus}</p>
                        <p className="text-gray-500 text-[10px]">{weekCompleted}/{weekTotal} sessions</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                  </button>

                  {isExpanded && (
                    <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-1.5">
                      {week.sessions.map((session, i) => (
                        <div key={i} className="flex items-center gap-3 py-1.5">
                          {session.completed ? (
                            <CheckCircle2 size={14} className="text-gold-primary shrink-0" />
                          ) : (
                            <Circle size={14} className="text-gray-600 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${session.completed ? 'text-gray-400' : 'text-white'}`}>
                                {session.type}
                              </span>
                              {session.duration > 0 && (
                                <span className="text-gray-600 text-[10px] font-mono flex items-center gap-1">
                                  <Clock size={8} />{session.duration}m
                                </span>
                              )}
                            </div>
                            {session.notes && (
                              <p className="text-gold-primary/60 text-[10px] mt-0.5">{session.notes}</p>
                            )}
                          </div>
                          <span className="text-gray-600 text-[10px] font-mono shrink-0 w-8 text-right">{session.day}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 md:mt-8">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Upcoming Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {UPCOMING_EVENTS.map(event => (
            <div key={event.id} className="bg-black-card border border-gray-800 rounded-lg p-3 md:p-4 hover:border-gold-primary/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    color: getEventTypeColor(event.type),
                    backgroundColor: `${getEventTypeColor(event.type)}15`,
                  }}
                >
                  {getEventTypeLabel(event.type)}
                </span>
                {event.registered ? (
                  <span className="text-[9px] bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded-full font-bold uppercase">
                    Registered
                  </span>
                ) : (
                  <span className="text-[9px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase">
                    Open
                  </span>
                )}
              </div>
              <h4 className="text-white text-sm font-bold mb-1">{event.name}</h4>
              <div className="flex items-center gap-3 text-gray-500 text-[10px]">
                <span className="flex items-center gap-1"><MapPin size={9} />{event.location}</span>
                <span className="flex items-center gap-1">
                  <Calendar size={9} />
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <Flag size={10} className="text-gold-primary" />
                <span className="text-gold-primary font-mono text-xs font-bold">{event.daysUntil} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Readiness summary */}
      <div className="mt-6 md:mt-8 bg-black-card border border-gray-800 rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-gold-primary" />
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Combine Readiness</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-gold-primary font-mono text-xl md:text-2xl font-bold">{overallProgress}%</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Training</p>
          </div>
          <div className="text-center">
            <p className="text-gold-bright font-mono text-xl md:text-2xl font-bold">78%</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Benchmarks</p>
          </div>
          <div className="text-center">
            <p className="text-white font-mono text-xl md:text-2xl font-bold">92</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Reliability</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Trophy size={16} className="text-gold-primary" />
              <p className="text-gold-primary font-mono text-xl md:text-2xl font-bold">A-</p>
            </div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wider">Overall</p>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-12 text-center">
        <p className="text-gray-700 text-xs md:text-sm uppercase tracking-[0.3em]">
          Prepare like a champion. Perform like one.
        </p>
      </div>
    </PageLayout>
  );
}
