# S-Shop

S-Shop is a modern storefront built with React, Redux Toolkit, Tailwind CSS and Framer Motion.
It covers the full shopping journey — browse, search, filter, wishlist, cart and a three-step
checkout — with a design system that works in both light and dark themes.

The catalogue, orders and account details ship with the app, so it runs immediately with no
services to configure.

## Highlights

### Storefront
- Animated hero carousel with progress indicators, autoplay and pause-on-hover
- Category landing pages, a flash-deals page with a live countdown, and a 404 that helps you back
- Product illustrations generated at build time, so pages render instantly and never show a broken image

### Discovery
- Instant search with product suggestions, reachable anywhere via `⌘K` / `Ctrl+K`
- Faceted filtering by category, brand, price, rating and availability
- Six sort modes, grid/list layouts, removable filter chips and shareable URLs — every filter lives in the query string
- Skeleton loading states and progressive "load more" pagination

### Product detail
- Multi-shot gallery with thumbnail navigation
- Colour and size variants, quantity stepper, and an add-to-cart confirmation state
- Tabbed description, specification table and a review breakdown with rating distribution
- Related products from the same category

### Cart and checkout
- Slide-over cart drawer with a free-delivery progress meter
- Quantity editing, save-for-later, promo codes (`SSHOP10`, `WELCOME20`, `FREESHIP`) and delivery-speed selection
- Three-step checkout — delivery, payment, review — with an animated order confirmation
- Cart and wishlist persist across reloads via local storage

### Account
- Sign in / sign up with password visibility toggle and a one-tap credential fill
- Profile with editable details, avatar upload, saved addresses and payment cards
- Order history with a per-order tracking timeline and status filters

### Experience details
- Light and dark themes with the preference stored and applied before first paint
- Toast notification system, page transitions, scroll-reveal sections and a back-to-top control
- Responsive from 320px up, with a mobile navigation drawer and a bottom-sheet filter panel
- Keyboard accessible controls, ARIA labelling and visible focus rings throughout

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18 + Vite |
| State | Redux Toolkit (products, cart, wishlist, user) |
| Styling | Tailwind CSS with a custom token layer |
| Motion | Framer Motion |
| Routing | React Router v6 |
| Icons | React Icons |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # lint the source
```

## Project structure

```
src/
├── components/
│   ├── cart/       cart drawer
│   ├── home/       hero and landing sections
│   ├── layout/     navbar, footer, page shell
│   ├── product/    product card, quick view, filters
│   └── ui/         shared primitives (rating, toasts, image, skeletons)
├── context/        theme and notification providers
├── data/           catalogue and account data
├── lib/            formatting, storage and image-generation helpers
├── pages/          route-level screens
└── redux/          store and feature slices
```

## Signing in

Use the **Use demo credentials** button on the sign-in screen, or enter any email and password —
the session is created locally and persists until you sign out.

## License

MIT

## Acknowledgements

Built by Muhammad Sameer. Thanks to the maintainers of React, Vite, Tailwind CSS,
Redux Toolkit and Framer Motion.
