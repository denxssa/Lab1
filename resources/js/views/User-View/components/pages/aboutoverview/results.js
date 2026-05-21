import React, {useState} from 'react'
import { FormattedMessage } from "react-intl";
import useAboutContent from '../../../../../hooks/useAboutContent';
import './results.scss'
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const Data = [
    {
        number:'2500',
        text:<FormattedMessage id='applications-processed' defaultMessage='Applications Processed' />,
    },
    {
        number:'340',
        text:<FormattedMessage id='positions-published' defaultMessage='Positions Published' />,
    },
    {
        number:'120',
        text:<FormattedMessage id='companies' defaultMessage='Companies' />,
    },
    {
        number:'345',
        text:<FormattedMessage id='emplyed-students' defaultMessage='Employed Students' />,
    }
]

const Results = () => {

    const [viewPortEntered, setViewPortEntered] = useState(false);
    const content = useAboutContent();
    const statsTitle = content.statsTitle || null;

    return (
        <div className='shared-results-numbers'>
            <h1 data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                {statsTitle || <FormattedMessage id='shared-results-title' defaultMessage='Our Work' />}
            </h1>
            <div className="numbers">
                {Data.map((props) => {
                    return(
                        <div className="number">
                            <div className="nr-container">
                                <div className="circle"></div>
                                <div className="nr">
                                    <CountUp end={props.number} duration={1.75} useEasing={true} start={viewPortEntered ? null : 10}>
                                        {({ countUpRef }) => {
                                            return (
                                                <VisibilitySensor
                                                    active={!viewPortEntered}
                                                    onChange={isVisible => {
                                                        if (isVisible) {
                                                            setViewPortEntered(true);
                                                        }
                                                    }}
                                                    delayedCall
                                                    >
                                                        <span ref={countUpRef}></span>
                                                        </VisibilitySensor>
                                                );
                                            }}
                                        </CountUp>+
                                </div>
                            </div>
                            <p>{props.text}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Results