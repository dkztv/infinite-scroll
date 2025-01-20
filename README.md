# Infinite Scroll Demo

## 📖 Overview

The **Infinite Scroll Demo** is a simple Vue 3 application that showcases the implementation of infinite scrolling. The application dynamically loads user data from the [Random User API](https://randomuser.me) as the user scrolls down the page. It is built with modern web development tools such as Vite, Pinia, and TypeScript.

---

## 🚀 Features

- **Infinite Scrolling**: Automatically fetches and displays new user cards when the user scrolls near the bottom of the page.
- **Dynamic Fetching**: Adjusts the number of fetched items based on the current screen height.
- **Responsive Design**: Adapts seamlessly to various screen sizes, ensuring a user-friendly experience on both desktop and mobile.
- **Skeleton Loading**: Displays animated placeholders while data is being fetched.
- **TypeScript Support**: Ensures strong type safety throughout the application.
- **Code Documentation**: Includes JSDoc comments for all major functions and components.

---

## 🛠 Tech Stack

### Core Technologies:

- **Vue 3**: Progressive JavaScript framework for building user interfaces.
- **Pinia**: State management for Vue applications.
- **TypeScript**: Static typing for better development experience and fewer bugs.
- **Vite**: Lightning-fast development environment and build tool.

### Additional Tools:

- **Sass**: CSS preprocessor for enhanced styles and maintainability.
- **ESLint**: Ensures code quality and consistency.
- **Terser**: Minifies JavaScript for production.

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dkztv/infinite-scroll.git
   cd infinite-scroll
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```plaintext
infinite-scroll/
├── src/
│   ├── modules/
│   │   ├── infinite-feed/
│   │   │   ├── api/
│   │   │   │   └── userApi.ts          # API functions for fetching users
│   │   │   ├── components/
│   │   │   │   ├── SkeletonCard.vue   # Skeleton loader component
│   │   │   │   └── UserCard.vue       # User card component
│   │   │   ├── hooks/
│   │   │   │   └── useInfiniteScroll.ts # Infinite scroll logic
│   │   │   ├── pages/
│   │   │   │   └── InfiniteFeedPage.vue # Main page component
│   │   │   ├── stores/
│   │   │   │   └── userStore.ts       # Pinia store for user data
│   │   │   └── types/
│   │   │       └── user.ts            # TypeScript type definitions for User
│   ├── shared/
│   │   └── utils/
│   │       └── debounce.ts            # Utility function for debouncing
│   ├── App.vue                         # Root Vue component
│   ├── main.ts                         # Application entry point
│   └── shims-vue.d.ts                  # TypeScript shim for Vue files
├── .eslintrc.js                        # ESLint configuration
├── .gitignore                          # Git ignore file
├── .prettierrc                         # Prettier configuration
├── index.html                          # HTML template
├── jsdoc.json                          # JSDoc configuration
├── package.json                        # Project metadata and dependencies
├── package-lock.json                   # Locked dependencies
├── README.md                           # Project documentation
├── tsconfig.json                       # TypeScript configuration
└── vite.config.js                      # Vite configuration
```

---

## 🧩 Key Components

### 1. `UserCard.vue`

Displays user information, including their profile picture, name, and email.

### 2. `SkeletonCard.vue`

Provides a skeleton loader placeholder for better user experience during data fetching.

---

## 🌀 Infinite Scrolling Logic

The infinite scrolling functionality is implemented using a custom hook `useInfiniteScroll`. Here's how it works:

1. **Dynamic Calculation**:

   - Determines the number of items to fetch based on the current screen height.

2. **Scroll Event Listener**:

   - Listens for scroll events and fetches new data when the user reaches near the bottom of the page.

3. **Debouncing**:
   - Debounces the scroll events to avoid excessive API calls.

### Hook Implementation (`useInfiniteScroll.ts`):

```ts
export const useInfiniteScroll = () => {
  const cardHeight = 110;
  const userStore = useUserStore();
  const { updateCount, fetchUsers } = userStore;
  const { users, loadingState, count, error } = storeToRefs(userStore);

  const getDynamicResults = () => {
    const screenHeight = window.innerHeight;
    return Math.ceil(screenHeight / cardHeight) * 2;
  };

  const debouncedHandleScroll = debounce(async () => {
    const nearBottomOfWindow =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 1000;
    if (nearBottomOfWindow) {
      updateCount(getDynamicResults());
      await fetchUsers();
    }
  }, 200);

  onMounted(() => {
    updateCount(getDynamicResults());
    fetchUsers();
    window.addEventListener('scroll', debouncedHandleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', debouncedHandleScroll);
  });

  return { users, loadingState, count, error };
};
```

---

## 🔍 Documentation

The project is fully documented using JSDoc. You can generate and view the documentation locally:

1. **Generate Documentation:**

   ```bash
   npm run generate-docs
   ```

2. **View Documentation:**
   Open the generated `docs/index.html` in your browser.

---

## 🌐 Deployment

The project is deployed on GitHub Pages. You can access it at:
[https://dkztv.github.io/infinite-scroll](https://dkztv.github.io/infinite-scroll)

To deploy updates:

```bash
npm run deploy
```

---

## 🧪 Testing

### Linting:

```bash
npm run lint
```

---

## 💡 Future Improvements

- **Virtual Scrolling**: Implement rendering optimization for large datasets.
- **Error Handling**: Improve user feedback for network issues.
- **Customizable API**: Allow users to set API parameters dynamically.

---

## 👥 Contributors

- **Dmitrii Kuznetsov** - Author and Developer; Telegram: @dkztv

---