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


    exports.getProductInformation = (id) => {
        const product_id = parseInt(id)
        return prisma.products.findUnique({
            where: {
              id: product_id,
            },
            include: {
              features: {
                select: {
                  feature: true,
                  value: true  
                }
              }
            }
        })

    }   


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
            sale_price : true,
            default_style : true,
            photos: {
                select: {
                    thumbnail_url: true,
                    url: true 
                },
            },
            skus : {
                select: {
                    id : true,
                    quantity: true,
                    size: true
                },
            }
         
        },
      })

    }

    exports.formatStyles = (styles) => {
        let obj = [];
        for (var i = 0 ; i< styles.length; i++) {
            let skus = {};
            for (var j = 0 ; j < styles[i]['skus'].length; j++) {
                skus[styles[i]['skus'][j]['id']] = 
                    {
                    'quantity': styles[i]['skus'][j]['quantity'],
                    'size': styles[i]['skus'][j]['size']

                    }
            }
            obj.push(styles[i])
            obj[i]['skus'] = skus
        }
        return obj;
    }

    exports.getRelatedProducts = (id) => {
        const product_id = parseInt(id);
        return prisma.relatedproducts.findMany ({
        where: {
            related_product_id: product_id,
        },
        select : {
            current_product_id: true
        }
    })
    }

    exports.formatRelatedProducts = (relatedProducts) => {
        let array = [];
        for (var i of relatedProducts) {
            array.push(i['current_product_id'])
        }
        return array;
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
