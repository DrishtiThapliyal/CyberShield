export type ScamCategory = {
  name: string;
  cases: number;
  loss: number; // in lakhs
  successRate: number;
  avgLoss: number;
};

export const scamCategories: ScamCategory[] = [
  { name: "Phishing", cases: 24820, loss: 8420, successRate: 18, avgLoss: 34000 },
  { name: "OTP Fraud", cases: 21340, loss: 6210, successRate: 22, avgLoss: 29100 },
  { name: "UPI Scam", cases: 18900, loss: 5180, successRate: 26, avgLoss: 27400 },
  { name: "Investment Fraud", cases: 12450, loss: 14820, successRate: 41, avgLoss: 119000 },
  { name: "Loan Fraud", cases: 9870, loss: 2940, successRate: 14, avgLoss: 29800 },
  { name: "Job Scam", cases: 8210, loss: 1820, successRate: 19, avgLoss: 22200 },
  { name: "Credit Card Fraud", cases: 7430, loss: 2110, successRate: 16, avgLoss: 28400 },
  { name: "Romance Scam", cases: 3210, loss: 1640, successRate: 33, avgLoss: 51100 },
  { name: "Identity Theft", cases: 5640, loss: 1280, successRate: 12, avgLoss: 22700 },
];

export const stateData = [
  { state: "Maharashtra", code: "MH", cases: 18400, loss: 9820, lat: 19.7515, lng: 75.7139 },
  { state: "Karnataka", code: "KA", cases: 15200, loss: 7140, lat: 15.3173, lng: 75.7139 },
  { state: "Delhi", code: "DL", cases: 13500, loss: 8230, lat: 28.7041, lng: 77.1025 },
  { state: "Telangana", code: "TG", cases: 11300, loss: 5430, lat: 18.1124, lng: 79.0193 },
  { state: "Tamil Nadu", code: "TN", cases: 10800, loss: 4920, lat: 11.1271, lng: 78.6569 },
  { state: "Uttar Pradesh", code: "UP", cases: 10200, loss: 4310, lat: 26.8467, lng: 80.9462 },
  { state: "Gujarat", code: "GJ", cases: 8900, loss: 3820, lat: 22.2587, lng: 71.1924 },
  { state: "West Bengal", code: "WB", cases: 7400, loss: 2940, lat: 22.9868, lng: 87.855 },
  { state: "Rajasthan", code: "RJ", cases: 6200, loss: 2210, lat: 27.0238, lng: 74.2179 },
  { state: "Kerala", code: "KL", cases: 5100, loss: 1980, lat: 10.8505, lng: 76.2711 },
];

export const monthlyTrend = [
  { month: "Jan", cases: 8200, loss: 3120, recovered: 410 },
  { month: "Feb", cases: 8900, loss: 3380, recovered: 470 },
  { month: "Mar", cases: 9800, loss: 3640, recovered: 510 },
  { month: "Apr", cases: 10400, loss: 3920, recovered: 540 },
  { month: "May", cases: 11200, loss: 4280, recovered: 610 },
  { month: "Jun", cases: 12100, loss: 4720, recovered: 680 },
  { month: "Jul", cases: 13200, loss: 5140, recovered: 740 },
  { month: "Aug", cases: 14100, loss: 5520, recovered: 820 },
  { month: "Sep", cases: 13800, loss: 5380, recovered: 790 },
  { month: "Oct", cases: 14900, loss: 5810, recovered: 860 },
  { month: "Nov", cases: 15820, loss: 6240, recovered: 940 },
  { month: "Dec", cases: 16400, loss: 6580, recovered: 1020 },
];

export const forecast = [
  { month: "Jan'26", cases: 17200, lower: 16100, upper: 18400 },
  { month: "Feb'26", cases: 17800, lower: 16400, upper: 19200 },
  { month: "Mar'26", cases: 18600, lower: 16900, upper: 20300 },
  { month: "Apr'26", cases: 19500, lower: 17600, upper: 21500 },
];

export const ageDistribution = [
  { range: "18-24", victims: 12400 },
  { range: "25-34", victims: 24800 },
  { range: "35-44", victims: 22100 },
  { range: "45-54", victims: 16300 },
  { range: "55-64", victims: 11200 },
  { range: "65+", victims: 8400 },
];

export const genderSplit = [
  { name: "Male", value: 58 },
  { name: "Female", value: 39 },
  { name: "Other", value: 3 },
];

export const occupations = [
  { name: "Employee", victims: 5300 },
  { name: "Business", victims: 4100 },
  { name: "Student", victims: 2000 },
  { name: "Retired", victims: 1800 },
  { name: "Homemaker", victims: 1400 },
  { name: "Other", victims: 900 },
];

export const hourlyHeatmap = (() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return days.map((d, di) => ({
    day: d,
    cells: hours.map((h) => {
      // peak around 10-12 and 18-21 on weekdays
      const peakA = Math.exp(-Math.pow(h - 11, 2) / 8);
      const peakB = Math.exp(-Math.pow(h - 19, 2) / 6);
      const weekdayBoost = di < 5 ? 1 : 0.6;
      const v = (peakA + peakB) * weekdayBoost * 100 + Math.random() * 12;
      return { hour: h, value: Math.round(v) };
    }),
  }));
})();

export const liveFeed = [
  { id: 1, time: "12s ago", type: "UPI Scam", loc: "Pune, MH", loss: "₹42,300", risk: "high" },
  { id: 2, time: "47s ago", type: "Phishing", loc: "Bengaluru, KA", loss: "₹18,900", risk: "med" },
  { id: 3, time: "1m ago", type: "Investment Fraud", loc: "Mumbai, MH", loss: "₹2,40,000", risk: "high" },
  { id: 4, time: "2m ago", type: "OTP Fraud", loc: "Delhi, DL", loss: "₹31,200", risk: "med" },
  { id: 5, time: "4m ago", type: "Job Scam", loc: "Hyderabad, TG", loss: "₹12,400", risk: "low" },
  { id: 6, time: "6m ago", type: "Romance Scam", loc: "Chennai, TN", loss: "₹85,600", risk: "high" },
];

export const trendingKeywords = [
  { word: "KYC update", size: 48 },
  { word: "free gift", size: 38 },
  { word: "loan approval", size: 42 },
  { word: "lottery winner", size: 34 },
  { word: "bank verify", size: 46 },
  { word: "electricity bill", size: 36 },
  { word: "courier hold", size: 40 },
  { word: "tax refund", size: 32 },
  { word: "OTP share", size: 50 },
  { word: "investment plan", size: 44 },
  { word: "work from home", size: 30 },
  { word: "crypto double", size: 38 },
  { word: "credit limit", size: 28 },
  { word: "police case", size: 36 },
  { word: "parcel pending", size: 34 },
];

export const kpis = {
  totalCrimes: 121870,
  totalLoss: 4458, // in crores
  victims: 95140,
  arrests: 8420,
  detectionRate: 38.4,
  convictionRate: 12.7,
  avgLoss: 36580,
};

export const sankeyFlow = [
  { src: "Victims", tgt: "Phishing Link", value: 42 },
  { src: "Victims", tgt: "Fake Call", value: 38 },
  { src: "Victims", tgt: "Social Media Ad", value: 20 },
  { src: "Phishing Link", tgt: "UPI", value: 24 },
  { src: "Phishing Link", tgt: "Net Banking", value: 18 },
  { src: "Fake Call", tgt: "UPI", value: 22 },
  { src: "Fake Call", tgt: "Card", value: 16 },
  { src: "Social Media Ad", tgt: "Crypto", value: 14 },
  { src: "Social Media Ad", tgt: "Net Banking", value: 6 },
];