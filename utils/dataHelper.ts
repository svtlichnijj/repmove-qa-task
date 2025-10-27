import { faker, allLocales, Faker } from '@faker-js/faker';
import { constants } from './constants.js';
import type { IRegisterData } from '../types/signup.js';

export function generateRegisterData(): IRegisterData {
  const countryLocale = faker.helpers.arrayElement(Object.keys(constants.COUNTRY_LOCALE_MAP));
  console.log(`- countryLocale: ${countryLocale}`);
  const countryCode = constants.COUNTRY_CODES_MAP[countryLocale as keyof typeof constants.COUNTRY_CODES_MAP];

  const localeKey = constants.COUNTRY_LOCALE_MAP[countryLocale];
  console.log(`-- localeKey: ${localeKey}`);
  const locale = allLocales[localeKey as keyof typeof allLocales];
  const localizedFaker = new Faker({ locale });
  let phoneNumber = '';

  if (localizedFaker.phone == undefined) {
    throw new Error('localizedFaker.phone is undefined');
  } else if (localizedFaker.phone.number == undefined) {
    throw new Error('localizedFaker.phone.number is undefined');
  } else {
    phoneNumber = localizedFaker.phone.number({ style: 'international' }).replace(countryCode, '');
  }

  const password = faker.internet.password({ length: 10, prefix: 'Test!' });

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    companyName: faker.company.name(),
    industry: faker.helpers.arrayElement(constants.VALID_INDUSTRIES),
    email: faker.internet.email().toLocaleLowerCase(),
    countryCode: countryCode,
    phoneNumber: phoneNumber,
    password: password,
  };
}
