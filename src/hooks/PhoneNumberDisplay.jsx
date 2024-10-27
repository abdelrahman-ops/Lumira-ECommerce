import { useEffect, useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import axios from 'axios';

const PhoneNumberDisplay = ({ fullPhoneNumber }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nationalNumber, setNationalNumber] = useState('');

  // Fetch countries data for flags
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryData = response.data
          .map((country) => ({
            name: country.name.common,
            dialCode: country.idd?.root ? `${country.idd.root}${country.idd.suffixes[0]}` : '',
            flag: country.flags.png,
          }))
          .filter((country) => country.dialCode); // Only include countries with dial codes
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  // Parse phone number
  useEffect(() => {
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);
    if (phoneNumber) {
      setNationalNumber(phoneNumber.nationalNumber);

      const country = countries.find((c) => c.dialCode === `+${phoneNumber.countryCallingCode}`);
      if (country) {
        setSelectedCountry(country);
      }
    }
  }, [fullPhoneNumber, countries]);

  return (
    <div className="flex items-center border rounded-md p-2">
      {selectedCountry && (
        <img src={selectedCountry.flag} alt="Country Flag" className="w-6 h-4 mr-2" />
      )}
      <input type="text" className="flex-1" value={nationalNumber} readOnly />
    </div>
  );
};

export default PhoneNumberDisplay;
