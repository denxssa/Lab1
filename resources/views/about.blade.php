<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BeeHired | About Us</title>
    <link rel="stylesheet" href="{{ asset('public/css/app.css') }}">
    <style>
        :root {
            --yellow: #f4c430;
            --yellow-deep: #d9a90b;
            --ink: #14161a;
            --muted: #5c6270;
            --bg: #ffffff;
            --line: #e5e7eb;
        }

        * { box-sizing: border-box; }
        body { margin: 0; font-family: "Trebuchet MS", "Gill Sans", sans-serif; color: var(--ink); background: var(--bg); }
        .container { width: min(1160px, calc(100% - 2rem)); margin: 0 auto; }
        #app { min-height: 0 !important; display: block !important; }
        #app .app-main { display: none !important; }

        .hero { min-height: 82vh; position: relative; overflow: hidden; padding: 0; }
        .hero-wrap {
            min-height: 82vh;
            position: relative;
            display: flex;
            align-items: center;
            background: #ffffff url('/linesonlyy.png') center top / cover no-repeat;
        }
        .hero-wrap::before,
        .hero-wrap::after {
            content: "";
            position: absolute;
            background: #fff;
            z-index: 1;
            pointer-events: none;
        }
        .hero-wrap::before {
            width: 330px;
            height: 330px;
            right: -26px;
            top: -26px;
            border-bottom-left-radius: 100%;
        }
        .hero-wrap::after {
            width: 360px;
            height: 360px;
            left: -36px;
            bottom: -36px;
            border-top-right-radius: 100%;
        }
        .hero-copy {
            position: relative;
            z-index: 2;
            color: #121318;
            width: min(760px, calc(100% - 2rem));
            margin: 0 auto;
            padding: 0 0 clamp(.6rem, 2vw, 1.4rem);
            text-align: center;
            transform: translateY(8.6rem);
        }
        .label { display: inline-flex; align-items: center; gap: .45rem; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 999px; padding: .35rem .75rem; color: #424855; font-size: .8rem; }
        .label i { width: .45rem; height: .45rem; border-radius: 50%; background: var(--yellow-deep); display: inline-block; }
        h1 { margin: .5rem 0 .65rem; font-family: "Georgia", "Times New Roman", serif; font-size: clamp(2.4rem, 6vw, 5rem); line-height: 1.02; letter-spacing: -.02em; }
        .accent { color: var(--yellow-deep); }
        .accent-underline { text-decoration: underline; text-underline-offset: .1em; }
        .hero p { margin: 0 auto; color: #5b6170; font-size: 1.08rem; line-height: 1.62; max-width: 58ch; }
        .hero-cta { margin-top: 1.4rem; display: inline-flex; align-items: center; gap: .6rem; text-decoration: none; background: #11141a; color: #ffffff; border-radius: 999px; padding: .8rem 1.3rem; font-weight: 700; font-size: .8rem; letter-spacing: .06em; text-transform: uppercase; }
        .hero-cta span { width: 1.35rem; height: 1.35rem; border-radius: 50%; background: #ffffff; color: #11141a; display: grid; place-items: center; font-size: .9rem; line-height: 1; font-weight: 800; }

        section { padding: 3.2rem 0 4.3rem; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.1rem; }
        .panel { padding: 0 0 0 1rem; border-left: 3px solid #d9dde5; }
        .panel h3 { margin: .3rem 0 .65rem; font-size: 1.35rem; font-family: "Georgia", "Times New Roman", serif; }
        .panel p { margin: 0; color: var(--muted); line-height: 1.6; }

        .stats { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1.1rem; margin-top: 2.1rem; }
        .stat { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.2rem; text-align: center; box-shadow: 0 8px 18px rgba(17, 20, 26, .08); transition: transform .2s ease, box-shadow .2s ease; }
        .stat:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(17, 20, 26, .13); }
        .stat strong { display: block; color: var(--yellow-deep); font-size: 1.3rem; margin-bottom: .18rem; }

        .journey {
            margin-top: 2.6rem;
            padding: 1.6rem 1.5rem;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
        }
        .journey h3 {
            margin: 0 0 1.1rem;
            text-align: center;
            font-size: 1.5rem;
            font-family: "Georgia", "Times New Roman", serif;
        }
        .journey-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
        }
        .journey-item { text-align: center; }
        .journey-item b {
            display: inline-block;
            margin-bottom: .5rem;
            color: var(--yellow-deep);
            letter-spacing: .08em;
            font-size: .8rem;
        }
        .journey-item h4 {
            margin: 0 0 .35rem;
            font-size: 1.03rem;
            font-family: "Georgia", "Times New Roman", serif;
        }
        .journey-item p {
            margin: 0;
            color: var(--muted);
            line-height: 1.55;
            font-size: .95rem;
        }

        .team { margin-top: 3rem; }
        .cap-title { margin: 0; font-size: 1.65rem; }
        .team .cap-title { text-align: center; margin-bottom: 1.25rem; font-family: "Georgia", "Times New Roman", serif; }
        .team-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1.05rem; }
        .member { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 22px rgba(17, 20, 26, .09); transition: transform .2s ease, box-shadow .2s ease; }
        .member:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(17, 20, 26, .15); }
        .member-photo { width: 100%; height: 180px; background: #f6f7f9; border-bottom: 1px solid #e5e7eb; }
        .member img { width: 100%; height: 180px; object-fit: cover; display: block; }
        .member div { padding: 1.05rem; }
        .member h5 { margin: 0; font-size: .98rem; }
        .member p { margin: .2rem 0 0; color: var(--muted); font-size: .88rem; }

        @media (max-width: 1020px) {
            .about-grid { grid-template-columns: 1fr; }
            .team-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
            .stats { grid-template-columns: repeat(2, minmax(0,1fr)); }
            .journey-grid { grid-template-columns: 1fr; }
            .hero { min-height: 68vh; }
            .hero-wrap { min-height: 68vh; }
            .hero-wrap::before,
            .hero-wrap::after { display: none; }
        }

        @media (max-width: 600px) {
            .team-grid, .stats { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <section class="hero">
        <div class="hero-wrap">
            <div class="hero-copy">
                <h1>People hire people.<br><span class="accent accent-underline">BeeHired</span> keeps it fair.</h1>
                <p>From the first announcement to the final shortlist, every step stays visible, structured, and easy for teams to manage together.</p>
                <a class="hero-cta" href="#about-story">Read About BeeHired <span>➜</span></a>
            </div>
        </div>
    </section>

    <section id="about-story">
        <div class="container">
            <div class="about-grid">
                <article class="panel">
                    <h3>What BeeHired Solves</h3>
                    <p>Recruitment is often fragmented across email, spreadsheets, and disconnected tools. BeeHired consolidates announcements, applications, evaluations, and decisions in one secure platform.</p>
                </article>
                <article class="panel">
                    <h3>Why Organizations Use It</h3>
                    <p>Faster processing, better visibility, and consistent candidate handling. Teams can collaborate efficiently while maintaining professional standards and audit-ready records.</p>
                </article>
            </div>

            <div class="stats">
                <div class="stat"><strong>2.5K+</strong>Applications Processed</div>
                <div class="stat"><strong>340+</strong>Positions Published</div>
                <div class="stat"><strong>120+</strong>Organizations</div>
                <div class="stat"><strong>99.9%</strong>Platform Uptime</div>
            </div>

            <div class="journey">
                <h3>How BeeHired Works</h3>
                <div class="journey-grid">
                    <article class="journey-item">
                        <b>STEP 01</b>
                        <h4>Publish Clearly</h4>
                        <p>Create openings with deadlines, requirements, and transparent criteria from day one.</p>
                    </article>
                    <article class="journey-item">
                        <b>STEP 02</b>
                        <h4>Review Consistently</h4>
                        <p>Guide applications through structured stages so reviewers stay aligned and accountable.</p>
                    </article>
                    <article class="journey-item">
                        <b>STEP 03</b>
                        <h4>Decide with Record</h4>
                        <p>Finalize selections with full traceability, making every decision easy to justify later.</p>
                    </article>
                </div>
            </div>

            <div class="team">
                <h3 class="cap-title">Leadership Team</h3>
                <div class="team-grid">
                    <article class="member"><div class="member-photo"></div><div><h5>Vesa Susuri</h5><p>Product Manager</p></div></article>
                    <article class="member"><div class="member-photo"></div><div><h5>Migjen Prenaj</h5><p>HR Process Lead</p></div></article>
                    <article class="member"><div class="member-photo"></div><div><h5>Denisa Gjuraj</h5><p>Data & Analytics Lead</p></div></article>
                    <article class="member"><div class="member-photo"></div><div><h5>Rige Qerimi</h5><p>Engineering Lead</p></div></article>
                </div>
            </div>
        </div>
    </section>
    <script src="{{ asset('public/js/app.js') }}" defer></script>

</body>
</html>
