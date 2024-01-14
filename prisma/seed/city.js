const { PrismaClient } = require("@prisma/client");

const cities = [
  { name: "London" },
  { name: "Osaka" },
  { name: "Cairo" },
  { name: "Sydney" },
  { name: "Chennai" },
  { name: "Chicago" },
  { name: "Liverpool" },
  { name: "Sapporo" },
  { name: "Alexandria" },
  { name: "Delhi" },
  { name: "Luxor" },
  { name: "Los Angeles" },
  { name: "Brisbane" },
  { name: "Mumbai" },
  { name: "Perth" },
  { name: "Glasgow" },
  { name: "Giza" },
  { name: "Houston" },
  { name: "Melbourne" },
  { name: "New York" },
  { name: "Kolkata" },
  { name: "Aswan" },
  { name: "Miami" },
  { name: "Fukuoka" },
  { name: "Adelaide" },
  { name: "Birmingham" },
  { name: "Nagoya" },
  { name: "Bangalore" },
  { name: "Tokyo" },
];

const populateCities = async () => {
  const prisma = new PrismaClient();
  try {
    await prisma.city.createMany({
      data: cities,
      skipDuplicates: true,
    });
  } finally {
    await prisma.$disconnect();
  }
};

populateCities();
