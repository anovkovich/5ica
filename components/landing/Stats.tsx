const stats = [
  {
    value: "8.500+",
    label: "Pitanja u bazi",
    sub: "Sva 14 predmeta osnovne škole",
  },
  {
    value: "298",
    label: "Oblasti i poglavlja",
    sub: "Pokriveno gradivo 1-8. razreda",
  },
  {
    value: "90 dana",
    label: "Sprint priprema",
    sub: "Personalizovan plan + 12 mock testova",
  },
  {
    value: "0 RSD",
    label: "Free verzija",
    sub: "Sva pitanja, lige, drugovi, duel",
  },
];

export function Stats() {
  return (
    <section className="py-12 bg-neutral text-neutral-content border-y border-neutral/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-5xl font-extrabold leading-none mb-2 bg-gradient-to-br from-accent to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="font-semibold text-sm md:text-base mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-neutral-content/60 leading-tight">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
