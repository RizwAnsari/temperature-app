-- CreateTable
CREATE TABLE "temperatures" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER NOT NULL,
    "temp" DECIMAL(65,30) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temperatures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "temperatures" ADD CONSTRAINT "temperatures_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
