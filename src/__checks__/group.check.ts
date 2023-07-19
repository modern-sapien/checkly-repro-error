import { CheckGroup } from 'checkly/constructs'
import { smsChannel, emailChannel } from '../alert-channels'
const alertChannels = [smsChannel, emailChannel]
/*
* In this example, we bundle checks using a Check Group. We add checks to this group in two ways:
* 1. By passing the `CheckGroup` object for the `group` property of the check.
* 2. By defining a glob pattern like `*.spec.ts` that matches Browser Checks , just like at the Project level, e.g.
*
*  browserChecks: {
*    testMatch: './*.spec.ts'
*  }
*
* You can use either or both. In this example we show option 1.
**/

export const groupA = new CheckGroup('group-A', {
  name: 'groupA',
  activated: true,
  muted: false,
  runtimeId: '2022.10',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'groupA'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 1,
  alertChannels,
})

export const groupB = new CheckGroup('group-B', {
  name: 'groupB',
  activated: true,
  muted: false,
  runtimeId: '2022.10',
  locations: ['us-east-1', 'eu-west-1'],
  tags: ['mac', 'groupB'],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 1,
  alertChannels,
})
