import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      id: "seed-user-id-1",
      name: "Alice",
      stories: {
        create: {
          id: "seed-story-id-1",
          title: "A journey to the center of the earth",
          summary: "A story about a journey to the center of the earth",
          content: "",
        },
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });