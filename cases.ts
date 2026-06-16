export type Verdict = 'fraud' | 'safe' | 'suspicious' | 'verify';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type EnvironmentType =
  | 'gmail'
  | 'whatsapp'
  | 'sms-courier'
  | 'upi-qr'
  | 'job-portal'
  | 'investment-scam'
  | 'instagram-giveaway'
  | 'fake-customer-care'
  | 'electricity-sms'
  | 'deepfake-call'
  | 'marketplace'
  | 'upi-collect'
  | 'scholarship-portal'
  | 'aadhaar-portal'
  | 'social-recovery';

export interface RedFlag {
  id: string;
  label: string;
  detail: string;
}

export interface CaseAnalysis {
  verdict: Verdict;
  headline: string;
  explanation: string;
  tacticUsed: string;
  psychologicalManipulation: string[];
  preventionTips: string[];
  officialAdvice: string;
}

export interface CaseData {
  id: number;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  environmentType: EnvironmentType;
  briefing: string;
  redFlags: RedFlag[];
  analysis: CaseAnalysis;
}

const cases: CaseData[] = [
  {
    id: 1,
    title: 'Bank KYC Scam',
    subtitle: 'Phishing Email',
    difficulty: 'Easy',
    environmentType: 'gmail',
    briefing:
      'You have received an urgent email from what appears to be your bank. Investigate the email and its contents before taking any action.',
    redFlags: [
      { id: 'rf1-1', label: 'Suspicious sender domain', detail: 'Sender uses sbibank-kyc-alert.net instead of sbi.co.in' },
      { id: 'rf1-2', label: 'Phishing URL in link', detail: 'Hover over the link reveals https://sbi-verify-kyc-secure.net' },
      { id: 'rf1-3', label: 'Urgency / threat language', detail: 'Email threatens account suspension within 24 hours' },
      { id: 'rf1-4', label: 'Generic salutation', detail: 'Email says "Dear Customer" not your actual name' },
      { id: 'rf1-5', label: 'SSL but fake domain', detail: 'Phishing site has HTTPS but domain is not official' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Phishing Email — Confirmed Fraud',
      explanation:
        'The email impersonates the State Bank of India but originates from a fraudulent domain (sbibank-kyc-alert.net). The embedded link redirects to a fake website designed to steal your banking credentials. SBI never requests KYC via email links.',
      tacticUsed: 'Email Phishing with Urgency Trigger',
      psychologicalManipulation: [
        'Fear of account suspension creates panic and bypasses rational thinking',
        'Official-looking logos build false legitimacy',
        'Tight deadline prevents victims from verifying authenticity',
        '"URGENT" subject line triggers immediate action reflex',
      ],
      preventionTips: [
        'Always check the sender email domain — official SBI emails end in @sbi.co.in',
        'Hover over links before clicking to see the real destination URL',
        'Banks never request credentials via email — visit the official website directly',
        'Call the official bank helpline to verify any account warnings',
      ],
      officialAdvice:
        'Report phishing emails to report.phishing@sbi.co.in or the National Cybercrime portal at cybercrime.gov.in',
    },
  },
  {
    id: 2,
    title: 'WhatsApp Family Emergency',
    subtitle: 'Impersonation Scam',
    difficulty: 'Easy',
    environmentType: 'whatsapp',
    briefing:
      'An unknown number has messaged you claiming to be your sister with a new phone. They urgently need money. Investigate before responding.',
    redFlags: [
      { id: 'rf2-1', label: 'Unknown number', detail: 'Number is not saved — real family would be saved contacts' },
      { id: 'rf2-2', label: 'No video call available', detail: 'Refuses to video call claiming "camera is broken"' },
      { id: 'rf2-3', label: 'International number prefix', detail: 'Number starts with +44 (UK) — family is local' },
      { id: 'rf2-4', label: 'Immediate money request', detail: 'First message quickly escalates to urgent money transfer' },
      { id: 'rf2-5', label: 'Stolen profile photo', detail: 'Profile photo matches sister but account details differ' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a WhatsApp Impersonation Scam',
      explanation:
        'Fraudsters used your sister\'s profile photo (likely scraped from social media) to impersonate her. The account uses a foreign number and immediately requests money. Always verify family emergencies with a direct call to a known number.',
      tacticUsed: 'Social Engineering via Impersonation',
      psychologicalManipulation: [
        'Exploits emotional attachment to family members',
        'Urgency prevents careful verification',
        'Familiar profile photo builds false identity confidence',
        '"New phone" excuse explains why number is different',
      ],
      preventionTips: [
        'Always call the person on their original number to verify',
        'Video call requests being refused is a major red flag',
        'Never transfer money without multi-channel identity verification',
        'Save all family numbers and be suspicious of unknown numbers claiming family identity',
      ],
      officialAdvice: 'Report to cybercrime.gov.in or call 1930 (National Cyber Crime Helpline)',
    },
  },
  {
    id: 3,
    title: 'Fake Courier Delivery',
    subtitle: 'SMS Phishing (Smishing)',
    difficulty: 'Easy',
    environmentType: 'sms-courier',
    briefing:
      'You received an SMS about a failed parcel delivery asking you to pay a small fee. Investigate this before paying anything.',
    redFlags: [
      { id: 'rf3-1', label: 'Sender is a random number', detail: 'Legitimate couriers use registered sender IDs like DTDC-IN' },
      { id: 'rf3-2', label: 'Suspicious payment link', detail: 'Link goes to indpost-delivery-fee-pay.xyz, not indiapost.gov.in' },
      { id: 'rf3-3', label: 'No tracking number provided', detail: 'Real delivery SMS always includes a tracking ID' },
      { id: 'rf3-4', label: 'Payment page requests full card details', detail: 'Asks for card number, CVV, expiry, and OTP on a non-bank page' },
      { id: 'rf3-5', label: 'No recipient name mentioned', detail: 'Genuine delivery messages address you by name or tracking number' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Smishing (SMS Phishing) Scam',
      explanation:
        'The SMS mimics India Post or a courier service to trick you into paying a fake ₹2 fee. Once you enter your card details on the fraudulent payment page, the criminals steal your card information for larger unauthorized transactions.',
      tacticUsed: 'Smishing — SMS Phishing with Micro-Payment Trap',
      psychologicalManipulation: [
        'Small ₹2 fee seems harmless and lowers guard',
        'Fear of missing a parcel triggers urgency',
        'Official courier branding builds false trust',
        'Low stakes payment conceals actual data theft goal',
      ],
      preventionTips: [
        'Track parcels only through official courier apps or websites',
        'Legitimate couriers never demand payment via SMS links',
        'Always verify the sender ID — real couriers use registered IDs',
        'Never enter card/UPI details on websites reached via SMS links',
      ],
      officialAdvice: 'Report smishing to the TRAI DND app or file a complaint at cybercrime.gov.in',
    },
  },
  {
    id: 4,
    title: 'QR Code Payment Scam',
    subtitle: 'UPI Payment Reversal Fraud',
    difficulty: 'Medium',
    environmentType: 'upi-qr',
    briefing:
      'You are selling an item online. The buyer has sent a QR code claiming you need to scan it to "receive" the payment. Investigate before scanning.',
    redFlags: [
      { id: 'rf4-1', label: 'Scanning QR sends money, not receives', detail: 'UPI QR codes initiate payments FROM you — not TO you' },
      { id: 'rf4-2', label: 'Seller pressures urgency', detail: 'Buyer insists you scan immediately before they can "confirm"' },
      { id: 'rf4-3', label: 'QR requests specific amount', detail: 'The QR shows ₹15,000 — the exact sale price, meant to confuse' },
      { id: 'rf4-4', label: 'No bank notification received', detail: 'You have received no credit alert from your bank yet' },
      { id: 'rf4-5', label: 'Request uses collect method', detail: 'UPI collect requests require your PIN — receiving money never needs your PIN' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a QR Code Payment Trap',
      explanation:
        'QR codes on UPI apps always initiate an outgoing payment from the scanner. No legitimate buyer sends a QR to "pay you." Entering your UPI PIN after scanning this QR would debit ₹15,000 from your account, not credit it.',
      tacticUsed: 'UPI Payment Confusion — Debit Disguised as Credit',
      psychologicalManipulation: [
        'Deliberately confuses the direction of payment',
        'Urgency and chat pressure prevent careful reading',
        'QR with exact sale amount creates false legitimacy',
        'First small "test" payment builds trust before the large scam',
      ],
      preventionTips: [
        'To receive money on UPI, share only your UPI ID or VPA — never scan a QR',
        'You never need to enter your PIN to receive money',
        'Any "collect request" approval sends money OUT of your account',
        'Wait for confirmed bank credit alerts before releasing goods',
      ],
      officialAdvice: 'UPI fraud can be reported to your bank and at NPCI portal: npci.org.in',
    },
  },
  {
    id: 5,
    title: 'Work From Home Job Fraud',
    subtitle: 'Fake Recruitment Scam',
    difficulty: 'Medium',
    environmentType: 'job-portal',
    briefing:
      'You applied to a WFH job listing. A recruiter has reached out via email with an offer. Investigate the company and the offer before proceeding.',
    redFlags: [
      { id: 'rf5-1', label: 'Company domain is newly registered', detail: 'techvision-global-jobs.in was registered 3 weeks ago' },
      { id: 'rf5-2', label: 'No traceable physical address', detail: 'Address on website returns a vacant plot on Google Maps' },
      { id: 'rf5-3', label: 'Registration fee required', detail: 'HR asks for ₹2,500 "security deposit" before onboarding' },
      { id: 'rf5-4', label: 'Unrealistic salary offer', detail: '₹45,000/month for "data entry" with no experience needed' },
      { id: 'rf5-5', label: 'LinkedIn profile has no connections', detail: 'Recruiter LinkedIn created 2 weeks ago with generic profile' },
      { id: 'rf5-6', label: 'Requests sensitive documents upfront', detail: 'Asks for Aadhaar, PAN, and bank details before any interview' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Job Recruitment Scam',
      explanation:
        'The company is fraudulent. Legitimate employers never charge fees to candidates. The combination of a new domain, unreachable address, fake LinkedIn profile, and advance fee demand are definitive fraud indicators.',
      tacticUsed: 'Job Fraud with Advance Fee Extraction',
      psychologicalManipulation: [
        'Targets job seekers during financial vulnerability',
        'Generous salary creates excitement that overrides skepticism',
        'Professional-looking documents and email build false credibility',
        'Small one-time fee seems reasonable compared to promised salary',
      ],
      preventionTips: [
        'Legitimate employers never charge candidates any fees',
        'Verify company registration on MCA portal (mca.gov.in)',
        'Search for the company on LinkedIn and check employee tenure',
        'Never share Aadhaar/PAN before a verified offer letter',
      ],
      officialAdvice:
        'Report fake job scams to the Ministry of Labour portal or cybercrime.gov.in. Check companies at mca.gov.in',
    },
  },
  {
    id: 6,
    title: 'Investment Scam',
    subtitle: 'Fake High-Return Investment',
    difficulty: 'Hard',
    environmentType: 'investment-scam',
    briefing:
      'An Instagram influencer is promoting a guaranteed 40% monthly return investment scheme via a Telegram group. Investigate before investing.',
    redFlags: [
      { id: 'rf6-1', label: 'Guaranteed returns are illegal', detail: 'SEBI prohibits any entity from guaranteeing investment returns' },
      { id: 'rf6-2', label: 'Fake follower pattern', detail: 'High follower count but engagement ratio under 0.1%' },
      { id: 'rf6-3', label: 'Profit screenshots unverifiable', detail: 'Screenshots of profits have no transaction ID or bank reference' },
      { id: 'rf6-4', label: 'Telegram group uses bots', detail: 'Telegram group has 50,000 members but responses within seconds, 24/7' },
      { id: 'rf6-5', label: 'No SEBI registration', detail: 'Entity claims to manage investments but has no SEBI registration number' },
      { id: 'rf6-6', label: 'Referral bonus structure', detail: 'Offers commission for referring others — classic Ponzi structure' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Ponzi Investment Scam',
      explanation:
        'No legitimate investment guarantees 40% monthly returns. This is a Ponzi scheme — early investors are paid from new investor money to create fake credibility, until the scheme collapses and all funds are lost.',
      tacticUsed: 'Ponzi / Pyramid Investment Fraud via Social Media',
      psychologicalManipulation: [
        'Social proof via fake testimonials and screenshots',
        'FOMO (Fear of Missing Out) through exclusive group access',
        'Small early "withdrawals" allowed to build trust',
        'Celebrity or influencer endorsements create false legitimacy',
      ],
      preventionTips: [
        'Check SEBI registration at sebi.gov.in before investing',
        'No legitimate investment can guarantee returns — it is illegal',
        'Verify investment firms on RBI and SEBI official databases',
        'High returns always mean high risk — "guaranteed" means scam',
      ],
      officialAdvice:
        'Report unregistered investment schemes to SEBI at scores.sebi.gov.in or call 1800-266-7575',
    },
  },
  {
    id: 7,
    title: 'Instagram Giveaway Scam',
    subtitle: 'Fake Prize / Winner Scam',
    difficulty: 'Easy',
    environmentType: 'instagram-giveaway',
    briefing:
      'A verified-looking Instagram account has declared you the winner of a ₹50,000 giveaway. A DM asks you to claim your prize. Investigate before responding.',
    redFlags: [
      { id: 'rf7-1', label: 'Blue tick is fake', detail: 'Account uses a lookalike username with extra underscores, not official' },
      { id: 'rf7-2', label: 'Account created recently', detail: 'Profile was created 45 days ago with only giveaway-related posts' },
      { id: 'rf7-3', label: 'Processing fee required', detail: 'DM demands ₹500 "processing fee" to release the prize' },
      { id: 'rf7-4', label: 'Winner selected without entry', detail: 'You never participated in any giveaway for this brand' },
      { id: 'rf7-5', label: 'DM contains suspicious link', detail: 'Link in DM goes to instagramgiveaway-prize-claim.com not instagram.com' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Instagram Giveaway Scam',
      explanation:
        'No legitimate giveaway charges a fee to claim a prize — ever. The account is an impersonator using a near-identical username. The "prize" is bait to collect a fee and potentially your personal information.',
      tacticUsed: 'Advance Fee Fraud via Fake Social Media Prize',
      psychologicalManipulation: [
        'Winning a prize triggers strong emotional excitement',
        'Small ₹500 fee seems trivial compared to ₹50,000 prize',
        'Urgency ("Claim within 24 hours") prevents careful verification',
        'Official-looking branding exploits trust in known companies',
      ],
      preventionTips: [
        'You cannot win a competition you never entered',
        'Legitimate brands never DM prize winners asking for money',
        'Check the account\'s creation date, follower history, and post history',
        'Visit the brand\'s official website to verify any prize communication',
      ],
      officialAdvice: 'Report fake accounts to Instagram and file a complaint at cybercrime.gov.in',
    },
  },
  {
    id: 8,
    title: 'Fake Customer Care Fraud',
    subtitle: 'Vishing + Remote Access',
    difficulty: 'Hard',
    environmentType: 'fake-customer-care',
    briefing:
      'You searched for your bank\'s customer care number on Google. You called a number from the search results. The agent is asking for remote access to resolve an issue. Investigate.',
    redFlags: [
      { id: 'rf8-1', label: 'Number from Google, not official website', detail: 'Google search results can be manipulated — official numbers only on bank website or passbook' },
      { id: 'rf8-2', label: 'Agent requests AnyDesk/TeamViewer install', detail: 'No bank ever requires remote desktop software for customer service' },
      { id: 'rf8-3', label: 'Agent asks for OTP verbally', detail: 'OTPs are secret — bank agents never ask for OTP over the phone' },
      { id: 'rf8-4', label: 'Website has no HTTPS padlock', detail: 'Fake customer care site uses HTTP only, not HTTPS' },
      { id: 'rf8-5', label: 'Phone number is personal mobile number', detail: 'Legitimate bank helplines are toll-free numbers starting with 1800' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Customer Care Vishing Scam',
      explanation:
        'Fraudsters pay to rank their numbers in Google search results above genuine bank helplines. Once connected, they install remote access software to take control of your device and drain your account.',
      tacticUsed: 'Vishing + Remote Access Takeover',
      psychologicalManipulation: [
        'Victims trust numbers found via Google search',
        'Professional demeanor and scripted responses build confidence',
        'Framing remote access as "technical requirement" normalizes it',
        'Urgency about "account issue" prevents independent verification',
      ],
      preventionTips: [
        'Always get bank helpline numbers from the official website or your debit card',
        'Never install any app at the instruction of a caller',
        'Never share OTP, PIN, or password with anyone — including bank staff',
        'Genuine bank agents can resolve issues without remote access',
      ],
      officialAdvice: 'Report to your bank immediately and file an FIR. Call RBI Ombudsman: 14448',
    },
  },
  {
    id: 9,
    title: 'Electricity Disconnection Scam',
    subtitle: 'Utility Bill Fraud',
    difficulty: 'Easy',
    environmentType: 'electricity-sms',
    briefing:
      'You received an urgent SMS threatening electricity disconnection tonight unless you pay immediately via a link. Investigate before acting.',
    redFlags: [
      { id: 'rf9-1', label: 'Sender is a 10-digit mobile number', detail: 'Legitimate BESCOM/MSEB alerts use registered sender IDs like BESCOM' },
      { id: 'rf9-2', label: 'Payment link domain is unofficial', detail: 'Link goes to bescom-pay-alert.xyz not bescom.co.in' },
      { id: 'rf9-3', label: 'Extreme urgency: "Tonight"', detail: 'Real utilities give written notice days in advance, not hours' },
      { id: 'rf9-4', label: 'Customer care number is mobile number', detail: 'Provided number is a personal mobile, not a toll-free utility helpline' },
      { id: 'rf9-5', label: 'No account number mentioned', detail: 'Real utility alerts always include your specific account or consumer number' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Electricity Disconnection Scam',
      explanation:
        'Electricity boards follow a strict disconnection process with physical notices. No utility board sends payment links via SMS for same-day disconnection. This scam uses urgency and fear to force immediate payment to fraudulent accounts.',
      tacticUsed: 'Utility Impersonation with Fear and Urgency',
      psychologicalManipulation: [
        'Threat of losing essential service (electricity) triggers panic',
        'Evening timing implies same-day urgency',
        'Small outstanding amount seems believable',
        'Familiar utility branding overrides critical thinking',
      ],
      preventionTips: [
        'Pay electricity bills only through official utility app or website',
        'Your consumer number is always mentioned in real utility communications',
        'Call the official utility helpline from their website to verify any threat',
        'Real disconnections require physical notice and a formal process',
      ],
      officialAdvice:
        'Report to your electricity provider and at cybercrime.gov.in. Utility fraud helpline: 19121',
    },
  },
  {
    id: 10,
    title: 'Deepfake Voice Call',
    subtitle: 'AI Voice Cloning Scam',
    difficulty: 'Hard',
    environmentType: 'deepfake-call',
    briefing:
      'You receive a call from an unknown number. The voice sounds exactly like your son. He claims to be in an accident and needs ₹50,000 urgently. Investigate before sending money.',
    redFlags: [
      { id: 'rf10-1', label: 'Call from unknown number', detail: 'Your son\'s number is saved — this is a different number' },
      { id: 'rf10-2', label: 'Refuses video call', detail: 'Claims phone camera is broken — voice calls only' },
      { id: 'rf10-3', label: 'Audio has subtle artifacts', detail: 'Slight robotic undertone and unnatural pauses in the voice' },
      { id: 'rf10-4', label: 'Requests immediate transfer, no time to think', detail: 'Insists money be sent within 10 minutes or "situation gets worse"' },
      { id: 'rf10-5', label: 'Background sounds are inconsistent', detail: 'Claims to be at accident site but background is completely silent' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is an AI Deepfake Voice Cloning Scam',
      explanation:
        'AI tools can now clone a person\'s voice from as little as 3 seconds of audio (social media videos, voicemails). Fraudsters use this technology to impersonate loved ones in emergency scenarios. The key defense is a pre-agreed family codeword.',
      tacticUsed: 'AI Voice Cloning / Deepfake Vishing',
      psychologicalManipulation: [
        'Voice of a loved one triggers immediate emotional response',
        'Emergency scenario (accident) shuts down rational analysis',
        'Extreme time pressure prevents independent verification',
        'Distress in the voice amplifies emotional panic',
      ],
      preventionTips: [
        'Establish a secret family codeword — ask it when identity is uncertain',
        'Hang up and call back your family member on their known number directly',
        'Always verify via video call — deepfakes struggle with real-time video',
        'Ask questions only the real person would know',
      ],
      officialAdvice:
        'Report AI voice cloning fraud to cybercrime.gov.in. India\'s IT Act covers AI-powered fraud under Section 66C',
    },
  },
  {
    id: 11,
    title: 'Marketplace Fraud',
    subtitle: 'Online Seller Advance Scam',
    difficulty: 'Medium',
    environmentType: 'marketplace',
    briefing:
      'You found a great deal on an online marketplace. The seller asks for advance payment via UPI before shipping. Investigate the listing and seller before paying.',
    redFlags: [
      { id: 'rf11-1', label: 'Price is 60% below market value', detail: 'iPhone 15 listed at ₹18,000 vs market price of ₹79,900' },
      { id: 'rf11-2', label: 'Seller account created this week', detail: 'Profile shows 0 previous transactions and 0 ratings' },
      { id: 'rf11-3', label: 'Insists on UPI advance, no platform escrow', detail: 'Refuses to use the platform\'s secure payment and insists on direct UPI' },
      { id: 'rf11-4', label: 'Product photos are stock images', detail: 'Reverse image search shows photos are from Apple\'s official website' },
      { id: 'rf11-5', label: 'Seller asks to move conversation off platform', detail: 'Provides WhatsApp number to continue — removes platform protection' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Marketplace Seller Advance Scam',
      explanation:
        'The listing is fake. The seller uses stolen product photos, a new account, and an impossibly low price to attract buyers. Once advance payment is sent, the seller disappears. No legitimate seller asks for UPI advance outside the platform.',
      tacticUsed: 'Fake Listing with Advance Payment Fraud',
      psychologicalManipulation: [
        'Extraordinary deal creates excitement and overrides skepticism',
        'Platform appearance gives false sense of security',
        'Creating sense of competition ("3 others are interested")',
        'Moving to WhatsApp removes platform oversight and complaint options',
      ],
      preventionTips: [
        'Only pay through the marketplace platform\'s official payment system',
        'Check seller\'s account age, ratings, and transaction history',
        'Reverse image search product photos to check if they are stolen',
        'If a price is too good to be true, it almost always is fraud',
      ],
      officialAdvice:
        'Report to the marketplace\'s fraud team and at cybercrime.gov.in. Consumer helpline: 1800-11-4000',
    },
  },
  {
    id: 12,
    title: 'UPI Collect Request Scam',
    subtitle: 'Reverse Payment Fraud',
    difficulty: 'Medium',
    environmentType: 'upi-collect',
    briefing:
      'You are selling your old laptop. The buyer sent a UPI collect request saying "Approve to receive ₹25,000." Investigate before approving.',
    redFlags: [
      { id: 'rf12-1', label: 'Collect request debits your account', detail: 'A UPI collect request always takes money FROM you when you approve' },
      { id: 'rf12-2', label: 'PIN required means money leaves your account', detail: 'You never need a PIN to receive money — PIN = payment from you' },
      { id: 'rf12-3', label: 'Note says "receive" but action is "pay"', detail: 'The note/description can say anything — the transaction type determines flow' },
      { id: 'rf12-4', label: 'Amount matches sale price exactly', detail: 'Matching the exact amount is designed to eliminate suspicion' },
      { id: 'rf12-5', label: 'Buyer pressures quick approval', detail: '"Please approve fast, I am waiting" is a classic pressure tactic' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a UPI Collect Request Scam',
      explanation:
        'A UPI collect request always takes money from the person who approves it. The fraudster deliberately mislabels it as a "payment to you." Entering your UPI PIN to approve this request would send ₹25,000 to the fraudster, not receive it.',
      tacticUsed: 'UPI Collect Deception — Direction of Payment Confusion',
      psychologicalManipulation: [
        'Technical UPI terminology confuses non-expert users',
        'Matching exact sale amount creates strong false legitimacy',
        'Familiar "Approve" UI pattern feels like confirming receipt',
        'Buyer urgency prevents careful reading of transaction details',
      ],
      preventionTips: [
        'To receive money: only share your UPI ID — never approve any request',
        'Any request requiring your PIN is taking money from you',
        'Read the transaction note carefully before any UPI interaction',
        'NPCI rule: collecting parties initiate collect requests — buyers should pay, not collect',
      ],
      officialAdvice: 'Report UPI fraud to your bank immediately and at NPCI: npci.org.in/upi-fraud',
    },
  },
  {
    id: 13,
    title: 'Fake Scholarship Portal',
    subtitle: 'Education Fraud',
    difficulty: 'Medium',
    environmentType: 'scholarship-portal',
    briefing:
      'You received an email about a government scholarship you are eligible for. The portal asks for your bank details to disburse funds. Investigate before submitting.',
    redFlags: [
      { id: 'rf13-1', label: 'Portal domain is not gov.in', detail: 'URL is scholarship-india-apply.com, not scholarships.gov.in' },
      { id: 'rf13-2', label: 'Registration fee for a scholarship', detail: 'Asks for ₹200 "application processing fee" — real government scholarships are free' },
      { id: 'rf13-3', label: 'Requests full bank account credentials', detail: 'Asks for account number, IFSC, and internet banking password' },
      { id: 'rf13-4', label: 'Scheme name does not exist', detail: '"PM Digital Youth Scholarship 2024" cannot be found on any government portal' },
      { id: 'rf13-5', label: 'Grammar and spelling errors', detail: 'Multiple grammatical errors on what claims to be a government portal' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Government Scholarship Portal',
      explanation:
        'The portal impersonates the National Scholarship Portal (NSP). Real government scholarships are applied for free at scholarships.gov.in. Any portal asking for fees or banking passwords is fraudulent and designed to steal your money and credentials.',
      tacticUsed: 'Government Impersonation with Advance Fee and Credential Theft',
      psychologicalManipulation: [
        'Financial need of scholarship applicants increases vulnerability',
        'Government branding and official-looking seals build trust',
        'Small application fee seems worthwhile for a large scholarship',
        'Promise of large financial benefit justifies sharing sensitive details',
      ],
      preventionTips: [
        'All government scholarships are listed at scholarships.gov.in (official NSP)',
        'Government websites always end in .gov.in — never .com or .in alone',
        'Never pay any fee to apply for a government scholarship',
        'Never share banking passwords with any website — not even your bank\'s website',
      ],
      officialAdvice:
        'Verify scholarships at scholarships.gov.in. Report fraud to cybercrime.gov.in or call 1930',
    },
  },
  {
    id: 14,
    title: 'Fake Aadhaar Update Website',
    subtitle: 'Identity Document Fraud',
    difficulty: 'Medium',
    environmentType: 'aadhaar-portal',
    briefing:
      'You received an SMS saying your Aadhaar needs to be updated within 30 days or it will be deactivated. A link leads to a form. Investigate before filling it.',
    redFlags: [
      { id: 'rf14-1', label: 'UIDAI website is uidai.gov.in not the linked domain', detail: 'Link leads to aadhaar-update-online.in, not uidai.gov.in' },
      { id: 'rf14-2', label: 'UIDAI does not deactivate Aadhaar via SMS', detail: 'Aadhaar cards do not have expiry dates — deactivation threat is fake' },
      { id: 'rf14-3', label: 'Form requests OTP from mobile', detail: 'Once you enter Aadhaar number, criminals can initiate real UIDAI OTP for verification' },
      { id: 'rf14-4', label: 'Asks for biometric details online', detail: 'Biometrics cannot be updated online — only at authorized Aadhaar centers' },
      { id: 'rf14-5', label: 'Page has UIDAI logo but wrong favicon', detail: 'Tab icon and website footer reveal non-government origin' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake UIDAI Aadhaar Update Scam',
      explanation:
        'Aadhaar cards do not expire and cannot be deactivated via SMS notification. UIDAI only accepts updates through uidai.gov.in or authorized enrollment centers. This portal harvests Aadhaar numbers and OTPs to commit identity fraud.',
      tacticUsed: 'Government Document Impersonation with Identity Theft',
      psychologicalManipulation: [
        'Fear of losing identity document creates extreme urgency',
        'Government authority makes compliance feel mandatory',
        'Official-looking seals, logos, and colors bypass suspicion',
        '30-day countdown creates time pressure to act without thinking',
      ],
      preventionTips: [
        'Aadhaar updates only happen at uidai.gov.in or official enrollment centers',
        'Aadhaar has no expiry date — deactivation threats are always fake',
        'Never enter Aadhaar OTP on any website except uidai.gov.in',
        'Verify any government communication through official helplines',
      ],
      officialAdvice: 'Report Aadhaar fraud to UIDAI helpline: 1947 or email help@uidai.gov.in',
    },
  },
  {
    id: 15,
    title: 'Social Media Account Recovery Scam',
    subtitle: 'Account Takeover Fraud',
    difficulty: 'Hard',
    environmentType: 'social-recovery',
    briefing:
      'Your Instagram account was hacked. You found a third-party account recovery service advertising on Google. They ask for your password to "restore access." Investigate.',
    redFlags: [
      { id: 'rf15-1', label: 'No official platform offers third-party recovery', detail: 'Instagram account recovery is only through instagram.com/hacked — no third party' },
      { id: 'rf15-2', label: 'Service asks for your current password', detail: 'No legitimate recovery service needs your password — this would give them full access' },
      { id: 'rf15-3', label: 'Upfront payment for guaranteed recovery', detail: 'Charges ₹1,500 in advance with "100% success guaranteed"' },
      { id: 'rf15-4', label: 'Contact is via WhatsApp only', detail: 'No official support channel — only a WhatsApp number' },
      { id: 'rf15-5', label: 'Reviews are all 5-star with one-line text', detail: 'All reviews posted within 2 days, generic text — clearly fake' },
    ],
    analysis: {
      verdict: 'fraud',
      headline: 'This is a Fake Account Recovery Scam',
      explanation:
        'This service is run by the same people who hacked your account, or opportunistic scammers. Providing your password gives them permanent access. The upfront fee is lost, and your account compromise worsens. All social media platforms have free official recovery processes.',
      tacticUsed: 'Secondary Exploitation of Account Recovery Desperation',
      psychologicalManipulation: [
        'Victims are already distressed from losing their account',
        'Promise of quick solution exploits desperation',
        'Positive reviews (fake) establish social proof and credibility',
        'Reasonable fee seems minor compared to what the account is worth',
      ],
      preventionTips: [
        'Instagram recovery: instagram.com/hacked — Facebook: facebook.com/hacked',
        'Never share your password with any third-party service — ever',
        'Enable two-factor authentication to prevent future hacking',
        'Legitimate recovery services do not exist — platforms handle this directly',
      ],
      officialAdvice:
        'Use platform-official recovery links only. Report the scammer account to the platform and to cybercrime.gov.in',
    },
  },
];

export default cases;
