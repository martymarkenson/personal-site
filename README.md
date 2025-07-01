# Personal Site Platform

A user-generated content platform where each user can create their own professional profile page with work experience, projects, and personal information. Built with Next.js, Supabase, and Tailwind CSS.

## Features

- **User Authentication**: Secure login/signup with email or Google OAuth
- **Profile Management**: Users can edit their name, username, title, and bio
- **Work Experience**: Add, edit, delete, and reorder work experience entries
- **Projects**: Showcase projects with descriptions, links, and logos
- **Public Profiles**: Each user gets a public profile at `/[username]`
- **Drag & Drop**: Reorder work experience and projects with drag and drop
- **Responsive Design**: Works great on mobile and desktop
- **Dark Mode**: Built-in dark mode support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your project URL and anon key
3. Run the SQL schema in `schema.sql` in your Supabase SQL editor
4. Enable Google OAuth (optional):
   - Go to Authentication → Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### 3. Environment Variables

Create a `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set up Storage (Optional)

For image uploads, create storage buckets in Supabase:

1. Go to Storage in your Supabase dashboard
2. Create buckets: `avatars`, `project-logos`, `work-logos`, `gallery-images`
3. Set them as public buckets
4. Uncomment the storage policies in `schema.sql` and run them

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Usage

1. **Sign Up**: Create an account at `/signup`
2. **Complete Profile**: Go to `/dashboard` to set up your profile
3. **Add Content**: Add work experience and projects
4. **View Profile**: Your public profile will be available at `/[your-username]`

## Project Structure

- `/src/pages/` - Next.js pages including auth and dashboard
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and Supabase client setup
- `/src/pages/api/` - API routes for CRUD operations
- `schema.sql` - Database schema for Supabase

## Deployment

1. Deploy to Vercel, Netlify, or your preferred platform
2. Set environment variables in your deployment platform
3. Update `NEXT_PUBLIC_SITE_URL` to your production URL

## Customizing

You can customize the platform by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
