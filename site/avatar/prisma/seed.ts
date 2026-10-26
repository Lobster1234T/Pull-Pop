import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Удаление старого админ пользователя...');

    // Удалить если существует
    await prisma.user.deleteMany({
      where: { email: 'admin@avatar.local' },
    });

    console.log('Создание нового админ пользователя...');

    // Админ пользователь
    const adminEmail = 'admin@avatar.local';
    const adminPassword = 'Admin123!@#';

    // Хешировать пароль
    const hashedPassword = await bcryptjs.hash(adminPassword, 10);

    // Создать админ пользователя
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: hashedPassword,
        name: 'Administrator',
        role: 'admin',
        isAdmin: true,
      },
    });

    console.log('✅ Админ пользователь создан:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Пароль: ${adminPassword}`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   isAdmin: ${admin.isAdmin}`);
  } catch (error) {
    console.error('❌ Ошибка:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
