"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Manila",
});

/** Live Manila clock for the footer. Renders a placeholder on the server so
 *  the SSR HTML never disagrees with the client. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="meta tnum">
      manila · {time ?? "--:-- --"} gmt+8
    </span>
  );
}
