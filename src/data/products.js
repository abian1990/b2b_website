// Product data based on AORE LASER catalog PPT
import gmbMachine from '../assets/gmb-machine.png'
import gmbRail from '../assets/gmb-rail.png'

export const products = [
  {
    id: 'f-series',
    series: 'F',
    category: 'Sheet Fiber Laser Cutting Machine',
    name: 'F Series Single Platform Sheet Laser Cutter',
    description: 'High-rigidity structure bed design with high load-bearing capacity and low deformation for stable cutting. Modular worktable for easy disassembly, transportation, and maintenance.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80'
    ],
    badge: 'BESTSELLER',
    powerRange: '1.5-20kW',
    models: [
      { name: 'F3015', power: '1.5-20kW' },
      { name: 'F4020', power: '1.5-20kW' },
      { name: 'F6020', power: '1.5-20kW' },
      { name: 'F6525', power: '1.5-20kW' }
    ],
    keySpecs: [
      { label: 'Working Area', value: '3050×1530mm' },
      { label: 'Max Speed', value: '115m/min' },
      { label: 'Positioning Acc.', value: '±0.05mm/m' },
      { label: 'Acceleration', value: '0.8G' }
    ],
    features: [
      'High Rigidity Bed',
      'Modular Worktable',
      'Smart Control',
      'Low Maintenance'
    ],
    specsTable: [
      { parameter: 'Working Area', values: { 'F3015': '3050×1530mm', 'F4020': '4050×2030mm', 'F6020': '6150×2030mm', 'F6525': '6550×2530mm' } },
      { parameter: 'Laser Power', values: { 'F3015': '1.5-20kW', 'F4020': '1.5-20kW', 'F6020': '1.5-20kW', 'F6525': '1.5-20kW' } },
      { parameter: 'Max Speed', values: { 'F3015': '115m/min', 'F4020': '115m/min', 'F6020': '115m/min', 'F6525': '115m/min' } },
      { parameter: 'Acceleration', values: { 'F3015': '0.8G', 'F4020': '0.8G', 'F6020': '0.8G', 'F6525': '0.8G' } },
      { parameter: 'Positioning Accuracy', values: { 'F3015': '±0.05mm/m', 'F4020': '±0.05mm/m', 'F6020': '±0.05mm/m', 'F6525': '±0.05mm/m' } }
    ],
    featureDetails: [
      { title: 'High Rigidity Structure', description: 'Heavy-duty bed design provides excellent stability and vibration dampening for precision cutting.' },
      { title: 'Modular Worktable', description: 'Easy to disassemble, transport, and maintain. Reduces installation time and costs.' },
      { title: 'Intelligent Control System', description: 'User-friendly interface with simple operation. Quick learning curve for operators.' },
      { title: 'Efficient Dust Removal', description: 'Integrated intelligent dust collection system ensures clean production environment.' }
    ],
    applications: ['Engineering Machinery', 'Ship Building', 'Steel Structure', 'Construction', 'Fitness Equipment', 'Furniture', 'Advertising', 'Kitchen & Bath']
  },
  {
    id: 's-series',
    series: 'S',
    category: 'Sheet Fiber Laser Cutting Machine',
    name: 'S Series High-Precision Sheet Laser Cutter',
    description: 'Integrated design with compact footprint. EU safety standards with full protective design. Intelligent partitioned dust removal for efficient and clean production.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&q=80'
    ],
    badge: 'PREMIUM',
    powerRange: '1.5-12kW',
    models: [
      { name: 'S1530', power: '1.5-12kW' }
    ],
    keySpecs: [
      { label: 'Working Area', value: '3060×1530mm' },
      { label: 'Max Speed', value: '115m/min' },
      { label: 'Positioning Acc.', value: '±0.03mm/m' },
      { label: 'Acceleration', value: '0.8G' }
    ],
    features: [
      'EU Safety Standard',
      'Full Protection',
      'Compact Design',
      'Smart Dust Removal'
    ],
    specsTable: [
      { parameter: 'Working Area', values: { 'S1530': '3060×1530mm (1.5-6kW) / 2960×1430mm (12kW)' } },
      { parameter: 'Laser Power', values: { 'S1530': '1.5-12kW' } },
      { parameter: 'Max Speed', values: { 'S1530': '115m/min' } },
      { parameter: 'Acceleration', values: { 'S1530': '0.8G' } },
      { parameter: 'Positioning Accuracy', values: { 'S1530': '±0.03mm/m' } }
    ],
    featureDetails: [
      { title: 'EU Safety Standards', description: 'Full enclosed safety design with automatic alarm when door is opened. Ensures operator safety.' },
      { title: 'Compact Footprint', description: 'Integrated design minimizes floor space. Flexible mobility and easy assembly.' },
      { title: 'Intelligent Dust Removal', description: 'Partitioned dust collection zones ensure efficient and clean production environment.' },
      { title: 'Ready to Use', description: '落地即使用 - Simply place and operate. No complex installation required.' }
    ],
    applications: ['Precision Manufacturing', 'Electronics', 'Medical Devices', 'Aerospace', 'Automotive', 'Jewelry', 'Advertising', 'Research']
  },
  {
    id: 'gr-series',
    series: 'GR',
    category: 'Large Format Sheet Laser Cutting Machine',
    name: 'GR Series Linear Rail Sheet Laser Cutter',
    description: 'Customizable cutting size for full sheet thick plate cutting. Ground rail split bed structure effectively reduces vibrations ensuring cutting precision.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80',
      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80'
    ],
    badge: 'HEAVY DUTY',
    powerRange: '6-60kW',
    models: [
      { name: 'GR2500', power: '6-60kW' },
      { name: 'GR3200', power: '6-60kW' },
      { name: 'GR4000', power: '6-60kW' }
    ],
    keySpecs: [
      { label: 'Cutting Area', value: '12500×2550mm' },
      { label: 'Max Speed', value: '80m/min' },
      { label: 'Positioning Acc.', value: '±0.1mm/m' },
      { label: 'Max Power', value: '60kW' }
    ],
    features: [
      'Customizable Size',
      'Ground Rail Design',
      'Modular Worktable',
      'Thick Plate Ready'
    ],
    specsTable: [
      { parameter: 'Straight Cutting Area', values: { 'GR2500': '12500×2550mm / 16500×2550mm', 'GR3200': '12500×3250mm / 16500×3250mm', 'GR4000': '12500×4050mm / 16500×4050mm' } },
      { parameter: 'Bevel Width', values: { 'GR2500': '19750×2500mm', 'GR3200': '19750×2500mm', 'GR4000': '19750×3300mm' } },
      { parameter: 'Laser Power', values: { 'GR2500': '6-60kW', 'GR3200': '6-60kW', 'GR4000': '6-60kW' } },
      { parameter: 'Max Speed', values: { 'GR2500': '80m/min', 'GR3200': '80m/min', 'GR4000': '80m/min' } },
      { parameter: 'Positioning Accuracy', values: { 'GR2500': '±0.1mm/m', 'GR3200': '±0.1mm/m', 'GR4000': '±0.1mm/m' } }
    ],
    featureDetails: [
      { title: 'Customizable Cutting Size', description: 'Tailored to meet the needs of full sheet thick plate cutting. Length can be customized.' },
      { title: 'Ground Rail Split Bed', description: 'Effectively reduces vibrations, ensuring consistent cutting precision at high speeds.' },
      { title: 'Modular Worktable', description: 'Independent modular design for easy disassembly, transportation, and maintenance.' },
      { title: 'High Power Options', description: 'Up to 60kW power available for thick plate cutting applications.' }
    ],
    applications: ['Ship Building', 'Heavy Machinery', 'Large Steel Structure', 'Bridge Construction', 'Wind Power', 'Pressure Vessels', 'Mining Equipment', 'Construction Machinery']
  },
  {
    id: 'tz-series',
    series: 'TZ',
    category: 'Tube Laser Cutting Machine',
    name: 'TZ Series Heavy-Duty Four-Chuck Tube Laser Cutter',
    description: 'Innovative four-chuck design with "2+2" processing mode for simultaneous loading and unloading. Side-mounted bed structure with low center of gravity for stable heavy tube cutting.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80',
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80'
    ],
    badge: 'FLAGSHIP',
    powerRange: '3-12kW',
    models: [
      { name: 'TZ220', power: '3-12kW' },
      { name: 'TZ320', power: '3-12kW' }
    ],
    keySpecs: [
      { label: 'Tube Diameter', value: 'Φ20-220mm' },
      { label: 'Max Speed', value: '90m/min' },
      { label: 'Positioning Acc.', value: '±0.05mm/m' },
      { label: 'Chuck Count', value: '4 Chucks' }
    ],
    features: [
      'Four-Chuck Design',
      '2+2 Processing',
      'Heavy Load',
      'Low Center Gravity'
    ],
    specsTable: [
      { parameter: 'Tube Diameter Range', values: { 'TZ220': 'Φ20-220mm', 'TZ320': 'Φ20-320mm' } },
      { parameter: 'Square Tube Range', values: { 'TZ220': '□20-160mm', 'TZ320': '□20-220mm' } },
      { parameter: 'Max Loading Length', values: { 'TZ220': '6500mm', 'TZ320': '6500mm' } },
      { parameter: 'Max Speed', values: { 'TZ220': '90m/min', 'TZ320': '90m/min' } },
      { parameter: 'Positioning Accuracy', values: { 'TZ220': '±0.05mm/m', 'TZ320': '±0.05mm/m' } }
    ],
    featureDetails: [
      { title: 'Four-Chuck Innovation', description: 'Proprietary four-chuck design enables "2+2" mode - process one tube while loading/unloading another.' },
      { title: 'Heavy Load Capacity', description: 'Side-mounted bed with low center of gravity and multi-point support for stable heavy tube cutting.' },
      { title: 'Efficient Workflow', description: 'Simultaneous loading and unloading maximizes production efficiency.' },
      { title: 'Professional Control', description: 'Specialized tube cutting control system with intuitive interface.' }
    ],
    applications: ['Automotive', 'Furniture', 'Fitness Equipment', 'Bicycle', 'Motorcycle', 'Construction', 'Oil & Gas', 'Handrail']
  },
  {
    id: 'gr-h-series',
    series: 'GR-H',
    category: 'Composite Laser Cutting Machine',
    name: 'GR-H Series All-in-One Laser Cutting Machine',
    description: 'Profiles, Plates and Pipes - All Cut by One Machine. Dual-station table design enables simultaneous cutting, loading and unloading.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'
    ],
    badge: 'ALL-IN-ONE',
    powerRange: '12-40kW',
    models: [
      { name: 'GR1500H-14', power: '12-40kW' }
    ],
    keySpecs: [
      { label: 'Section Steel', value: '100-1500mm' },
      { label: 'Plate Size', value: '13000×3250mm' },
      { label: 'Pipe Diameter', value: 'Φ100-1200mm' },
      { label: 'Power', value: '12-40kW' }
    ],
    features: [
      'Plate + Pipe + Profile',
      'Dual Station',
      'Visual Scanning',
      'Auto Compensation'
    ],
    specsTable: [
      { parameter: 'Section Steel Processing Length', values: { 'GR1500H-14': '12000mm' } },
      { parameter: 'Profile Processing Range', values: { 'GR1500H-14': '100×100mm - 1500×600mm' } },
      { parameter: 'Plate Processing Range', values: { 'GR1500H-14': '13000×3250mm' } },
      { parameter: 'Pipe Processing Range', values: { 'GR1500H-14': 'Φ100-1200mm (Round) / □100-550mm (Square)' } },
      { parameter: 'Laser Power', values: { 'GR1500H-14': '12-40kW' } }
    ],
    featureDetails: [
      { title: 'All-in-One Design', description: 'One machine handles profiles, plates, and pipes. Eliminates need for multiple specialized machines.' },
      { title: 'Dual-Station Table', description: 'Enables simultaneous cutting on one side while loading/unloading on the other.' },
      { title: 'Visual Scanning System', description: 'Automatically scans and compensates for material variations for intelligent cutting.' },
      { title: 'Maximum Versatility', description: 'Single machine solution for diverse manufacturing requirements.' }
    ],
    applications: ['Steel Structure', 'Construction', 'Ship Building', 'Bridge', 'Tower', 'Grid', 'Automotive', 'Machinery']
  },
  {
    id: 'pgt-series',
    series: 'PGT',
    category: 'Sheet & Tube Laser Cutting Machine',
    name: 'PGT Series Full-Protective Sheet & Tube Laser Cutter',
    description: 'Integrated sheet and tube design for dual-purpose applications. Full enclosed safety design with automatic alarm. Intelligent partitioned dust removal.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80'
    ],
    badge: null,
    powerRange: '1.5-12kW',
    models: [
      { name: 'PG3015T', power: '1.5-12kW' },
      { name: 'PG4020T', power: '1.5-12kW' },
      { name: 'PG6015T', power: '1.5-12kW' }
    ],
    keySpecs: [
      { label: 'Plate Size', value: '3050×1530mm' },
      { label: 'Tube Range', value: 'Φ15-230mm' },
      { label: 'Max Speed', value: '115m/min' },
      { label: 'Acceleration', value: '0.8G' }
    ],
    features: [
      'Sheet + Tube',
      'Full Protection',
      'Auto Alarm',
      'Smart Dust Removal'
    ],
    specsTable: [
      { parameter: 'Plate Working Format', values: { 'PG3015T': '3050×1530mm', 'PG4020T': '4050×2030mm', 'PG6015T': '6050×1530mm' } },
      { parameter: 'Tube Side Length', values: { 'PG3015T': 'Φ15-230mm / □15-230mm', 'PG4020T': 'Φ15-230mm / □15-230mm', 'PG6015T': 'Φ15-230mm / □15-230mm' } },
      { parameter: 'Laser Power', values: { 'PG3015T': '1.5-12kW', 'PG4020T': '1.5-12kW', 'PG6015T': '1.5-12kW' } },
      { parameter: 'Max Speed', values: { 'PG3015T': '115m/min', 'PG4020T': '115m/min', 'PG6015T': '115m/min' } },
      { parameter: 'Acceleration', values: { 'PG3015T': '0.8G', 'PG4020T': '0.8G', 'PG6015T': '0.8G' } }
    ],
    featureDetails: [
      { title: 'Dual-Purpose Machine', description: 'Sheet and tube design in one machine. Broader applications, better value.' },
      { title: 'Full Safety Protection', description: 'Fully enclosed design with automatic alarm when door is opened. Safety from inside out.' },
      { title: 'Intelligent Dust Removal', description: 'Partitioned dust collection ensures safe and clean production environment.' },
      { title: 'Versatile Applications', description: 'Handles both flat sheet and round/square tubes with single machine.' }
    ],
    applications: ['Fitness Equipment', 'Furniture', 'Automotive', 'Advertising', 'Kitchen', 'Bicycle', 'Handrail', 'Construction']
  },
  {
    id: 'gmb-series',
    series: 'GMB',
    category: 'Gantry Machining Center',
    name: 'GMB Series Gantry Type CNC Machining Center',
    description: 'High-rigidity gantry structure with 4-box-way Z-axis linear guide rails, Taiwan Syntec control system and 24-tool disc magazine as standard. Four models cover worktables from 1200×900mm to 2000×1200mm for precision milling, drilling and boring.',
    image: gmbMachine,
    gallery: [
      gmbMachine,
      gmbRail
    ],
    badge: 'NEW',
    powerRange: 'BT40 / BT50',
    standardConfig: [
      'Taiwan Syntec Control System',
      '24-Tool Disc Magazine',
      'Spindle Oil Cooler',
      'Double Helix Chip Conveyor',
      'Taiwan Spindle 8000 rpm'
    ],
    optionalConfig: [
      'FANUC OI MF / Plus System',
      'Mitsubishi / Siemens / KND / GSK / Huazhong',
      'Through-Spindle Coolant',
      '4th Axis / 5th Axis'
    ],
    models: [
      { name: 'GMB1390', power: 'Table 1200×900mm' },
      { name: 'GMB1214', power: 'Table 1400×1100mm' },
      { name: 'GMB1417', power: 'Table 1600×1200mm' },
      { name: 'GMB2014', power: 'Table 2000×1200mm' }
    ],
    keySpecs: [
      { label: 'Worktable', value: '1200×900 - 2000×1200mm' },
      { label: 'X-Axis Travel', value: '1300 - 2200mm' },
      { label: 'Spindle Speed', value: '8000 - 10000 rpm' },
      { label: 'Machine Weight', value: '6.5 - 16 T' }
    ],
    features: [
      '4-Box-Way Z-Axis Rails',
      'High Rigidity Gantry',
      '24-Tool Magazine',
      'Double Chip Conveyor',
      'Through-Spindle Coolant Ready'
    ],
    specsTable: [
      { parameter: 'Worktable Size (mm)', values: { 'GMB1390': '1200×900', 'GMB1214': '1400×1100', 'GMB1417': '1600×1200', 'GMB2014': '2000×1200' } },
      { parameter: 'Max Table Load (T)', values: { 'GMB1390': '3', 'GMB1214': '4', 'GMB1417': '5', 'GMB2014': '6' } },
      { parameter: 'X-Axis Travel (mm)', values: { 'GMB1390': '1300', 'GMB1214': '1400', 'GMB1417': '1700', 'GMB2014': '2200' } },
      { parameter: 'Y-Axis Travel (mm)', values: { 'GMB1390': '900', 'GMB1214': '1200', 'GMB1417': '1400', 'GMB2014': '1300' } },
      { parameter: 'Z-Axis Travel (mm)', values: { 'GMB1390': '600', 'GMB1214': '600', 'GMB1417': '700', 'GMB2014': '700' } },
      { parameter: 'Gantry Width (mm)', values: { 'GMB1390': '1300', 'GMB1214': '1200', 'GMB1417': '1400', 'GMB2014': '1300' } },
      { parameter: 'Spindle Speed (r/min)', values: { 'GMB1390': '10000', 'GMB1214': '8000/10000', 'GMB1417': '8000', 'GMB2014': '8000' } },
      { parameter: 'Spindle Motor Power (kW)', values: { 'GMB1390': '11/15', 'GMB1214': '11/15', 'GMB1417': '15/18.5', 'GMB2014': '15/18.5' } },
      { parameter: 'Spindle-to-Table Min/Max (mm)', values: { 'GMB1390': '150-750', 'GMB1214': '130-730', 'GMB1417': '150-850', 'GMB2014': '150-850' } },
      { parameter: 'Spindle Taper', values: { 'GMB1390': 'BT40/150', 'GMB1214': 'BT40/150', 'GMB1417': 'BT50/155', 'GMB2014': 'BT50/155' } },
      { parameter: '3-Axis Motor Torque (N·M)', values: { 'GMB1390': '28/18/18', 'GMB1214': '28/18/18', 'GMB1417': '35/28/28', 'GMB2014': '35/28/28' } },
      { parameter: 'Rapid Traverse X/Y/Z (m/min)', values: { 'GMB1390': '24/24/24', 'GMB1214': '24/24/24', 'GMB1417': '16/16/12', 'GMB2014': '16/16/12' } },
      { parameter: 'Max Cutting Feed (mm/min)', values: { 'GMB1390': '6000', 'GMB1214': '6000', 'GMB1417': '10000', 'GMB2014': '10000' } },
      { parameter: 'Positioning Accuracy X/Y/Z (mm)', values: { 'GMB1390': '±0.005/300', 'GMB1214': '±0.005/300', 'GMB1417': '0.02/0.018/0.015', 'GMB2014': '0.02/0.018/0.015' } },
      { parameter: 'Repeatability X/Y/Z (mm)', values: { 'GMB1390': '±0.008/±0.007/±0.005', 'GMB1214': '±0.008/±0.007/±0.005', 'GMB1417': '0.016/0.014/0.010', 'GMB2014': '0.016/0.014/0.010' } },
      { parameter: 'Verticality X/Y Axis (mm)', values: { 'GMB1390': '±0.015/300', 'GMB1214': '±0.015/300', 'GMB1417': '±0.015/300', 'GMB2014': '±0.015/300' } },
      { parameter: 'Machine Weight (T)', values: { 'GMB1390': '6.5', 'GMB1214': '8.5', 'GMB1417': '13', 'GMB2014': '16' } }
    ],
    featureDetails: [
      { title: '4-Box-Way Z-Axis Guide Rails', description: 'Four-box-way linear guide on the Z-axis delivers high rigidity, low friction and long-term geometric accuracy for heavy cutting.' },
      { title: 'High-Rigidity Gantry Structure', description: 'Box-welded and stress-relieved gantry frame with reinforced cross rail dampens vibration and ensures stable precision under continuous load.' },
      { title: '24-Tool Disc Magazine', description: 'Standard 24-position tool changer supports automatic tool exchange for continuous milling, drilling and boring cycles.' },
      { title: 'Double Helix Chip Conveyor', description: 'Twin screw-type chip removal efficiently evacuates swarf for clean work zone and reduced coolant contamination.' }
    ],
    applications: ['Mold & Die', 'Aerospace', 'Automotive Parts', 'Machine Base', 'Fixture & Jig', 'Hydraulic Components', 'Energy Equipment', 'General Precision Machining']
  }
]

export const getProductById = (id) => products.find(p => p.id === id)

export const getProductsByCategory = (category) => products.filter(p => p.category.includes(category))
