import React, { Component, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';

import { ContactForm } from '@/components';
import { AppState, IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const welcome = document.getElementById('welcome');
    if (welcome) scrollTo({ top: welcome.offsetTop, behavior: 'smooth' });
  }

  render() {
    const breadcrumbList: IBreadcrumbListItem[] = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aquaeconomics.com"
      }
    ];

    const breadcrumb = JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbList
    });

    return (
      <>
        <Head>
          <title>
            Aqua Economics &amp; Engineering &mdash; Site civil engineering,
            surveying, and consulting services in the Greater Philadelphia area
          </title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <main className='Page Page--home'>
          <section className='Section Section--intro' id='home-banner'>
            <div className='Intro-overlay' />
            <div className='Intro Intro--home'>
              <h1>
                Comprehensive civil engineering and surveying
                for Philadelphia and the Delaware Valley.
              </h1>
              <h2>We drive solutions and savings.</h2>
            </div>
          </section>
          <section className='Section Section--welcome' id='welcome'>
            <div className='Welcome'>
              <h3>
                <b>Aqua</b> can design and shepherd all of your land and site
                development projects.
              </h3>
              <p>
                With more than 40 years of civil engineering experience
                in the Philadelphia area, we know what works. Our experts
                have delivered solutions for a wide variety of clients meeting
                diverse goals in site planning and development, surveying,
                stormwater management, zoning and municipal relations.
                <br/>
                <br/>
                We specialize in solving problems <b>before</b> they occur.
              </p>
              <Link href={{ pathname: '/about' }}>
                <a>Learn more &#8594;</a>
              </Link>
            </div>
          </section>
          <section className='Section Section--services'>
            <div className='Services-background'>
              <img
                id='homeServicesImg'
                src={`${imagesUrl}/construction-blueprints.jpg`}
              />
            </div>
            <div className='Services'>
              <div className='Services-text'>
                <div className='Services-text-title'>Our services</div>
                <h3>
                  Excellence and experience for an array of
                  civil engineering goals.
                </h3>
              </div>
              <div className='Services-container'>
                <div className='Service'>
                  <img
                    className='Service-icon'
                    src={`${imagesUrl}/engineering.png`}
                    alt='stormwater'
                    width='64px'
                  />
                  <div className='Service-text'>
                    <div className='Service-text-container'>
                      <h4>Site Civil Engineering</h4>
                      <p>
                        Embracing all aspects of development, from site
                        evaluation and design, to permitting and construction
                        management
                      </p>
                      <Link href={{ pathname: '/civil_engineering' }}>
                        <a>Learn more &#8594;</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='Service'>
                  <img
                    className='Service-icon'
                    src={`${imagesUrl}/surveying.png`}
                    alt='engineering'
                    width='64px'
                  />
                  <div className='Service-text'>
                    <div className='Service-text-container'>
                      <h4>Land &amp; Site Surveying</h4>
                      <p>
                        Distinctly accurate surveying and mapping in service
                        of efficient and cost-effective due diligence and
                        analysis
                      </p>
                      <Link href={{ pathname: '/surveying' }}>
                        <a>Learn more &#8594;</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='Section Section--testimonials'>
            <div className='Testimonials-content'>
              <div className='Testimonials-intro'>
                <h3>What <b>Aqua</b> clients are saying...</h3>
              </div>
              <div className='Testimonials'>
                <div className='Testimonial'>
                  <div className='Testimonial-text'>
                    <p>
                      <q>
                        Aqua Economics saved us $9,000 a month on
                        several of our properties.
                      </q>
                    </p>
                    <p>&mdash; Richmond Management and clients along Delaware River</p>
                  </div>
                </div>
                <div className='Testimonial'>
                  <div className='Testimonial-text'>
                    <p>
                      <q>
                        We saved over $129,000 on our stormwater bill thanks to
                        Aqua Economics &amp; Engineering.
                      </q>
                    </p>
                    <p>&mdash; STS Warehousing &amp; Trucking</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='Section Section--contact' id='contact'>
            <div className='Contact'>
              <div className='Contact-info'>
                <div className='Contact-info-text'>
                  <h3>Leave a message and get help <b>today!</b></h3>
                  <h4>
                    Complete the form, or reach us at:
                  </h4>
                  <div className='Contact-info-text-email'>
                    <p>
                      <Link href='mailto:info@aquaeconomics.com'>
                        <a>info@aquaeconomics.com</a>
                      </Link>
                    </p>
                  </div>
                  <div className='Contact-info-text-phone'>
                    <p>
                      <Link href='tel:+12678859875'>
                        <a>267.885.9875</a>
                      </Link>
                    </p>
                  </div>
                  <div className='Contact-info-text-address'>
                    <p>Aqua Economics &amp; Engineering</p>
                    <p>1391 Walton Road</p>
                    <p>Blue Bell, PA 19422</p>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  router: NextRouter;
}

export default withRouter(connector(Home));