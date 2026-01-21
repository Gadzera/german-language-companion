// Маппинг стран на флаги emoji
const countryToFlag: Record<string, string> = {
  // Немецкоязычные страны
  'Deutschland': '🇩🇪',
  'Germany': '🇩🇪',
  'DE': '🇩🇪',
  'Österreich': '🇦🇹',
  'Austria': '🇦🇹',
  'AT': '🇦🇹',
  'Schweiz': '🇨🇭',
  'Switzerland': '🇨🇭',
  'CH': '🇨🇭',
  
  // Восточная Европа
  'Russland': '🇷🇺',
  'Russia': '🇷🇺',
  'RU': '🇷🇺',
  'Ukraine': '🇺🇦',
  'UA': '🇺🇦',
  'Polen': '🇵🇱',
  'Poland': '🇵🇱',
  'PL': '🇵🇱',
  'Tschechien': '🇨🇿',
  'Czech Republic': '🇨🇿',
  'CZ': '🇨🇿',
  'Ungarn': '🇭🇺',
  'Hungary': '🇭🇺',
  'HU': '🇭🇺',
  'Rumänien': '🇷🇴',
  'Romania': '🇷🇴',
  'RO': '🇷🇴',
  'Bulgarien': '🇧🇬',
  'Bulgaria': '🇧🇬',
  'BG': '🇧🇬',
  'Serbien': '🇷🇸',
  'Serbia': '🇷🇸',
  'RS': '🇷🇸',
  'Kroatien': '🇭🇷',
  'Croatia': '🇭🇷',
  'HR': '🇭🇷',
  
  // Ближний Восток и Азия
  'Türkei': '🇹🇷',
  'Turkey': '🇹🇷',
  'TR': '🇹🇷',
  'Iran': '🇮🇷',
  'IR': '🇮🇷',
  'Irak': '🇮🇶',
  'Iraq': '🇮🇶',
  'IQ': '🇮🇶',
  'Syrien': '🇸🇾',
  'Syria': '🇸🇾',
  'SY': '🇸🇾',
  'Afghanistan': '🇦🇫',
  'AF': '🇦🇫',
  'Pakistan': '🇵🇰',
  'PK': '🇵🇰',
  'Indien': '🇮🇳',
  'India': '🇮🇳',
  'IN': '🇮🇳',
  'China': '🇨🇳',
  'CN': '🇨🇳',
  'Japan': '🇯🇵',
  'JP': '🇯🇵',
  'Südkorea': '🇰🇷',
  'South Korea': '🇰🇷',
  'KR': '🇰🇷',
  
  // Африка
  'Ägypten': '🇪🇬',
  'Egypt': '🇪🇬',
  'EG': '🇪🇬',
  'Marokko': '🇲🇦',
  'Morocco': '🇲🇦',
  'MA': '🇲🇦',
  'Algerien': '🇩🇿',
  'Algeria': '🇩🇿',
  'DZ': '🇩🇿',
  'Nigeria': '🇳🇬',
  'NG': '🇳🇬',
  'Südafrika': '🇿🇦',
  'South Africa': '🇿🇦',
  'ZA': '🇿🇦',
  
  // Западная Европа
  'Frankreich': '🇫🇷',
  'France': '🇫🇷',
  'FR': '🇫🇷',
  'Italien': '🇮🇹',
  'Italy': '🇮🇹',
  'IT': '🇮🇹',
  'Spanien': '🇪🇸',
  'Spain': '🇪🇸',
  'ES': '🇪🇸',
  'Portugal': '🇵🇹',
  'PT': '🇵🇹',
  'Niederlande': '🇳🇱',
  'Netherlands': '🇳🇱',
  'NL': '🇳🇱',
  'Belgien': '🇧🇪',
  'Belgium': '🇧🇪',
  'BE': '🇧🇪',
  'Großbritannien': '🇬🇧',
  'United Kingdom': '🇬🇧',
  'UK': '🇬🇧',
  'GB': '🇬🇧',
  'Griechenland': '🇬🇷',
  'Greece': '🇬🇷',
  'GR': '🇬🇷',
  
  // Скандинавия
  'Schweden': '🇸🇪',
  'Sweden': '🇸🇪',
  'SE': '🇸🇪',
  'Norwegen': '🇳🇴',
  'Norway': '🇳🇴',
  'NO': '🇳🇴',
  'Dänemark': '🇩🇰',
  'Denmark': '🇩🇰',
  'DK': '🇩🇰',
  'Finnland': '🇫🇮',
  'Finland': '🇫🇮',
  'FI': '🇫🇮',
  
  // Америка
  'USA': '🇺🇸',
  'United States': '🇺🇸',
  'US': '🇺🇸',
  'Kanada': '🇨🇦',
  'Canada': '🇨🇦',
  'CA': '🇨🇦',
  'Mexiko': '🇲🇽',
  'Mexico': '🇲🇽',
  'MX': '🇲🇽',
  'Brasilien': '🇧🇷',
  'Brazil': '🇧🇷',
  'BR': '🇧🇷',
  'Argentinien': '🇦🇷',
  'Argentina': '🇦🇷',
  'AR': '🇦🇷',
  
  // Другие
  'Australien': '🇦🇺',
  'Australia': '🇦🇺',
  'AU': '🇦🇺',
  'Neuseeland': '🇳🇿',
  'New Zealand': '🇳🇿',
  'NZ': '🇳🇿',
  'Israel': '🇮🇱',
  'IL': '🇮🇱',
};

export function getCountryFlag(country: string | null | undefined): string {
  if (!country) return '🌍';
  
  // Прямой поиск
  if (countryToFlag[country]) {
    return countryToFlag[country];
  }
  
  // Поиск без учета регистра
  const countryLower = country.toLowerCase();
  for (const [key, flag] of Object.entries(countryToFlag)) {
    if (key.toLowerCase() === countryLower) {
      return flag;
    }
  }
  
  return '🌍'; // Глобус по умолчанию
}

// Список стран для выбора в профиле
export const countryList = [
  { name: 'Deutschland', flag: '🇩🇪' },
  { name: 'Österreich', flag: '🇦🇹' },
  { name: 'Schweiz', flag: '🇨🇭' },
  { name: 'Russland', flag: '🇷🇺' },
  { name: 'Ukraine', flag: '🇺🇦' },
  { name: 'Türkei', flag: '🇹🇷' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Syrien', flag: '🇸🇾' },
  { name: 'Afghanistan', flag: '🇦🇫' },
  { name: 'Irak', flag: '🇮🇶' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Indien', flag: '🇮🇳' },
  { name: 'Ägypten', flag: '🇪🇬' },
  { name: 'Polen', flag: '🇵🇱' },
  { name: 'Ungarn', flag: '🇭🇺' },
  { name: 'Rumänien', flag: '🇷🇴' },
  { name: 'Bulgarien', flag: '🇧🇬' },
  { name: 'Serbien', flag: '🇷🇸' },
  { name: 'Kroatien', flag: '🇭🇷' },
  { name: 'Griechenland', flag: '🇬🇷' },
  { name: 'Italien', flag: '🇮🇹' },
  { name: 'Spanien', flag: '🇪🇸' },
  { name: 'Frankreich', flag: '🇫🇷' },
  { name: 'Niederlande', flag: '🇳🇱' },
  { name: 'Großbritannien', flag: '🇬🇧' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Brasilien', flag: '🇧🇷' },
];
