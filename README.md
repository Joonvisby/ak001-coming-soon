# AK001 Coming Soon

A modern, responsive landing page for Adaptive Kitchen's coming soon website.

## Features

- **Hero Section**: Animated video background with typing effect
- **Contact Section**: Newsletter signup form
- **Footer**: Company information and links
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Powered by Framer Motion

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your video file:
   - Place your video file in `public/videos/Herovideo.mp4`
   - The video should be in MP4 format

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page component
├── public/
│   └── videos/          # Video assets
├── Hero.tsx             # Hero section component
├── Contact.tsx          # Contact section component
├── Footer.tsx           # Footer component
├── TextType.tsx         # Typing animation component
└── package.json         # Dependencies and scripts
```

## Technologies Used

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons

## Customization

- Colors: Update the color values in the components (currently using `#e04424` for orange and `#1d2d55` for dark blue)
- Content: Modify the text content in each component
- Styling: Update Tailwind classes or add custom CSS in `globals.css`
