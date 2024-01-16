import Queue from "bull";

export default (queue_name: string) => {
  return new Queue(queue_name, {
    redis: {
      host: "redis",
      port: 6379,
    },
  });
};
