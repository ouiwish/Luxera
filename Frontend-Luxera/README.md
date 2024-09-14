# Luxera Frontend

This is the front-end for Luxera's custom design services, built using **React.js**. The front-end allows users to browse collections, sign deals, submit reviews, and make PayPal payments, while integrating with the back-end API for user authentication and data management.

## Tech Stack

- **React.js** - JavaScript library for building the user interface.
- **Axios** - For handling API requests.
- **Tailwind CSS** - For styling the UI.
- **Framer Motion** - For creating animations.
- **Radix UI** - Accessible React components for form controls, dialogs, dropdowns, and more.
- **PayPal SDK** - For handling PayPal payments.

---

## Key Libraries

### UI Components & Styling
- **Tailwind CSS** - Provides utility-first CSS for rapid UI development.
- **Radix UI** - A set of accessible components, including:
    - `@radix-ui/react-accordion`
    - `@radix-ui/react-avatar`
    - `@radix-ui/react-checkbox`
    - `@radix-ui/react-dialog`
    - `@radix-ui/react-dropdown-menu`
    - `@radix-ui/react-toast`
    - `@radix-ui/react-tooltip`

### Animations
- **Framer Motion** - Library for adding smooth animations and transitions to the interface.

### Carousel
- **Embla Carousel React** - A library for building custom carousels.

### State Management
- **React Context API** - Used for managing global state across the application.

### HTTP Client
- **Axios** - For sending HTTP requests to the back-end API.

### Payment Integration
- **PayPal SDK** - Integrates PayPal functionality for creating and capturing orders.

---

## Routing

The front-end uses **React Router** to manage navigation between different pages, ensuring a seamless user experience across views, such as:
- Home page
- Product collections
- Deal details
- User profile and settings

---

## Frontend Features

- **User Authentication** - Log in, register, and manage user sessions through integration with the back-end API.
- **Custom Deal Browsing** - Users can view fashion collections, select deals, and sign or unsign them.
- **Review System** - Users can submit, update, or delete reviews for different collections.
- **PayPal Payment** - Users can securely pay for their deals using PayPal integration.
- **Responsive Design** - The UI is fully responsive, providing a smooth experience across devices.

---

## API Integration

The front-end communicates with the back-end using Axios to handle the following tasks:
- Fetching collections and deals.
- Signing/unsigning deals.
- Submitting reviews.
- Authenticating users (login, register).
- Handling PayPal payments.

---

## Contributing

Contributions are welcome! If you'd like to improve the front-end, submit a pull request or open an issue for discussion.

---