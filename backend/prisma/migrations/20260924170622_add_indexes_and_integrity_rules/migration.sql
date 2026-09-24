-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "date" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Appointment_businessId_date_idx" ON "Appointment"("businessId", "date");

-- CreateIndex
CREATE INDEX "Customer_businessId_idx" ON "Customer"("businessId");

-- CreateIndex
CREATE INDEX "Service_businessId_idx" ON "Service"("businessId");

-- CreateIndex
CREATE INDEX "User_businessId_idx" ON "User"("businessId");
