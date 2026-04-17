import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FormattedMessage } from "react-intl";
import { Data } from "./data";
import { ImQuotesLeft } from "react-icons/im";
import "./Testimonal.scss";

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="shared-testimonials">
      <h1 data-aos="fade-up">
        <FormattedMessage
          id="shared-testimonials-title"
          defaultMessage="What our clients say about us"
        />
      </h1>

      <div className="embla" data-aos="slide-up">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {Data.map((item, index) => (
              <div className="embla__slide" key={index} data-aos="flip-left">
                <div className="slider-item">
                  <div className="bg"></div>

                  <div className="main">
                    <div className="top">
                      <div className="quote">
                        <ImQuotesLeft />
                      </div>
                      <p>
                        <FormattedMessage
                          id={item.comment.id}
                          defaultMessage={item.comment.defaultMessage}
                        />
                      </p>
                    </div>

                    <div className="bottom">
                      <div className="line2"></div>
                      <h6>{item.name}</h6>
                      <small>
                        <FormattedMessage
                          id={item.location.id}
                          defaultMessage={item.location.defaultMessage}
                        />
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="embla__controls">
          <button
            type="button"
            className="embla__button"
            aria-label="Show previous testimonial"
            onClick={scrollPrev}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="embla__button"
            aria-label="Show next testimonial"
            onClick={scrollNext}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
