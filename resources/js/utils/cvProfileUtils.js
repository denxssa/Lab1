export const buildProfilePayload = ({ personal, skills, experiences, education, languages, projects = [], certifications = [], github }) => ({
  personal: {
    ...(personal || {}),
    github: github?.profileUrl || personal?.github || '',
    github_repositories: github?.repositories || personal?.github_repositories || [],
    portfolio_links: github?.portfolioLinks || personal?.portfolio_links || [],
  },
  skills: skills || [],
  experiences: experiences || [],
  education: education || [],
  languages: languages || [],
  projects,
  certifications,
});

export const applyProfileToState = (profile, setters) => {
  if (!profile) return;

  const { setPersonal, setSkills, setExperiences, setEducation, setLanguages, setProjects, setCertifications, setGithub } = setters;

  if (profile.personal && setPersonal) {
    setPersonal(profile.personal);
  }
  if (profile.skills?.length && setSkills) {
    setSkills(profile.skills);
  }
  if (profile.experiences?.length && setExperiences) {
    setExperiences(profile.experiences.map((e, i) => ({
      ...e,
      id: e.id ?? Date.now() + i,
    })));
  }
  if (profile.education?.length && setEducation) {
    setEducation(profile.education.map((e, i) => ({
      ...e,
      id: e.id ?? Date.now() + i + 1000,
    })));
  }
  if (profile.languages?.length && setLanguages) {
    setLanguages(profile.languages.map((l, i) => ({
      ...l,
      id: l.id ?? Date.now() + i + 2000,
    })));
  }
  if (profile.projects?.length && setProjects) {
    setProjects(profile.projects.map((p, i) => ({
      ...p,
      id: p.id ?? Date.now() + i + 3000,
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
    })));
  }
  if (profile.certifications?.length && setCertifications) {
    setCertifications(profile.certifications.map((c, i) => ({
      ...c,
      id: c.id ?? Date.now() + i + 4000,
    })));
  }
  if (setGithub) {
    setGithub((current = {}) => ({
      ...current,
      profileUrl: profile.personal?.github || current.profileUrl || '',
      repositories: profile.personal?.github_repositories || current.repositories || [],
      portfolioLinks: profile.personal?.portfolio_links || current.portfolioLinks || [],
    }));
  }
};
