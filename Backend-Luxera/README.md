<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


# Luxera Backend API

This is the back-end API for Luxera's custom design services, built using Laravel. The API handles user authentication, profile management, deals, reviews, categories, and payments (via PayPal).

## Tech Stack

- **Laravel** - PHP framework for backend development.
- **Sanctum** - For API authentication.
- **MySQL** - Database for storing user data and other resources.
- **PayPal API** - For handling payments.

---

## API Endpoints

### Authentication
- `POST /register` - Register a new user.
- `POST /login` - Log in the user.
- `POST /logout` - Log out the user (requires authentication).

### Profile Management
- `POST /profile/auth` - Update profile information (requires authentication).
- `POST /password/auth` - Change user password (requires authentication).

### Deal Management
- `POST /deal/sign` - Sign a deal (requires authentication).
- `POST /deal/unsign` - Unsign a deal (requires authentication).
- `GET /deal/signed` - Get all signed deals (requires authentication).

### Payment (PayPal)
- `POST /paypal/create` - Create a PayPal order.
- `POST /paypal/capture` - Capture a PayPal payment.

### Fashion Deals & Reviews
- `GET /categories` - Fetch all categories.
- `GET /collections` - Fetch all available fashion deals.
- `GET /collections/{deal}` - Get details of a specific fashion deal.
- `POST /reviews` - Add a review (requires authentication).
- `POST /reviews/update` - Update a review (requires authentication).
- `POST /reviews/delete` - Delete a review (requires authentication).

### Admin Routes
- `POST /fashion-deals` - Create a new fashion deal (admin-only).
- `POST /categories` - Create a new category (admin-only).

---

## Middleware

- **auth:sanctum** - For routes that require authentication.
- **admin** - For admin-only routes.

---

## Contributing

If you want to contribute to this back-end, feel free to submit a pull request or open an issue.

---