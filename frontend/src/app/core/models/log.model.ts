export interface Log {
  _id?: string; // Optional if coming from MongoDB
  level: string;
  message: string;
  timestamp: Date;
  // Add any other fields that your backend Log schema might have
}
