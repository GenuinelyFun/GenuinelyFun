import Cookies from 'js-cookie';

export enum CookieConsents {
  FUNCTIONAL = 'cookie_cat_functional',
  STATISTIC = 'cookie_cat_statistic',
  MARKETING = 'cookie_cat_marketing',
  UNCLASSIFIED = 'cookie_cat_unclassified',
  NECESSARY = 'cookie_cat_necessary',
}

type CookieResponse = {
  website_uuid: string;
  timestamp: string;
  consent_url: string;
  consent_website: string;
  consent_domain: string;
  user_uid: string;
  consents_approved: CookieConsents[];
  consents_denied: CookieConsents[];
  user_agent: string;
};

export const isCookieSet = (consent: CookieConsents) => {
  const cookieConsent = Cookies.get('CookieInformationConsent');

  if (cookieConsent === undefined) {
    return false;
  }

  const { consents_approved: approvedConsents } = JSON.parse(
    cookieConsent
  ) as CookieResponse;

  return approvedConsents.includes(consent);
};