import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const administrator_group = await prisma.group.upsert({
    where: { group_id: 1 },
    update: {},
    create: {
      group_name: 'Administrator',
      group_description: 'Administrator',
    },
  });
  const super_user = await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      user_name: 'seraphim',
      user_email: 'seraphim@anjotech.net',
      user_password: 'master',
      user_group_id: 1,
    },
  });
  console.log({ administrator_group, super_user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
