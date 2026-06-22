export const mockStocks = [
  { id: 1, symbol: "AAPL", name: "Apple Inc.", price: 189.42, change: 1.24, changePercent: 0.66, volume: "52.3M", marketCap: "2.94T", up: true, sector: "Technology" },
  { id: 2, symbol: "TSLA", name: "Tesla Inc.", price: 242.10, change: -3.87, changePercent: -1.57, volume: "118.7M", marketCap: "769B", up: false, sector: "Automotive" },
  { id: 3, symbol: "NVDA", name: "NVIDIA Corp.", price: 875.33, change: 12.54, changePercent: 1.45, volume: "41.2M", marketCap: "2.16T", up: true, sector: "Technology" },
  { id: 4, symbol: "MSFT", name: "Microsoft Corp.", price: 412.90, change: 2.10, changePercent: 0.51, volume: "22.1M", marketCap: "3.07T", up: true, sector: "Technology" },
  { id: 5, symbol: "AMZN", name: "Amazon.com Inc.", price: 185.67, change: -0.93, changePercent: -0.50, volume: "34.5M", marketCap: "1.93T", up: false, sector: "E-Commerce" },
  { id: 6, symbol: "GOOGL", name: "Alphabet Inc.", price: 175.22, change: 3.45, changePercent: 2.01, volume: "28.9M", marketCap: "2.18T", up: true, sector: "Technology" },
  { id: 7, symbol: "META", name: "Meta Platforms", price: 505.88, change: 8.72, changePercent: 1.75, volume: "17.3M", marketCap: "1.29T", up: true, sector: "Social Media" },
  { id: 8, symbol: "NFLX", name: "Netflix Inc.", price: 628.44, change: 5.31, changePercent: 0.85, volume: "5.8M", marketCap: "271B", up: true, sector: "Entertainment" },
  { id: 9, symbol: "AMD", name: "Advanced Micro Devices", price: 164.22, change: -2.44, changePercent: -1.46, volume: "44.1M", marketCap: "265B", up: false, sector: "Technology" },
  { id: 10, symbol: "INTC", name: "Intel Corp.", price: 31.55, change: -0.78, changePercent: -2.41, volume: "39.2M", marketCap: "134B", up: false, sector: "Technology" },
];

export const mockPortfolio = [
  { symbol: "AAPL", shares: 15, avgPrice: 172.30, currentPrice: 189.42 },
  { symbol: "NVDA", shares: 8,  avgPrice: 620.00, currentPrice: 875.33 },
  { symbol: "MSFT", shares: 10, avgPrice: 380.00, currentPrice: 412.90 },
  { symbol: "TSLA", shares: 20, avgPrice: 260.00, currentPrice: 242.10 },
  { symbol: "META", shares: 5,  avgPrice: 450.00, currentPrice: 505.88 },
];

export const mockOrders = [
  { id: "ORD001", symbol: "AAPL", type: "BUY",  qty: 5,  price: 188.00, status: "FILLED",   time: "09:32:14" },
  { id: "ORD002", symbol: "TSLA", type: "SELL", qty: 10, price: 245.50, status: "FILLED",   time: "10:14:07" },
  { id: "ORD003", symbol: "NVDA", type: "BUY",  qty: 2,  price: 870.00, status: "PENDING",  time: "11:02:33" },
  { id: "ORD004", symbol: "META", type: "BUY",  qty: 3,  price: 502.00, status: "CANCELLED",time: "11:45:19" },
  { id: "ORD005", symbol: "GOOGL",type: "SELL", qty: 7,  price: 174.00, status: "FILLED",   time: "12:30:55" },
];

export const chartData = [
  { time: "9:30",  value: 820 },
  { time: "10:00", value: 835 },
  { time: "10:30", value: 828 },
  { time: "11:00", value: 855 },
  { time: "11:30", value: 862 },
  { time: "12:00", value: 848 },
  { time: "12:30", value: 871 },
  { time: "13:00", value: 875 },
];