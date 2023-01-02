const Products = require('./db.js');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    exports.getProducts = (query) => { 
        const page = query['page'] || 1;
        const count = parseInt(query['count']) || 5;
        const amountToSkip = page == 1? 0: count * (page-1);
        return prisma.products.findMany({
                take : count,
                skip : amountToSkip
    })
  }


}
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
