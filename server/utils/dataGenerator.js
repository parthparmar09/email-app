const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Email = require("../models/emailModel");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const userIds = [
  "666a8f1a53704f3458b29a1a",
  "666a8f3d61b0e48b0c96163a",
  "666a8f5361b0e48b0c96163d",
  "666a8f6461b0e48b0c961640",
  "666a95529a507f82b10b7bbe",
];

const generateRandomUserMetadata = (userIds) => {
  return userIds.reduce((acc, userId) => {
    acc[userId] = {
      isRead: faker.datatype.boolean(),
      isStarred: faker.datatype.boolean(),
      isTrashed: faker.datatype.boolean(),
      isImportant: faker.datatype.boolean(),
      labels: faker.helpers.arrayElements(
        ["work", "personal", "social"],
        faker.datatype.number({ min: 0, max: 3 })
      ),
    };
    return acc;
  }, {});
};

const generateRandomEmails = async (count = 100) => {
  for (let i = 0; i < count; i++) {
    const senderId = faker.helpers.arrayElement(userIds);
    const recipientIds = faker.helpers.arrayElements(
      userIds,
      faker.datatype.number({ min: 1, max: userIds.length })
    );
    const ccIds = faker.helpers.arrayElements(
      userIds,
      faker.datatype.number({ min: 0, max: userIds.length })
    );
    const bccIds = faker.helpers.arrayElements(
      userIds,
      faker.datatype.number({ min: 0, max: userIds.length })
    );
    const userMetadata = generateRandomUserMetadata([
      ...new Set([...recipientIds, ...ccIds, ...bccIds, ...senderId]),
    ]);

    const email = new Email({
      senderId,
      isDraft: faker.datatype.boolean(),
      recipientIds,
      ccIds,
      bccIds,
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      attachments: faker.datatype
        .array(faker.datatype.number({ min: 0, max: 3 }))
        .map(() => faker.internet.url()),
      userMetadata,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    });

    await email.save();
  }
};

generateRandomEmails()
  .then(() => {
    console.log("Random email data generated successfully.");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error generating random email data:", error);
    mongoose.connection.close();
  });
