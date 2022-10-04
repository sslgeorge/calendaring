interface CalendaringProps {
  date: string | Date;
  aspectRatio?: number;
  showHighlights?: boolean;
  containerId: string;
}

export function Calendaring(params: CalendaringProps) {
  console.log('working');
  // render(
  //   <Calendar
  //     date={new Date(params.date)}
  //     aspectRatio={params.aspectRatio}
  //     showHighlights={params.showHighlights}
  //   />,
  //   document.body
  // );
}
