import { useState } from 'react';
// import axios from 'axios';

const PhoneNumberInput = ({ onChange, defaultPhone }) => {
    // const [countries, setCountries] = useState([]);
    // const [selectedCountry, setSelectedCountry] = useState({ dialCode: defaultCountryCode || '', flag: '' });
    const [phoneNumber, setPhoneNumber] = useState(defaultPhone || '');

    // Fetch countries data using RestCountries API
    // useEffect(() => {
        
    //     const fetchCountries = async () => {
    //         try {
            
    //             const response = await axios.get('https://restcountries.com/v3.1/all');
            
    //             const countryData = response.data.map((country, index) => ({
    //                 name: country.name.common,
    //                 dialCode: country.idd?.root ? `${country.idd.root}${country.idd.suffixes[0]}` : '',
    //                 flag: country.flags.png,
    //                 uniqueKey: `${country.idd?.root || ''}-${index}`,
    //             })).filter(country => country.dialCode);
    //             setCountries(countryData);
    //             } catch (error) {
    //                 console.error("Error fetching country data:", error);
    //         }
    //     };

    //     fetchCountries();
    // }, []);

    // const handleCountryChange = (event) => {
    //     const selectedDialCode = event.target.value;
    //     const selected = countries.find(country => country.dialCode === selectedDialCode);
    //     setSelectedCountry(selected);
    //     onChange(`${selected.dialCode}${phoneNumber}`);
    // };

    const handlePhoneNumberChange = (event) => {
        const number = event.target.value;
        setPhoneNumber(number);
        onChange(`${number}`);
        // onChange(`${selectedCountry.dialCode}${number}`);
    };

    return (
        <div className="flex items-center space-x-4">
        {/* Country Code and Flag Dropdown */}
        {/* <div className="relative inline-block w-40">
            <select
                value={selectedCountry.dialCode}
                onChange={handleCountryChange}
                className="block w-full p-2 border border-gray-300 rounded"
            >
                {countries.map((country) => (
                    <option key={country.uniqueKey} value={country.dialCode}>
                        {country.name} ({country.dialCode})
                    </option>
                ))}
            </select>
            
            {selectedCountry.flag && (
                <div className="absolute top-0 left-0 flex items-center pl-2 h-full pointer-events-none">
                    <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        className="w-6 h-6"
                    />
                </div>
            )}
        </div> */}

        {/* Phone Number Input */}
        <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border p-2 rounded w-full"
            placeholder="Phone number"
        />
        </div>
    );
};

export default PhoneNumberInput;
