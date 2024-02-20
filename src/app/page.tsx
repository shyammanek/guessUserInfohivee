"use client";
import Demo from "./demo";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hi Vee</h1>
      <h1>Guess Age, Gender, and Country</h1>
      <Demo />
    </main>
  );
}
