'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 10 Ethiopian Regions
    const regions = await queryInterface.bulkInsert('Regions', [
      { name: 'Addis Ababa', amharicName: 'አዲስ አበባ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Afar', amharicName: 'አፋር', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Amhara', amharicName: 'አማራ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Benishangul-Gumuz', amharicName: 'ቤንሻንጉል-ጉሙዝ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dire Dawa', amharicName: 'ድሬዳዋ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gambela', amharicName: 'ጋምቤላ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harari', amharicName: 'ሐረሪ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Oromia', amharicName: 'ኦሮሚያ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Somali', amharicName: 'ሶማሌ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tigray', amharicName: 'ትግራይ', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SNNPR', amharicName: 'ደቡብ ብሔር ብሔረሰቦች', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sidama', amharicName: 'ሲዳማ', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });

    // Common products
    await queryInterface.bulkInsert('Products', [
      { name: 'Teff', amharicName: 'ጤፍ', unit: 'quintal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Wheat', amharicName: 'ስንዴ', unit: 'quintal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maize', amharicName: 'በቆሎ', unit: 'quintal', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Coffee', amharicName: 'ቡና', unit: 'kg', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sorghum', amharicName: 'ማሽላ', unit: 'quintal', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prices', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Regions', null, {});
  }
};