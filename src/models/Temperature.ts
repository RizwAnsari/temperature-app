import prisma from "../utils/db";

const exists = async (city_id: number) => {
  return await prisma.temperature.count({
    where: { city_id },
    take: 1,
  });
};

const singleCityStats = async (city_id: number) => {
  return await prisma.temperature.aggregate({
    _avg: { temp: true },
    _min: { temp: true },
    _max: { temp: true },
    where: { city_id },
  });
};

const bulkInsert = async (data: any) => {
  return await prisma.temperature.createMany({ data });
};

const stats = async () => {
  return prisma.temperature.groupBy({
    by: "city_id",
    _avg: { temp: true },
    _min: { temp: true },
    _max: { temp: true },
  });
};

export { exists, singleCityStats, bulkInsert, stats };
