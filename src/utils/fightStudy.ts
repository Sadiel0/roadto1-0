interface Fight {
  fighterName: string;
  fightName: string;
  focusNotes: string;
}

const FIGHT_DATABASE: Fight[] = [
  {
    fighterName: "Khabib Nurmagomedov",
    fightName: "vs. Conor McGregor",
    focusNotes: "Pressure, takedown chains, ground control. Never backing down.",
  },
  {
    fighterName: "Jon Jones",
    fightName: "vs. Daniel Cormier 1",
    focusNotes: "Distance management, feints, clinch work, fight IQ.",
  },
  {
    fighterName: "Anderson Silva",
    fightName: "vs. Chael Sonnen 1",
    focusNotes: "Composure under pressure, submission defense, finishing ability.",
  },
  {
    fighterName: "Fedor Emelianenko",
    fightName: "vs. Mirko Cro Cop",
    focusNotes: "Patience, counter-striking, ground transitions, composure.",
  },
  {
    fighterName: "Georges St-Pierre",
    fightName: "vs. BJ Penn 2",
    focusNotes: "Wrestling dominance, cardio, game plan execution.",
  },
  {
    fighterName: "Jose Aldo",
    fightName: "vs. Urijah Faber",
    focusNotes: "Leg kicks, takedown defense, pace control.",
  },
  {
    fighterName: "Demetrious Johnson",
    fightName: "vs. Ray Borg",
    focusNotes: "Speed, transitions, fight IQ, finishing sequences.",
  },
  {
    fighterName: "Daniel Cormier",
    fightName: "vs. Stipe Miocic 1",
    focusNotes: "Pressure, wrestling, cardio, mental toughness.",
  },
];

export function getFightOfTheDay(): Fight {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return FIGHT_DATABASE[dayOfYear % FIGHT_DATABASE.length];
}
