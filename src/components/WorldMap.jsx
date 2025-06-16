import { motion } from 'framer-motion';

const WorldMap = () => {
  // Major cities coordinates
  const cities = [
    { name: 'New York', x: 450, y: 120 },
    { name: 'London', x: 580, y: 110 },
    { name: 'Tokyo', x: 800, y: 130 },
    { name: 'Sydney', x: 850, y: 280 },
    { name: 'Dubai', x: 650, y: 160 },
    { name: 'Singapore', x: 750, y: 200 },
    { name: 'Paris', x: 550, y: 120 },
    { name: 'Mumbai', x: 700, y: 170 },
    { name: 'Shanghai', x: 780, y: 140 },
    { name: 'Los Angeles', x: 400, y: 150 },
    { name: 'Moscow', x: 650, y: 100 },
    { name: 'Cairo', x: 600, y: 180 },
    { name: 'Rio de Janeiro', x: 550, y: 250 },
    { name: 'Toronto', x: 480, y: 100 },
    { name: 'Berlin', x: 570, y: 110 },
    { name: 'Hong Kong', x: 780, y: 160 },
    { name: 'Seoul', x: 820, y: 130 },
    { name: 'Bangkok', x: 760, y: 190 },
    { name: 'Istanbul', x: 620, y: 140 },
    { name: 'Rome', x: 560, y: 130 },
    { name: 'Amsterdam', x: 550, y: 110 },
    { name: 'Madrid', x: 530, y: 140 },
    { name: 'Vienna', x: 580, y: 120 },
    { name: 'Prague', x: 570, y: 115 },
    { name: 'Warsaw', x: 590, y: 110 },
    { name: 'Athens', x: 600, y: 150 },
    { name: 'Copenhagen', x: 560, y: 100 },
    { name: 'Stockholm', x: 580, y: 90 },
    { name: 'Helsinki', x: 600, y: 85 },
    { name: 'Oslo', x: 560, y: 85 },
    { name: 'Mexico City', x: 440, y: 180 },
    { name: 'Cape Town', x: 620, y: 320 },
    { name: 'Buenos Aires', x: 540, y: 300 },
    { name: 'Santiago', x: 520, y: 320 },
    { name: 'Nairobi', x: 650, y: 220 },
    { name: 'Lagos', x: 580, y: 220 },
    { name: 'Riyadh', x: 680, y: 180 },
    { name: 'Tehran', x: 700, y: 150 },
    { name: 'Kuala Lumpur', x: 760, y: 210 },
    { name: 'Jakarta', x: 780, y: 230 },
    { name: 'Manila', x: 800, y: 190 },
    { name: 'Ho Chi Minh City', x: 750, y: 200 },
    { name: 'Lima', x: 500, y: 280 },
    { name: 'Bogota', x: 500, y: 220 },
    { name: 'Caracas', x: 520, y: 190 },
    { name: 'Accra', x: 560, y: 210 },
    { name: 'Algiers', x: 570, y: 170 },
    { name: 'Casablanca', x: 540, y: 170 },
    { name: 'Dakar', x: 520, y: 200 },
    { name: 'Addis Ababa', x: 670, y: 200 },
    { name: 'Auckland', x: 900, y: 300 },
    { name: 'Wellington', x: 910, y: 320 },
    { name: 'Lisbon', x: 520, y: 150 },
    { name: 'Dublin', x: 540, y: 100 },
    { name: 'Edinburgh', x: 550, y: 90 },
    { name: 'Reykjavik', x: 480, y: 50 },
    { name: 'Vancouver', x: 380, y: 100 },
    { name: 'Chicago', x: 470, y: 120 },
    { name: 'Houston', x: 450, y: 170 },
    { name: 'Miami', x: 470, y: 200 },
    { name: 'Boston', x: 490, y: 110 },
    { name: 'Montreal', x: 490, y: 90 },
    { name: 'Quebec City', x: 500, y: 80 },
    { name: 'Halifax', x: 520, y: 100 },
    { name: 'Perth', x: 780, y: 300 },
    { name: 'Adelaide', x: 830, y: 320 },
    { name: 'Melbourne', x: 860, y: 330 },
    { name: 'Brisbane', x: 880, y: 280 },
    { name: 'Osaka', x: 810, y: 140 },
    { name: 'Sapporo', x: 830, y: 110 },
    { name: 'Nagoya', x: 800, y: 150 },
    { name: 'Fukuoka', x: 790, y: 160 },
    { name: 'Kyoto', x: 800, y: 145 },
    { name: 'Dhaka', x: 720, y: 190 },
    { name: 'Chittagong', x: 730, y: 195 },
    { name: 'Islamabad', x: 700, y: 160 },
    { name: 'Karachi', x: 690, y: 200 },
    { name: 'Lahore', x: 710, y: 165 },
    { name: 'Kathmandu', x: 730, y: 170 },
    { name: 'Colombo', x: 700, y: 230 },
    { name: 'Male', x: 700, y: 240 },
    { name: 'Port Louis', x: 670, y: 280 },
    { name: 'Antananarivo', x: 660, y: 290 },
    { name: 'Dar es Salaam', x: 670, y: 240 },
    { name: 'Mombasa', x: 660, y: 230 },
    { name: 'Kampala', x: 650, y: 225 },
    { name: 'Kigali', x: 640, y: 220 },
    { name: 'Kinshasa', x: 600, y: 230 },
    { name: 'Luanda', x: 590, y: 260 },
    { name: 'Pretoria', x: 610, y: 300 },
    { name: 'Johannesburg', x: 610, y: 305 },
    { name: 'Harare', x: 630, y: 270 },
    { name: 'Lusaka', x: 620, y: 260 },
    { name: 'Gaborone', x: 600, y: 290 },
    { name: 'Phnom Penh', x: 760, y: 215 },
    { name: 'Vientiane', x: 750, y: 205 },
    { name: 'Yangon', x: 740, y: 190 },
    { name: 'Thimphu', x: 730, y: 175 },
    { name: 'Ulaanbaatar', x: 750, y: 100 },
    { name: 'Novosibirsk', x: 700, y: 80 },
    { name: 'Nur-Sultan', x: 680, y: 100 },
    { name: 'Tashkent', x: 670, y: 140 },
    { name: 'Bishkek', x: 690, y: 130 },
    { name: 'Almaty', x: 700, y: 120 },
    { name: 'Baku', x: 650, y: 150 },
    { name: 'Tbilisi', x: 640, y: 140 },
    { name: 'Yerevan', x: 630, y: 150 },
    { name: 'Beirut', x: 620, y: 160 },
    { name: 'Amman', x: 630, y: 165 },
    { name: 'Baghdad', x: 660, y: 155 },
    { name: 'Kuwait City', x: 670, y: 170 },
    { name: 'Doha', x: 680, y: 175 },
    { name: 'Abu Dhabi', x: 690, y: 180 },
    { name: 'Muscat', x: 700, y: 190 },
    { name: 'Sana\'a', x: 680, y: 200 },
    { name: 'Aden', x: 680, y: 210 },
    { name: 'Djibouti City', x: 660, y: 210 },
    { name: 'Mogadishu', x: 680, y: 230 },
    { name: 'Abidjan', x: 550, y: 230 },
    { name: 'Douala', x: 580, y: 240 },
    { name: 'Yaounde', x: 590, y: 235 },
    { name: 'Khartoum', x: 640, y: 200 },
    { name: 'Tripoli', x: 580, y: 160 },
    { name: 'Tunis', x: 560, y: 150 },
    { name: 'Rabat', x: 530, y: 160 },
    { name: 'Dakar', x: 520, y: 200 },
    { name: 'Freetown', x: 540, y: 220 },
    { name: 'Monrovia', x: 530, y: 230 },
    { name: 'Conakry', x: 530, y: 210 },
    { name: 'Bamako', x: 550, y: 200 },
    { name: 'Niamey', x: 590, y: 200 },
    { name: 'Ndjamena', x: 610, y: 210 },
    { name: 'Bangui', x: 630, y: 220 },
    { name: 'Brazzaville', x: 600, y: 240 },
    { name: 'Kinshasa', x: 600, y: 230 },
    { name: 'Luanda', x: 590, y: 260 },
    { name: 'Windhoek', x: 580, y: 290 },
    { name: 'Harare', x: 630, y: 270 },
    { name: 'Maputo', x: 650, y: 300 },
    { name: 'Lilongwe', x: 650, y: 260 },
    { name: 'Blantyre', x: 650, y: 270 },
    { name: 'Gaborone', x: 600, y: 290 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Gradient Background */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.015" />
            <stop offset="50%" stopColor="#92400e" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0.015" />
          </linearGradient>
          
          {/* Globe Shadow */}
          <radialGradient id="globeShadow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Globe Background */}
        <circle
          cx="500"
          cy="250"
          r="240"
          fill="url(#mapGradient)"
          className="text-amber-900/5"
        />
        
        {/* Globe Shadow */}
        <circle
          cx="500"
          cy="250"
          r="240"
          fill="url(#globeShadow)"
        />

        {/* Background Grid - Curved for Globe */}
        <g className="text-amber-900/60">
          {/* Latitude Lines - Curved */}
          {[...Array(13)].map((_, i) => {
            const y = 40 + i * 40;
            const radius = Math.sqrt(240 * 240 - Math.pow(y - 250, 2));
            return (
              <path
                key={`lat-${i}`}
                d={`M ${500 - radius},${y} A ${radius},${radius} 0 0,1 ${500 + radius},${y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2,2"
              />
            );
          })}
          
          {/* Longitude Lines - Straight */}
          {[...Array(18)].map((_, i) => {
            const angle = (i * 20 * Math.PI) / 180;
            const x1 = 500 + 240 * Math.cos(angle);
            const y1 = 250 + 240 * Math.sin(angle);
            const x2 = 500 - 240 * Math.cos(angle);
            const y2 = 250 - 240 * Math.sin(angle);
            return (
              <line
                key={`long-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2,2"
              />
            );
          })}
        </g>

        {/* Continents - Adjusted for Globe Projection */}
        <g className="text-amber-900/30">
          {/* North America */}
          <path
            d="M 450,100 
               C 480,90 510,100 540,90 
               C 570,80 600,90 630,80 
               C 660,70 690,80 720,70 
               L 720,140 
               C 690,150 660,160 630,150 
               C 600,140 570,130 540,140 
               C 510,150 480,160 450,150 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          
          {/* South America */}
          <path
            d="M 520,200 
               C 550,190 580,200 610,190 
               C 640,180 670,190 700,180 
               C 730,170 760,180 790,170 
               L 790,230 
               C 760,240 730,250 700,240 
               C 670,230 640,220 610,230 
               C 580,240 550,250 520,240 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          
          {/* Europe */}
          <path
            d="M 580,120 
               C 610,110 640,120 670,110 
               C 700,100 730,110 760,100 
               C 790,90 820,100 850,90 
               L 850,150 
               C 820,160 790,170 760,160 
               C 730,150 700,140 670,150 
               C 640,160 610,170 580,160 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          
          {/* Africa */}
          <path
            d="M 580,180 
               C 610,170 640,180 670,170 
               C 700,160 730,170 760,160 
               C 790,150 820,160 850,150 
               L 850,210 
               C 820,220 790,230 760,220 
               C 730,210 700,200 670,210 
               C 640,220 610,230 580,220 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          
          {/* Asia */}
          <path
            d="M 680,100 
               C 710,90 740,100 770,90 
               C 800,80 830,90 860,80 
               L 860,160 
               C 830,170 800,180 770,170 
               C 740,160 710,150 680,160 
               C 650,170 620,180 590,170 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          
          {/* Australia */}
          <path
            d="M 750,280 
               C 780,270 810,280 840,270 
               L 840,320 
               C 810,330 780,340 750,330 
               C 720,320 690,310 660,320 
               C 630,330 600,340 570,330 
               Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </g>

        {/* City Pins */}
        <g className="text-amber-900/40">
          {cities.map((city, index) => (
            <g key={city.name} className="animate-pulse">
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="4"
                fill="currentColor"
                className="text-amber-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              />
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-amber-500/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              />
              <motion.circle
                cx={city.x}
                cy={city.y}
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="text-amber-500/20"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1
                }}
              />
            </g>
          ))}
        </g>

        {/* Globe Border */}
        <circle
          cx="500"
          cy="250"
          r="240"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-amber-900/20"
        />

        {/* Compass Rose */}
        <g transform="translate(100, 100)" className="text-amber-900/30">
          <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <line x1="-15" y1="0" x2="15" y2="0" stroke="currentColor" strokeWidth="0.2" />
          <line x1="0" y1="-15" x2="0" y2="15" stroke="currentColor" strokeWidth="0.2" />
          <text x="0" y="-20" textAnchor="middle" className="text-[8px]">N</text>
          <text x="0" y="25" textAnchor="middle" className="text-[8px]">S</text>
          <text x="-20" y="0" textAnchor="middle" className="text-[8px]">W</text>
          <text x="20" y="0" textAnchor="middle" className="text-[8px]">E</text>
        </g>
      </svg>
    </div>
  );
};

export default WorldMap; 