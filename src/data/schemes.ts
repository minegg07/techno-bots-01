
export interface Scheme {
  id: string;
  name: string;
  name_hi?: string; // Hindi name
  category: 'Health' | 'Agriculture' | 'Education' | 'Financial Services' | 'Housing' | 'Women & Children' | 'Employment' | 'Pension';
  state: 'Central' | string;
  description: string;
  eligibility_brief: string;
  eligibility_criteria: {
    min_age?: number;
    max_age?: number;
    income_limit?: number;
    gender?: 'All' | 'Female' | 'Male';
    urban_rural?: 'All' | 'Urban' | 'Rural';
    occupation?: string[];
    state?: string;
  };
  benefits: string;
  how_to_apply: string;
  tags: string[];
  portal_url?: string;
}

export const SCHEMES: Scheme[] = [
  // --- Central Government Schemes ---
  {
    id: 'pm-kisan',
    name: 'PM-Kisan Samman Nidhi (PM-KISAN)',
    category: 'Agriculture',
    state: 'Central',
    description: 'A central sector scheme to provide income support to all landholding farmers families in the country.',
    eligibility_brief: 'Small and marginal farmers with cultivable land.',
    eligibility_criteria: {
      occupation: ['Farmer'],
      urban_rural: 'Rural'
    },
    benefits: '₹6,000 per year, paid in three installments of ₹2,000.',
    how_to_apply: 'Apply through the official PM-KISAN portal or via Common Service Centres (CSCs).',
    tags: ['Income Support', 'Farmers', 'Direct Benefit Transfer'],
    portal_url: 'https://pmkisan.gov.in/'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Health',
    state: 'Central',
    description: 'Universal health coverage to provide free access to healthcare for 50 crore people in India.',
    eligibility_brief: 'Families in SECC 2011 database; beneficiaries of certain welfare schemes.',
    eligibility_criteria: {
      income_limit: 120000,
      urban_rural: 'All'
    },
    benefits: 'Free health insurance cover of ₹5 lakh per family per year.',
    how_to_apply: 'Check eligibility on the PM-JAY portal using mobile number or ration card.',
    tags: ['Health Insurance', 'Medical Support', 'Free Treatment'],
    portal_url: 'https://dashboard.pmjay.gov.in/bis/'
  },
  {
    id: 'pmay',
    name: 'PM Awas Yojana (PMAY)',
    category: 'Housing',
    state: 'Central',
    description: 'Financial assistance to provide housing for all in urban and rural areas.',
    eligibility_brief: 'Urban: EWS/LIG/MIG households with annual income up to ₹3L/₹6L/₹9L respective.',
    eligibility_criteria: {
      income_limit: 1800000,
      urban_rural: 'All'
    },
    benefits: 'Financial assistance for buying or constructing a house.',
    how_to_apply: 'Apply via the PMAY official portal or through ULBs (Urban Local Bodies).',
    tags: ['Housing', 'Home Loan', 'Subsidy'],
    portal_url: 'https://pmay-urban.gov.in/'
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana (APY)',
    category: 'Pension',
    state: 'Central',
    description: 'A pension scheme focused on the unorganized sector workers.',
    eligibility_brief: 'Indian citizens aged 18-40 years with a bank account.',
    eligibility_criteria: {
      min_age: 18,
      max_age: 40
    },
    benefits: 'Fixed monthly pension of ₹1,000 to ₹5,000 after retirement (age 60).',
    how_to_apply: 'Apply through any bank branch where you hold a savings account.',
    tags: ['Pension', 'Retirement', 'Unorganized Sector'],
    portal_url: 'https://www.npscra.nsdl.co.in/scheme-details.php'
  },
  {
    id: 'pmjdy',
    name: 'PM Jan Dhan Yojana (PMJDY)',
    category: 'Financial Services',
    state: 'Central',
    description: 'National Mission for Financial Inclusion to ensure access to financial services.',
    eligibility_brief: 'Any Indian national.',
    eligibility_criteria: {
      min_age: 10,
      urban_rural: 'All'
    },
    benefits: 'Access to a bank account, insurance, and pension.',
    how_to_apply: 'Open an account at any bank branch or Business Correspondent (Bank Mitr) outlet.',
    tags: ['Banking', 'Savings', 'Zero Balance'],
    portal_url: 'https://pmjdy.gov.in/'
  },
  {
    id: 'mgnrega',
    name: 'Mahatma Gandhi NREGA (MGNREGA)',
    category: 'Employment',
    state: 'Central',
    description: 'Guarantees 100 days of wage employment in a financial year to a rural household.',
    eligibility_brief: 'Rural households, adults 18+ willing to do unskilled manual work.',
    eligibility_criteria: {
      urban_rural: 'Rural',
      min_age: 18
    },
    benefits: 'Guaranteed 100 days of wage employment per year.',
    how_to_apply: 'Apply for a Job Card at the local Gram Panchayat office.',
    tags: ['Rural Employment', 'Wages', 'Skill Development'],
    portal_url: 'https://nrega.nic.in/'
  },
  {
    id: 'pm-mudra',
    name: 'PM Mudra Yojana',
    category: 'Financial Services',
    state: 'Central',
    description: 'Providing loans to non-corporate, non-farm small/micro enterprises.',
    eligibility_brief: 'Non-farm micro-enterprises.',
    eligibility_criteria: {
      occupation: ['Entrepreneur', 'Small Business']
    },
    benefits: 'Loans up to ₹10 lakh without collateral.',
    how_to_apply: 'Apply at any commercial bank, RRB, small finance bank, or MFI.',
    tags: ['Business Loan', 'Startup', 'Micro-Finance'],
    portal_url: 'https://www.mudra.org.in/'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana',
    category: 'Women & Children',
    state: 'Central',
    description: 'Small deposit scheme for the girl child as part of Beti Bachao Beti Padhao.',
    eligibility_brief: 'Parents/guardians of a girl child under 10.',
    eligibility_criteria: {
      gender: 'Female',
      max_age: 10
    },
    benefits: 'High-interest savings scheme for education and marriage.',
    how_to_apply: 'Open an account at any post office or authorized commercial bank.',
    tags: ['Girl Child', 'Savings', 'Education']
  },
  // --- Scholarships ---
  {
    id: 'pm-vidyalaxmi',
    name: 'PM-Vidyalaxmi Scheme',
    category: 'Education',
    state: 'Central',
    description: 'Education loan scheme for meritorious students in top institutions.',
    eligibility_brief: 'Merit students; family income up to ₹8 lakh/year for interest subvention.',
    eligibility_criteria: {
      income_limit: 800000,
      occupation: ['Student']
    },
    benefits: 'Collateral-free education loan; 3% interest subvention.',
    how_to_apply: 'Apply through Vidya Lakshmi portal.',
    tags: ['Education Loan', 'College'],
    portal_url: 'https://www.vidyalakshmi.co.in/'
  },
  {
    id: 'reliance-scholarship',
    name: 'Reliance Foundation Scholarships',
    category: 'Education',
    state: 'Central',
    description: 'Merit-cum-means based scholarship for UG & PG students.',
    eligibility_brief: 'First-year students; merit-cum-means basis.',
    eligibility_criteria: {
      income_limit: 1500000,
      occupation: ['Student']
    },
    benefits: 'Up to ₹2 lakh for UG, up to ₹6 lakh for PG, plus mentorship.',
    how_to_apply: 'Apply through Reliance Foundation scholarship portal.',
    tags: ['Scholarship', 'Merit-Means'],
    portal_url: 'https://www.scholarships.reliancefoundation.org/'
  },
  {
    id: 'saksham-scholarship',
    name: 'Saksham Scholarship Scheme',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for specially-abled students taking technical courses.',
    eligibility_brief: 'Specially-abled students (40%+ disability); income up to ₹8 lakh/year.',
    eligibility_criteria: {
      income_limit: 800000,
      occupation: ['Student']
    },
    benefits: '₹50,000 per annum for fees and other expenses.',
    how_to_apply: 'Apply through the National Scholarship Portal (NSP).',
    tags: ['Disabled', 'Technical Education'],
    portal_url: 'https://scholarships.gov.in/'
  },
  {
    id: 'delhi-sc-st-scholarship',
    name: 'Delhi Govt. SC/ST/OBC Scholarships',
    category: 'Education',
    state: 'Delhi',
    description: 'Various scholarships for school to higher education for reserved categories.',
    eligibility_brief: 'SC/ST/OBC students in Delhi; family income up to ₹8 lakh/year.',
    eligibility_criteria: {
      state: 'Delhi',
      income_limit: 800000,
      occupation: ['Student']
    },
    benefits: 'Reimbursement of tuition fees; merit scholarships up to ₹24,000/year.',
    how_to_apply: 'Apply through the Delhi Government E-district portal.',
    tags: ['SC/ST', 'OBC', 'Delhi']
  },
  {
    id: 'azim-premji-scholarship',
    name: 'Azim Premji Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for students interested in the social sector.',
    eligibility_brief: 'Indian citizens with a strong academic record.',
    eligibility_criteria: {
      occupation: ['Student']
    },
    benefits: 'Covers tuition fees and living expenses; need-based.',
    how_to_apply: 'Apply via Azim Premji Foundation website.',
    tags: ['Scholarship', 'Social Sector']
  },
  {
    id: 'spdc',
    name: 'Scholarship for Diaspora Children (SPDC)',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for children of NRIs and PIOs to study in India.',
    eligibility_brief: 'Children of NRIs/PIOs/OCIs; merit-cum-means.',
    eligibility_criteria: {
      income_limit: 500000,
      occupation: ['Student']
    },
    benefits: 'Up to 75% of Institutional Economic Cost, capped at $4,000/year.',
    how_to_apply: 'Apply via SPDC portal.',
    tags: ['NRI', 'Diaspora']
  },
  // --- State Specific Schemes ---
  {
    id: 'arogya-karnataka',
    name: 'Ayushman Bharat Arogya Karnataka',
    category: 'Health',
    state: 'Karnataka',
    description: 'Health scheme for PDS cardholders integrated with PM-JAY.',
    eligibility_brief: 'BPL households & PDS cardholders in Karnataka.',
    eligibility_criteria: {
      state: 'Karnataka',
      urban_rural: 'All'
    },
    benefits: 'Cashless treatment up to ₹5 lakh per year for BPL families.',
    how_to_apply: 'Visit any government hospital in Karnataka with Aadhaar and PDS card.',
    tags: ['Karnataka', 'Health', 'PDS'],
    portal_url: 'https://arogya.karnataka.gov.in/'
  },
  {
    id: 'tn-cmchis',
    name: "Chief Minister's Comprehensive Health Insurance",
    category: 'Health',
    state: 'Tamil Nadu',
    description: 'Health insurance scheme for families in Tamil Nadu.',
    eligibility_brief: 'Families in TN with annual income less than ₹72,000.',
    eligibility_criteria: {
      state: 'Tamil Nadu',
      income_limit: 72000
    },
    benefits: 'Financial coverage of ₹5 lakh per family per year.',
    how_to_apply: 'Apply at District Collectorate with income and residence certificate.',
    tags: ['Tamil Nadu', 'Health Insurance']
  },
  {
    id: 'lado-lakshmi',
    name: 'Deendayal Lado Lakshmi Yojana',
    category: 'Women & Children',
    state: 'Haryana',
    description: 'Financial assistance for women residents of Haryana.',
    eligibility_brief: 'Women residents aged 23+, family income < ₹1 lakh/year.',
    eligibility_criteria: {
      state: 'Haryana',
      income_limit: 100000,
      gender: 'Female',
      min_age: 23
    },
    benefits: 'Monthly financial assistance of ₹2,100 via DBT.',
    how_to_apply: 'Online application through Haryana government portal.',
    tags: ['Haryana', 'Women Welfare', 'Financial Aid']
  },
  {
    id: 'nss-2026-001',
    name: 'National Scholarship Scheme (NSS)',
    category: 'Education',
    state: 'Central',
    description: 'A comprehensive central sector scholarship scheme for meritorious students from SC, ST, and EWS categories pursuing higher education.',
    eligibility_brief: 'SC/ST/EWS; Annual Income < ₹8 LPA; Class 10+.',
    eligibility_criteria: {
      income_limit: 800000,
      occupation: ['Student']
    },
    benefits: '₹1,50,000 per year (renewable up to 5 years).',
    how_to_apply: 'Apply through the National Scholarship Portal (NSP) during the application window (April to August).',
    tags: ['Scholarship', 'SC/ST', 'EWS', 'Higher Education'],
    portal_url: 'https://scholarships.gov.in/'
  },
  {
    id: 'pragati-2026-002',
    name: 'Pragati Scholarship for Girls',
    category: 'Education',
    state: 'Central',
    description: 'An AICTE initiative providing financial assistance to girls for advancement in technical education.',
    eligibility_brief: 'Girls; B.Tech/B.E./Diploma; Family Income ≤ ₹6 LPA.',
    eligibility_criteria: {
      income_limit: 600000,
      gender: 'Female',
      occupation: ['Student']
    },
    benefits: '₹50,000 per year for tuition and incidental expenses.',
    how_to_apply: 'Apply through AICTE portal or National Scholarship Portal (NSP) from May to June.',
    tags: ['Girls', 'Technical Education', 'Scholarship'],
    portal_url: 'https://www.aicte-india.org/schemes/students-development-schemes/pragati-scholarship-scheme'
  },
  {
    id: 'sch-001',
    name: 'National Merit Cum Means Scholarship (NMMSS)',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for meritorious students from low-income families (Class 9 & 11).',
    eligibility_brief: 'Class 9 & 11; Family Income < ₹1.5L/year.',
    eligibility_criteria: { occupation: ['Student'], income_limit: 150000 },
    benefits: '₹1,20,000 over 4 years (₹10,000/month).',
    how_to_apply: 'Apply via scholarships.gov.in (June-August).',
    tags: ['Scholarship', 'Merit', 'Education'],
    portal_url: 'https://scholarships.gov.in/'
  },
  {
    id: 'sch-003-new',
    name: 'Saksham Scholarship (PwD)',
    category: 'Education',
    state: 'Central',
    description: 'Financial assistance for students with disabilities pursuing higher education.',
    eligibility_brief: '40%+ disability; Higher Education.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹5,000/month for duration of course.',
    how_to_apply: 'Apply via scholarships.gov.in/saksham (April-June).',
    tags: ['Disability', 'Scholarship', 'Higher Education'],
    portal_url: 'https://scholarships.gov.in/'
  },
  {
    id: 'sch-004',
    name: 'Post-Matric Scholarship for SC Students',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for SC students pursuing studies after Class 10.',
    eligibility_brief: 'SC category; after Class 10.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable state-wise fee reimbursement and allowance.',
    how_to_apply: 'Apply via scholarships.gov.in (April-August).',
    tags: ['SC Students', 'Scholarship', 'Post-Matric']
  },
  {
    id: 'sch-005',
    name: 'Pre-Matric Scholarship for ST Students',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for ST students studying in Class 1-10.',
    eligibility_brief: 'ST category; Class 1-10.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable state-wise allowance for school term.',
    how_to_apply: 'Apply via scholarships.gov.in (April-July).',
    tags: ['ST Students', 'Scholarship', 'Pre-Matric']
  },
  {
    id: 'sch-006',
    name: 'Top Class Education Scheme for SC Students',
    category: 'Education',
    state: 'Central',
    description: 'Full financial support for SC students in premier institutions (PhD/M.Phil/Professional).',
    eligibility_brief: 'SC Students; PhD/Professional Courses; Merit-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹3,100/month + full fee reimbursement.',
    how_to_apply: 'Apply via topclasseducation.gov.in (May-July).',
    tags: ['SC Students', 'Higher Studies', 'Professional']
  },
  {
    id: 'sch-007',
    name: 'RUSA Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for students in participating State Universities under RUSA.',
    eligibility_brief: 'Registered in RUSA Universities.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable support based on course and rank.',
    how_to_apply: 'Apply via rusa.nic.in (June-September).',
    tags: ['University', 'Scholarship', 'General']
  },
  {
    id: 'sch-008',
    name: "Prime Minister's Research Fellowship (PMRF)",
    category: 'Education',
    state: 'Central',
    description: 'Prestigious fellowship for PhD scholars in central universities and IITs/NITs.',
    eligibility_brief: 'PhD in priority areas; GATE/GPAT/JAM qualified.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹70,000-₹75,000/month for 5 years.',
    how_to_apply: 'Apply via pmrf.in (April-June).',
    tags: ['Fellowship', 'PhD', 'Research']
  },
  {
    id: 'sch-009',
    name: 'UGC Non-NET Fellowship',
    category: 'Education',
    state: 'Central',
    description: 'Fellowship for PhD scholars registered in UGC-recognized universities without NET/JRF.',
    eligibility_brief: 'PhD registered scholars; NON-NET.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹37,000-₹42,000/month for up to 5 years.',
    how_to_apply: 'Apply via csirhrdg.res.in (May-July).',
    tags: ['Fellowship', 'PhD', 'UGC']
  },
  {
    id: 'sch-010',
    name: 'INSPIRE Fellowship',
    category: 'Education',
    state: 'Central',
    description: 'Innovation in Science Pursuit for Inspired Research for young science enthusiasts.',
    eligibility_brief: 'Class 11-12; Merit-based in Science.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹80,000/year for up to 5 years.',
    how_to_apply: 'Apply via inspire-dst.gov.in (April-June).',
    tags: ['Science', 'Fellowship', 'Merit']
  },
  {
    id: 'sch-011',
    name: 'Swami Vivekananda Merit-cum-Means (WB)',
    category: 'Education',
    state: 'West Bengal',
    description: 'Scholarship for WB students in Class 11-12 with good academic records.',
    eligibility_brief: 'West Bengal students; Income < ₹2.5L/year; Class 11-12.',
    eligibility_criteria: { state: 'West Bengal', occupation: ['Student'], income_limit: 250000 },
    benefits: '₹2,400 per year for 2 years.',
    how_to_apply: 'Apply via West Bengal Student Portal (May-July).',
    tags: ['West Bengal', 'Merit-Means', 'Scholarship']
  },
  {
    id: 'sch-012',
    name: 'MSBSHSE Merit Scholarship (Maharashtra)',
    category: 'Education',
    state: 'Maharashtra',
    description: 'Scholarship for top rankers in Maharashtra Class 10 Board Exams.',
    eligibility_brief: 'Maharashtra students; Top rankers in Class 10.',
    eligibility_criteria: { state: 'Maharashtra', occupation: ['Student'] },
    benefits: '₹1,200 per year.',
    how_to_apply: 'Apply via MSBSHSE Portal (August-September).',
    tags: ['Maharashtra', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-013',
    name: "TN CM's Comprehensive Welfare for Students",
    category: 'Education',
    state: 'Tamil Nadu',
    description: 'Welfare scheme for TN students pursuing professional or graduation courses.',
    eligibility_brief: 'Tamil Nadu students; Professional/Graduation.',
    eligibility_criteria: { state: 'Tamil Nadu', occupation: ['Student'] },
    benefits: 'Variable support for course duration.',
    how_to_apply: 'Apply via TN e-Governance Portal (April-August).',
    tags: ['Tamil Nadu', 'Scholarship', 'Professional']
  },
  {
    id: 'sch-014',
    name: 'Karnataka Post Matric (Minorities)',
    category: 'Education',
    state: 'Karnataka',
    description: 'Scholarship for minority community students in Karnataka after Class 10.',
    eligibility_brief: 'Minority students of Karnataka; after Class 10.',
    eligibility_criteria: { state: 'Karnataka', occupation: ['Student'] },
    benefits: '₹1,500 per year for course duration.',
    how_to_apply: 'Apply via Karnataka One Portal (June-August).',
    tags: ['Karnataka', 'Minority', 'Scholarship']
  },
  {
    id: 'sch-015',
    name: 'Punjab Merit Scholarship',
    category: 'Education',
    state: 'Punjab',
    description: 'Scholarship for top 20% college students in Punjab.',
    eligibility_brief: 'Punjab students; Top 20% in academic year.',
    eligibility_criteria: { state: 'Punjab', occupation: ['Student'] },
    benefits: '₹6,000 per year (renewable).',
    how_to_apply: 'Apply via Punjab Scholarship Portal (July-September).',
    tags: ['Punjab', 'Merit', 'College']
  },
  {
    id: 'sch-016',
    name: 'Andhra Pradesh Post Matric (BC)',
    category: 'Education',
    state: 'Andhra Pradesh',
    description: 'Scholarship for Backward Class students in AP pursuing studies after Class 10.',
    eligibility_brief: 'BC category of AP; after Class 10.',
    eligibility_criteria: { state: 'Andhra Pradesh', occupation: ['Student'] },
    benefits: 'Variable support based on course.',
    how_to_apply: 'Apply via AP EPass Portal (April-August).',
    tags: ['Andhra Pradesh', 'BC Students', 'Scholarship']
  },
  {
    id: 'sch-017',
    name: 'Delhi Govt. Merit Scholarship (UG)',
    category: 'Education',
    state: 'Delhi',
    description: 'Scholarship for Delhi students pursuing undergraduate courses.',
    eligibility_brief: 'Delhi residents; Top 20% in Class 12.',
    eligibility_criteria: { state: 'Delhi', occupation: ['Student'] },
    benefits: '₹10,000 per year (renewable).',
    how_to_apply: 'Apply via Delhi Scholarship Portal (August-October).',
    tags: ['Delhi', 'Merit', 'Undergraduate']
  },
  {
    id: 'sch-018',
    name: 'SPQEM - Quality Education in Madrasas',
    category: 'Education',
    state: 'Central',
    description: 'Scheme for providing quality education in recognized madrasas for ITI/Diploma/Graduation.',
    eligibility_brief: 'Students in recognized Madrasas.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹1,000/month for course duration.',
    how_to_apply: 'Apply via spqem.moma.gov.in (May-July).',
    tags: ['Minority', 'Madrasa', 'Scholarship']
  },
  {
    id: 'sch-019',
    name: 'Dr. Ambedkar Interest Subsidy on Education Loan',
    category: 'Education',
    state: 'Central',
    description: '100% interest subsidy for SC students availing large education loans for professional courses.',
    eligibility_brief: 'SC Students; Loan > ₹10 Lakh; Professional Courses.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '100% interest subsidy till loan repayment (max 10 years).',
    how_to_apply: 'Apply via interestsubsidyscheme.gov.in (April-August).',
    tags: ['SC Students', 'Education Loan', 'Subsidy']
  },
  {
    id: 'sch-020',
    name: 'Deen Dayal Upadhyaya Journalism Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for students pursuing journalism or mass communication.',
    eligibility_brief: 'Journalism/Mass Comm students; Merit-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹10,000 per year.',
    how_to_apply: 'Apply via MoIB Official Website (June-July).',
    tags: ['Journalism', 'Scholarship', 'Merit']
  },
  {
    id: 'sch-021',
    name: 'National Overseas Scholarship for SC Students',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for SC students to pursue Masters or PhD abroad.',
    eligibility_brief: 'SC category; Masters/PhD abroad; Merit-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹15,000/month + airfare + contingency abroad.',
    how_to_apply: 'Apply via nationaloverseasscholarship.gov.in (March-May).',
    tags: ['Study Abroad', 'SC Students', 'PhD']
  },
  {
    id: 'sch-022',
    name: 'Inlaks Shivdasani Foundation Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Full funding for exceptional Indian students to pursue postgraduate studies abroad.',
    eligibility_brief: 'Indian citizens; postgraduate abroad; exceptional merit.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Full funding (Tuition + Living + Travel).',
    how_to_apply: 'Apply via inlaksfoundation.org (September-November).',
    tags: ['Study Abroad', 'Postgraduate', 'Merit']
  },
  {
    id: 'sch-023',
    name: 'Google CS Scholarships',
    category: 'Education',
    state: 'Central',
    description: 'Scholarships for underrepresented groups in tech pursuing CS or Engineering.',
    eligibility_brief: 'Women/PwD in CS/Engineering.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable amount (approx ₹2L) + mentorship.',
    how_to_apply: 'Apply via Google Build Your Future portal.',
    tags: ['Tech', 'Diversity', 'CS']
  },
  {
    id: 'sch-024',
    name: 'Microsoft Diversity & Inclusion Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship and internship opportunities for students from marginalized communities in CS.',
    eligibility_brief: 'Marginalized communities; Computer Science.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹1,50,000 + internship opportunity.',
    how_to_apply: 'Apply via Microsoft Careers Portal.',
    tags: ['Tech', 'Diversity', 'CS']
  },
  {
    id: 'sch-025-new',
    name: 'Reliance Foundation (Merit-cum-Need)',
    category: 'Education',
    state: 'Central',
    description: 'Financial support for EWS students pursuing undergraduate education.',
    eligibility_brief: 'EWS students; Undergraduate; Merit-cum-Need.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹3,00,000 per year for 4 years.',
    how_to_apply: 'Apply via Reliance Foundation portal (May-July).',
    tags: ['EWS', 'Merit-Need', 'Undergraduate']
  },
  {
    id: 'sch-026',
    name: 'Narotam Sekhsaria Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Postgraduate scholarship for excellence in various fields in India or abroad.',
    eligibility_brief: 'Low-income; UG/PG; India/Abroad; Merit-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Up to ₹15 Lakhs (Multi-year loan/scholarship).',
    how_to_apply: 'Apply via nsfscholarship.org (June-August).',
    tags: ['Merit', 'Postgraduate', 'Foundation']
  },
  {
    id: 'sch-027',
    name: 'Chevening Scholarship (UK)',
    category: 'Education',
    state: 'Central',
    description: 'Global scholarship program of the UK government for future leaders.',
    eligibility_brief: 'Leadership potential; Work experience; Academic excellence.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: "Full funding for 1-year Master's in the UK.",
    how_to_apply: 'Apply via chevening.org (August-November).',
    tags: ['UK', 'Masters', 'Leadership']
  },
  {
    id: 'sch-028',
    name: 'Fulbright-Nehru Fellowship (US)',
    category: 'Education',
    state: 'Central',
    description: 'Educational exchange program between US and India for graduate studies.',
    eligibility_brief: 'Graduate students; intent to return to India.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: "Full funding for Master's/PhD in the US.",
    how_to_apply: 'Apply via usief.org.in (April-June).',
    tags: ['US', 'Graduate', 'Fellowship']
  },
  {
    id: 'sch-029',
    name: 'Erasmus Mundus Joint Masters (EU)',
    category: 'Education',
    state: 'Central',
    description: 'High-level joint master programs by an international consortium of HEIs.',
    eligibility_brief: 'International students; Excellent academic record.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: "Full funding for 1-2 year Master's in Europe.",
    how_to_apply: 'Apply via Erasmus+ portal (Varies).',
    tags: ['EU', 'Masters', 'Joint Degree']
  },
  {
    id: 'sch-030',
    name: 'Commonwealth Shared Scholarship (UK)',
    category: 'Education',
    state: 'Central',
    description: "Scholarships for students from developing Commonwealth countries for UK Master's.",
    eligibility_brief: 'Developing Commonwealth citizens; Academic excellence.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Full funding including stipend and airfare.',
    how_to_apply: 'Apply via ACU website.',
    tags: ['Commonwealth', 'UK', 'Masters']
  },
  {
    id: 'sch-031',
    name: "Agri Scholarship for Farmers' Children",
    category: 'Education',
    state: 'Central',
    description: "Financial assistance for children of farmers pursuing agricultural sciences.",
    eligibility_brief: "Children of Farmers; Agri Sciences; Merit-based.",
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹2,000/month for course duration.',
    how_to_apply: 'Apply via Ministry of Agriculture website (July-September).',
    tags: ['Agriculture', 'Farmers', 'Education']
  },
  {
    id: 'sch-032-new',
    name: 'Financial Assistance for Disabled Students',
    category: 'Education',
    state: 'Central',
    description: 'Support for students with 40%+ disability pursuing higher education.',
    eligibility_brief: '40%+ certified disability.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable allowance and fee reimbursement.',
    how_to_apply: 'Apply via scholarships.gov.in (April-August).',
    tags: ['Disability', 'Scholarship', 'Higher Education']
  },
  {
    id: 'sch-033',
    name: 'IGNOU Merit Scholarship',
    category: 'Education',
    state: 'Central',
    description: 'Merit scholarship for top-performing students in IGNOU distance programs.',
    eligibility_brief: 'Top IGNOU students; Merit-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: '₹10,000 per year (renewable).',
    how_to_apply: 'Apply via IGNOU website (August-October).',
    tags: ['Distance Learning', 'IGNOU', 'Merit']
  },
  {
    id: 'sch-034',
    name: 'Distance Education Scholarship (UGC)',
    category: 'Education',
    state: 'Central',
    description: 'Scholarship for students in distance mode at UGC-recognized universities.',
    eligibility_brief: 'UGC distance mode enrollment; Merit & Need-based.',
    eligibility_criteria: { occupation: ['Student'] },
    benefits: 'Variable amount for course duration.',
    how_to_apply: 'Apply via UGC website (September-November).',
    tags: ['Distance Learning', 'UGC', 'Need-based']
  },
  {
    id: 'sch-035',
    name: 'Girl Child Education (Rajasthan)',
    category: 'Education',
    state: 'Rajasthan',
    description: 'Scholarship for girls in Rajasthan from families with income < ₹2L/year.',
    eligibility_brief: 'Rajasthan girls; Income < ₹2L/year; HS/Graduation.',
    eligibility_criteria: { state: 'Rajasthan', occupation: ['Student'], income_limit: 200000, gender: 'Female' },
    benefits: '₹2,400 per year (renewable).',
    how_to_apply: 'Apply via Rajasthan Sampark Portal (June-August).',
    tags: ['Rajasthan', 'Girls', 'Scholarship']
  },
  {
    id: 'sch-036',
    name: "Odisha CM's Scholarship for Excellence",
    category: 'Education',
    state: 'Odisha',
    description: 'Award for top rankers in Odisha Class 12 Board Exam pursuing higher education.',
    eligibility_brief: 'Odisha students; Top Class 12 rankers; higher ed in Odisha.',
    eligibility_criteria: { state: 'Odisha', occupation: ['Student'] },
    benefits: '₹12,000 per year (renewable).',
    how_to_apply: 'Apply via Odisha Scholarship Portal (August-October).',
    tags: ['Odisha', 'Merit', 'Class 12']
  },
  {
    id: 'sch-037',
    name: 'Assam Govt. Merit Scholarship',
    category: 'Education',
    state: 'Assam',
    description: 'Scholarship for merit students in Assam pursuing Graduation or PG.',
    eligibility_brief: 'Assam students; Top 10% merit; Grad/PG.',
    eligibility_criteria: { state: 'Assam', occupation: ['Student'] },
    benefits: '₹8,000 per year (renewable).',
    how_to_apply: 'Apply via Assam Online Portal (July-September).',
    tags: ['Assam', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-038',
    name: 'Manipur Merit Scholarship (Outside Manipur)',
    category: 'Education',
    state: 'Manipur',
    description: 'Scholarship for Manipur students pursuing higher education outside the state.',
    eligibility_brief: 'Manipur students; Higher ed outside Manipur; Merit-based.',
    eligibility_criteria: { state: 'Manipur', occupation: ['Student'] },
    benefits: '₹10,000 per year (renewable).',
    how_to_apply: 'Apply via Manipur Online Services (August-October).',
    tags: ['Manipur', 'Higher Education', 'Scholarship']
  },
  {
    id: 'sch-039',
    name: 'Mizoram Merit-cum-Means',
    category: 'Education',
    state: 'Mizoram',
    description: 'Merit-cum-means based scholarship for higher education students in Mizoram.',
    eligibility_brief: 'Mizoram students; Merit & Need-based.',
    eligibility_criteria: { state: 'Mizoram', occupation: ['Student'] },
    benefits: '₹15,000 per year for course duration.',
    how_to_apply: 'Apply via Mizoram Online Portal (June-August).',
    tags: ['Mizoram', 'Merit-Means', 'Scholarship']
  },
  {
    id: 'sch-040',
    name: 'Nagaland State Merit Scholarship',
    category: 'Education',
    state: 'Nagaland',
    description: 'Scholarship for top performers in entrance or board exams from Nagaland.',
    eligibility_brief: 'Nagaland students; Top performers; Higher Ed.',
    eligibility_criteria: { state: 'Nagaland', occupation: ['Student'] },
    benefits: '₹12,000 per year (renewable).',
    how_to_apply: 'Apply via Nagaland e-Governance Portal (July-September).',
    tags: ['Nagaland', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-041',
    name: 'Goa Govt. Merit Scholarship',
    category: 'Education',
    state: 'Goa',
    description: 'Merit-based scholarship for graduation students in Goa.',
    eligibility_brief: 'Goa students; Graduation students; Merit-based.',
    eligibility_criteria: { state: 'Goa', occupation: ['Student'] },
    benefits: '₹6,000 per year (renewable).',
    how_to_apply: 'Apply via Goa Online Portal (August-October).',
    tags: ['Goa', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-042',
    name: 'Sikkim State Merit Scholarship',
    category: 'Education',
    state: 'Sikkim',
    description: 'Merit-based scholarship for students from Sikkim pursuing higher education.',
    eligibility_brief: 'Sikkim students; Higher ed; Merit-based.',
    eligibility_criteria: { state: 'Sikkim', occupation: ['Student'] },
    benefits: '₹10,000 per year (renewable).',
    how_to_apply: 'Apply via Sikkim e-Governance Portal (July-September).',
    tags: ['Sikkim', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-043',
    name: 'Chhattisgarh Post Matric (ST)',
    category: 'Education',
    state: 'Chhattisgarh',
    description: 'Post matric scholarship for Scheduled Tribe students in Chhattisgarh.',
    eligibility_brief: 'ST category students of CG; after Class 10.',
    eligibility_criteria: { state: 'Chhattisgarh', occupation: ['Student'] },
    benefits: 'Variable support based on course.',
    how_to_apply: 'Apply via CG Scholarship Portal (May-July).',
    tags: ['Chhattisgarh', 'ST Students', 'Scholarship']
  },
  {
    id: 'sch-044',
    name: 'Jharkhand Merit Scholarship (SC/ST)',
    category: 'Education',
    state: 'Jharkhand',
    description: 'Merit-based scholarship for SC/ST students in Jharkhand for higher education.',
    eligibility_brief: 'SC/ST category of Jharkhand; Higher Ed; Merit-based.',
    eligibility_criteria: { state: 'Jharkhand', occupation: ['Student'] },
    benefits: 'Variable support based on course and merit.',
    how_to_apply: 'Apply via Jharkhand One Stop Portal (June-August).',
    tags: ['Jharkhand', 'SC/ST', 'Merit']
  },
  {
    id: 'sch-045-new',
    name: 'Haryana Merit-cum-Means Scholarship',
    category: 'Education',
    state: 'Haryana',
    description: 'Merit-cum-means based scholarship for higher education in Haryana with income < ₹3L/year.',
    eligibility_brief: 'Haryana students; Merit-based; Income < ₹3L/year.',
    eligibility_criteria: { state: 'Haryana', occupation: ['Student'], income_limit: 300000 },
    benefits: '₹12,000 per year (renewable).',
    how_to_apply: 'Apply via Haryana Samagra Portal (July-September).',
    tags: ['Haryana', 'Merit-Means', 'Scholarship']
  },
  {
    id: 'sch-046',
    name: "Uttarakhand CM's Scholarship",
    category: 'Education',
    state: 'Uttarakhand',
    description: 'Scholarship for Uttarakhand students pursuing professional courses.',
    eligibility_brief: 'Uttarakhand residents; Professional courses; Merit-based.',
    eligibility_criteria: { state: 'Uttarakhand', occupation: ['Student'] },
    benefits: '₹15,000 per year (renewable).',
    how_to_apply: 'Apply via Uttarakhand Sahayata Portal (August-October).',
    tags: ['Uttarakhand', 'Professional', 'Merit']
  },
  {
    id: 'sch-047',
    name: 'Bihar Govt. Merit Scholarship',
    category: 'Education',
    state: 'Bihar',
    description: 'Scholarship for top 10% merit students in Bihar for graduation.',
    eligibility_brief: 'Bihar students; Graduation; Top 10% merit.',
    eligibility_criteria: { state: 'Bihar', occupation: ['Student'] },
    benefits: '₹8,000 per year (renewable).',
    how_to_apply: 'Apply via Bihar Scholarship Portal (July-September).',
    tags: ['Bihar', 'Merit', 'Scholarship']
  },
  {
    id: 'sch-048',
    name: 'MP Post Matric Scholarship (OBC)',
    category: 'Education',
    state: 'Madhya Pradesh',
    description: 'Post matric scholarship for OBC category students in MP pursuing education after Class 10.',
    eligibility_brief: 'OBC category of MP; after Class 10.',
    eligibility_criteria: { state: 'Madhya Pradesh', occupation: ['Student'] },
    benefits: 'Variable support based on course.',
    how_to_apply: 'Apply via MP Scholarship Portal (May-August).',
    tags: ['Madhya Pradesh', 'OBC', 'Scholarship']
  },
  {
    id: 'sch-049',
    name: 'Telangana Post Matric (BC)',
    category: 'Education',
    state: 'Telangana',
    description: 'Post matric scholarship for BC category students in Telangana after Class 10.',
    eligibility_brief: 'BC category of Telangana; after Class 10.',
    eligibility_criteria: { state: 'Telangana', occupation: ['Student'] },
    benefits: 'Variable support based on course.',
    how_to_apply: 'Apply via TS ePass Portal (April-August).',
    tags: ['Telangana', 'BC Students', 'Scholarship']
  },
  {
    id: 'sch-050',
    name: 'Kerala Merit Scholarship (Professional)',
    category: 'Education',
    state: 'Kerala',
    description: 'Scholarship for Kerala students in Engineering, Medical, or Law courses based on merit.',
    eligibility_brief: 'Kerala students; Prof. Courses (Engg/Med/Law); Merit-based.',
    eligibility_criteria: { state: 'Kerala', occupation: ['Student'] },
    benefits: '₹10,000 per year (renewable).',
    how_to_apply: 'Apply via Kerala Scholarship Portal (August-October).',
    tags: ['Kerala', 'Professional', 'Merit']
  }
];

