/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// const data = [
//   {
//     name: "9am",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "10am",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "11am",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "12pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "1pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "2pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "3pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "4pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "5pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "6pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "7pm",
//     total: Math.floor(Math.random() * 10),
//   },
//   {
//     name: "8pm",
//     total: Math.floor(Math.random() * 10),
//   },
// ];

export function Overview({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
