"use server";

import { revalidatePath } from "next/cache";

import { runLiveIngestion } from "@/lib/ingestion/run-live-ingestion";

export async function refreshJobsAction() {
  await runLiveIngestion();
  revalidatePath("/");
  revalidatePath("/settings");
}