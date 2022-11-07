import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  fastify.post(
    "/polls/:pollId/games/:gameId/guesses",
    { onRequest: [authenticate] },
    async (request, replay) => {
      const createGuessParams = z.object({
        pollId: z.string(),
        gameId: z.string(),
      });

      const createGuessBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
      });

      const { pollId, gameId } = createGuessParams.parse(request.params);
      const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(
        request.body
      );

      const participant = await prisma.participant.findUnique({
        where: {
          userId_pollId: {
            pollId,
            userId: request.user.sub,
          },
        },
      });

      if (!participant) {
        return replay.status(400).send({
          message: "You're not allowed to create a guess inside this poll.(1)",
          //Você não tem permissão para criar um palpite dentro deste poll.
        });
      }

      console.log("Parctipante ID ==========>", participant.id);
      console.log("GAME ID ==========>", gameId);

      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            gameId,
            participantId: participant.id,
          },
        },
      });

      if (guess) {
        return replay.status(400).send({
          message: "You already sent a guess to this game on this poll.(2)",
          //Você já enviou um palpite para este jogo neste poll.
        });
      }

      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return replay.status(400).send({
          message: "Game not found.(3)",
        });
      }

      if (game.date < new Date()) {
        return replay.status(400).send({
          message: "You cannot send guesses after the game date.(4)",
          //Você não pode enviar palpites após a data do jogo.
        });
      }

      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamPoints,
          secondTeamPoints,
        },
      });

      return replay.status(201).send();
    }
  );
}
