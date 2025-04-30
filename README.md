# Wiame Waitlist

A beautiful, responsive waitlist landing page built with Next.js, Tailwind CSS, and integrated with Google Sheets for email collection.

## Features

- 🎨 Modern, responsive design with custom font (Giaza)
- ✨ Interactive pixel trail effect with gooey filter
- 📧 Email collection with Google Sheets integration
- 🌙 Dark mode support
- 📱 Mobile-first design
- 🎯 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Sheets API](https://developers.google.com/sheets/api) - Email collection
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Cloud Project with Sheets API enabled
- Google Service Account credentials

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/baasilali/wiame-waitlist.git
cd wiame-waitlist
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="your-private-key"
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Sheets Setup

1. Create a new Google Sheet
2. Share it with your service account email (from GOOGLE_SHEETS_CLIENT_EMAIL)
3. Get the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add the same environment variables in Vercel's project settings
4. Deploy!

## Customization

### Font
The project uses the Giaza font. To change it:
1. Add your font file to `/public/fonts/`
2. Update the font-face declaration in `/styles/fonts.css`
3. Update the Tailwind configuration in `tailwind.config.ts`

### Colors
Colors can be customized in `tailwind.config.ts` under the `theme.extend.colors` section.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 