import prisma from "../utils/db";

const exists = async (city_id: number) => {
  return await prisma.temperature.count({
    where: { city_id },
    take: 1,
  });
};

const stats = async (city_id: number) => {
  return await prisma.temperature.aggregate({
    _avg: { temp: true },
    _min: { temp: true },
    _max: { temp: true },
    where: { city_id },
  });
};

export { exists, stats };
