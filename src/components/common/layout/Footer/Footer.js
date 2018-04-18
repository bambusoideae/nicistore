/**
 * Imports
 */
import React from 'react';


import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';


// Required Components
import Heading from '../../typography/Heading';
// import NewsletterSubscription from '../../forms/NewsletterSubscription';
import Text from '../../typography/Text';

// Translation data for this component
import messages from './Footer.messages';


/**
 * Component
 */
class Footer extends React.Component {
  // Component Lifecycle
  componentDidMount() {
    // Component styles
    require('./Footer.scss');
  }

  // Template
  render() {
    //
    // Helper methods & variables
    //

    // Stores
    const storeLinks = [
      { name: 'Sản phẩm mới', link: { to: '/' } },
      { name: 'So sánh', link: { to: '/' } },
      { name: 'Tìm kiếm', link: { to: '/' } },
    ];

    // Info links
    const infoLinks = [
      { name: 'Giới thiệu', link: { to: 'info' } },
      { name: 'Hệ thống phân phối', link: { to: '/info' } },
      { name: 'Hướng dẫn mua hàng', link: { to: '/info' } }
    ];

    // Return a content block's items
    const blockItems = (items) => {
      return items.map((item, idx) => {
        /* eslint-disable react/no-array-index-key */
        return (
          <li key={idx} className="footer__list-item">
            <Link className="footer__link" to={item.link.to}>
              <Text size="small">{item.name}</Text>
            </Link>
          </li>
        );
        /* eslint-enable */
      });
    };

    //
    // Return
    //
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__block">
              <div className="footer__block-title">
                <Heading size="small">
                  <FormattedMessage {...messages.storesTitle} />
                </Heading>
              </div>
              <div className="footer__block-content">
                <ul>
                  {blockItems(storeLinks)}
                </ul>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__block-title">
                <Heading size="small">
                  <FormattedMessage {...messages.infoTitle} />
                </Heading>
              </div>
              <div className="footer__block-content">
                <ul>
                  {blockItems(infoLinks)}
                </ul>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__block-title">
                <Heading size="small">
                  <FormattedMessage {...messages.socialTitle} />
                </Heading>
              </div>
              <div className="footer__block-content">
                <ul>
                  <li className="footer__social-item">
                    <div className="footer__social-icon footer__facebook-icon" />
                    <div>
                      <a className="footer__link footer__social-link" href="//facebook.com/Jaci-154622595171834/" target="_blank" rel="noopener noreferrer">
                        <Text size="small">Facebook</Text>
                      </a>
                    </div>
                  </li>
                  <li className="footer__social-item">
                    <div className="footer__social-icon footer__instagram-icon" />
                    <div>
                      <a className="footer__link footer__social-link" href="//instagram.com/MentieuhoaTOT" target="_blank" rel="noopener noreferrer">
                        <Text size="small">Instagram</Text>
                      </a>
                    </div>
                  </li>
                  <li className="footer__social-item">
                    <div className="footer__social-icon footer__pinterest-icon" />
                    <div>
                      <a className="footer__link footer__social-link" href="//pinterest.com/MentieuhoaTOT" target="_blank" rel="noopener noreferrer">
                        <Text size="small">Pinterest</Text>
                      </a>
                    </div>
                  </li>
                  <li className="footer__social-item">
                    <div className="footer__social-icon footer__twitter-icon" />
                    <div>
                      <a className="footer__link footer__social-link" href="//twitter.com/MentieuhoaTOT" target="_blank" rel="noopener noreferrer">
                        <Text size="small">Twitter</Text>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__block">
              <div className="footer__block-title">
                <Heading size="small">
                  <FormattedMessage {...messages.newsletterTitle} />
                </Heading>
              </div>
              <div className="footer__block-content">
                {/* <NewsletterSubscription /> */}
              </div>
            </div>
          </div>
          <div className="footer__copyright">
            <Text size="small">© {new Date().getFullYear()} JACIVN</Text>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Exports
 */
export default Footer;
