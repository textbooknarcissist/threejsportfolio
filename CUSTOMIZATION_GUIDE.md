# Portfolio Customization Guide

This guide will help you customize all the placeholder content in your portfolio to make it truly yours.

## 📍 Quick Reference: What to Update

### 1. Personal Information

**Hero Section** - [`App.tsx`](file:///c:/Users/USER/Desktop/threejsportfolio/App.tsx#L150-L157)

- ✅ Already updated to "Fredebel Menoh | Frontend Developer"
- ✅ Headline updated to "Crafting Digital Experiences"
- ✅ Description updated

**Email Addresses** - Multiple locations

- ✅ All updated to `mfredebel@gmail.com`

**Footer** - [`App.tsx`](file:///c:/Users/USER/Desktop/threejsportfolio/App.tsx#L322-L328)

- ✅ Updated to "© 2026 Fredebel Menoh — Calabar, Nigeria"
- ✅ Tagline set to "Made in Nigeria"

**Social Links** - [`constants.ts`](file:///c:/Users/USER/Desktop/threejsportfolio/constants.ts#L33-L38)

- ✅ All social media URLs updated with your profiles

### 2. Projects Section

**Location**: [`constants.ts`](file:///c:/Users/USER/Desktop/threejsportfolio/constants.ts#L3-L31)

Replace the 3 placeholder projects with your real frontend projects:

```typescript
export const PROJECTS: Project[] = [
  {
    id: 'unique-project-id',           // Lowercase, no spaces
    title: 'Your Project Name',
    category: 'Web Development',        // e.g., "E-Commerce", "Dashboard", "Portfolio"
    description: 'Brief project description highlighting key features and impact.',
    tech: ['React', 'TypeScript', 'Tailwind'],  // Technologies used
    image: 'https://your-image-url.com/image.jpg',  // Project screenshot
    link: 'https://github.com/yourusername/project'  // Live demo or GitHub link
  },
  // Add 2-3 more projects...
];
```

**Tips for Projects**:

- Use high-quality screenshots (recommended: 2070x1380px or similar 3:2 aspect ratio)
- Keep descriptions concise (1-2 sentences)
- List 3-4 key technologies
- Use consistent image quality across all projects

### 3. Optional Customizations

**Download CV Button** - [`App.tsx`](file:///c:/Users/USER/Desktop/threejsportfolio/App.tsx#L163)

- Update the `href="#"` to link to your CV/resume PDF
- Example: `href="/path/to/your-resume.pdf"`

**Tech Stack** - [`App.tsx`](file:///c:/Users/USER/Desktop/threejsportfolio/App.tsx#L10-L13)

```typescript
const TECH_STACK = [
  'React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'PostgreSQL', 'Three.js', 'Canvas API', 
  'Web Performance', 'Design Systems'
];
```

Update this array with your actual skill stack.

**About Section** - [`App.tsx`](file:///c:/Users/USER/Desktop/threejsportfolio/App.tsx#L208-L218)

- Update the manifesto and description to reflect your personal philosophy
- Current text is placeholder - make it personal!

## 🎨 Finding Good Project Images

Free high-quality image sources:

- [Unsplash](https://unsplash.com) - Free stock photos
- Take your own screenshots of live projects
- Use [Screely](https://screely.com) to add browser mockups to screenshots

## 🚀 After Customization

1. Test all links work correctly
2. Verify images load properly
3. Check responsiveness on mobile devices
4. Update the `README.md` if needed

---

**Note**: The scroll highlighting and hover effects are already working correctly - no additional configuration needed!
