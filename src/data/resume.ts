import { education, experience, profile, skillMatrix } from './profile';

export const resume = {
  name: profile.name,
  legalName: 'Amher Cosaine Miguel Timpahan',
  headline: profile.role,
  location: profile.location,
  email: profile.email,
  github: profile.socials.github,
  linkedin: profile.socials.linkedin,
  summary: profile.thesis,
  skills: skillMatrix.map((group) => ({
    label: group.category,
    items: group.items,
  })),
  roles: experience.map((item) => ({
    role: item.role,
    org: item.company,
    period: item.period,
    bullets: item.impacts.map((impact) => `${impact.lead} ${impact.text}`),
  })),
  education,
} as const;

export const resumePdfHref = '/AmherCosaine-Timpahan-Resume.pdf';
export const resumePdfFilename = 'AmherCosaine-Timpahan-Resume.pdf';
