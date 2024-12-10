const session = require('express-session');

class PrismaSessionStore extends session.Store {
  constructor(prismaClient) {
    super();
    this.prisma = prismaClient;
  }

  async get(sid, callback) {
    try {
      const session = await this.prisma.session.findUnique({
        where: { sid },
      });
      if (!session) {
        return callback(null, null); // Session expired or not found
      }
      if (session.expires < new Date()) {
        await this.prisma.session.delete({
          where: { sid },
        });
        return callback(null, null); // Session expired
    }
      callback(null, JSON.parse(session.data));
    } catch (err) {
      callback(err);
    }
  }

  async set(sid, data, callback) {
    try {
      const expires = new Date(data.cookie.expires || Date.now() + 24 * 60 * 60 * 1000); // 1 day fallback
      await this.prisma.session.upsert({
        where: { sid },
        update: { data: JSON.stringify(data), expires },
        create: { sid, data: JSON.stringify(data), expires },
      });
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      await this.prisma.session.deleteMany({
        where: { sid },
      });
      callback(null);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = PrismaSessionStore;
