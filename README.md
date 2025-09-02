1. Project Title: SokoLink

2. Project Description
SokoLink is a web-based B2B marketplace designed to digitize Rwanda’s wholesale supply chain. It connects verified wholesalers and retailers to improve trade efficiency, reduce costs, and increase market access. 

3. Business Goals & Scope

Primary Goal:
- Enable verified retailers to order from wholesalers with real payments.
- Shorter sourcing time, wider reach for wholesalers, transparent pricing for retailers.

In-scope:
- User onboarding & verification
- Product catalogs, search & browse
- Single-wholesaler cart → checkout
- MTN MoMo payment integration
- Basic order tracking and admin tools

Out-of-scope:
- Multi-wholesaler cart, returns, full logistics network, advanced promotions.

4. Key Features

- Retailer/Wholesaler registration & verification
- Product catalog & inventory management
- Category tree, keyword search, filters
- Single-wholesaler cart and checkout
- MTN MoMo payment with webhook handling
- Basic admin dashboards and manual order adjustments

5. Tech Stack
- Backend: Node.js (Express)
- REST API with JWT authentication
- Database: PostgreSQL + Redis (cache/sessions)  
- Storage: S3-compatible (product images)
- Redis (sessions, rate limiting, hot catalog, cart)

6. Project Structure
-backend → API, services, database models
- docs → Specs, ERD, diagrams
- scripts → Setup, DB migration scripts

7. Integrations:
- MTN MoMo Collections API for payments
- SMS/Email notifications (local SMS gateway)


8. ERD / Data Models
- User, RetailerProfile, WholesalerProfile
- Product, Inventory, Price
- Cart, CartItem, Order, OrderItem
- Payment, VerificationLog, AuditLog, Notification

9. API Endpoints

POST /auth/register      POST /auth/login
GET /categories          GET /products
POST /products           PATCH /products/:id
POST /cart               POST /cart/items
DELETE /cart/items/:id
POST /orders             GET /orders/:id
POST /payments/mtn/requestToPay
POST /payments/mtn/webhook
GET /reports/overview

10. Installation / Setup
Clone the repository
git clone <repo-url>
cd <repo>
npm install
cp .env.example .env   # configure database
npm run dev

11. Usage
- Register as retailer or wholesaler
- Admin verification for new users
- Browse product catalog, add to cart, checkout with MTN MoMo
- Admin dashboard for user/order monitoring

12. Contributing
- Fork repo → create branch → make changes → PR
- Ensure proper testing of auth, payments, and order flows
- Follow coding standards and commit message conventions

13. Local Development:
- Clone the repository
- Install dependencies (`npm install`)
- Configure `.env` with database credentials
- Run backend (`npm run dev`)
