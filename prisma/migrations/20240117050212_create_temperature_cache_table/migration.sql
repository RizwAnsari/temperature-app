-- CreateTable
CREATE TABLE "temperature_cache" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER NOT NULL,
    "min" DECIMAL(6,3) NOT NULL,
    "max" DECIMAL(6,3) NOT NULL,
    "mean" DECIMAL(6,3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temperature_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "temperature_cache_city_id_key" ON "temperature_cache"("city_id");

-- AddForeignKey
ALTER TABLE "temperature_cache" ADD CONSTRAINT "temperature_cache_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
