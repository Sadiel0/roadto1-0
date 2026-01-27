const REFLECTION_PROMPTS = [
  "What did you learn about yourself today?",
  "Where did you show weakness? How will you address it?",
  "What one thing will you do better tomorrow?",
  "What are you avoiding? Why?",
  "Did you give everything today? If not, why?",
  "What would your future self tell you right now?",
  "What fear did you face today?",
  "What discipline did you practice?",
  "Where did you cut corners?",
  "What did you prove to yourself?",
  "What will you remember from today's training?",
  "What did you sacrifice today?",
  "How did you push past your limits?",
  "What would make tomorrow better?",
  "What are you building toward?",
];

export function getReflectionPrompt(): string {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return REFLECTION_PROMPTS[dayOfYear % REFLECTION_PROMPTS.length];
}
