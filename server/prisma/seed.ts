import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/marcelolimav.png",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Exemple Poll",
      code: "BOL123",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-20T13:00:00.404Z",
      firstTeamCountryCode: "NL",
      secondTeamCountryCode: "SN",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-21T10:00:00.404Z",
      firstTeamCountryCode: "VG",
      secondTeamCountryCode: "IR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-21T16:00:00.404Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "GB",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-22T07:00:00.404Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "SA",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-22T13:00:00.404Z",
      firstTeamCountryCode: "MX",
      secondTeamCountryCode: "PL",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-23T10:00:00.404Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "JP",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-23T13:00:00.404Z",
      firstTeamCountryCode: "ES",
      secondTeamCountryCode: "CR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-23T07:00:00.404Z",
      firstTeamCountryCode: "MA",
      secondTeamCountryCode: "HR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-23T16:00:00.404Z",
      firstTeamCountryCode: "BE",
      secondTeamCountryCode: "CA",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-24T07:00:00.404Z",
      firstTeamCountryCode: "CH",
      secondTeamCountryCode: "CM",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-24T16:00:00.404Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "RS",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-20T13:00:00.404Z",
      firstTeamCountryCode: "QA",
      secondTeamCountryCode: "EC",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-24T13:00:00.404Z",
      firstTeamCountryCode: "PT",
      secondTeamCountryCode: "GH",
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
