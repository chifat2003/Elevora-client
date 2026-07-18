/**
 * Seeds the two demo accounts used by the "Demo: Job Seeker" / "Demo: Recruiter"
 * login buttons. Run once after MongoDB access is working:
 *   npx tsx scripts/seed-demo-users.ts
 */
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../.env") });

async function seed() {
  const { auth } = await import("../app/lib/auth");
  const { DEMO_ACCOUNTS } = await import("../app/lib/demo-accounts");

  await auth.api.signUpEmail({
    body: {
      name: "Demo Job Seeker",
      email: DEMO_ACCOUNTS.seeker.email,
      password: DEMO_ACCOUNTS.seeker.password,
      role: "seeker",
    },
  });
  console.log(`Created demo seeker: ${DEMO_ACCOUNTS.seeker.email}`);

  await auth.api.signUpEmail({
    body: {
      name: "Demo Recruiter",
      email: DEMO_ACCOUNTS.recruiter.email,
      password: DEMO_ACCOUNTS.recruiter.password,
      role: "recruiter",
    },
  });
  console.log(`Created demo recruiter: ${DEMO_ACCOUNTS.recruiter.email}`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err.message ?? err);
    process.exit(1);
  });
