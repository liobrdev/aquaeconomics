import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';

import { ContactForm } from '@/components';
import { AppState, IBreadcrumbListItem } from '@/types';


const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

class Home extends Component<Props> {
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
            Aqua Economics &amp; Engineering &mdash; Cost reduction, surveying,
            zoning, and business development in the Philadelphia area
          </title>
          <script type="application/ld+json">{breadcrumb}</script>
        </Head>
        <main className='Page Page--home'>
          <section className='Section Section--intro'>
            <div className='Intro Intro--home'>
              <h1>
                Stormwater cost analysis, site engineering, and
                surveying for Philadelphia and
                the Delaware Valley.
              </h1>
              <h2>We help you save time and money.</h2>
            </div>
          </section>
          <section className='Section Section--welcome'>
            <div className='Welcome'>
              <h2>
                Let Aqua Economics be <b>your</b> advocate
                with the City of Philadelphia
              </h2>
              <h3>
                <p>
                  We can design and shepherd all your land surveying,
                  consolidation, building and stormwater projects.
                </p>
                <p>
                  <Link
                    href="http://www.aquaeconomics.com/download/DevProcess.png"
                  >
                    <a target="popup">
                      The development process in Philadelphia is quite complex
                    </a>
                  </Link>
                  &nbsp;&mdash;&nbsp;yet, after 36 years of surveying for and within the
                  City, we know how the system works.
                </p>
                <p>
                  We solve problems <b>before</b> they occur.
                </p>
              </h3>
            </div>
          </section>
          <section className='Section Section--services'>
            <div className='Services'>
              <h2>Our Services</h2>
              <h3>We offer a complete civil engineering package</h3>
              <div className='Service'>
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>
                      Free water billing analysis to reduce your
                      stormwater bill
                    </h4>
                    <Link href={{ pathname: '/stormwater' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/stormwater.png`}
                  alt='stormwater'
                />
              </div>
              <div className='Service'>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/engineering.png`}
                  alt='engineering'
                />
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>
                      Site engineering and design plans for new construction
                    </h4>
                    <Link href={{ pathname: '/engineering' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='Service'>
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>Land and site surveying for cost benefit analysis</h4>
                    <Link href={{ pathname: '/surveying' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/surveying.png`}
                  alt='surveying'
                />
              </div>
              <div className='Service'>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/ersa.png`}
                  alt='ersa'
                />
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>
                      Existing Resources and Site Analysis &#40;ERSA&#41;
                      &mdash;&nbsp;required when building in the
                      City of Philadelphia over 5,000 square feet
                    </h4>
                    <Link href={{ pathname: '/ersa_plans' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='Service'>
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>
                      Zoning and subdivision plans &amp; permits in accordance
                      with City codes
                    </h4>
                    <Link href={{ pathname: '/zoning' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/zoning.png`}
                  alt='zoning'
                />
              </div>
              <div className='Service'>
                <img
                  className='Service-icon'
                  src={`${imagesUrl}/consulting.png`}
                  alt='consulting'
                />
                <div className='Service-text'>
                  <div className='Service-text-container'>
                    <h4>Due diligence consulting services</h4>
                    <Link href={{ pathname: '/consulting' }}>
                      <a>Learn more</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='Section Section--testimonials'>
            <div className='Testimonials-underlay' />
            <div className='Testimonials-content'>
              <div className='Testimonials-intro'>
                <h2>What our community is saying...</h2>
              </div>
              <div className='Testimonials'>
                <div className='Testimonial'>
                  <div className='Testimonial-text'>
                    <h4>
                      <q>
                        Aqua Economics saved us $9,000 a month on
                        several of our properties
                      </q>
                    </h4>
                    <p>&mdash; Richmond Management and clients along Delaware River</p>
                  </div>
                </div>
                <div className='Testimonial'>
                  <div className='Testimonial-text'>
                    <h4>
                      <q>
                        We saved over $129,000 on our stormwater bill thanks to
                        Aqua Economics &amp; Engineering
                      </q>
                    </h4>
                    <p>&mdash; STS Warehousing &amp; Trucking</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='Section Section--contact' id='contact'>
            <div className='Contact'>
              <h2>Get started</h2>
              <h3>Leave a message and let us know how we can help</h3>
              <div className='Contact-content'>
                <div className='Contact-info'>
                  <div className='Contact-info-text'>
                    <h4>Contact us</h4>
                    <h5>
                      Complete the form and our team will get back to you
                      ASAP, or find us at:
                    </h5>
                    <div className='Contact-info-text-phone'>
                      {/* <img /> */}
                      <p>+1 267 885 9875</p>
                    </div>
                    <div className='Contact-info-text-email'>
                      {/* <img /> */}
                      <p>info@aquaeconomics.com</p>
                    </div>
                    <div className='Contact-info-text-address'>
                      {/* <img /> */}
                      <p>Aqua Economics &amp; Engineering</p>
                      <p>1391 Walton Road</p>
                      <p>Blue Bell, PA 19422</p>
                    </div>
                  </div>
                </div>
                <ContactForm />
              </div>
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