# 🏋️ Exercise Tracker

A modern, full-featured exercise tracking application built with Next.js that enables users to register, create custom workout routines, log exercise progress, and monitor achievements toward their fitness goals.

## 🎯 Purpose

I built this app to create a user-friendly way for people to track their workouts and see their progress over time. This was one of my first Next.js projects, and it helped me get comfortable with core concepts like Server Components, the App Router, Server Actions, and TypeScript.

## ✨ Features

- 👤 **User Registration & Authentication** - Secure user accounts to track personal fitness journey
- 📝 **Workout Routine Creation** - Design custom workout plans tailored to your fitness goals
- 📊 **Exercise Logging** - Record sets and reps for each exercise
- 📋 **Workout Summary** - View comprehensive summaries of your workout routines and progress

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your computer:
- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun package manager

**Note:** This application is designed to run on desktop computers.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/efeAky/exercise-tracker.git
cd exercise-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your configuration:
```env
# Required: Secret key for authentication
SECRET_KEY=your_secret_key_here

# Add other environment variables as needed
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
exercise-tracker/
├── app/                    # Next.js app directory (pages, layouts, routes)
├── clientComponents/       # Client-side React components
├── data/                   # Data management and models
├── public/                 # Static assets (images, icons, etc.)
├── serverActions/          # Next.js server actions
├── serverHelpers/          # Server-side helper functions
├── types/                  # TypeScript type definitions
├── .gitignore
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React](https://react.dev/)** - UI component library
- **Server Actions** - Next.js server-side data mutations

## 🎨 Key Technologies

- **Next.js App Router** - Modern file-based routing with layouts and server components
- **Server Components** - Improved performance with server-side rendering
- **Server Actions** - Type-safe server mutations without API routes
- **Token-based Authentication** - Secure user authentication and session management
- **TypeScript** - Enhanced developer experience with type safety
- **Data Storage: JSON Files** - Used to focus on Next.js fundamentals; transitioning to databases in future projects
- **CSS/PostCSS** - Styling with modern CSS features

## 📝 How to Use

1. Create an account or log in to your existing account
2. Navigate to the **Routines** section
3. Create a new workout routine with your desired exercises
4. Navigate to **Progress** and select a routine
5. Enter your sets and reps for each exercise
6. Navigate to **Summary** and select a routine
7. Observe your improvement over time

## 📚 Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript handbook
- [React Documentation](https://react.dev/) - React concepts and patterns

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**efeAky**
- GitHub: [@efeAky](https://github.com/efeAky)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- Inspired by the fitness tracking community
- Thanks to all contributors and users

## 📞 Support

If you encounter any issues or have questions:
- Open an [issue](https://github.com/efeAky/exercise-tracker/issues)
- Check existing issues for solutions
- Contact via GitHub email

---

**Happy Training! 💪**
