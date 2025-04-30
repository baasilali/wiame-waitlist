# Wiame Waitlist Landing Page

A modern, responsive landing page built with Next.js 14, featuring a waitlist signup form with Google Sheets integration and real-time analytics.

## 🚀 Features

### Core Features
- **Responsive Design**: Optimized for all devices with Tailwind CSS
- **Custom Typography**: Using Giaza font for the main heading
- **Form Validation**: Real-time email validation with error handling
- **Success Animation**: Smooth fade-in animation for thank you messages
- **Analytics**: Integrated Vercel Analytics for tracking page views and user interactions

### Technical Features
- **Google Sheets Integration**: Automatically saves signups to a Google Sheet
- **Environment Variables**: Secure configuration using `.env.local`
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Built with Next.js 14 and React Server Components
- **Performance Optimized**: Fast loading with optimized fonts and images

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Type Checking**: TypeScript
- **Analytics**: Vercel Analytics
- **Backend Integration**: Google Sheets API
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/baasilali/wiame-waitlist.git
cd wiame-waitlist
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-client-email
GOOGLE_SHEETS_PRIVATE_KEY=your-private-key
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

4. Run the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Google Sheets Setup
1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a service account and download credentials
4. Share your Google Sheet with the service account email
5. Add the credentials to your `.env.local` file

### Font Configuration
The project uses:
- Giaza font for the main heading (custom font)
- Inter font for body text (from Google Fonts)

## 🎨 Components

### Main Components
- `page.tsx`: Main landing page with hero section and waitlist form
- `WaitlistForm.tsx`: Form component with validation and submission logic
- `layout.tsx`: Root layout with analytics integration

### Form Features
- Email validation
- Loading states
- Error handling
- Success message with animation
- Google Sheets integration

## 📊 Analytics

The project uses Vercel Analytics to track:
- Page views
- User interactions
- Performance metrics

## 🚀 Deployment

The project is configured for deployment on Vercel:
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 