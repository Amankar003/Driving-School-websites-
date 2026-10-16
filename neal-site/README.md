# Neal Driving School website

Next.js (App Router) single page + FastAPI enquiry API. Animations from React Bits (SplitText, RotatingText, CountUp, ScrollVelocity, Magnet, ClickSpark, FadeContent, Stack).

## Run
    cd frontend && npm install && npm run dev      # http://localhost:3000
    cd backend && pip install -r requirements.txt && ADMIN_KEY=secret uvicorn main:app --reload

Form: if `NEXT_PUBLIC_API_URL` is empty the form opens WhatsApp with the details. Set it (copy `.env.local.example` to `.env.local`) to save leads through FastAPI. Read leads: `GET /api/enquiries` with header `X-Admin-Key`.

## Before giving to the client
- Replace `frontend/assets/trainer.jpg` with the real trainer photo (same file name).
- Edit trainer name and text, Google reviews, and prices in `frontend/components/Home.jsx` (PLANS, REVIEWS, trainer section).
- Photos in `assets/` are cropped from the school's own banners. Better photos of the car, instructor and learners will lift the site further.
