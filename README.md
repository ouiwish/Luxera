# Luxera Custom Design Services

Luxera is dedicated to providing exceptional custom design services tailored to your unique needs and preferences. Our experienced designers work closely with you to create a piece that reflects your personal style and elevates your overall aesthetic. Whether you're looking for a statement piece, a birthday gift, or a one-of-a-kind design, Luxera is here to help you bring your vision to life.

Let us be your partner in creating truly unique and personalized designs that express your individuality and style. Contact us today to inquire about our custom design services and let us elevate your style.

---

## Tech Stack

### Backend:
- **Laravel (PHP Framework)** - For API development.
- **Sanctum** - For user authentication.
- **PayPal API** - For payment handling.

### Frontend:
- **React.js** - For building a modern, interactive user interface.
- **Axios** - For API requests.
- **Radix UI** - For accessible components and styling.
- **Tailwind CSS** - For responsive design and UI customization.
- **Framer Motion** - For animation.

---

## Installation

### Prerequisites
- **Node.js**: Make sure you have Node.js installed.
- **Composer**: Laravel requires Composer for dependency management.
- **PHP**: Laravel requires PHP 7.4 or above.

### Backend Setup (Laravel)

1. Clone the repository:
    ```bash
    git clone https://github.com/ouiwish/Luxera.git
    cd Luxera
    ```

2. Install PHP dependencies using Composer:
    ```bash
    composer install
    ```

3. Create a `.env` file by copying the example file and adjust the environment variables as necessary:
    ```bash
    cp .env.example .env
    ```

4. Generate an application key:
    ```bash
    php artisan key:generate
    ```

5. Set up your database and migrate the tables:
    ```bash
    php artisan migrate:fresh --seed
    ```

6. Link storage app:
    ```bash
    php artisan storage:link
    ```

7. Serve the Laravel app locally:
    ```bash
    php artisan serve
    ```

### Frontend Setup (React.js)

1. Install Node dependencies:
    ```bash
    npm install
    ```

2. To start the development server:
    ```bash
    npm run dev
    ```

---

## API Routes (Laravel)

### Authentication
- `POST /register` - Register a new user.
- `POST /login` - Log in the user.
- `POST /logout` - Log out the authenticated user.

### Profile Management
- `POST /profile/auth` - Update the user's profile.
- `POST /password/auth` - Change the user's password.

### Deal Management
- `POST /deal/sign` - Sign a deal (requires authentication).
- `POST /deal/unsign` - Unsign a deal (requires authentication).
- `GET /deal/signed` - Get all signed deals (requires authentication).

### PayPal Payment
- `POST /paypal/create` - Create a PayPal order.
- `POST /paypal/capture` - Capture a PayPal payment.

### Fashion Deals & Reviews
- `GET /categories` - Get all categories.
- `GET /collections` - Get all fashion deals.
- `GET /collections/{deal}` - Get a specific fashion deal.
- `POST /reviews` - Add a new review (requires authentication).
- `POST /reviews/update` - Update a review (requires authentication).
- `POST /reviews/delete` - Delete a review (requires authentication).

### Admin Routes
- `POST /fashion-deals` - Create a new fashion deal (admin-only).
- `POST /categories` - Create a new category (admin-only).

---

## Frontend Components & Libraries

### Key Libraries Used:
- `@paypal/react-paypal-js` - Integrate PayPal payments.
- `@radix-ui/react-*` - For various UI components (Accordion, Avatar, Checkbox, Dialog, Dropdown, etc.).
- `axios` - For making HTTP requests to the backend API.
- `framer-motion` - For creating animations.
- `react-router-dom` - For routing between different views.

### Tailwind CSS & Styling
- `tailwind-merge` - Utility for merging Tailwind CSS class names.
- `tailwindcss-animate` - Plugin for animations.

---

## Usage

After setting up the backend and frontend:

1. Open the Laravel API server (`http://127.0.0.1:8000`).
2. Run the React frontend (`http://localhost:3000`).
3. Register, log in, and start using the Luxera custom design services.

For any inquiries or support, contact us at support@luxera.com.

---

## Team

- **[Widad Moumkine](https://www.linkedin.com/in/widad-moumkine)** - Digital Content Creator
- **[Hajar Moumkine](https://www.linkedin.com/in/hajar-moumkine)** - Visual Communication Specialist

## Contributing

We welcome contributions! Feel free to submit a pull request or open an issue if you find bugs or have suggestions.

---