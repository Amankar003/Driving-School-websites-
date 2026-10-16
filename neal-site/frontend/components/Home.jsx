'use client';

import { useState } from 'react';
import SplitText from './rb/SplitText/SplitText';
import RotatingText from './rb/RotatingText/RotatingText';
import CountUp from './rb/CountUp/CountUp';
import ScrollVelocity from './rb/ScrollVelocity/ScrollVelocity';
import Magnet from './rb/Magnet/Magnet';
import ClickSpark from './rb/ClickSpark/ClickSpark';
import FadeContent from './rb/FadeContent/FadeContent';
import Stack from './rb/Stack/Stack';
import './site.css';

import heroCar from '../assets/hero-car.jpg';
import learner from '../assets/learner.jpg';
import rental from '../assets/rental-car.jpg';
import keys from '../assets/keys.jpg';
import trainer from '../assets/trainer.jpg'; // replace with the real trainer photo, same file name

const src = (m) => (typeof m === 'string' ? m : m.src);
const API = (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) || '';

const PHONE = '9431370327';
const PHONE_SHOW = '94313 70327';
const wa = (t = 'Hello, I want to know about car driving classes.') =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(t)}`;
const rupees = (n) => '₹' + n.toLocaleString('en-IN');

const PLANS = [
  { days: 10, price: 3200, points: ['Manual or automatic car', 'Traffic rules basics', 'Daily instructor session'] },
  { days: 15, price: 4500, hot: true, points: ['Manual or automatic car', 'City driving, parking and reverse', 'Traffic rules and road safety'] },
  { days: 30, price: 8000, points: ['Everything in the 15-day plan', 'City and highway driving', 'Extra practice before your test'] },
];

const SKILLS = [
  ['4W', 'Four-wheeler training', 'From the first time you sit behind the wheel.'],
  ['M/A', 'Manual and automatic', 'Learn on the gearbox you plan to drive.'],
  ['HWY', 'City and highway driving', 'Busy roads and open roads, with an instructor beside you.'],
  ['P', 'Parking and reverse', 'Tight spots and turns, practised until they feel easy.'],
  ['RULES', 'Traffic rules and road safety', 'What you need for the test and for every day after.'],
];

const FAQ = [
  ['Do you teach both manual and automatic cars?', 'Yes. You can learn on manual, automatic or both. Tell us your choice when you book.'],
  ['I am scared to drive. Can I still learn?', 'Yes. Our training is beginner friendly and built around confidence, with personal attention from your instructor.'],
  ['Is there special training for ladies?', 'Yes. We offer special training for ladies, first-time learners, nervous drivers and working professionals.'],
  ['How much do I practise every day?', 'Each plan includes a daily 10 km session with an instructor. Plans run for 10, 15 or 30 days.'],
  ['What does the passing guarantee cover?', `Please call us on ${PHONE_SHOW} and we will explain the exact terms.`],
  ['Do you also rent cars?', 'Yes, through Neal Motors: self-drive or with a driver, for daily, weekly or monthly use. Call 62999 16160.'],
  ['Where are you located?', 'Rahar Gora, Dhaiya, near Prabhatam Mall, Dhanbad, Jharkhand 826004.'],
];

const REVIEWS = [
  // TODO: replace with real Google reviews
  'Add a real Google review here.',
  'Add a real Google review here.',
  'Add a real Google review here.',
];

function Enquiry() {
  const [state, setState] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const body = { name: String(d.get('name')).trim(), phone: String(d.get('phone')).trim(), plan: String(d.get('plan')), car: String(d.get('car')) };
    const text = `Hello, I am ${body.name} (${body.phone}). I want the ${body.plan} plan, ${body.car} car.`;
    if (!API) { window.open(wa(text), '_blank'); return; }
    setState('sending');
    try {
      const r = await fetch(`${API}/api/enquiry`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, plan: body.plan.replace(' ', '-').toLowerCase(), car: body.car.toLowerCase() }) });
      if (!r.ok) throw new Error();
      form.reset();
      setState('done');
    } catch { setState('error'); }
  }
  if (state === 'done')
    return (<div className="done"><h3>We got your request</h3><p>We will call you on the number you gave. For anything urgent, call {PHONE_SHOW}.</p><button className="btn w" onClick={() => setState('idle')}>Send another request</button></div>);
  return (
    <form className="form" onSubmit={submit}>
      <label>Your name<input name="name" required minLength={2} autoComplete="name" /></label>
      <label>Mobile number<input name="phone" type="tel" inputMode="numeric" required pattern="(\+91|91|0)?[\s-]?[6-9][0-9]{4}[\s-]?[0-9]{5}" title="10-digit mobile number" autoComplete="tel" /></label>
      <div className="two">
        <label>Plan<select name="plan" defaultValue="15 days"><option>10 days</option><option>15 days</option><option>30 days</option><option>Not sure yet</option></select></label>
        <label>Car type<select name="car" defaultValue="Manual"><option>Manual</option><option>Automatic</option><option>Both</option></select></label>
      </div>
      <button className="btn k" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : 'Request a call back'}</button>
      {state === 'error' && <p className="err">We could not send your request. Please call <a href={`tel:${PHONE}`}>{PHONE_SHOW}</a> or <a href={wa()} target="_blank" rel="noreferrer">message us on WhatsApp</a>.</p>}
    </form>
  );
}

export default function Home() {
  return (
    <ClickSpark sparkColor="#2347ff" sparkCount={10} sparkSize={12} sparkRadius={28} sparkWidth={3}>
      <div className="hazard" />
      <header className="top">
        <div className="wrap bar">
          <a className="logo" href="#top"><span>NEA<i>L</i></span><small>Driving School</small></a>
          <nav><a href="#learn">Training</a><a href="#pricing">Pricing</a><a href="#trainer">Trainer</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a></nav>
          <a className="btn k sm" href={`tel:${PHONE}`}>Call now</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-g">
            <div>
              <span className="chip">Rahar Gora, Dhaiya, Dhanbad</span>
              <SplitText tag="h1" className="h1" text="Learn to drive with confidence." splitType="words" textAlign="left" delay={70} duration={0.9} from={{ opacity: 0, y: 50 }} to={{ opacity: 1, y: 0 }} />
              <p className="sub">Car chalana seekho, aaram se.</p>
              <p className="made">
                Made for
                <RotatingText texts={['beginners', 'ladies', 'nervous drivers', 'working professionals']} rotationInterval={2600} transition={{ duration: 0.3, ease: 'easeOut' }} mainClassName="rot" splitBy="words" />
              </p>
              <div className="cta">
                <Magnet padding={60} magnetStrength={3}><a className="btn k" href={`tel:${PHONE}`}>Call {PHONE_SHOW}</a></Magnet>
                <Magnet padding={60} magnetStrength={3}><a className="btn w" href={wa()} target="_blank" rel="noreferrer">WhatsApp us</a></Magnet>
              </div>
            </div>
            <div className="art">
              <figure className="ph big"><img src={src(heroCar)} alt="Neal Driving School training car with L plate" /></figure>
              <figure className="ph small"><img src={src(learner)} alt="Happy learner with car keys" /></figure>
              <div className="sticker"><span>Passing guarantee</span></div>
            </div>
          </div>
        </section>

        <div className="checks" aria-hidden="true" />
        <div className="ticker" aria-hidden="true">
          <ScrollVelocity texts={['Passing guarantee + Manual and automatic + Ladies training + 10 km every day +', 'Beginner friendly + Real road practice + Personal attention + City and highway +']} velocity={60} className="tk" />
        </div>

        <section className="stats">
          <div className="wrap grid4">
            <div className="box"><b><CountUp to={10} duration={1.6} /> km</b><span>every single day</span></div>
            <div className="box"><b><CountUp to={3} duration={1.2} /> plans</b><span>10, 15 or 30 days</span></div>
            <div className="box"><b><CountUp to={2} duration={1} /> cars</b><span>manual and automatic</span></div>
            <div className="box"><b><CountUp to={4} duration={1} /> groups</b><span>with special training</span></div>
          </div>
        </section>

        <section className="sec" id="learn">
          <div className="wrap split">
            <div className="stick">
              <h2>What you will learn</h2>
              <p className="lead">Every lesson is on real roads with an instructor beside you, so you build habits that work long after the test.</p>
              <figure className="ph pic"><img src={src(keys)} alt="Learner holding car keys" /></figure>
            </div>
            <ul className="skills">
              {SKILLS.map(([tag, t, d]) => (
                <li className="card" key={t}><span className="tag">{tag}</span><div><h3>{t}</h3><p>{d}</p></div></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec blue" id="pricing">
          <div className="wrap">
            <FadeContent blur duration={800}>
              <h2>Simple plans. Clear prices.</h2>
              <p className="lead">Every plan includes a daily 10 km session with an instructor. Choose manual or automatic when you book.</p>
              <div className="plans">
                {PLANS.map((p) => (
                  <article className={'plan' + (p.hot ? ' hot' : '')} key={p.days}>
                    {p.hot && <span className="flag">Most chosen</span>}
                    <h3>{p.days} days</h3>
                    <p className="km">10 km every day</p>
                    <div className="pr">{rupees(p.price)}</div>
                    <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
                    <a className={'btn ' + (p.hot ? 'k' : 'y')} href={wa(`Hello, I want to book the ${p.days}-day driving plan (${rupees(p.price)}).`)} target="_blank" rel="noreferrer">Book this plan</a>
                  </article>
                ))}
              </div>
              <p className="fine">Prices shown are indicative. Please confirm the current fee when you call.</p>
            </FadeContent>
          </div>
        </section>

        <section className="sec yellow" id="trainer">
          <div className="wrap trainer">
            <figure className="ph pic"><img src={src(trainer)} alt="Lead instructor at Neal Driving School" /></figure>
            <FadeContent duration={800}>
              <h2>Meet your trainer</h2>
              <div className="card prof">
                <h3>Instructor name</h3>
                <p className="role">Owner and lead instructor, Neal Driving School</p>
                <p>Teaches manual and automatic cars with patience for first-time and nervous learners. Write two or three lines here about the trainer: experience, teaching style and what a student can expect on day one.</p>
                <ul className="chips"><li>Manual and automatic</li><li>Ladies batches</li><li>City and highway</li></ul>
                <a className="btn k" href={`tel:${PHONE}`}>Talk to your trainer</a>
              </div>
            </FadeContent>
          </div>
        </section>

        <section className="sec" id="gallery">
          <div className="wrap split mid">
            <div>
              <h2>Learn in our cars</h2>
              <p className="lead">Drag the photos to flip through. Our training cars are fitted with L plates, and learners practise with an instructor beside them.</p>
              <div className="rent card">
                <img src={src(rental)} alt="Neal Motors rental car" />
                <div><h3>Need a car for a trip?</h3><p>Neal Motors offers self-drive and with-driver rentals, daily, weekly or monthly.</p><a className="btn y sm" href="tel:6299916160">Call 62999 16160</a></div>
              </div>
            </div>
            <div className="stackbox"><Stack layout="fan" visible={4} radius={14} frame={4} frameColor="#000" shadow cards={[heroCar, learner, rental, keys].map((m, i) => <img key={i} src={src(m)} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />)} /></div>
          </div>
        </section>

        <section className="sec grey" id="reviews">
          <div className="wrap">
            <h2>Trusted by local learners</h2>
            <p className="lead">What students say about us on Google.</p>
            <div className="reviews">
              {REVIEWS.map((r, i) => (<figure className="card q" key={i}><div className="st">★★★★★</div><p>{r}</p><b>Google reviewer</b></figure>))}
            </div>
            <a className="btn k" href="https://share.google/chuuq7Lb9e3djTQq4" target="_blank" rel="noreferrer">Read all reviews on Google</a>
          </div>
        </section>

        <section className="sec blue" id="faq">
          <div className="wrap split mid">
            <div><h2>Frequently asked questions</h2><p className="lead">Cannot find your answer? Call us on {PHONE_SHOW}.</p></div>
            <div className="faq">
              {FAQ.map(([q, a], i) => (<details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>))}
            </div>
          </div>
        </section>

        <section className="sec dark" id="contact">
          <div className="wrap split mid">
            <div>
              <h2>Start your lessons this week</h2>
              <p className="lead">Leave your number and we will call you back, or reach us directly.</p>
              <address>Rahar Gora, Dhaiya, near Prabhatam Mall<br />Dhanbad, Jharkhand 826004</address>
              <div className="cta">
                <a className="btn y" href={`tel:${PHONE}`}>Call {PHONE_SHOW}</a>
                <a className="btn w" href="https://www.google.com/maps/search/?api=1&query=Neal+Driving+School+Rahar+Gora+Dhaiya+Dhanbad" target="_blank" rel="noreferrer">Get directions</a>
              </div>
            </div>
            <div className="card formcard"><Enquiry /></div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="hazard" />
        <div className="wrap">
          <p><b>Neal Driving School</b>, Rahar Gora, Dhaiya, near Prabhatam Mall, Dhanbad 826004</p>
          <p>Neal Motors car rental: <a href="tel:6299916160">62999 16160</a></p>
        </div>
      </footer>
      <div className="sticky"><a href={`tel:${PHONE}`}>Call now</a><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a></div>
    </ClickSpark>
  );
}
