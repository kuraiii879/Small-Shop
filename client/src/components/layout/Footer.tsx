import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/images/logo.png" 
              alt="FASHION Logo" 
              className="w-[170px] h-[130px] object-contain"
              style={{ aspectRatio: '2 / 2' }}
              onError={(e) => {
                // Fallback to other formats if png doesn't exist
                const target = e.target as HTMLImageElement;
                if (target.src.includes('.png')) {
                  target.src = '/images/logo.jpg';
                } else if (target.src.includes('.jpg')) {
                  target.src = '/images/logo.svg';
                }
              }}
            />
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('common.shop')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('common.aboutUs')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('common.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.termsOfService')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.refundPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t('footer.shippingPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('footer.email')}: support@fashion.com</li>
              <li>{t('footer.phone')}: +1 (555) 123-4567</li>
              <li>{t('footer.hours')}: Mon-Fri 9AM-6PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FASHION. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

