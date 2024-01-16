import Queue from "bull";
import "dotenv/config";

export default (queue_name: string) => {
  return new Queue(queue_name, {
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
    },
  });
};
