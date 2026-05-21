export const mapParsedToProfile = (parsed = {}) => {
  const skills = Array.isArray(parsed.skills) ? parsed.skills.filter(Boolean) : [];
  const timestamp = Date.now();

  const experiences = (parsed.experience || []).map((item, index) => ({
    id: timestamp + index,
    company: item.company || '',
    role: item.role || item.title || '',
    startDate: item.start_date || item.startDate || '',
    endDate: item.end_date || item.endDate || '',
    current: !item.end_date && !item.endDate,
    description: item.description || '',
  }));

  const education = (parsed.education || []).map((item, index) => ({
    id: timestamp + index + 1000,
    school: item.institution || item.school || '',
    degree: item.degree || '',
    fieldOfStudy: item.field_of_study || item.fieldOfStudy || item.field || '',
    startDate: item.start_date || item.startDate || '',
    endDate: item.end_date || item.endDate || '',
    current: false,
  }));

  const languages = (parsed.languages || []).map((item, index) => ({
    id: timestamp + index + 2000,
    language: item.language || item.name || '',
    level: item.level || 'Fluent',
  }));

  const projects = (parsed.projects || []).map((item, index) => ({
    id: timestamp + index + 3000,
    name: item.name || '',
    description: item.description || '',
    technologies: Array.isArray(item.technologies) ? item.technologies : [],
    url: item.url || item.link || '',
    startDate: item.start_date || item.startDate || '',
    endDate: item.end_date || item.endDate || '',
  }));

  const certifications = (parsed.certifications || []).map((item, index) => ({
    id: timestamp + index + 4000,
    name: item.name || '',
    issuer: item.issuer || item.organization || '',
    year: item.year || item.issue_date || item.issueDate || '',
  }));

  const github = {
    profileUrl: parsed.github || '',
    repositories: Array.isArray(parsed.github_repositories) ? parsed.github_repositories : [],
    portfolioLinks: Array.isArray(parsed.portfolio_links) ? parsed.portfolio_links : [],
  };

  return { skills, experiences, education, languages, projects, certifications, github };
};

export const ANALYSIS_STEPS = {
  idle: '',
  uploading: 'Uploading and scanning your CV…',
  extracting: 'Extracting text from PDF…',
  parsing: 'Parsing your CV with AI…',
  rating: 'Calculating ATS score…',
  matching: 'Matching your profile to jobs…',
};
