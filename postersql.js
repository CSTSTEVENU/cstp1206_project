const { PrismaClient } = require( '@prisma/client');

const prisma = new PrismaClient()

async function main() {
    console.log('creating data')
    await prisma.user.create(
        {
            data:{
              name:"Gina",
              age:31,
              password: "12345",
              email:"ginasun28@gmail.com"
            }
                
            
  });
    console.log('Created a person & hedgehogs');
    console.log('let\'s get the data');

  // ... you will write your Prisma Client queries here
  const people = await prisma.user.findMany(
      {
          select:{
              id: true,
              name: true,
              age: true
          }
      }
  );
  console.log('found people');
  console.log(JSON.stringify(people));
}

main()
  .catch(
      (error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect()
  })