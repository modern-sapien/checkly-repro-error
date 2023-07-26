// @ts-nocheck
const {
  createGroupCheck,
  createApiCheck,
} = require('./utils/generateCheckGroups');

const urlList = ['facebook', 'google', 'twitter', 'linkedin'];
const regionList = ['us-east-1', 'us-west-1', 'us-west-2'];
const groupList = ['security', 'confidence', 'quality'];

async function createChecks() {
  const allGroups = [];
  const allApiChecks = [];

  for (const regionItem of regionList) {
    for (const groupItem of groupList) {
      const group = await createGroupCheck(groupItem, regionItem);
      allGroups.push(group);
    }
  }

  for (const urlItem of urlList) {
    for (const groupItem of allGroups) {
      const apiCheck = await createApiCheck(urlItem, groupItem);
      allApiChecks.push(apiCheck);
    }
  }
  // Now you have arrays with all the created CheckGroup and ApiCheck instances.
  console.log(allGroups);
  console.log(allApiChecks);
}

// Call the function to create the checks
createChecks();

// new CheckGroup(`group-${groupList[0]}-${regionList[0]}`, {
//   name: `${groupList[0]}`,
//   activated: true,
//   muted: false,
//   runtimeId: '2023.02',
//   locations: [`${regionList[0]}`],
//   tags: ['mac', `${groupList[0]}`],
//   environmentVariables: [],
//   concurrency: 1,
//   alertChannels,
// });

//  createChecks
