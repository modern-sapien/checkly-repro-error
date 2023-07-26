// @ts-nocheck
import { ApiCheck, AssertionBuilder, CheckGroup } from 'checkly/constructs';
import { smsChannel, emailChannel } from '../../alert-channels';
const alertChannels = [smsChannel, emailChannel];

// this is where I need to create API & group checks

const urlList = ['facebook', 'google', 'twitter', 'linkedin'];
const regionList = ['us-east-1', 'us-west-1', 'us-east-2', 'us-east-2'];
const groupList = ['security', 'confidence', 'quality'];

export async function createGroupCheck(groupItem, regionItem) {
  // Creating CheckGroup
  let groupCheck = new CheckGroup(`${regionItem}-group-${groupItem}`, {
    name: `${regionItem} ${groupItem}`,
    activated: true,
    muted: false,
    runtimeId: '2023.02',
    frequency: 60,
    locations: [`${regionItem}`],
    tags: ['mac', `${groupItem}`],
    environmentVariables: [],
    concurrency: 1,
    alertChannels,
  });
  return groupCheck;
}

export async function createApiCheck(urlItem, groupItem) {
  // Creating APIchecks
  let apiCheck = new ApiCheck(
    `api-${urlItem}-${groupItem.name.split(' ').join('-').trim()}`,
    {
      name: `API  [${groupItem.name.split(' ')}] ${
        groupItem.name.split(' ')[1]
      } ${urlItem}`,
      group: groupItem,
      tags: [urlItem, `${groupItem.name.split(' ')[1]}`],
      request: {
        url: `https://${urlItem}.com}`,
        method: 'GET',
        followRedirects: true,
        skipSSL: false,
        assertions: [AssertionBuilder.statusCode().equals(200)],
      },
    }
  );
  return apiCheck;
}
