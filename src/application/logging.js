import winston from "winston";

// Simpan format yang sudah ada untuk produksi
const jsonFormat = winston.format.json();

// Buat format baru yang lebih manusiawi untuk development
const prettyFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    // Cek jika message adalah objek dari prisma-query
    if (message && typeof message === 'object' && message.query) {
        const duration = message.duration ? `(${message.duration}ms)` : '';
        return `[${timestamp}] ${level}: Prisma Query <span class="math-inline">\{duration\}\\n</span>{message.query}\nParams: ${message.params}`;
    }

    // Cek jika message adalah objek error dari prisma
    if (meta && meta.target === 'user.findUnique' && typeof message === 'string' && message.includes('Invalid')) {
        return `[${timestamp}] ${level}: ${message}`;
    }

    // Untuk log biasa
    const metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `[${timestamp}] ${level}: ${message} ${metaString}`;
  })
);

export const logger = winston.createLogger({
  // Gunakan level 'info' atau 'debug' sesuai kebutuhan
  level: "info",

  // Gunakan format 'pretty' jika tidak di produksi, jika tidak, gunakan JSON
  format: process.env.NODE_ENV === 'production' ? jsonFormat : prettyFormat,

  transports: [
    new winston.transports.Console({})
  ],
});