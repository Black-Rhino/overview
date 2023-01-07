const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

async function main() {
  exports.getProducts = (query) => {
    const page = query["page"] || 1;
    const count = parseInt(query["count"]) || 5;
    const amountToSkip = page == 1 ? 0 : count * (page - 1);
    return prisma.products.findMany({
      take: count,
      skip: amountToSkip,
    });
  };

  exports.getProductInformation = (id) => {
    const product_id = parseInt(id);
    return prisma.products.findUnique({
      where: {
        id: product_id,
      },
      include: {
        features: {
          select: {
            feature: true,
            value: true,
          },
        },
      },
    });
  };

  exports.getStyles = (id) => {
    const product_id = parseInt(id);
    return prisma.styles.findMany({
      where: {
        product_id: product_id,
      },
      select: {
        style_id: true,
        name: true,
        original_price: true,
        sale_price: true,
        default_style: true,
        photos: {
          select: {
            thumbnail_url: true,
            url: true,
          },
        },
        skus: {
          select: {
            id: true,
            quantity: true,
            size: true,
          },
        },
      },
    });
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
