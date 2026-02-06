// scripts/create-admin.js
require('dotenv').config();
const { sequelize, User } = require('./models'); // ← make sure path is correct!
const bcrypt = require('bcryptjs');

async function createOrCheckAdmin() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // ── 1. Show all existing admins ─────────────────────────────
    const allAdmins = await User.findAll({
      where: { role: 'admin' },
      attributes: ['id', 'full_name', 'phone_number', 'role', 'region'],
      raw: true,
    });

    console.log('Currently existing admins:');
    if (allAdmins.length === 0) {
      console.log('→ No admin found\n');
    } else {
      console.table(allAdmins);
      console.log('');
    }

    // ── 2. If you want to create anyway → remove or comment this part
    if (allAdmins.length > 0) {
      console.log('→ Admin(s) already exist → nothing will be created');
      return;
    }

    // ── 3. Create new admin ─────────────────────────────────────
    console.log('Creating new admin...\n');

    const hashed = await bcrypt.hash('StrongPass123!@#', 10); // ← CHANGE THIS !!

    const newAdmin = await User.create({
      full_name: 'Main Admin',
      phone_number: '0999000000',       // ← Change to really unique number!!
      region: 'Addis Ababa',
      role: 'admin',
      password_hash: hashed,
    });

    console.log('╔══════════════════════════════════════╗');
    console.log('║         ADMIN CREATED SUCCESSFULLY   ║');
    console.log('╚══════════════════════════════════════╝');
    console.table({
      id: newAdmin.id,
      full_name: newAdmin.full_name,
      phone: newAdmin.phone_number,
      role: newAdmin.role,
      region: newAdmin.region,
    });

  } catch (err) {
    console.error('❌ Error happened:');
    console.error(err.message);

    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log('\n→ Duplicate phone number! Change phone_number and try again.');
    }
  } finally {
    await sequelize.close();
  }
}

createOrCheckAdmin();