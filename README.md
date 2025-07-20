# Dragon Court

A Next.js web application for the Dragon Court game.

## Features

- User authentication with NextAuth.js
- MySQL database integration
- Modern UI with Tailwind CSS
- TypeScript support

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jason-allen-oneal/dragon-court.git
cd dragon-court
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
Create a `.env.local` file with the following variables:
```
DATABASE_URL=your_mysql_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MySQL
- **Password Hashing**: bcryptjs

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── game/           # Game page
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
└── lib/               # Utility libraries
    ├── auth.ts        # NextAuth configuration
    ├── db.ts          # Database connection
    └── services/      # Service functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is private and proprietary.