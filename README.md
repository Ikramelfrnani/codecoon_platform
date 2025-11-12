# CodeCoon E-learning Platform

A full-stack e-learning platform for programming with gamification elements, progress tracking, and comprehensive admin analytics.

##  Description

CodeCoon is an interactive coding education platform that makes learning programming languages engaging through gamification. Students earn coins, complete quizzes, and collect badges while admin get detailed analytics on learners progress and platform engagement.

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | Frontend framework and UI components |
| **Redux Toolkit** | State management for global application state |
| **Axios** | HTTP client for API communication |
| **HTML2Canvas** | Certificate and badge generation |
| **Recharts** | Data visualization for progress tracking |
| **CSS3** | Styling and responsive design |

### Backend
| Technology | Purpose |
|------------|---------|
| **Laravel** | PHP backend framework and API |
| **MySQL** | Relational database management |
| **Laravel Sanctum** | API authentication system |
| **Eloquent ORM** | Database operations and relationships |
| **PHP** | Server-side programming language |

##  Key Features

###  Student Portal
- Authentication - User registration, login, and profile management
- Courses - Browse programming languages lessons
- Gamification - Earn coins, complete quizzes, and collect badges
- Progress Tracking - Visualize learning progress with Recharts
- Certification - Download earned programming language badges
- Profile Management - Update profile or delete account

###  Admin Portal
- Analytics Dashboard - Comprehensive platform statistics
- User Insights - Learners per month tracking
- Progress Analytics - Languages completed by learners

### Gamification System
- Coin Economy - Earn coins through lesson completion
- Mini Quizzes - Chapter-based knowledge checks
- Global Quizzes - Course-based mastering tests
- Digital Badges - Downloadable certifications


## Installation & Setup

### Prerequisites
- Node.js
- PHP 8.0 or higher
- Composer
- MySQL Database

### Full Setup Process

```bash
# Clone the repository
git clone https://github.com/ikramelfrnani/codecoon_platform.git
cd codecoon_platform

# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Environment setup
cp .env.example .env
php artisan key:generate

# Configure database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=codecoon_platform
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Run migrations and seeders
php artisan migrate --seed

# Generate Sanctum keys
php artisan sanctum:install

# Start Laravel development server (runs on http://localhost:8000)
php artisan serve

# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server (runs on http://localhost:3000)
npm start
```
##  Author

**Ikram El Frnani**
- **GitHub**: [@ikramelfrnani](https://github.com/ikramelfrnani)
- **LinkedIn**: [Ikram El Frnani](https://linkedin.com/in/ikram-el-frnani-9314a2201)  
- **Portfolio**: [ikramelfrnani.vercel.app](https://ikramelfrnani.vercel.app/)
