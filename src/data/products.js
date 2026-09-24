// Product data synced from SEG / Saige machine catalog
import imgT120 from '../assets/saige/seg-t120q.webp'
import imgT120g1 from '../assets/saige/seg-t120q_g1.webp'
import imgT160 from '../assets/saige/seg-t160.webp'
import imgT160g1 from '../assets/saige/seg-t160_g1.webp'
import imgT240 from '../assets/saige/seg-t240.webp'
import imgT130y from '../assets/saige/seg-t130y.webp'
import imgT130y1 from '../assets/saige/seg-t130y_g1.webp'
import imgT130y2 from '../assets/saige/seg-t130y_g2.webp'
import imgT130y3 from '../assets/saige/seg-t130y_g3.webp'
import imgT130y4 from '../assets/saige/seg-t130y_g4.webp'
import imgT100m from '../assets/saige/seg-t100m.webp'
import imgT100mg1 from '../assets/saige/seg-t100m_g1.webp'
import imgT100mz from '../assets/saige/seg-t100mz.webp'
import img2513 from '../assets/saige/seg-2513.webp'
import img2513g1 from '../assets/saige/seg-2513_g1.webp'
import img2513g2 from '../assets/saige/seg-2513_g2.webp'
import img2513g3 from '../assets/saige/seg-2513_g3.webp'
import img2513g4 from '../assets/saige/seg-2513_g4.webp'
import img3015 from '../assets/saige/seg-3015.webp'

export const products = [
  {
    id: 'seg-t120',
    series: 'T120',
    variantGroup: 'seg-standard-tube',
    variantLabel: 'T120',
    variantHint: '10–120mm',
    groupEyebrow: 'Standard Series',
    groupSwitchHint: 'Choose chuck size',
    groupModelsTitle: 'Available Chuck Sizes',
    category: 'Tube Fiber Laser Cutting Machine',
    name: 'SEG-T120 / T120Q Standard Round & Square Tube Laser Cutter',
    description: 'Standard dual-chuck pneumatic tube laser for round, square, rectangular, oval tubes and angle steel. Wide working range with follow-up cutting head, path import, and servo-driven precision square rails.',
    image: imgT120,
    gallery: [imgT120, imgT120g1],
    badge: 'STANDARD',
    powerRange: '1.5kW class',
    standardConfig: [
      'Fiber Laser Source (Raycus / Caplin options)',
      'SEG Laser Cutting Head',
      'TEYU Chiller',
      'SEG Fangling CNC',
      'Servo Drive',
      'Front Pneumatic Chuck',
      'Rear Pneumatic Chuck'
    ],
    optionalConfig: [
      'Jiaqiang Auto-Focus Cutting Head',
      'Extra Support Roller',
      'Raycus / Max full-power 1.5kW / 3kW upgrades'
    ],
    models: [
      { name: 'SEG-T120 / T120Q', power: 'Chuck Ø120 · 10–120mm' }
    ],
    keySpecs: [
      { label: 'Tube Range', value: '10–120mm' },
      { label: 'Cut Thickness', value: 'SS ≤2mm / MS ≤3mm' },
      { label: 'Max Speed', value: '0–8000mm/min' },
      { label: 'Accuracy', value: '±0.5mm' }
    ],
    features: [
      'Pneumatic Rotary Chuck',
      'Follow-up Cutting Head',
      'STEP / IGS Import',
      'Multi-profile Tubes'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-T120': 'Round / Square / Rect / Oval / Angle' } },
      { parameter: 'Effective Diameter', values: { 'SEG-T120': '10–120mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-T120': 'SS 2mm / CS 3mm (by laser power)' } },
      { parameter: 'Cutting Length', values: { 'SEG-T120': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-T120': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-T120': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-T120': '±0.2mm' } },
      { parameter: 'Machine Size', values: { 'SEG-T120': 'L7800 × W1300 × H2000mm' } },
      { parameter: 'Weight', values: { 'SEG-T120': '≈1000kg' } },
      { parameter: 'Power Supply', values: { 'SEG-T120': '220 / 380V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-T120': 'Rack & pinion · Precision square rails' } },
      { parameter: 'Loading', values: { 'SEG-T120': 'Manual load → auto feed cut' } },
      { parameter: 'Tail Length', values: { 'SEG-T120': '≈5cm' } }
    ],
    featureDetails: [
      { title: 'Wide Tube Compatibility', description: 'Handles round, square, oval, angle and channel profiles for furniture, fitness, bathroom and auto parts shops.' },
      { title: 'Integrated Pneumatic Chuck', description: 'Fast clamp response with high concentricity — protects tube surface while holding firmly.' },
      { title: 'Smart Path Control', description: 'Dual-system workflow supports STEP/IGS import, auto path generation, segmented process and path offset for imperfect tubes.' },
      { title: 'Follow-up Cutting', description: 'Sensor keeps nozzle distance constant on uneven tubes to protect tip and cutting quality.' }
    ],
    applications: ['Building Materials', 'Sanitary Ware', 'Automotive', 'Grain Machinery', 'Fitness Equipment', 'Job-shop Tube Cutting']
  },
  {
    id: 'seg-t160',
    series: 'T160',
    variantGroup: 'seg-standard-tube',
    variantLabel: 'T160',
    variantHint: '10–160mm',
    groupEyebrow: 'Standard Series',
    groupSwitchHint: 'Choose chuck size',
    groupModelsTitle: 'Available Chuck Sizes',
    listPrimary: true,
    showcaseName: 'SEG-T120 / T160 / T240 Standard Tube Laser',
    showcaseBadge: 'STANDARD SERIES',
    category: 'Tube Fiber Laser Cutting Machine',
    name: 'SEG-T160 Standard Round & Square Tube Laser Cutter',
    description: 'Mid-range standard tube laser with Ø160mm capacity. Same industrial dual-pneumatic chuck platform as T120 with larger working diameter for thicker sections and broader job mix.',
    image: imgT160,
    gallery: [imgT160, imgT160g1],
    badge: 'BESTSELLER',
    powerRange: '1.5kW class',
    standardConfig: [
      'Fiber Laser Source (Raycus / Caplin options)',
      'SEG Laser Cutting Head',
      'TEYU Chiller',
      'SEG Fangling CNC',
      'Servo Drive',
      'Front Pneumatic Chuck',
      'Rear Pneumatic Chuck'
    ],
    optionalConfig: [
      'Jiaqiang Auto-Focus Cutting Head',
      'Extra Support Roller',
      'Raycus / Max full-power 1.5kW / 3kW upgrades'
    ],
    models: [
      { name: 'SEG-T160', power: 'Chuck Ø160 · 10–160mm' }
    ],
    keySpecs: [
      { label: 'Tube Range', value: '10–160mm' },
      { label: 'Cut Thickness', value: 'SS ≤2.5mm / MS ≤3mm' },
      { label: 'Max Speed', value: '0–8000mm/min' },
      { label: 'Accuracy', value: '±0.5mm' }
    ],
    features: [
      'Ø160 Capacity',
      'Pneumatic Dual Chuck',
      'Follow-up Head',
      'Servo + Square Rails'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-T160': 'Round / Square / Rect / Oval / Angle / D / Sector' } },
      { parameter: 'Effective Diameter', values: { 'SEG-T160': '10–160mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-T160': 'SS 2.5mm / CS 3mm (by laser power)' } },
      { parameter: 'Cutting Length', values: { 'SEG-T160': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-T160': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-T160': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-T160': '±0.2mm' } },
      { parameter: 'Machine Size', values: { 'SEG-T160': 'L7800 × W1500 × H2200mm' } },
      { parameter: 'Weight', values: { 'SEG-T160': '≈1100kg' } },
      { parameter: 'Power Supply', values: { 'SEG-T160': '220 / 380V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-T160': 'Rack & pinion · Precision square rails' } },
      { parameter: 'Loading', values: { 'SEG-T160': 'Manual load → auto feed cut' } },
      { parameter: 'Tail Length', values: { 'SEG-T160': '≈5–8cm' } }
    ],
    featureDetails: [
      { title: 'Larger Working Envelope', description: '10–160mm effective range covers more structural and furniture tube sizes in one machine.' },
      { title: 'Stable Dual Chuck', description: 'Front/rear pneumatic rotary chucks for concentric clamping without marring the tube surface.' },
      { title: 'Industrial CNC Stack', description: 'SEG Fangling control with servo drive and precision square rails for fast, stable motion.' },
      { title: 'Production-Ready Options', description: 'Optional auto-focus head, support rollers and higher-power laser sources for thicker stock.' }
    ],
    applications: ['Building Materials', 'Sanitary Ware', 'Automotive', 'Grain Machinery', 'Fitness Equipment', 'Job-shop Tube Cutting']
  },
  {
    id: 'seg-t240',
    series: 'T240',
    variantGroup: 'seg-standard-tube',
    variantLabel: 'T240',
    variantHint: '15–230mm',
    groupEyebrow: 'Standard Series',
    groupSwitchHint: 'Choose chuck size',
    groupModelsTitle: 'Available Chuck Sizes',
    category: 'Tube Fiber Laser Cutting Machine',
    name: 'SEG-T240 Heavy Tube Laser Cutter',
    description: 'Large-diameter standard tube platform with chuck capacity up to Ø230mm for heavy round/square/profile tubes in steel structure and equipment manufacturing.',
    image: imgT240,
    gallery: [imgT240],
    badge: 'HEAVY',
    powerRange: '1.5kW class',
    standardConfig: [
      'Fiber Laser Source (Caplin CW15 class)',
      'SEG Custom Cutting Head',
      'TEYU Chiller',
      'SEG Fangling CNC',
      'Servo Drive',
      'Industrial Pneumatic Chuck Set'
    ],
    optionalConfig: [
      'Jiaqiang Auto-Focus Cutting Head',
      'Extra Support Roller',
      'Higher-power laser upgrades'
    ],
    models: [
      { name: 'SEG-T240', power: 'Chuck Ø230 · 15–230mm' }
    ],
    keySpecs: [
      { label: 'Tube Range', value: '15–230mm' },
      { label: 'Cut Thickness', value: 'SS ≤2.5mm / MS ≤3mm' },
      { label: 'Max Speed', value: '0–8000mm/min' },
      { label: 'Machine Weight', value: '≈1200kg' }
    ],
    features: [
      'Ø230 Chuck',
      'Multi-profile Tubes',
      'Servo Drive',
      '6m Cut Length'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-T240': 'Round / Square / Rect / Oval / Angle / D / Sector' } },
      { parameter: 'Effective Diameter', values: { 'SEG-T240': '15–230mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-T240': 'SS 2.5mm / CS 3.0mm (by laser power)' } },
      { parameter: 'Cutting Length', values: { 'SEG-T240': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-T240': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-T240': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-T240': '±0.2mm' } },
      { parameter: 'Machine Size', values: { 'SEG-T240': 'L7800 × W1500 × H2200mm' } },
      { parameter: 'Weight', values: { 'SEG-T240': '≈1200kg' } },
      { parameter: 'Drive / Rails', values: { 'SEG-T240': 'Rack & pinion · Precision square rails' } }
    ],
    featureDetails: [
      { title: 'Heavy Tube Capacity', description: '15–230mm range targets larger furniture frames, agricultural equipment and structural tubing.' },
      { title: 'Same Standard Platform DNA', description: 'Shares SEG standard pneumatic chuck architecture for familiar operation and spare parts.' },
      { title: 'Stable Motion System', description: 'Servo + precision square rails keep large tubes cutting smoothly at production speeds.' }
    ],
    applications: ['Steel Structure', 'Agricultural Equipment', 'Furniture Frames', 'Heavy Fabrication', 'Pipe Processing']
  },
  {
    id: 'seg-t130y',
    series: 'T130Y',
    category: 'Offside Tube Laser Cutting Machine',
    name: 'SEG-T130Y Offside Tube Laser Cutter',
    description: 'Compact offside tube laser with dual pneumatic chucks, laser-dedicated reducer wheels, modular split bed and smart software (auto center find, one-key end align, follow-up). Ideal for shops needing fast fly-cutting with minimal operator skill.',
    image: imgT130y,
    gallery: [imgT130y, imgT130y1, imgT130y2, imgT130y3, imgT130y4],
    badge: 'OFFSIDE',
    powerRange: '1.5kW class',
    standardConfig: [
      'Laser Source: Max / Caplin',
      'SEG Cutting Head',
      'TEYU Chiller',
      'SEG CNC',
      'Servo Drive',
      'Front & Rear Pneumatic Chucks'
    ],
    optionalConfig: [
      'Jiaqiang Auto-Focus Head',
      'Support Roller',
      'Raycus / Max full-power upgrades'
    ],
    models: [
      { name: 'SEG-T130Y', power: 'Chuck 130 · Ø19–125mm / □19–100mm' }
    ],
    keySpecs: [
      { label: 'Round Tube', value: '19–125mm' },
      { label: 'Square Tube', value: '19–100mm' },
      { label: 'Travel Speed', value: 'Up to 800mm/s' },
      { label: 'Weight', value: '≈600kg' }
    ],
    features: [
      'Auto Center Find',
      'One-key End Align',
      'Dual Pneumatic Chuck',
      'Modular Split Bed'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-T130Y': 'Round / Square / Rect / Oval / Angle / D / Sector' } },
      { parameter: 'Effective Diameter', values: { 'SEG-T130Y': 'Round 19–125mm · Square 19–100mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-T130Y': 'SS 2mm / CS 3mm' } },
      { parameter: 'Cutting Length', values: { 'SEG-T130Y': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-T130Y': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-T130Y': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-T130Y': '±0.3mm' } },
      { parameter: 'Machine Size', values: { 'SEG-T130Y': 'L7200 × W850 × H1630mm' } },
      { parameter: 'Weight', values: { 'SEG-T130Y': '≈600kg' } },
      { parameter: 'Power Supply', values: { 'SEG-T130Y': '220V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-T130Y': 'Rack & pinion · Square rails' } },
      { parameter: 'Chuck', values: { 'SEG-T130Y': 'Front & rear pneumatic' } },
      { parameter: 'Loading', values: { 'SEG-T130Y': 'Manual load → auto feed cut' } },
      { parameter: 'Tail Length', values: { 'SEG-T130Y': '≈5–8cm' } }
    ],
    featureDetails: [
      { title: 'Smart Operator Assist', description: 'Auto center find, one-key end alignment and follow-up reduce dependence on skilled operators.' },
      { title: 'Fast Import & Fly Cut', description: 'Built-in cutting suite for quick drawing import, nesting and high-speed fly cutting of complex graphics.' },
      { title: 'Dual Pneumatic Holding', description: 'Strong, accurate clamping for round and square tubes across a wide size range.' },
      { title: 'Laser Reducer Wheels', description: 'Laser-optimized diameter wheels feed accurately while minimizing surface marking.' },
      { title: 'Modular Split Structure', description: 'Flexible layout for different workshop footprints and easier transport.' }
    ],
    applications: ['Furniture', 'Fitness Equipment', 'Handrail', 'Display Racks', 'Light Steel Fabrication', 'Job Shops']
  },
  {
    id: 'seg-t100m',
    series: 'T100M',
    variantGroup: 'seg-t100-series',
    variantLabel: 'T100M',
    variantHint: 'No-CAD · 19–100mm',
    groupEyebrow: 'T100 Series',
    groupSwitchHint: 'Choose model',
    groupModelsTitle: 'Available Models',
    listPrimary: true,
    showcaseName: 'SEG-T100M / T100MZ Tube Laser',
    showcaseBadge: 'T100 SERIES',
    category: 'No-CAD Tube Laser Cutting Machine',
    name: 'SEG-T100M Dual-Pneumatic No-CAD Tube Laser Cutter',
    description: '10\" full touchscreen dual-pneumatic tube laser with upgraded no-CAD system — built-in column/guardrail modes, auto wall-thickness compensation on miters, and travel up to 800mm/s. Front chuck 5-axis dual linkage with laser reducer wheels.',
    image: imgT100m,
    gallery: [imgT100m, imgT100mg1],
    badge: 'NO-CAD',
    powerRange: '1.5kW class',
    standardConfig: [
      'Fiber Laser Source',
      'SEG Cutting Head',
      'Chiller',
      'SEG CNC (No-CAD)',
      'Servo Drive',
      'Front & Rear Pneumatic Chucks'
    ],
    optionalConfig: [
      'Drawing-import version upgrade',
      'Chuck 100 / 130 options',
      'Higher-power laser source'
    ],
    models: [
      { name: 'SEG-T100M Pneumatic', power: '19–100mm · Dual pneumatic' },
      { name: 'SEG-T100M Manual', power: '19–100mm · Manual chuck option' }
    ],
    keySpecs: [
      { label: 'Tube Range', value: '19–100mm' },
      { label: 'Travel Speed', value: 'Up to 800mm/s' },
      { label: 'Screen', value: '10\" Touch' },
      { label: 'Weight', value: '≈470–500kg' }
    ],
    features: [
      'No-CAD System',
      'Column / Guardrail Modes',
      'Auto Wall-thickness Remove',
      'Dual Pneumatic Chuck'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-T100M': 'Round / Square / Rect / Oval / Angle' } },
      { parameter: 'Effective Diameter', values: { 'SEG-T100M': '19–100mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-T100M': '≈3mm (by laser power)' } },
      { parameter: 'Cutting Length', values: { 'SEG-T100M': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-T100M': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-T100M': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-T100M': '±0.2mm' } },
      { parameter: 'Machine Size', values: { 'SEG-T100M': '≈L6800–6900 × W800–830 × H1400–1630mm' } },
      { parameter: 'Weight', values: { 'SEG-T100M': '≈470–500kg' } },
      { parameter: 'Power Supply', values: { 'SEG-T100M': '220V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-T100M': 'Rack & pinion · Precision square rails' } },
      { parameter: 'Chuck', values: { 'SEG-T100M': 'Front & rear pneumatic' } },
      { parameter: 'Loading', values: { 'SEG-T100M': 'Manual load → auto feed cut' } },
      { parameter: 'Tail Length', values: { 'SEG-T100M': '≈12–18cm' } }
    ],
    featureDetails: [
      { title: 'No-CAD Productivity', description: 'Upgraded no-drawing system with column and guardrail modes — program common jobs without CAD expertise.' },
      { title: 'Wall-thickness Aware Miters', description: 'Auto wall-thickness removal when cutting corners on round/square thick stock.' },
      { title: '10\" Touch Operation', description: 'Full touchscreen workflow for faster setup and shop-floor training.' },
      { title: 'Precision Front Chuck', description: 'Servo 5-axis dual-linkage front chuck with laser reducer wheels for accurate, mark-light feeding.' },
      { title: 'Hands-free Dual Chuck', description: 'Front and rear pneumatic chucks free operators from manual clamping cycles.' }
    ],
    applications: ['Guardrails', 'Columns / Posts', 'Furniture', 'Fitness Frames', 'Display Systems', 'Small Fabrication Shops']
  },
  {
    id: 'seg-t100mz',
    series: 'T100MZ',
    variantGroup: 'seg-t100-series',
    variantLabel: 'T100MZ',
    variantHint: 'Compact · 19–100mm',
    groupEyebrow: 'T100 Series',
    groupSwitchHint: 'Choose model',
    groupModelsTitle: 'Available Models',
    category: 'Tube Fiber Laser Cutting Machine',
    name: 'SEG-100MZ Compact Tube Laser Cutter',
    description: 'Compact 100-class tube laser with SEG control, Caplin CW15-class source and dual chuck options (100 / 130). Balanced choice for shops stepping up from entry no-CAD machines.',
    image: imgT100mz,
    gallery: [imgT100mz, imgT100mg1],
    badge: 'COMPACT',
    powerRange: '1.5kW class',
    standardConfig: [
      'Caplin CW15-class Fiber Source',
      'SEG Custom Cutting Head',
      'TEYU Chiller',
      'SEG CNC',
      'Servo Drive'
    ],
    optionalConfig: [
      'Chuck 100 or Chuck 130',
      'Auto-focus cutting head',
      'Support roller'
    ],
    models: [
      { name: 'SEG-100MZ / 100 Chuck', power: '19–100mm' },
      { name: 'SEG-100MZ / 130 Chuck', power: 'Larger chuck option' }
    ],
    keySpecs: [
      { label: 'Tube Range', value: '19–100mm' },
      { label: 'Cut Thickness', value: 'SS ≤2.5mm / MS ≤3mm' },
      { label: 'Max Speed', value: '0–8000mm/min' },
      { label: 'Weight', value: '≈600kg' }
    ],
    features: [
      'Compact Footprint',
      'Chuck Options',
      'Servo Drive',
      '6m Processing'
    ],
    specsTable: [
      { parameter: 'Tube Types', values: { 'SEG-100MZ': 'Round / Square / Rect / Oval' } },
      { parameter: 'Effective Diameter', values: { 'SEG-100MZ': '19–100mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-100MZ': 'SS 2.5mm / CS 3.0mm' } },
      { parameter: 'Cutting Length', values: { 'SEG-100MZ': '6m (customizable)' } },
      { parameter: 'Cutting Speed', values: { 'SEG-100MZ': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-100MZ': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-100MZ': '±0.2mm' } },
      { parameter: 'Machine Size', values: { 'SEG-100MZ': 'L6900 × W1500 × H2200mm' } },
      { parameter: 'Weight', values: { 'SEG-100MZ': '≈600kg' } },
      { parameter: 'Drive / Rails', values: { 'SEG-100MZ': 'Rack & pinion · Precision square rails' } }
    ],
    featureDetails: [
      { title: 'Flexible Chuck Config', description: 'Choose 100 or 130 chuck packages to match common tube inventories.' },
      { title: 'Proven SEG Stack', description: 'Caplin-class source, SEG head/CNC and TEYU chiller — same family as flagship tube lines.' },
      { title: 'Shop-friendly Size', description: 'Compact relative to heavy standard frames while keeping 6m cutting length.' }
    ],
    applications: ['Furniture', 'Fitness', 'Light Steel', 'Job-shop Tube Cutting']
  },
  {
    id: 'seg-2513',
    series: '2513',
    variantGroup: 'seg-sheet',
    variantLabel: '2513',
    variantHint: '2500×1300mm',
    groupEyebrow: 'Sheet Series',
    groupSwitchHint: 'Choose bed size',
    groupModelsTitle: 'Available Bed Sizes',
    listPrimary: true,
    showcaseName: 'SEG-2513 / 3015 Sheet Fiber Laser',
    showcaseBadge: 'SHEET SERIES',
    category: 'Sheet Fiber Laser Cutting Machine',
    name: 'SEG-2513B Sheet Fiber Laser Cutter',
    description: 'Flat-sheet fiber laser for stainless and carbon steel plates. 2500×1300mm working area with rack-and-pinion drive, precision square rails and SEG control — entry sheet platform for workshops.',
    image: img2513,
    gallery: [img2513, img2513g1, img2513g2, img2513g3, img2513g4],
    badge: 'SHEET',
    powerRange: '1.5kW class',
    standardConfig: [
      'Fiber Laser Source',
      'Laser Cutting Head',
      'Chiller',
      'SEG Fangling CNC',
      'Servo Motor Drive'
    ],
    optionalConfig: [
      'Higher-power laser source',
      'Auto-focus cutting head'
    ],
    models: [
      { name: 'SEG-2513 / 2513B', power: '2500 × 1300mm' }
    ],
    keySpecs: [
      { label: 'Working Area', value: '2500×1300mm' },
      { label: 'Thickness', value: 'SS ≤2mm / CS ≤3mm' },
      { label: 'Speed', value: '0–8000mm/min' },
      { label: 'Weight', value: '≈700kg' }
    ],
    features: [
      '2500×1300 Format',
      'Rack & Pinion Drive',
      'Precision Square Rails',
      'SEG CNC'
    ],
    specsTable: [
      { parameter: 'Materials', values: { 'SEG-2513': 'Stainless / Carbon steel plate' } },
      { parameter: 'Working Area', values: { 'SEG-2513': '2500 × 1300mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-2513': 'SS 2mm / CS 3mm' } },
      { parameter: 'Cutting Speed', values: { 'SEG-2513': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-2513': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-2513': '±0.3mm' } },
      { parameter: 'Machine Size', values: { 'SEG-2513': '≈3050 × 2050 × 1400mm' } },
      { parameter: 'Pack Size', values: { 'SEG-2513': 'Split ≈2800 × 1800 × 1430mm' } },
      { parameter: 'Weight', values: { 'SEG-2513': '≈700kg' } },
      { parameter: 'Power Supply', values: { 'SEG-2513': '220 / 380V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-2513': 'Rack & pinion · Precision square rails' } },
      { parameter: 'Assist Gas', values: { 'SEG-2513': 'Air' } }
    ],
    featureDetails: [
      { title: 'Workshop Sheet Format', description: '2500×1300mm covers common plate blanks for cabinets, signs and light fabrication.' },
      { title: 'Stable Motion', description: 'Gear-rack drive with precision square rails for consistent cut quality.' },
      { title: 'SEG Control', description: 'Familiar SEG Fangling stack shared with tube machines for easier multi-machine shops.' }
    ],
    applications: ['Sheet Metal Shops', 'Cabinets', 'Signage', 'Light Fabrication', 'Prototype Plate Cutting']
  },
  {
    id: 'seg-3015',
    series: '3015',
    variantGroup: 'seg-sheet',
    variantLabel: '3015',
    variantHint: '3000×1500mm',
    groupEyebrow: 'Sheet Series',
    groupSwitchHint: 'Choose bed size',
    groupModelsTitle: 'Available Bed Sizes',
    category: 'Sheet Fiber Laser Cutting Machine',
    name: 'SEG-3015 Sheet Fiber Laser Cutter',
    description: 'Larger 3000×1500mm sheet fiber laser for stainless and carbon plates. Same SEG drive architecture as 2513 with expanded format for bigger panels.',
    image: img3015,
    gallery: [img3015, img2513g2, img2513g3, img2513g4],
    badge: 'SHEET',
    powerRange: '1.5kW class',
    standardConfig: [
      'Caplin CW15-class Fiber Source',
      'SEG Cutting Head',
      'TEYU Chiller',
      'SEG Fangling CNC',
      'Servo Drive'
    ],
    optionalConfig: [
      'Higher-power laser source',
      'Auto-focus cutting head'
    ],
    models: [
      { name: 'SEG-3015', power: '3000 × 1500mm' }
    ],
    keySpecs: [
      { label: 'Working Area', value: '3000×1500mm' },
      { label: 'Thickness', value: 'SS ≤2mm / CS ≤3mm' },
      { label: 'Speed', value: '0–8000mm/min' },
      { label: 'Weight', value: '≈750kg' }
    ],
    features: [
      '3000×1500 Format',
      'Rack & Pinion Drive',
      'Precision Square Rails',
      'SEG CNC'
    ],
    specsTable: [
      { parameter: 'Materials', values: { 'SEG-3015': 'Stainless / Carbon steel plate' } },
      { parameter: 'Working Area', values: { 'SEG-3015': '3000 × 1500mm' } },
      { parameter: 'Cutting Thickness', values: { 'SEG-3015': 'SS 2mm / CS 3mm' } },
      { parameter: 'Cutting Speed', values: { 'SEG-3015': '0–8000mm/min' } },
      { parameter: 'Cutting Accuracy', values: { 'SEG-3015': '±0.5mm' } },
      { parameter: 'Repeatability', values: { 'SEG-3015': '±0.3mm' } },
      { parameter: 'Machine Size', values: { 'SEG-3015': '≈3600 × 2300 × 1400mm' } },
      { parameter: 'Pack Size', values: { 'SEG-3015': 'Split ≈3000 × 2100 × 1430mm' } },
      { parameter: 'Weight', values: { 'SEG-3015': '≈750kg' } },
      { parameter: 'Power Supply', values: { 'SEG-3015': '220 / 380V' } },
      { parameter: 'Drive / Rails', values: { 'SEG-3015': 'Rack & pinion · Precision square rails' } }
    ],
    featureDetails: [
      { title: 'Larger Panel Format', description: '3000×1500mm working area for bigger sheet nests and fewer repositions.' },
      { title: 'Shared Platform Parts', description: 'Aligns with SEG-2513 for common spares, training and service.' },
      { title: 'Production Sheet Cutting', description: 'Servo rack-and-pinion motion tuned for continuous plate cutting jobs.' }
    ],
    applications: ['Sheet Metal Shops', 'Cabinets', 'Equipment Housings', 'Signage', 'Light Fabrication']
  }
]


export const getProductById = (id) => products.find(p => p.id === id)

export const getProductsByCategory = (category) => products.filter(p => p.category.includes(category))

/** Sibling models that share one detail page with a top switcher */
export const getProductVariants = (productOrId) => {
  const product = typeof productOrId === 'string' ? getProductById(productOrId) : productOrId
  if (!product?.variantGroup) return product ? [product] : []
  return products.filter((p) => p.variantGroup === product.variantGroup)
}

/**
 * Home carousel / list: collapse variant groups to one card (listPrimary preferred).
 */
export const getShowcaseProducts = () => {
  const seenGroups = new Set()
  const list = []
  for (const p of products) {
    if (p.variantGroup) {
      if (seenGroups.has(p.variantGroup)) continue
      seenGroups.add(p.variantGroup)
      const group = products.filter((x) => x.variantGroup === p.variantGroup)
      const primary = group.find((x) => x.listPrimary) || group[0]
      list.push(primary)
      continue
    }
    list.push(p)
  }
  return list
}
