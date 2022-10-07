// import { DateRange, Event } from '../types';
//
// export function generateEventFromDateRange(dateRange: DateRange): Event[] {
//   const { start, end } = dateRange;
//   const events: Event[] = [];
//   const diff = Math.abs(end.getTime() - start.getTime());
//   const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//   for (let i = 0; i < days; i++) {
//     const date = new Date(start);
//     date.setDate(date.getDate() + i);
//     events.push({
//       allDay: false,
//       end: undefined,
//       groupId: '',
//       id: '',
//       start: undefined,
//       title: 'Event',
//     });
//   }
//   return events;
// }
//
// export function eventIsWithinDateRange(event: Event, dateRange: DateRange): boolean {
//   const { start, end } = dateRange;
//   const { start: eventStart, end: eventEnd } = event;
//   return eventStart >= start && eventEnd <= end;
// }
//
// export function eventStartOrEndIsInDateRange(event: Event, dateRange: DateRange): boolean {
//   const { start, end } = dateRange;
//   const { start: eventStart, end: eventEnd } = event;
//   return (eventStart >= start && eventStart <= end) || (eventEnd >= start && eventEnd <= end);
// }
//
// export function eventStartOrEndIsInMonth(event: Event, date: Date): boolean {
//   const { start: eventStart, end: eventEnd } = event;
//   const start = new Date(eventStart);
//   const end = new Date(eventEnd);
//   return start.getMonth() === date.getMonth() || end.getMonth() === date.getMonth();
// }
