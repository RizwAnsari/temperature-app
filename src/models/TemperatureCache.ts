import prisma from "../utils/db";

const stats = async (city_id: number) => {
  return await prisma.temperatureCache.findFirst({
    where: { city_id },
    select: { city_id: true, min: true, max: true, mean: true },
  });
};

const create = async (data: Array<any>) => {
  return await prisma.temperatureCache.createMany({ data });
};

const truncate = async () => {
  return await prisma.$executeRaw`TRUNCATE TABLE temperature_cache RESTART IDENTITY`;
};

export { stats, create, truncate };
